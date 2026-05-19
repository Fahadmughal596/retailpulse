"""
RetailPulse AI — AI Insights Engine
=====================================
FastAPI endpoint: POST /api/v1/insights/generate

Flow:
  1. Authenticate brand via JWT (Supabase Auth)
  2. Fetch brand-isolated transactions from PostgreSQL (RLS enforced)
  3. Aggregate and format raw data into context payload
  4. Stream through LangChain LCEL chain → Gemini 1.5 Pro
  5. Return structured MarketIntelligenceCard[]

Stack: FastAPI · LangChain LCEL · Google Gemini · asyncpg · Pydantic v2
"""

from __future__ import annotations

import json
import os
import textwrap
from datetime import datetime, timedelta, timezone
from typing import Annotated, AsyncIterator, Literal

import asyncpg
from fastapi import APIRouter, Depends, Header, HTTPException, status
from fastapi.responses import StreamingResponse
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnablePassthrough, RunnableSerializable
from langchain_google_genai import ChatGoogleGenerativeAI
from pydantic import BaseModel, Field
from supabase import acreate_client, AsyncClient as AsyncSupabaseClient

# ─── Config ───────────────────────────────────────────────────────────────────

SUPABASE_URL       = os.environ["SUPABASE_URL"]
SUPABASE_SERVICE_KEY = os.environ["SUPABASE_SERVICE_ROLE_KEY"]
DB_DSN             = os.environ["DATABASE_URL"]          # asyncpg DSN
GEMINI_API_KEY     = os.environ["GOOGLE_API_KEY"]
LOOKBACK_DAYS      = int(os.environ.get("INSIGHTS_LOOKBACK_DAYS", "30"))

router = APIRouter(prefix="/api/v1/insights", tags=["AI Insights"])

# ─── Pydantic Schemas ─────────────────────────────────────────────────────────

class InsightCard(BaseModel):
    """A single natural-language market intelligence card."""

    title: str = Field(..., description="Short headline (≤ 10 words)")
    body: str  = Field(..., description="2-4 sentence analysis paragraph")
    card_type: Literal["trend", "alert", "opportunity", "forecast"] = Field(...)
    metric: str | None = Field(
        None, description="Key metric value, e.g. '+34% WoW'"
    )
    city: str | None  = Field(None, description="Relevant city/region if applicable")
    sku: str | None   = Field(None, description="Relevant SKU/product if applicable")
    confidence: float = Field(
        ..., ge=0.0, le=1.0, description="Model confidence 0–1"
    )
    generated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class InsightRequest(BaseModel):
    brand_id: str = Field(..., description="Authenticated brand UUID")
    city_filter: str | None = Field(None, description="Optional city scope")
    sku_filter: str | None  = Field(None, description="Optional SKU scope")
    card_limit: int         = Field(6, ge=1, le=12)


class InsightResponse(BaseModel):
    brand_id: str
    period_start: datetime
    period_end: datetime
    cards: list[InsightCard]
    total_transactions_analyzed: int
    model: str = "gemini-1.5-pro"


# ─── Supabase Auth Dependency ─────────────────────────────────────────────────

async def verify_brand_token(
    authorization: Annotated[str, Header()],
) -> str:
    """
    Validates the Bearer JWT from Supabase Auth.
    Returns the authenticated brand_id (user.id maps 1:1 to brand).
    """
    if not authorization.startswith("Bearer "):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing Bearer token",
        )
    token = authorization.removeprefix("Bearer ").strip()
    try:
        supabase: AsyncSupabaseClient = await acreate_client(
            SUPABASE_URL, SUPABASE_SERVICE_KEY
        )
        user_resp = await supabase.auth.get_user(token)
        if not user_resp or not user_resp.user:
            raise ValueError("Invalid token")
        return str(user_resp.user.id)
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Authentication failed: {exc}",
        ) from exc


# ─── Database Query ───────────────────────────────────────────────────────────

_TRANSACTION_QUERY = """
    SELECT
        t.id,
        t.recorded_at,
        t.total_amount,
        t.payment_method,
        s.city,
        s.neighborhood,
        json_agg(
            json_build_object(
                'sku_id',       i.sku_id,
                'product_name', i.product_name,
                'quantity',     i.quantity,
                'unit_price',   i.unit_price,
                'category',     i.category
            )
        ) AS items
    FROM transactions t
    JOIN stores         s ON s.id = t.store_id
    JOIN transaction_items i ON i.transaction_id = t.id
    WHERE
        i.brand_id   = $1
        AND t.recorded_at >= $2
        AND t.recorded_at <  $3
        AND ($4::text IS NULL OR s.city ILIKE $4)
        AND ($5::text IS NULL OR i.product_name ILIKE '%' || $5 || '%')
    GROUP BY t.id, t.recorded_at, t.total_amount, t.payment_method,
             s.city, s.neighborhood
    ORDER BY t.recorded_at DESC
    LIMIT 2000;
"""


