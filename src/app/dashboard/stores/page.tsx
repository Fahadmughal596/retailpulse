"use client";
import Topbar from "@/components/Topbar";
import { STORE_LEADERBOARD, CITY_PERFORMANCE } from "@/lib/mockData";
import { Store, Award, Flame, Star, TrendingUp, MapPin } from "lucide-react";

export default function StoresPage() {
  return (
    <div>
      <Topbar title="Kiryana Store Network" subtitle="Active stores, gamification metrics, and performance tracking" />

      <div style={{ padding: "28px 32px", display: "flex", flexDirection: "column", gap: 24 }}>

        {/* Network Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {[
            { label: "Total Stores Onboarded", value: "3,847", color: "#00D4FF", icon: <Store size={18} /> },
            { label: "Active (30d streak+)", value: "1,240", color: "#22C55E", icon: <Flame size={18} /> },
            { label: "Top Ranked Stores", value: "287", color: "#F59E0B", icon: <Award size={18} /> },
            { label: "Network Growth (MoM)", value: "+8.2%", color: "#8B5CF6", icon: <TrendingUp size={18} /> },
          ].map(s => (
            <div key={s.label} className="kpi-card" style={{ padding: "18px 20px" }}>
              <div className="flex items-center gap-3 mb-3">
                <div style={{ width: 36, height: 36, background: `${s.color}15`, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", color: s.color }}>
                  {s.icon}
                </div>
                <span style={{ color: "#475569", fontSize: 12 }}>{s.label}</span>
              </div>
              <div style={{ color: s.color, fontSize: 26, fontWeight: 700 }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Incentive/Gamification Banner */}
        <div
          className="rounded-2xl px-8 py-6 flex items-center justify-between"
          style={{
            background: "linear-gradient(135deg, rgba(0,212,255,0.08), rgba(139,92,246,0.08))",
            border: "1px solid rgba(0,212,255,0.15)",
          }}
        >
          <div>
            <div style={{ color: "#00D4FF", fontWeight: 700, fontSize: 18, marginBottom: 6 }}>
              🎁 Incentive Program — Active
            </div>
            <div style={{ color: "#94A3B8", fontSize: 14 }}>
              Stores completing <strong style={{ color: "#F8FAFC" }}>50+ transactions</strong> for{" "}
              <strong style={{ color: "#F8FAFC" }}>30 consecutive days</strong> earn Gift Hampers worth ₨ 5,000+
            </div>
          </div>
          <div style={{ display: "flex", gap: 24, flexShrink: 0 }}>
            {[
              { label: "Stores Eligible", value: "287", color: "#22C55E" },
              { label: "Hampers Issued", value: "142", color: "#F59E0B" },
              { label: "Avg Daily Txns", value: "84", color: "#00D4FF" },
            ].map(s => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <div style={{ color: s.color, fontWeight: 700, fontSize: 22 }}>{s.value}</div>
                <div style={{ color: "#475569", fontSize: 11 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 24 }}>

          {/* Full Leaderboard */}
          <div className="chart-container flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div style={{ width: 38, height: 38, background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.15)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Award size={17} style={{ color: "#F59E0B" }} />
              </div>
              <div>
                <h3 style={{ color: "#F8FAFC", fontWeight: 600, fontSize: 15 }}>Top Performing Stores</h3>
                <p style={{ color: "#475569", fontSize: 12 }}>Ranked by transaction score</p>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {STORE_LEADERBOARD.map((store) => (
                <div
                  key={store.rank}
                  className="flex items-center gap-4 px-4 py-4 rounded-2xl transition-all cursor-pointer"
                  style={{
                    background: store.rank === 1 ? "linear-gradient(135deg, rgba(245,158,11,0.08), rgba(239,68,68,0.05))" : "rgba(255,255,255,0.02)",
                    border: `1px solid ${store.rank === 1 ? "rgba(245,158,11,0.2)" : "rgba(255,255,255,0.05)"}`,
                  }}
                >
                  {/* Rank */}
                  <div style={{
                    width: 36, height: 36, borderRadius: "50%", flexShrink: 0,
                    background: store.rank === 1 ? "linear-gradient(135deg, #F59E0B, #EF4444)" : store.rank === 2 ? "linear-gradient(135deg, #94A3B8, #64748B)" : store.rank === 3 ? "linear-gradient(135deg, #CD7F32, #92400E)" : "rgba(255,255,255,0.08)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "white", fontWeight: 700, fontSize: 14,
                  }}>
                    {store.rank}
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ color: "#F8FAFC", fontWeight: 600, fontSize: 14 }}>{store.name}</div>
                    <div style={{ color: "#475569", fontSize: 12, display: "flex", alignItems: "center", gap: 4 }}>
                      <MapPin size={10} />{store.area}
                    </div>
                  </div>

                  {/* Streak */}
                  <div style={{ textAlign: "center", flexShrink: 0 }}>
                    <div style={{ color: "#F59E0B", fontWeight: 700, fontSize: 16, display: "flex", alignItems: "center", gap: 4 }}>
                      🔥 {store.streak}d
                    </div>
                    <div style={{ color: "#334155", fontSize: 10 }}>streak</div>
                  </div>

                  {/* Transactions */}
                  <div style={{ textAlign: "center", flexShrink: 0 }}>
                    <div style={{ color: "#22C55E", fontWeight: 700, fontSize: 16 }}>{store.txns}</div>
                    <div style={{ color: "#334155", fontSize: 10 }}>transactions</div>
                  </div>

                  {/* Badge */}
                  <div style={{ fontSize: 18, flexShrink: 0 }}>{store.badge.split(" ")[0]}</div>
                </div>
              ))}
            </div>
          </div>

          {/* City Distribution */}
          <div className="chart-container flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div style={{ width: 38, height: 38, background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.15)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <MapPin size={17} style={{ color: "#00D4FF" }} />
              </div>
              <div>
                <h3 style={{ color: "#F8FAFC", fontWeight: 600, fontSize: 15 }}>Network by City</h3>
                <p style={{ color: "#475569", fontSize: 12 }}>Store coverage & activity</p>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {CITY_PERFORMANCE.map((city) => (
                <div key={city.city}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ color: "#F8FAFC", fontSize: 13, fontWeight: 500 }}>{city.city}</span>
                    <div style={{ display: "flex", gap: 12 }}>
                      <span style={{ color: "#00D4FF", fontSize: 12, fontWeight: 600 }}>{city.stores} stores</span>
                      <span style={{ color: "#94A3B8", fontSize: 12 }}>{city.coverage}% covered</span>
                    </div>
                  </div>
                  <div style={{ height: 6, background: "rgba(255,255,255,0.06)", borderRadius: 3 }}>
                    <div style={{
                      height: "100%",
                      width: `${city.coverage}%`,
                      background: city.coverage >= 70 ? "linear-gradient(90deg, #22C55E, #00D4FF)" : city.coverage >= 50 ? "linear-gradient(90deg, #F59E0B, #22C55E)" : "linear-gradient(90deg, #EF4444, #F59E0B)",
                      borderRadius: 3,
                    }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Gamification Tiers */}
            <div style={{ marginTop: 16 }}>
              <div style={{ color: "#475569", fontSize: 12, fontWeight: 600, marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                REWARD TIERS
              </div>
              {[
                { tier: "Elite 🏆", req: "100+ txns/day, 30d streak", stores: 47, color: "#F59E0B" },
                { tier: "Pro ⭐", req: "50+ txns/day, 15d streak", stores: 240, color: "#8B5CF6" },
                { tier: "Active 🔥", req: "20+ txns/day, 7d streak", stores: 953, color: "#22C55E" },
                { tier: "Starter 🌱", req: "1+ txns/day", stores: 2607, color: "#64748B" },
              ].map(t => (
                <div key={t.tier} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                  <div style={{ width: 70, color: t.color, fontSize: 12, fontWeight: 600 }}>{t.tier}</div>
                  <div style={{ flex: 1, fontSize: 11, color: "#475569" }}>{t.req}</div>
                  <div style={{ color: t.color, fontWeight: 700, fontSize: 13, flexShrink: 0 }}>{t.stores} stores</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
