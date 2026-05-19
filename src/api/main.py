"""
RetailPulse AI — FastAPI Application Entrypoint
"""
from __future__ import annotations

from contextlib import asynccontextmanager
from typing import AsyncIterator

import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware

from insights.router import router as insights_router


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncIterator[None]:
    print("🚀 RetailPulse AI Insights Service started")
    yield
    print("🛑 RetailPulse AI Insights Service stopped")


app = FastAPI(
    title="RetailPulse AI — Insights Engine",
    description=(
        "LangChain + Gemini powered market intelligence API "
        "for Pakistan's FMCG brands."
    ),
    version="1.0.0",
    lifespan=lifespan,
    docs_url="/api/docs",
    redoc_url="/api/redoc",
)

# ── Middleware ─────────────────────────────────────────────────────────────────
app.add_middleware(GZipMiddleware, minimum_size=1024)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://retailpulse.ai", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Routers ───────────────────────────────────────────────────────────────────
app.include_router(insights_router)


@app.get("/health", tags=["Health"])
async def health() -> dict:
    return {"status": "ok", "service": "retailpulse-insights"}


if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info",
    )
