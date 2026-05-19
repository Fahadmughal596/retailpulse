"use client";
import Topbar from "@/components/Topbar";
import KPICard from "@/components/KPICard";
import { TransactionTrendChart, CategoryTrendChart } from "@/components/Charts";
import HeatMapPanel from "@/components/HeatMapPanel";
import AIInsightsPanel from "@/components/AIInsightsPanel";
import LiveFeed from "@/components/LiveFeed";
import CityTable from "@/components/CityTable";
import { KPI_DATA, TOP_PRODUCTS, STORE_LEADERBOARD } from "@/lib/mockData";
import {
  ShoppingBag, Store, TrendingUp, Database,
  Award, ArrowRight, Package
} from "lucide-react";

const KPI_CONFIG = [
  { key: "totalTransactions", icon: <TrendingUp size={20} />, accent: "blue" as const },
  { key: "activeStores", icon: <Store size={20} />, accent: "purple" as const },
  { key: "revenueTracked", icon: <ShoppingBag size={20} />, accent: "green" as const },
  { key: "dataPoints", icon: <Database size={20} />, accent: "amber" as const },
];

export default function DashboardPage() {
  return (
    <div>
      <Topbar
        title="Overview Dashboard"
        subtitle="Peek Freans · Pakistan Retail Network · Real-time"
      />

      <div style={{ padding: "28px 32px", display: "flex", flexDirection: "column", gap: 28 }}>

        {/* KPI Row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {KPI_CONFIG.map(({ key, icon, accent }) => {
            const d = KPI_DATA[key as keyof typeof KPI_DATA];
            return (
              <KPICard
                key={key}
                label={d.label}
                value={d.value}
                change={d.change}
                period={d.period}
                icon={icon}
                accent={accent}
              />
            );
          })}
        </div>

        {/* Secondary KPIs */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
          {["avgTransactionValue", "coverageGrowth"].map((key) => {
            const d = KPI_DATA[key as keyof typeof KPI_DATA];
            return (
              <div key={key} className="kpi-card" style={{ padding: "16px 20px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ color: "#475569", fontSize: 12, marginBottom: 6 }}>{d.label}</div>
                    <div style={{ color: "#F8FAFC", fontSize: 26, fontWeight: 700, letterSpacing: "-0.5px" }}>{d.value}</div>
                    <div style={{ color: "#334155", fontSize: 11, marginTop: 4 }}>{d.period}</div>
                  </div>
                  <div style={{ color: d.change >= 0 ? "#22C55E" : "#EF4444", fontSize: 14, fontWeight: 700 }}>
                    {d.change >= 0 ? "+" : ""}{d.change}%
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts Row */}
        <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 20 }}>
          <div style={{ height: 300 }}>
            <TransactionTrendChart />
          </div>
          <div style={{ height: 300 }}>
            <LiveFeed />
          </div>
        </div>

        {/* Heat Map + AI Insights */}
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 20 }}>
          <div style={{ minHeight: 500 }}>
            <HeatMapPanel compact={false} />
          </div>
          <div style={{ minHeight: 500 }}>
            <AIInsightsPanel limit={3} />
          </div>
        </div>

        {/* Category Chart + Leaderboard */}
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 20 }}>
          <div style={{ height: 320 }}>
            <CategoryTrendChart />
          </div>

          {/* Store Leaderboard */}
          <div className="chart-container flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div style={{ width: 38, height: 38, background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.15)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Award size={17} style={{ color: "#F59E0B" }} />
              </div>
              <div>
                <h3 style={{ color: "#F8FAFC", fontWeight: 600, fontSize: 15 }}>Store Leaderboard</h3>
                <p style={{ color: "#475569", fontSize: 12 }}>Top performing Kiryana stores</p>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {STORE_LEADERBOARD.map((store) => (
                <div
                  key={store.rank}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all"
                  style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}
                >
                  <div
                    style={{
                      width: 28, height: 28, borderRadius: "50%",
                      background: store.rank === 1 ? "linear-gradient(135deg, #F59E0B, #EF4444)" : store.rank === 2 ? "linear-gradient(135deg, #94A3B8, #64748B)" : store.rank === 3 ? "linear-gradient(135deg, #CD7F32, #92400E)" : "rgba(255,255,255,0.08)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 11, fontWeight: 700, color: "white", flexShrink: 0,
                    }}
                  >
                    {store.rank}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ color: "#F8FAFC", fontSize: 13, fontWeight: 500 }}>{store.name}</div>
                    <div style={{ color: "#475569", fontSize: 11 }}>{store.area}</div>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div style={{ color: "#22C55E", fontSize: 12, fontWeight: 700 }}>{store.txns} txns</div>
                    <div style={{ color: "#00D4FF", fontSize: 10 }}>{store.streak}d streak</div>
                  </div>
                  <div style={{ fontSize: 14, flexShrink: 0 }}>{store.badge.split(" ")[0]}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Products Table */}
        <div className="chart-container">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div style={{ width: 38, height: 38, background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.15)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Package size={17} style={{ color: "#00D4FF" }} />
              </div>
              <div>
                <h3 style={{ color: "#F8FAFC", fontWeight: 600, fontSize: 15 }}>Top Products by Volume</h3>
                <p style={{ color: "#475569", fontSize: 12 }}>Peek Freans SKUs · Last 7 days</p>
              </div>
            </div>
            <button className="btn-ghost flex items-center gap-2" style={{ fontSize: 13 }}>
              View All <ArrowRight size={13} />
            </button>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Brand</th>
                <th>Units Sold</th>
                <th>Revenue</th>
                <th>WoW Growth</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {TOP_PRODUCTS.map((p) => (
                <tr key={p.sku}>
                  <td>
                    <div>
                      <div style={{ color: "#F8FAFC", fontWeight: 500, fontSize: 13 }}>{p.name}</div>
                      <div style={{ color: "#334155", fontSize: 11 }}>{p.sku}</div>
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-blue">{p.brand}</span>
                  </td>
                  <td style={{ color: "#F8FAFC", fontWeight: 600 }}>{p.units.toLocaleString()}</td>
                  <td style={{ color: "#22C55E", fontWeight: 600 }}>₨ {(p.revenue / 1000000).toFixed(2)}M</td>
                  <td>
                    <div
                      style={{
                        display: "flex", alignItems: "center", gap: 4,
                        color: p.growth >= 0 ? "#22C55E" : "#EF4444",
                        fontWeight: 600, fontSize: 13,
                      }}
                    >
                      {p.growth >= 0 ? "↑" : "↓"} {Math.abs(p.growth)}%
                    </div>
                  </td>
                  <td>
                    <span className={`badge ${p.trend === "up" ? "badge-green" : "badge-red"}`}>
                      {p.trend === "up" ? "Trending Up" : "Declining"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* City Table */}
        <CityTable />
      </div>
    </div>
  );
}
