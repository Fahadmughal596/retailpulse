"use client";
import Link from "next/link";
import { Zap, Home, QrCode, BarChart2, TrendingUp, User, ShoppingBag, Bell, Wifi, WifiOff, Star, Gift, ChevronRight, Package, ArrowLeft } from "lucide-react";
import { useState } from "react";

const SCREENS = ["home", "scan", "reports", "profile"] as const;
type Screen = typeof SCREENS[number];

function MobileStatusBar() {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 20px 8px", background: "transparent" }}>
      <span style={{ color: "#F8FAFC", fontSize: 13, fontWeight: 600 }}>9:41</span>
      <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
        <Wifi size={14} style={{ color: "#F8FAFC" }} />
        <div style={{ display: "flex", gap: 2 }}>
          {[3, 4, 5].map(h => (
            <div key={h} style={{ width: 3, height: h, background: "#F8FAFC", borderRadius: 1 }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function HomeScreen() {
  return (
    <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div style={{ padding: "16px 20px 12px", background: "linear-gradient(180deg, rgba(0,212,255,0.08) 0%, transparent 100%)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div>
            <div style={{ color: "#94A3B8", fontSize: 12 }}>Assalam o Alaikum 👋</div>
            <div style={{ color: "#F8FAFC", fontSize: 18, fontWeight: 700 }}>Khan General Store</div>
          </div>
          <div style={{ position: "relative" }}>
            <div style={{ width: 38, height: 38, borderRadius: "50%", background: "linear-gradient(135deg, #00D4FF, #8B5CF6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "white", fontWeight: 700, fontSize: 14 }}>KG</span>
            </div>
            <div style={{ position: "absolute", top: -1, right: -1, width: 10, height: 10, borderRadius: "50%", background: "#22C55E", border: "2px solid #0a0a0f" }} />
          </div>
        </div>

        {/* Streak Banner */}
        <div style={{
          padding: "14px 16px", borderRadius: 16,
          background: "linear-gradient(135deg, rgba(245,158,11,0.15), rgba(239,68,68,0.1))",
          border: "1px solid rgba(245,158,11,0.25)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 28 }}>🔥</span>
            <div>
              <div style={{ color: "#F59E0B", fontWeight: 700, fontSize: 15 }}>28-Day Streak!</div>
              <div style={{ color: "#94A3B8", fontSize: 11 }}>2 more days to earn Gift Hamper</div>
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ color: "#F8FAFC", fontWeight: 700, fontSize: 18 }}>487</div>
            <div style={{ color: "#475569", fontSize: 10 }}>txns today</div>
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div style={{ padding: "0 16px 12px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {[
          { label: "Today's Sales", value: "₨ 12,480", color: "#22C55E", icon: "💰" },
          { label: "Items Scanned", value: "87 SKUs", color: "#00D4FF", icon: "📦" },
          { label: "Customers", value: "43 Today", color: "#8B5CF6", icon: "👥" },
          { label: "Reward Points", value: "9,840 pts", color: "#F59E0B", icon: "⭐" },
        ].map(k => (
          <div key={k.label} style={{
            padding: "14px", borderRadius: 14,
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}>
            <div style={{ fontSize: 20, marginBottom: 6 }}>{k.icon}</div>
            <div style={{ color: k.color, fontWeight: 700, fontSize: 17 }}>{k.value}</div>
            <div style={{ color: "#475569", fontSize: 11 }}>{k.label}</div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div style={{ padding: "0 16px 12px" }}>
        <div style={{ color: "#475569", fontSize: 11, fontWeight: 600, marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.5px" }}>Quick Actions</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
          {[
            { label: "Scan Item", icon: "📷", color: "#00D4FF" },
            { label: "Add Stock", icon: "📦", color: "#22C55E" },
            { label: "View Report", icon: "📊", color: "#8B5CF6" },
          ].map(a => (
            <div key={a.label} style={{
              padding: "14px 8px", borderRadius: 14, textAlign: "center", cursor: "pointer",
              background: `${a.color}10`, border: `1px solid ${a.color}25`,
            }}>
              <div style={{ fontSize: 22, marginBottom: 6 }}>{a.icon}</div>
              <div style={{ color: a.color, fontSize: 11, fontWeight: 600 }}>{a.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Transactions */}
      <div style={{ padding: "0 16px", flex: 1, overflow: "hidden" }}>
        <div style={{ color: "#475569", fontSize: 11, fontWeight: 600, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.5px" }}>Recent</div>
        {[
          { name: "Sooper Biscuits", qty: "x3", amount: "₨ 105", time: "2m ago" },
          { name: "Milk Pak 1L", qty: "x1", amount: "₨ 140", time: "8m ago" },
          { name: "Lays Classic", qty: "x4", amount: "₨ 160", time: "15m ago" },
        ].map((txn, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "10px 12px", borderRadius: 12, marginBottom: 6,
            background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: 10, background: "rgba(0,212,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Package size={14} style={{ color: "#00D4FF" }} />
              </div>
              <div>
                <div style={{ color: "#F8FAFC", fontSize: 13, fontWeight: 500 }}>{txn.name}</div>
                <div style={{ color: "#475569", fontSize: 11 }}>{txn.qty} · {txn.time}</div>
              </div>
            </div>
            <div style={{ color: "#22C55E", fontWeight: 700, fontSize: 14 }}>{txn.amount}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ScanScreen() {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "16px 20px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ color: "#F8FAFC", fontSize: 16, fontWeight: 700 }}>Scan Product</div>
      </div>

      {/* Scanner */}
      <div style={{ padding: "0 20px", flex: 1, display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{
          position: "relative", borderRadius: 20, overflow: "hidden",
          background: "#050608", height: 260,
          border: "1px solid rgba(0,212,255,0.2)",
        }}>
          {/* Corner guides */}
          {[
            { top: 20, left: 20, borderTop: "3px solid #00D4FF", borderLeft: "3px solid #00D4FF" },
            { top: 20, right: 20, borderTop: "3px solid #00D4FF", borderRight: "3px solid #00D4FF" },
            { bottom: 20, left: 20, borderBottom: "3px solid #00D4FF", borderLeft: "3px solid #00D4FF" },
            { bottom: 20, right: 20, borderBottom: "3px solid #00D4FF", borderRight: "3px solid #00D4FF" },
          ].map((style, i) => (
            <div key={i} style={{ position: "absolute", width: 30, height: 30, borderRadius: 4, ...style }} />
          ))}

          {/* Scan line */}
          <div className="scan-line" />

          {/* Center overlay */}
          <div style={{
            position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
            flexDirection: "column", gap: 8,
          }}>
            <div style={{ width: 140, height: 60, borderRadius: 8, background: "rgba(0,212,255,0.05)", border: "1px dashed rgba(0,212,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ color: "#00D4FF", fontSize: 10, opacity: 0.7 }}>Place barcode here</div>
            </div>
          </div>

          <div style={{ position: "absolute", bottom: 12, left: 0, right: 0, textAlign: "center" }}>
            <span style={{ color: "#00D4FF", fontSize: 11, background: "rgba(0,0,0,0.6)", padding: "4px 12px", borderRadius: 20, backdropFilter: "blur(10px)" }}>
              📸 Camera Active · Scanning...
            </span>
          </div>
        </div>

        {/* Modes */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
          {[
            { label: "Barcode", icon: "▦", active: true },
            { label: "OCR Receipt", icon: "📄", active: false },
            { label: "Manual", icon: "✏️", active: false },
          ].map(m => (
            <div key={m.label} style={{
              padding: "12px 8px", borderRadius: 14, textAlign: "center", cursor: "pointer",
              background: m.active ? "rgba(0,212,255,0.12)" : "rgba(255,255,255,0.04)",
              border: `1px solid ${m.active ? "rgba(0,212,255,0.3)" : "rgba(255,255,255,0.07)"}`,
            }}>
              <div style={{ fontSize: 20, marginBottom: 4 }}>{m.icon}</div>
              <div style={{ color: m.active ? "#00D4FF" : "#475569", fontSize: 11, fontWeight: 600 }}>{m.label}</div>
            </div>
          ))}
        </div>

        {/* Last scanned */}
        <div style={{ padding: "14px 16px", borderRadius: 16, background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)" }}>
          <div style={{ color: "#22C55E", fontSize: 11, fontWeight: 600, marginBottom: 6 }}>✓ LAST SCANNED</div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ color: "#F8FAFC", fontSize: 14, fontWeight: 600 }}>Sooper Biscuits 150g</div>
              <div style={{ color: "#475569", fontSize: 11 }}>SKU: sku_001 · Peek Freans</div>
            </div>
            <div style={{ color: "#22C55E", fontWeight: 700 }}>₨ 35</div>
          </div>
        </div>

        {/* Offline indicator */}
        <div style={{ padding: "10px 14px", borderRadius: 12, background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)", display: "flex", alignItems: "center", gap: 8 }}>
          <WifiOff size={14} style={{ color: "#F59E0B" }} />
          <span style={{ color: "#F59E0B", fontSize: 12 }}>Offline mode — 12 transactions queued for sync</span>
        </div>
      </div>
    </div>
  );
}

function ProfileScreen() {
  return (
    <div style={{ flex: 1, overflow: "auto" }}>
      <div style={{ padding: "16px 20px 0" }}>
        {/* Profile card */}
        <div style={{
          padding: "20px", borderRadius: 20, marginBottom: 16,
          background: "linear-gradient(135deg, rgba(0,212,255,0.08), rgba(139,92,246,0.08))",
          border: "1px solid rgba(0,212,255,0.15)", textAlign: "center",
        }}>
          <div style={{ width: 60, height: 60, borderRadius: "50%", background: "linear-gradient(135deg, #00D4FF, #8B5CF6)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px", fontSize: 22, fontWeight: 800, color: "white" }}>K</div>
          <div style={{ color: "#F8FAFC", fontSize: 17, fontWeight: 700 }}>Khan General Store</div>
          <div style={{ color: "#475569", fontSize: 12 }}>Gulshan-e-Iqbal, Karachi</div>
          <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 16 }}>
            {[{ label: "Rank", value: "#1", color: "#F59E0B" }, { label: "Streak", value: "28d 🔥", color: "#EF4444" }, { label: "Txns", value: "487", color: "#22C55E" }].map(s => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <div style={{ color: s.color, fontWeight: 700, fontSize: 16 }}>{s.value}</div>
                <div style={{ color: "#334155", fontSize: 10 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Rewards */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ color: "#475569", fontSize: 11, fontWeight: 600, marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.5px" }}>Rewards Progress</div>
          <div style={{ padding: "16px", borderRadius: 16, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ color: "#F8FAFC", fontSize: 13 }}>🎁 Gift Hamper (₨ 5,000)</span>
              <span style={{ color: "#F59E0B", fontSize: 13, fontWeight: 600 }}>93%</span>
            </div>
            <div style={{ height: 8, background: "rgba(255,255,255,0.08)", borderRadius: 4 }}>
              <div style={{ height: "100%", width: "93%", background: "linear-gradient(90deg, #F59E0B, #EF4444)", borderRadius: 4 }} />
            </div>
            <div style={{ color: "#475569", fontSize: 11, marginTop: 6 }}>2 more days of 50+ transactions to unlock</div>
          </div>
        </div>

        {[
          { label: "Language / زبان", value: "English" },
          { label: "Notifications", value: "Enabled" },
          { label: "Sync Status", value: "12 pending" },
          { label: "App Version", value: "v2.4.1" },
        ].map(item => (
          <div key={item.label} style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "14px 16px", borderRadius: 12, marginBottom: 6,
            background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)", cursor: "pointer",
          }}>
            <span style={{ color: "#94A3B8", fontSize: 13 }}>{item.label}</span>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ color: "#475569", fontSize: 13 }}>{item.value}</span>
              <ChevronRight size={14} style={{ color: "#334155" }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function MobilePage() {
  const [activeScreen, setActiveScreen] = useState<Screen>("home");

  const NAV_ITEMS = [
    { id: "home" as Screen, icon: <Home size={20} />, label: "Home" },
    { id: "scan" as Screen, icon: <QrCode size={20} />, label: "Scan" },
    { id: "reports" as Screen, icon: <BarChart2 size={20} />, label: "Reports" },
    { id: "profile" as Screen, icon: <User size={20} />, label: "Profile" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#0F1117", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 20px", fontFamily: "'Inter', sans-serif" }}>
      <div className="bg-mesh" />

      {/* Back */}
      <div style={{ position: "fixed", top: 24, left: 24, zIndex: 100 }}>
        <Link href="/" style={{ textDecoration: "none" }}>
          <button style={{
            display: "flex", alignItems: "center", gap: 8,
            padding: "8px 16px", borderRadius: 10, cursor: "pointer",
            background: "rgba(255,255,255,0.06)", color: "#94A3B8",
            border: "1px solid rgba(255,255,255,0.1)", fontSize: 13,
          }}>
            <ArrowLeft size={14} /> Back to Platform
          </button>
        </Link>
      </div>

      <div style={{ textAlign: "center", marginBottom: 40, position: "relative", zIndex: 1 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", borderRadius: 20, background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.2)", marginBottom: 16 }}>
          <Zap size={13} style={{ color: "#00D4FF" }} />
          <span style={{ color: "#00D4FF", fontSize: 12, fontWeight: 600 }}>RetailPulse Mobile POS · Kiryana Store App</span>
        </div>
        <h1 style={{ fontSize: 36, fontWeight: 800, color: "#F8FAFC", letterSpacing: "-1px", marginBottom: 12 }}>
          Free POS for Kiryana Stores
        </h1>
        <p style={{ color: "#64748B", fontSize: 15, maxWidth: 480 }}>
          Offline-first barcode scanning, gamified incentives, and automatic data sync.
          Available in English + Urdu.
        </p>
      </div>

      <div style={{ display: "flex", gap: 48, alignItems: "flex-start", justifyContent: "center", position: "relative", zIndex: 1, flexWrap: "wrap" }}>
        {/* Mobile Frame */}
        <div className="mobile-frame" style={{ flexShrink: 0 }}>
          <MobileStatusBar />

          {/* Screen Content */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", height: "calc(100% - 40px - 70px)", overflow: "hidden" }}>
            {activeScreen === "home" && <HomeScreen />}
            {activeScreen === "scan" && <ScanScreen />}
            {activeScreen === "reports" && (
              <div style={{ flex: 1, padding: "20px", display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ color: "#F8FAFC", fontSize: 16, fontWeight: 700, marginBottom: 4 }}>Reports</div>
                {[
                  { label: "Weekly Sales Report", sub: "May 12–18 · ₨ 84,200", color: "#00D4FF" },
                  { label: "Top Selling SKUs", sub: "Sooper leads with 142 units", color: "#22C55E" },
                  { label: "Customer Trends", sub: "Peak hours: 5–7 PM", color: "#8B5CF6" },
                  { label: "Stock Alerts", sub: "3 items running low", color: "#EF4444" },
                ].map(r => (
                  <div key={r.label} style={{ padding: "16px", borderRadius: 14, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ color: "#F8FAFC", fontSize: 13, fontWeight: 600 }}>{r.label}</div>
                      <div style={{ color: "#475569", fontSize: 11, marginTop: 3 }}>{r.sub}</div>
                    </div>
                    <ChevronRight size={16} style={{ color: r.color }} />
                  </div>
                ))}
              </div>
            )}
            {activeScreen === "profile" && <ProfileScreen />}
          </div>

          {/* Bottom Nav */}
          <div style={{
            height: 70, display: "flex", alignItems: "center", justifyContent: "space-around",
            background: "rgba(10,10,15,0.95)",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(20px)",
            position: "absolute", bottom: 0, left: 0, right: 0,
          }}>
            {NAV_ITEMS.map((item) => {
              const isActive = activeScreen === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveScreen(item.id)}
                  style={{
                    display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
                    background: "none", border: "none", cursor: "pointer",
                    color: isActive ? "#00D4FF" : "#334155",
                    transition: "color 0.2s",
                    padding: "8px 16px",
                    position: "relative",
                  }}
                >
                  {item.id === "scan" ? (
                    <div style={{
                      width: 52, height: 52, borderRadius: 16,
                      background: "linear-gradient(135deg, #00D4FF, #8B5CF6)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      boxShadow: "0 4px 20px rgba(0,212,255,0.4)",
                      marginTop: -24,
                    }}>
                      {item.icon}
                    </div>
                  ) : item.icon}
                  <span style={{ fontSize: 10, fontWeight: 600 }}>{item.label}</span>
                  {isActive && item.id !== "scan" && (
                    <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#00D4FF", position: "absolute", bottom: 6 }} />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Features Panel */}
        <div style={{ maxWidth: 340 }}>
          <h2 style={{ color: "#F8FAFC", fontSize: 22, fontWeight: 700, marginBottom: 24 }}>App Features</h2>
          {[
            { icon: "📷", title: "Barcode & OCR Scanning", desc: "Scan any product barcode instantly. OCR receipt scanning for bulk entry." },
            { icon: "🔌", title: "Offline-First Architecture", desc: "Works without internet. Transactions queue locally and auto-sync when back online." },
            { icon: "🔥", title: "Gamified Incentives", desc: "Daily streak tracking, transaction milestones, and gift hamper rewards for active stores." },
            { icon: "📊", title: "Store Analytics", desc: "Daily/weekly sales reports, top products, peak hours, and inventory alerts." },
            { icon: "🌐", title: "Urdu + English", desc: "Full bilingual support for Pakistan's diverse store owner demographic." },
          ].map(f => (
            <div key={f.title} style={{ display: "flex", gap: 14, marginBottom: 20 }}>
              <div style={{ fontSize: 24, flexShrink: 0, marginTop: 2 }}>{f.icon}</div>
              <div>
                <div style={{ color: "#F8FAFC", fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{f.title}</div>
                <div style={{ color: "#475569", fontSize: 13, lineHeight: 1.6 }}>{f.desc}</div>
              </div>
            </div>
          ))}

          <Link href="/dashboard" style={{ textDecoration: "none", display: "block", marginTop: 32 }}>
            <button style={{
              width: "100%", padding: "14px", borderRadius: 14, fontSize: 15, fontWeight: 700, cursor: "pointer",
              background: "linear-gradient(135deg, #00D4FF, #8B5CF6)", color: "white", border: "none",
              boxShadow: "0 6px 30px rgba(0,212,255,0.3)",
            }}>
              View Enterprise Dashboard →
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
