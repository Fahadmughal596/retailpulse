"use client";
import Topbar from "@/components/Topbar";
import HeatMapPanel from "@/components/HeatMapPanel";
import { HEATMAP_DATA, CITIES, AREAS, CATEGORIES } from "@/lib/mockData";
import { useState } from "react";
import { MapPin, Layers, Filter, Download, ZoomIn, ZoomOut, RefreshCw } from "lucide-react";

export default function HeatMapPage() {
  const [selectedCity, setSelectedCity] = useState("Karachi");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "density">("grid");

  const cityData = HEATMAP_DATA[selectedCity] || {};
  const areas = Object.entries(cityData);

  const getHeatColor = (value: number): string => {
    if (value >= 90) return "#00D4FF";
    if (value >= 75) return "#3B82F6";
    if (value >= 60) return "#8B5CF6";
    if (value >= 45) return "#F59E0B";
    if (value >= 30) return "#EF4444";
    return "#374151";
  };

  const avgDemand = Math.round(areas.reduce((a, [, v]) => a + v, 0) / areas.length);
  const maxArea = areas.reduce((a, b) => (a[1] > b[1] ? a : b), ["", 0]);
  const minArea = areas.reduce((a, b) => (a[1] < b[1] ? a : b), ["", 100]);

  return (
    <div>
      <Topbar title="Geographic Heat Maps" subtitle="Real-time consumption density · Pakistan retail network" />

      <div style={{ padding: "28px 32px", display: "flex", flexDirection: "column", gap: 24 }}>

        {/* Controls Bar */}
        <div
          className="flex items-center justify-between px-5 py-4 rounded-2xl"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="flex items-center gap-4 flex-wrap">
            {/* City Filter */}
            <div className="flex items-center gap-2">
              <span style={{ color: "#475569", fontSize: 12, fontWeight: 500 }}>City:</span>
              <div className="flex gap-1 flex-wrap">
                {CITIES.map(city => (
                  <button
                    key={city}
                    onClick={() => setSelectedCity(city)}
                    style={{
                      padding: "5px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600, cursor: "pointer",
                      background: selectedCity === city ? "rgba(0,212,255,0.15)" : "rgba(255,255,255,0.04)",
                      color: selectedCity === city ? "#00D4FF" : "#64748B",
                      border: `1px solid ${selectedCity === city ? "rgba(0,212,255,0.3)" : "rgba(255,255,255,0.06)"}`,
                      transition: "all 0.2s",
                    }}
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <span style={{ color: "#475569", fontSize: 12, fontWeight: 500 }}>Category:</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="input-glass"
                style={{ width: "auto", fontSize: 12, padding: "5px 12px" }}
              >
                <option value="All">All Categories</option>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* View mode toggle */}
            <div className="flex rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
              {(["grid", "density"] as const).map(mode => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  style={{
                    padding: "7px 14px", fontSize: 12, fontWeight: 600, cursor: "pointer",
                    background: viewMode === mode ? "rgba(0,212,255,0.12)" : "transparent",
                    color: viewMode === mode ? "#00D4FF" : "#64748B",
                    border: "none", textTransform: "capitalize",
                  }}
                >
                  {mode}
                </button>
              ))}
            </div>
            <button className="btn-ghost flex items-center gap-2" style={{ fontSize: 12 }}>
              <Download size={13} /> Export
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {[
            { label: "Avg Demand Index", value: avgDemand, color: "#00D4FF", suffix: "/100" },
            { label: "Highest Demand", value: maxArea[0], color: "#22C55E", sub: `Index: ${maxArea[1]}` },
            { label: "Lowest Demand", value: minArea[0], color: "#EF4444", sub: `Index: ${minArea[1]}` },
            { label: "Areas Tracked", value: areas.length, color: "#8B5CF6", suffix: " zones" },
          ].map((stat) => (
            <div key={stat.label} className="kpi-card" style={{ padding: "16px 20px" }}>
              <div style={{ color: "#475569", fontSize: 11, marginBottom: 8 }}>{stat.label}</div>
              <div style={{ color: stat.color, fontSize: typeof stat.value === "number" ? 28 : 18, fontWeight: 700, letterSpacing: "-0.5px" }}>
                {stat.value}{stat.suffix || ""}
              </div>
              {stat.sub && <div style={{ color: "#334155", fontSize: 11, marginTop: 4 }}>{stat.sub}</div>}
            </div>
          ))}
        </div>

        {/* Large Heat Map */}
        <div style={{ minHeight: 580 }}>
          <HeatMapPanel compact={false} />
        </div>

        {/* Area Breakdown Table */}
        <div className="chart-container">
          <h3 style={{ color: "#F8FAFC", fontWeight: 600, fontSize: 15, marginBottom: 16 }}>
            Area-Level Demand Breakdown — {selectedCity}
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
            {areas
              .sort(([, a], [, b]) => b - a)
              .map(([area, value]) => {
                const color = getHeatColor(value);
                return (
                  <div
                    key={area}
                    className="flex items-center justify-between px-4 py-3 rounded-xl"
                    style={{ background: `${color}08`, border: `1px solid ${color}20` }}
                  >
                    <div>
                      <div style={{ color: "#F8FAFC", fontWeight: 500, fontSize: 13 }}>{area}</div>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 6 }}>
                        <div style={{ height: 4, width: 60, background: "rgba(255,255,255,0.08)", borderRadius: 2 }}>
                          <div style={{ height: "100%", width: `${value}%`, background: color, borderRadius: 2 }} />
                        </div>
                      </div>
                    </div>
                    <div style={{ color, fontSize: 22, fontWeight: 800, textShadow: `0 0 12px ${color}60` }}>
                      {value}
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
