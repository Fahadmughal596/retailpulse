"use client";
import Topbar from "@/components/Topbar";
import { FORECAST_DATA, WEEKLY_CATEGORY_TREND, CITY_PERFORMANCE } from "@/lib/mockData";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine, ComposedChart, Line, Bar
} from "recharts";
import { TrendingUp, Zap, Target, AlertTriangle } from "lucide-react";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: "rgba(15,17,23,0.95)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "12px 16px", backdropFilter: "blur(20px)" }}>
        <p style={{ color: "#94A3B8", fontSize: 12, marginBottom: 8 }}>{label}</p>
        {payload.map((p: any) => (
          <div key={p.dataKey} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: p.color }} />
            <span style={{ color: "#F8FAFC", fontSize: 13, fontWeight: 600 }}>{p.value?.toLocaleString()}</span>
            <span style={{ color: "#475569", fontSize: 12 }}>{p.name}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function ForecastPage() {
  return (
    <div>
      <Topbar title="Demand Forecasting" subtitle="AI-powered predictive analytics · 4-week outlook" />

      <div style={{ padding: "28px 32px", display: "flex", flexDirection: "column", gap: 24 }}>

        {/* Model Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {[
            { label: "Model Accuracy", value: "94.2%", color: "#22C55E", icon: <Target size={18} />, bg: "rgba(34,197,94,0.08)" },
            { label: "Forecast Horizon", value: "4 Weeks", color: "#00D4FF", icon: <TrendingUp size={18} />, bg: "rgba(0,212,255,0.08)" },
            { label: "Predicted Growth", value: "+27.1%", color: "#8B5CF6", icon: <Zap size={18} />, bg: "rgba(139,92,246,0.08)" },
            { label: "Anomalies (7d)", value: "3 Detected", color: "#F59E0B", icon: <AlertTriangle size={18} />, bg: "rgba(245,158,11,0.08)" },
          ].map((s) => (
            <div key={s.label} className="kpi-card" style={{ padding: "18px 20px" }}>
              <div className="flex items-center gap-3 mb-3">
                <div style={{ width: 36, height: 36, background: s.bg, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", color: s.color }}>
                  {s.icon}
                </div>
                <span style={{ color: "#475569", fontSize: 12 }}>{s.label}</span>
              </div>
              <div style={{ color: s.color, fontSize: 26, fontWeight: 700 }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Main Forecast Chart */}
        <div className="chart-container" style={{ height: 360 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
            <div>
              <h3 style={{ color: "#F8FAFC", fontWeight: 600, fontSize: 16 }}>Transaction Volume Forecast</h3>
              <p style={{ color: "#475569", fontSize: 12 }}>Historical + 4-week AI prediction with confidence bands</p>
            </div>
            <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
              {[
                { color: "#00D4FF", label: "Actual" },
                { color: "#8B5CF6", label: "Forecast", dashed: true },
                { color: "rgba(139,92,246,0.2)", label: "Confidence Band" },
              ].map(({ color, label, dashed }) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 20, height: 2, background: color, borderRadius: 2, borderTop: dashed ? "2px dashed" : "none" }} />
                  <span style={{ color: "#475569", fontSize: 12 }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height="85%">
            <ComposedChart data={FORECAST_DATA} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
              <defs>
                <linearGradient id="gradActual" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00D4FF" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#00D4FF" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradForecast" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="week" tick={{ fill: "#334155", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#334155", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine x="Now" stroke="rgba(255,255,255,0.15)" strokeDasharray="4 4" label={{ value: "Today", fill: "#64748B", fontSize: 11 }} />
              <Area type="monotone" dataKey="actual" stroke="#00D4FF" strokeWidth={2.5} fill="url(#gradActual)" name="Actual" dot={{ fill: "#00D4FF", r: 4 }} connectNulls={false} />
              <Area type="monotone" dataKey="upper" stroke="rgba(139,92,246,0.3)" strokeWidth={1} fill="rgba(139,92,246,0.06)" name="Upper Bound" strokeDasharray="4 4" dot={false} connectNulls />
              <Area type="monotone" dataKey="lower" stroke="rgba(139,92,246,0.3)" strokeWidth={1} fill="transparent" name="Lower Bound" strokeDasharray="4 4" dot={false} connectNulls />
              <Line type="monotone" dataKey="forecast" stroke="#8B5CF6" strokeWidth={2.5} strokeDasharray="6 4" name="Forecast" dot={{ fill: "#8B5CF6", r: 4 }} connectNulls />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* City Forecast Rankings */}
        <div className="chart-container">
          <h3 style={{ color: "#F8FAFC", fontWeight: 600, fontSize: 15, marginBottom: 16 }}>
            City Growth Forecast — Next 30 Days
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {CITY_PERFORMANCE.map((city) => {
              const forecastGrowth = Math.round(city.growth * 1.3);
              return (
                <div key={city.city} style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{ width: 100, color: "#94A3B8", fontSize: 13, flexShrink: 0 }}>{city.city}</div>
                  <div style={{ flex: 1, height: 8, background: "rgba(255,255,255,0.06)", borderRadius: 4 }}>
                    <div style={{
                      height: "100%",
                      width: `${Math.min(forecastGrowth * 2.5, 100)}%`,
                      background: forecastGrowth > 30 ? "linear-gradient(90deg, #22C55E, #00D4FF)" : "linear-gradient(90deg, #8B5CF6, #00D4FF)",
                      borderRadius: 4,
                      transition: "width 0.6s ease",
                    }} />
                  </div>
                  <div style={{ width: 60, textAlign: "right", color: "#22C55E", fontWeight: 700, fontSize: 13, flexShrink: 0 }}>
                    +{forecastGrowth}%
                  </div>
                  <div style={{ width: 80, flexShrink: 0 }}>
                    <span className="badge badge-green" style={{ fontSize: 10 }}>
                      {forecastGrowth > 35 ? "High Growth" : forecastGrowth > 20 ? "Growing" : "Stable"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
