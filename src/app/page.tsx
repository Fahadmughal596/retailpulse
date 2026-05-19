"use client";
import Link from "next/link";
import { Zap, ArrowRight, Play, ShieldCheck, BarChart2, Map, Brain, Smartphone, Store, TrendingUp, Globe, Lock } from "lucide-react";
import { useState, useEffect } from "react";

const STATS = [
  { value: "3,847+", label: "Active Kiryana Stores" },
  { value: "48K", label: "Daily Transactions" },
  { value: "8 Cities", label: "Pakistan Coverage" },
  { value: "94.2%", label: "AI Forecast Accuracy" },
];

const FEATURES = [
  {
    icon: <Map size={22} />,
    title: "Geographic Heat Maps",
    desc: "Real-time consumption density across Pakistan's neighborhoods. Drill down from province to street level.",
    color: "#00D4FF",
  },
  {
    icon: <Brain size={22} />,
    title: "AI Insights Engine",
    desc: "Gemini-powered natural language analysis. 'Biscuit demand in Rawalpindi surged 34% this week.'",
    color: "#8B5CF6",
  },
  {
    icon: <BarChart2 size={22} />,
    title: "Demand Forecasting",
    desc: "Predict supply chain demand 4 weeks ahead with 94% accuracy from real consumer purchase data.",
    color: "#22C55E",
  },
  {
    icon: <Smartphone size={22} />,
    title: "Mobile POS App",
    desc: "Free offline-first app for Kiryana stores. Barcode scanning, OCR receipts, gamified incentives.",
    color: "#F59E0B",
  },
  {
    icon: <Lock size={22} />,
    title: "Data Isolation (RLS)",
    desc: "Absolute brand data isolation. Brand A never sees Brand B's SKU performance. Enterprise-grade security.",
    color: "#EF4444",
  },
  {
    icon: <Globe size={22} />,
    title: "Multilingual Support",
    desc: "Full English + Urdu interface. Designed for Pakistan's diverse retail ecosystem from day one.",
    color: "#00D4FF",
  },
];

const TICKER_ITEMS = [
  "🔥 Biscuit demand in Satellite Town, RWP +34% WoW",
  "📈 3,847 Kiryana stores active across Pakistan",
  "💡 New market opportunity detected in Korangi, Karachi",
  "🎯 AI Forecast accuracy: 94.2%",
  "⚡ 48,291 transactions processed today",
  "🌍 Expanding to Faisalabad and Peshawar this quarter",
];