async def fetch_brand_transactions(
    brand_id: str,
    since: datetime,
    until: datetime,
    city_filter: str | None,
    sku_filter: str | None,
) -> list[dict]:
    conn: asyncpg.Connection = await asyncpg.connect(DB_DSN)
    try:
        rows = await conn.fetch(
            _TRANSACTION_QUERY,
            brand_id,
            since,
            until,
            city_filter,
            sku_filter,
        )
        return [dict(r) for r in rows]
    finally:
        await conn.close()


# ─── Data Aggregation ─────────────────────────────────────────────────────────

def aggregate_transactions(rows: list[dict]) -> dict:
    """Compress raw rows into a compact analytics payload for the LLM."""
    if not rows:
        return {}

    city_volumes: dict[str, int] = {}
    sku_units:    dict[str, int] = {}
    sku_revenue:  dict[str, float] = {}
    category_map: dict[str, int] = {}
    payment_split: dict[str, int] = {}
    total_revenue = 0.0

    for row in rows:
        city = row.get("city", "Unknown")
        city_volumes[city] = city_volumes.get(city, 0) + 1

        pm = row.get("payment_method", "cash")
        payment_split[pm] = payment_split.get(pm, 0) + 1

        total_revenue += float(row.get("total_amount", 0))

        items = row.get("items") or []
        if isinstance(items, str):
            items = json.loads(items)

        for item in items:
            name = item.get("product_name", "Unknown")
            qty  = int(item.get("quantity", 0))
            rev  = float(item.get("unit_price", 0)) * qty
            cat  = item.get("category", "Other")

            sku_units[name]   = sku_units.get(name, 0)   + qty
            sku_revenue[name] = sku_revenue.get(name, 0) + rev
            category_map[cat] = category_map.get(cat, 0) + qty

    top_skus = sorted(sku_units.items(), key=lambda x: x[1], reverse=True)[:10]
    top_cities = sorted(city_volumes.items(), key=lambda x: x[1], reverse=True)[:8]

    return {
        "total_transactions": len(rows),
        "total_revenue_pkr":  round(total_revenue, 2),
        "top_cities":         dict(top_cities),
        "top_skus_by_units":  dict(top_skus),
        "category_breakdown": category_map,
        "payment_split":      payment_split,
        "date_range": {
            "start": rows[-1]["recorded_at"].isoformat() if rows else None,
            "end":   rows[0]["recorded_at"].isoformat()  if rows else None,
        },
    }


# ─── LangChain LCEL Chain ────────────────────────────────────────────────────

SYSTEM_PROMPT = textwrap.dedent("""
    You are RetailPulse AI's elite market intelligence engine, specializing in
    Pakistan's FMCG retail sector and Kiryana store ecosystems.

    Your task is to transform raw transaction analytics into premium, actionable
    market intelligence cards for brand managers.

    Output ONLY a valid JSON array of {card_limit} insight card objects.
    Each object MUST conform exactly to this schema:
    {{
      "title": "<10-word headline>",
      "body": "<2-4 sentence analysis>",
      "card_type": "trend" | "alert" | "opportunity" | "forecast",
      "metric": "<key metric, e.g. '+34% WoW'> or null",
      "city": "<city name> or null",
      "sku": "<product name> or null",
      "confidence": <float 0.0-1.0>
    }}

    Guidelines:
    - Use Pakistan-specific context (Lahore, Karachi, Rawalpindi, etc.)
    - Reference specific SKUs, cities, and categories from the data
    - Be precise with numbers; extrapolate trends confidently
    - Include at least 1 "opportunity" card and 1 "forecast" card
    - Do NOT wrap in markdown code blocks — raw JSON array only
""").strip()

USER_PROMPT = textwrap.dedent("""
    Brand ID: {brand_id}
    Analysis Period: {period}
    Analytics Payload:
    {analytics_json}

    Generate exactly {card_limit} market intelligence cards.
""").strip()


