"use client";
import { AI_INSIGHTS } from "@/lib/mockData";
import { Brain, ChevronRight, Sparkles } from "lucide-react";

const SEVERITY_STYLES: Record<string, { bg: string; border: string; badge: string; badgeBg: string }> = {
  high: { bg: "rgba(239,68,68,0.04)", border: "rgba(239,68,68,0.15)", badge: "#EF4444", badgeBg: "rgba(239,68,68,0.1)" },
  medium: { bg: "rgba(245,158,11,0.04)", border: "rgba(245,158,11,0.15)", badge: "#F59E0B", badgeBg: "rgba(245,158,11,0.1)" },
  low: { bg: "rgba(0,212,255,0.04)", border: "rgba(0,212,255,0.15)", badge: "#00D4FF", badgeBg: "rgba(0,212,255,0.1)" },
};

const TYPE_LABELS: Record<string, string> = {
  spike: "SPIKE",
  opportunity: "OPPORTUNITY",
  trend: "TREND",
  anomaly: "ANOMALY",
  forecast: "FORECAST",
};

interface AIInsightsPanelProps {
  limit?: number;
}

export default function AIInsightsPanel({ limit }: AIInsightsPanelProps) {
  const insights = limit ? AI_INSIGHTS.slice(0, limit) : AI_INSIGHTS;

  return (
    <div className="chart-container flex flex-col gap-4 h-full">
      {/* Header */}
      <div className="flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <div
            className="flex items-center justify-center rounded-xl"
            style={{ width: 38, height: 38, background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.2)" }}
          >
            <Brain size={17} style={{ color: "#8B5CF6" }} />
          </div>
          <div>
            <h3 className="text-base font-semibold" style={{ color: "#F8FAFC" }}>
              AI Insights
            </h3>
            <p className="text-xs" style={{ color: "#475569" }}>
              Gemini-powered · Updated 2m ago
            </p>
          </div>
        </div>
        <div
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
          style={{ background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.2)" }}
        >
          <Sparkles size={12} style={{ color: "#8B5CF6" }} />
          <span className="text-xs font-semibold" style={{ color: "#8B5CF6" }}>
            {AI_INSIGHTS.length} Active
          </span>
        </div>
      </div>

      {/* Insights List */}
      <div className="flex flex-col gap-3 overflow-y-auto flex-1">
        {insights.map((insight) => {
          const style = SEVERITY_STYLES[insight.severity];
          return (
            <div
              key={insight.id}
              className="rounded-2xl p-4 transition-all cursor-pointer group"
              style={{ background: style.bg, border: `1px solid ${style.border}` }}
            >
              <div className="flex items-start gap-3">
                <div className="text-2xl flex-shrink-0 mt-0.5">{insight.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <span className="text-sm font-semibold" style={{ color: "#F8FAFC" }}>
                      {insight.title}
                    </span>
                    <span
                      className="text-xs font-bold px-2 py-0.5 rounded-full"
                      style={{ background: style.badgeBg, color: style.badge }}
                    >
                      {TYPE_LABELS[insight.type]}
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed mb-3" style={{ color: "#94A3B8" }}>
                    {insight.message}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="badge badge-blue">{insight.city}</span>
                      <span className="badge badge-purple">{insight.category}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <div
                          className="h-1 rounded-full"
                          style={{
                            width: 40,
                            background: "rgba(255,255,255,0.08)",
                          }}
                        >
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${insight.confidence}%`,
                              background: `linear-gradient(90deg, #8B5CF6, #00D4FF)`,
                            }}
                          />
                        </div>
                        <span className="text-xs font-semibold" style={{ color: "#8B5CF6" }}>
                          {insight.confidence}%
                        </span>
                      </div>
                      <span className="text-xs" style={{ color: "#334155" }}>{insight.time}</span>
                    </div>
                  </div>
                </div>
                <ChevronRight
                  size={14}
                  className="flex-shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: "#64748B" }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
