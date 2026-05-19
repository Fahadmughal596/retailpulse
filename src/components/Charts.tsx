"use client";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, LineChart, Line, Legend
} from "recharts";
import { HOURLY_TREND, WEEKLY_CATEGORY_TREND } from "@/lib/mockData";
import { Activity, BarChart2 } from "lucide-react";
import { useState } from "react";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: "rgba(15,17,23,0.95)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 12,
          padding: "12px 16px",
          backdropFilter: "blur(20px)",
        }}
      >
        <p style={{ color: "#94A3B8", fontSize: 12, marginBottom: 8 }}>{label}</p>
        {payload.map((p: any) => (
          <div key={p.dataKey} className="flex items-center gap-2" style={{ marginBottom: 4 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: p.color }} />
            <span style={{ color: "#F8FAFC", fontSize: 13, fontWeight: 600 }}>
              {p.dataKey === "revenue" ? `₨ ${(p.value / 1000).toFixed(0)}K` : p.value?.toLocaleString()}
            </span>
            <span style={{ color: "#475569", fontSize: 12 }}>{p.name}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export function TransactionTrendChart() {
  return (
    <div className="chart-container h-full flex flex-col gap-4">
      <div className="flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <div
            style={{ width: 38, height: 38, background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.15)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <Activity size={17} style={{ color: "#00D4FF" }} />
          </div>
          <div>
            <h3 style={{ color: "#F8FAFC", fontWeight: 600, fontSize: 15 }}>Transaction Volume</h3>
            <p style={{ color: "#475569", fontSize: 12 }}>Today · Hourly breakdown</p>
          </div>
        </div>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 10, height: 2, background: "#00D4FF", borderRadius: 2 }} />
            <span style={{ color: "#475569", fontSize: 12 }}>Transactions</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 10, height: 2, background: "#8B5CF6", borderRadius: 2 }} />
            <span style={{ color: "#475569", fontSize: 12 }}>Revenue</span>
          </div>
        </div>
      </div>
      <div className="flex-1" style={{ minHeight: 200 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={HOURLY_TREND} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
            <defs>
              <linearGradient id="gradBlue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00D4FF" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#00D4FF" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gradPurple" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis dataKey="hour" tick={{ fill: "#334155", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#334155", fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="txns" stroke="#00D4FF" strokeWidth={2} fill="url(#gradBlue)" name="Transactions" dot={false} activeDot={{ r: 5, fill: "#00D4FF" }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

const CATEGORY_COLORS: Record<string, string> = {
  Biscuits: "#00D4FF",
  Beverages: "#8B5CF6",
  Dairy: "#22C55E",
  Snacks: "#F59E0B",
  "Instant Food": "#EF4444",
};

export function CategoryTrendChart() {
  const [activeCategories, setActiveCategories] = useState(["Biscuits", "Beverages", "Dairy"]);

  const toggleCategory = (cat: string) => {
    setActiveCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  return (
    <div className="chart-container h-full flex flex-col gap-4">
      <div className="flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <div style={{ width: 38, height: 38, background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.15)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <BarChart2 size={17} style={{ color: "#8B5CF6" }} />
          </div>
          <div>
            <h3 style={{ color: "#F8FAFC", fontWeight: 600, fontSize: 15 }}>Category Performance</h3>
            <p style={{ color: "#475569", fontSize: 12 }}>Weekly units sold by category</p>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {Object.keys(CATEGORY_COLORS).map(cat => (
            <button
              key={cat}
              onClick={() => toggleCategory(cat)}
              style={{
                padding: "3px 10px",
                borderRadius: 20,
                fontSize: 11,
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s",
                background: activeCategories.includes(cat) ? `${CATEGORY_COLORS[cat]}20` : "rgba(255,255,255,0.04)",
                color: activeCategories.includes(cat) ? CATEGORY_COLORS[cat] : "#475569",
                border: `1px solid ${activeCategories.includes(cat) ? `${CATEGORY_COLORS[cat]}40` : "rgba(255,255,255,0.06)"}`,
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1" style={{ minHeight: 200 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={WEEKLY_CATEGORY_TREND} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis dataKey="day" tick={{ fill: "#334155", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#334155", fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            {activeCategories.map(cat => (
              <Bar key={cat} dataKey={cat} fill={CATEGORY_COLORS[cat]} radius={[4, 4, 0, 0]} maxBarSize={28} opacity={0.85} />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
