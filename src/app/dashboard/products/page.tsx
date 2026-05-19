"use client";
import Topbar from "@/components/Topbar";
import { TOP_PRODUCTS, PRODUCTS, CATEGORIES } from "@/lib/mockData";
import { Package, Search, Filter, TrendingUp, TrendingDown, BarChart2 } from "lucide-react";
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filtered = TOP_PRODUCTS.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase());
    return matchSearch;
  });

  const chartData = TOP_PRODUCTS.slice(0, 6).map(p => ({
    name: p.name.split(" ").slice(0, 2).join(" "),
    units: p.units,
    revenue: Math.round(p.revenue / 1000),
  }));

  return (
    <div>
      <Topbar title="Products & SKUs" subtitle="Peek Freans portfolio performance · Brand-isolated view" />

      <div style={{ padding: "28px 32px", display: "flex", flexDirection: "column", gap: 24 }}>

        {/* Summary Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {[
            { label: "Active SKUs", value: PRODUCTS.filter(p => p.brandId === "brand_001").length, color: "#00D4FF" },
            { label: "Total Units (7d)", value: "245K+", color: "#22C55E" },
            { label: "Top SKU", value: "Sooper 150g", color: "#8B5CF6" },
            { label: "Avg WoW Growth", value: "+11.3%", color: "#F59E0B" },
          ].map(s => (
            <div key={s.label} className="kpi-card" style={{ padding: "16px 20px" }}>
              <div style={{ color: "#475569", fontSize: 11, marginBottom: 8 }}>{s.label}</div>
              <div style={{ color: s.color, fontSize: 22, fontWeight: 700 }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="chart-container" style={{ height: 300 }}>
          <h3 style={{ color: "#F8FAFC", fontWeight: 600, fontSize: 15, marginBottom: 16 }}>Units Sold by SKU (Last 7 Days)</h3>
          <ResponsiveContainer width="100%" height="85%">
            <BarChart data={chartData} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="name" tick={{ fill: "#334155", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#334155", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: "rgba(15,17,23,0.95)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, backdropFilter: "blur(20px)" }}
                labelStyle={{ color: "#94A3B8", fontSize: 12 }}
                itemStyle={{ color: "#F8FAFC", fontSize: 13 }}
              />
              <Bar dataKey="units" fill="#00D4FF" radius={[6, 6, 0, 0]} maxBarSize={50} opacity={0.85} name="Units" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Products Table */}
        <div className="chart-container">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div style={{ width: 38, height: 38, background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.15)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Package size={17} style={{ color: "#00D4FF" }} />
              </div>
              <h3 style={{ color: "#F8FAFC", fontWeight: 600, fontSize: 15 }}>All Products</h3>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search size={13} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#475569" }} />
                <input
                  className="input-glass pl-8"
                  style={{ width: 220, fontSize: 13 }}
                  placeholder="Search SKUs..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  id="products-search"
                />
              </div>
            </div>
          </div>

          <table className="data-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Units (7d)</th>
                <th>Revenue</th>
                <th>WoW Growth</th>
                <th>Trend</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.sku} style={{ cursor: "pointer" }}>
                  <td>
                    <div>
                      <div style={{ color: "#F8FAFC", fontWeight: 500, fontSize: 13 }}>{p.name}</div>
                      <div style={{ color: "#334155", fontSize: 11 }}>{p.sku}</div>
                    </div>
                  </td>
                  <td><span className="badge badge-purple">{p.brand}</span></td>
                  <td style={{ color: "#94A3B8" }}>—</td>
                  <td style={{ color: "#F8FAFC", fontWeight: 600 }}>{p.units.toLocaleString()}</td>
                  <td style={{ color: "#22C55E", fontWeight: 600 }}>₨ {(p.revenue / 1000000).toFixed(2)}M</td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 4, color: p.growth >= 0 ? "#22C55E" : "#EF4444", fontWeight: 700, fontSize: 13 }}>
                      {p.growth >= 0 ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
                      {p.growth >= 0 ? "+" : ""}{p.growth}%
                    </div>
                  </td>
                  <td>
                    <span className={`badge ${p.trend === "up" ? "badge-green" : "badge-red"}`}>
                      {p.trend === "up" ? "↑ Rising" : "↓ Falling"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
