"use client";
import { TrendingUp, TrendingDown } from "lucide-react";

interface KPICardProps {
  label: string;
  value: string | number;
  change: number;
  period: string;
  icon?: React.ReactNode;
  accent?: "blue" | "purple" | "green" | "amber";
}

const ACCENT_STYLES = {
  blue: { color: "#00D4FF", bg: "rgba(0,212,255,0.08)", glow: "0 0 30px rgba(0,212,255,0.08)" },
  purple: { color: "#8B5CF6", bg: "rgba(139,92,246,0.08)", glow: "0 0 30px rgba(139,92,246,0.08)" },
  green: { color: "#22C55E", bg: "rgba(34,197,94,0.08)", glow: "0 0 30px rgba(34,197,94,0.08)" },
  amber: { color: "#F59E0B", bg: "rgba(245,158,11,0.08)", glow: "0 0 30px rgba(245,158,11,0.08)" },
};

export default function KPICard({ label, value, change, period, icon, accent = "blue" }: KPICardProps) {
  const style = ACCENT_STYLES[accent];
  const isPositive = change >= 0;

  return (
    <div className="kpi-card" style={{ boxShadow: style.glow }}>
      <div className="flex items-start justify-between mb-4">
        <div
          className="flex items-center justify-center rounded-xl"
          style={{ width: 44, height: 44, background: style.bg, color: style.color, border: `1px solid ${style.color}20` }}
        >
          {icon}
        </div>
        <div
          className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold`}
          style={{
            background: isPositive ? "rgba(34,197,94,0.08)" : "rgba(239,68,68,0.08)",
            color: isPositive ? "#22C55E" : "#EF4444",
            border: `1px solid ${isPositive ? "rgba(34,197,94,0.15)" : "rgba(239,68,68,0.15)"}`,
          }}
        >
          {isPositive ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
          {isPositive ? "+" : ""}{change}%
        </div>
      </div>

      <div className="text-3xl font-bold mb-1" style={{ color: "#F8FAFC", letterSpacing: "-0.5px" }}>
        {value}
      </div>
      <div className="text-sm font-medium mb-1" style={{ color: "#94A3B8" }}>
        {label}
      </div>
      <div className="text-xs" style={{ color: "#334155" }}>
        {period}
      </div>
    </div>
  );
}