export default function LandingPage() {
  const [tickerIdx, setTickerIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTickerIdx(i => (i + 1) % TICKER_ITEMS.length), 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#0F1117", fontFamily: "'Inter', sans-serif" }}>
      <div className="bg-mesh" />

      {/* Nav */}
      <nav
        style={{
          position: "sticky", top: 0, zIndex: 50,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 48px", height: 68,
          background: "rgba(15,17,23,0.9)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 34, height: 34, borderRadius: 10,
            background: "linear-gradient(135deg, #00D4FF, #8B5CF6)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 0 20px rgba(0,212,255,0.4)",
          }}>
            <Zap size={16} color="white" fill="white" />
          </div>
          <span style={{ fontWeight: 800, fontSize: 17, color: "#F8FAFC", letterSpacing: "-0.3px" }}>
            RetailPulse <span style={{ background: "linear-gradient(135deg, #00D4FF, #8B5CF6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>AI</span>
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          {["Platform", "Features", "Pricing", "About"].map(item => (
            <a key={item} href="#" style={{ color: "#64748B", fontSize: 14, fontWeight: 500, textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#F8FAFC")}
              onMouseLeave={e => (e.currentTarget.style.color = "#64748B")}
            >
              {item}
            </a>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Link href="/dashboard" style={{ textDecoration: "none" }}>
            <button style={{
              padding: "9px 20px", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer",
              background: "rgba(255,255,255,0.05)", color: "#94A3B8",
              border: "1px solid rgba(255,255,255,0.08)",
            }}>
              Sign In
            </button>
          </Link>
          <Link href="/dashboard" style={{ textDecoration: "none" }}>
            <button id="cta-launch" style={{
              padding: "9px 20px", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer",
              background: "linear-gradient(135deg, #00D4FF, #8B5CF6)", color: "white",
              border: "none", boxShadow: "0 4px 20px rgba(0,212,255,0.3)",
            }}>
              Launch Dashboard →
            </button>
          </Link>
        </div>
      </nav>

      {/* Ticker */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "10px 48px",
        background: "rgba(0,212,255,0.04)",
        borderBottom: "1px solid rgba(0,212,255,0.08)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div className="live-indicator" />
          <span style={{ color: "#00D4FF", fontSize: 12, fontWeight: 700 }}>LIVE</span>
          <span style={{ color: "#94A3B8", fontSize: 13, transition: "opacity 0.3s" }}>
            {TICKER_ITEMS[tickerIdx]}
          </span>
        </div>
      </div>

      {/* Hero */}
      <section style={{ textAlign: "center", padding: "100px 48px 80px" }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          padding: "6px 16px", borderRadius: 20,
          background: "rgba(139,92,246,0.1)",
          border: "1px solid rgba(139,92,246,0.2)",
          marginBottom: 32,
        }}>
          <Zap size={13} style={{ color: "#8B5CF6" }} />
          <span style={{ color: "#8B5CF6", fontSize: 12, fontWeight: 600 }}>
            Powered by Gemini AI · 2026 Enterprise Standard
          </span>
        </div>

        <h1 style={{
          fontSize: "clamp(42px, 6vw, 72px)",
          fontWeight: 900,
          lineHeight: 1.08,
          letterSpacing: "-2px",
          color: "#F8FAFC",
          maxWidth: 880,
          margin: "0 auto 24px",
        }}>
          Real-time AI visibility into{" "}
          <span style={{ background: "linear-gradient(135deg, #00D4FF, #8B5CF6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            product consumption
          </span>{" "}
          and market demand.
        </h1>

        <p style={{
          fontSize: 19, color: "#64748B", maxWidth: 620, margin: "0 auto 48px", lineHeight: 1.7,
        }}>
          RetailPulse AI collects real-time purchase data from Pakistan's 3.8M+ Kiryana stores and transforms it
          into premium analytics that FMCG brands actually need.
        </p>

        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/dashboard" style={{ textDecoration: "none" }}>
            <button id="hero-cta" style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "16px 32px", borderRadius: 14, fontSize: 16, fontWeight: 700, cursor: "pointer",
              background: "linear-gradient(135deg, #00D4FF, #8B5CF6)", color: "white", border: "none",
              boxShadow: "0 8px 40px rgba(0,212,255,0.35)",
            }}>
              <span>Launch Platform</span>
              <ArrowRight size={18} />
            </button>
          </Link>
          <Link href="/mobile" style={{ textDecoration: "none" }}>
            <button style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "16px 32px", borderRadius: 14, fontSize: 16, fontWeight: 600, cursor: "pointer",
              background: "rgba(255,255,255,0.04)", color: "#94A3B8",
              border: "1px solid rgba(255,255,255,0.08)",
            }}>
              <Smartphone size={18} />
              <span>Mobile App Preview</span>
            </button>
          </Link>
        </div>

        {/* Stats */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
          gap: 24, maxWidth: 720, margin: "72px auto 0",
        }}>
          {STATS.map((s) => (
            <div key={s.label}>
              <div style={{ fontSize: 32, fontWeight: 800, color: "#F8FAFC", letterSpacing: "-1px", background: "linear-gradient(135deg, #00D4FF, #8B5CF6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                {s.value}
              </div>
              <div style={{ color: "#475569", fontSize: 13, marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Dashboard Preview */}
      <section style={{ padding: "0 48px 100px" }}>
        <div
          style={{
            borderRadius: 24, overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 40px 120px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)",
            position: "relative",
            maxWidth: 1100, margin: "0 auto",
          }}
        >
          <div style={{
            background: "linear-gradient(180deg, rgba(0,212,255,0.06) 0%, rgba(139,92,246,0.04) 100%)",
            padding: "48px",
            display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20,
          }}>
            {/* Mock dashboard preview */}
            {[
              { label: "Total Transactions", value: "48,291", change: "+12.4%", color: "#00D4FF" },
              { label: "Active Stores", value: "3,847", change: "+8.2%", color: "#8B5CF6" },
              { label: "Revenue Tracked", value: "₨ 12.4M", change: "+19.7%", color: "#22C55E" },
            ].map((card) => (
              <div key={card.label} className="glass-card" style={{ padding: "24px", textAlign: "left" }}>
                <div style={{ color: "#475569", fontSize: 12, marginBottom: 12 }}>{card.label}</div>
                <div style={{ color: card.color, fontSize: 30, fontWeight: 800, letterSpacing: "-1px" }}>{card.value}</div>
                <div style={{ color: "#22C55E", fontSize: 12, marginTop: 8, fontWeight: 600 }}>{card.change} this week</div>
              </div>
            ))}
          </div>

          {/* Heatmap preview strip */}
          <div style={{
            background: "rgba(15,17,23,0.95)", padding: "32px 48px",
            display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap",
          }}>
            <div style={{ color: "#F8FAFC", fontWeight: 600, fontSize: 16 }}>Pakistan Heat Map · Live</div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {[
                { city: "Karachi", val: 84, color: "#3B82F6" },
                { city: "Lahore", val: 91, color: "#00D4FF" },
                { city: "Islamabad", val: 92, color: "#00D4FF" },
                { city: "Rawalpindi", val: 78, color: "#8B5CF6" },
                { city: "Gujranwala", val: 69, color: "#F59E0B" },
              ].map(c => (
                <div key={c.city} style={{
                  padding: "8px 16px", borderRadius: 10,
                  background: `${c.color}15`, border: `1px solid ${c.color}30`,
                  display: "flex", alignItems: "center", gap: 8,
                }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: c.color }} />
                  <span style={{ color: "#F8FAFC", fontSize: 13 }}>{c.city}</span>
                  <span style={{ color: c.color, fontWeight: 700, fontSize: 14 }}>{c.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section style={{ padding: "0 48px 100px" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <h2 style={{ fontSize: 42, fontWeight: 800, color: "#F8FAFC", letterSpacing: "-1px", marginBottom: 16 }}>
            Built for FMCG enterprise
          </h2>
          <p style={{ color: "#64748B", fontSize: 18, maxWidth: 560, margin: "0 auto" }}>
            Every feature engineered for Pakistan's unique retail landscape and the brands that serve it.
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 20,
          maxWidth: 1100, margin: "0 auto",
        }}>
          {FEATURES.map((f) => (
            <div key={f.title} className="glass-card" style={{ padding: "32px 28px" }}>
              <div style={{
                width: 52, height: 52, borderRadius: 14,
                background: `${f.color}12`,
                border: `1px solid ${f.color}25`,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: f.color, marginBottom: 20,
              }}>
                {f.icon}
              </div>
              <h3 style={{ color: "#F8FAFC", fontWeight: 700, fontSize: 17, marginBottom: 10 }}>{f.title}</h3>
              <p style={{ color: "#64748B", fontSize: 14, lineHeight: 1.7 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{
        padding: "80px 48px",
        textAlign: "center",
        background: "linear-gradient(135deg, rgba(0,212,255,0.04) 0%, rgba(139,92,246,0.04) 100%)",
        borderTop: "1px solid rgba(255,255,255,0.05)",
      }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          padding: "6px 14px", borderRadius: 20,
          background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)",
          marginBottom: 24,
        }}>
          <ShieldCheck size={13} style={{ color: "#22C55E" }} />
          <span style={{ color: "#22C55E", fontSize: 12, fontWeight: 600 }}>Enterprise-ready · Data Isolated · Pakistan-focused</span>
        </div>
        <h2 style={{ fontSize: 42, fontWeight: 800, color: "#F8FAFC", letterSpacing: "-1px", marginBottom: 16 }}>
          Ready to see real consumer data?
        </h2>
        <p style={{ color: "#64748B", fontSize: 16, marginBottom: 36 }}>
          Join leading FMCG brands already using RetailPulse AI to outperform the market.
        </p>
        <Link href="/dashboard" style={{ textDecoration: "none" }}>
          <button id="bottom-cta" style={{
            padding: "16px 40px", borderRadius: 14, fontSize: 16, fontWeight: 700, cursor: "pointer",
            background: "linear-gradient(135deg, #00D4FF, #8B5CF6)", color: "white", border: "none",
            boxShadow: "0 8px 40px rgba(0,212,255,0.3)",
          }}>
            Launch RetailPulse AI →
          </button>
        </Link>
      </section>

      {/* Footer */}
      <footer style={{ padding: "24px 48px", borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ color: "#334155", fontSize: 13 }}>© 2026 RetailPulse AI. All rights reserved.</div>
        <div style={{ display: "flex", gap: 24 }}>
          {["Privacy", "Terms", "Security", "Contact"].map(item => (
            <a key={item} href="#" style={{ color: "#334155", fontSize: 13, textDecoration: "none" }}>{item}</a>
          ))}
        </div>
      </footer>
    </div>
  );
}