def build_insights_chain() -> RunnableSerializable:
    llm = ChatGoogleGenerativeAI(
        model="gemini-1.5-pro",
        google_api_key=GEMINI_API_KEY,
        temperature=0.4,
        max_output_tokens=4096,
    )

    prompt = ChatPromptTemplate.from_messages([
        ("system", SYSTEM_PROMPT),
        ("human",  USER_PROMPT),
    ])

    chain: RunnableSerializable = (
        RunnablePassthrough()
        | prompt
        | llm
        | StrOutputParser()
    )
    return chain


# ─── Streaming Helper ────────────────────────────────────────────────────────

async def stream_insights(chain, payload: dict) -> AsyncIterator[str]:
    async for chunk in chain.astream(payload):
        yield chunk


# ─── Endpoint ────────────────────────────────────────────────────────────────

@router.post(
    "/generate",
    response_model=InsightResponse,
    summary="Generate AI market intelligence cards for a brand",
    responses={
        200: {"description": "Insight cards generated successfully"},
        401: {"description": "Invalid or missing Bearer token"},
        403: {"description": "Brand ID mismatch — access denied"},
        422: {"description": "Validation error"},
        503: {"description": "Upstream AI model unavailable"},
    },
)
async def generate_insights(
    body: InsightRequest,
    authenticated_brand_id: str = Depends(verify_brand_token),
) -> InsightResponse:
    # ── Authorization guard: JWT brand must match request brand ───────────────
    if authenticated_brand_id != body.brand_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Brand ID in request does not match authenticated identity.",
        )

    # ── Time window ───────────────────────────────────────────────────────────
    now   = datetime.now(timezone.utc)
    since = now - timedelta(days=LOOKBACK_DAYS)

    # ── Fetch transaction data (RLS double-enforced at DB level) ──────────────
    rows = await fetch_brand_transactions(
        brand_id    = body.brand_id,
        since       = since,
        until       = now,
        city_filter = body.city_filter,
        sku_filter  = body.sku_filter,
    )

    if not rows:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="No transaction data found for this brand in the selected period.",
        )

    # ── Aggregate ─────────────────────────────────────────────────────────────
    analytics = aggregate_transactions(rows)

    # ── Build LLM payload ─────────────────────────────────────────────────────
    llm_payload = {
        "brand_id":      body.brand_id,
        "period":        f"{since.date()} to {now.date()} ({LOOKBACK_DAYS} days)",
        "analytics_json": json.dumps(analytics, indent=2, ensure_ascii=False),
        "card_limit":    body.card_limit,
    }

    # ── Invoke LCEL chain ────────────────────────────────────────────────────
    chain = build_insights_chain()
    try:
        raw_output: str = await chain.ainvoke(llm_payload)
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=f"AI model error: {exc}",
        ) from exc

    # ── Parse and validate output ─────────────────────────────────────────────
    try:
        raw_cards: list[dict] = json.loads(raw_output.strip())
        cards = [
            InsightCard(
                **card,
                generated_at=datetime.now(timezone.utc),
            )
            for card in raw_cards[: body.card_limit]
        ]
    except (json.JSONDecodeError, ValueError) as exc:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=f"Failed to parse AI response: {exc}. Raw: {raw_output[:200]}",
        ) from exc

    return InsightResponse(
        brand_id=body.brand_id,
        period_start=since,
        period_end=now,
        cards=cards,
        total_transactions_analyzed=len(rows),
    )


# ─── Streaming variant ───────────────────────────────────────────────────────

@router.post(
    "/generate/stream",
    summary="Stream AI market insights (SSE)",
    response_class=StreamingResponse,
)
async def generate_insights_stream(
    body: InsightRequest,
    authenticated_brand_id: str = Depends(verify_brand_token),
) -> StreamingResponse:
    """Server-sent events stream for real-time token delivery to frontend."""
    if authenticated_brand_id != body.brand_id:
        raise HTTPException(status_code=403, detail="Brand ID mismatch.")

    now   = datetime.now(timezone.utc)
    since = now - timedelta(days=LOOKBACK_DAYS)
    rows  = await fetch_brand_transactions(
        body.brand_id, since, now, body.city_filter, body.sku_filter
    )
    analytics = aggregate_transactions(rows)
    payload = {
        "brand_id":       body.brand_id,
        "period":         f"{since.date()} to {now.date()}",
        "analytics_json": json.dumps(analytics, indent=2, ensure_ascii=False),
        "card_limit":     body.card_limit,
    }

    chain = build_insights_chain()

    async def event_generator():
        async for token in stream_insights(chain, payload):
            yield f"data: {token}\n\n"
        yield "data: [DONE]\n\n"

    return StreamingResponse(
        event_generator(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "X-Accel-Buffering": "no",
        },
    )
