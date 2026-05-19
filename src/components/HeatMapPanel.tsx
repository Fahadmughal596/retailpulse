"use client";
import { useState } from "react";
import { HEATMAP_DATA, CITIES } from "@/lib/mockData";
import { MapPin, Layers, ChevronDown, Info } from "lucide-react";

const getHeatColor = (value: number): string => {
  if (value >= 90) return "#00D4FF";
  if (value >= 75) return "#3B82F6";
  if (value >= 60) return "#8B5CF6";
  if (value >= 45) return "#F59E0B";
  if (value >= 30) return "#EF4444";
  return "#374151";
};

const getHeatOpacity = (value: number): number => {
  return 0.3 + (value / 100) * 0.7;
};

interface HeatmapProps {
  compact?: boolean;
}

export default function HeatMapPanel({ compact = false }: HeatmapProps) {
  const [selectedCity, setSelectedCity] = useState("Karachi");
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [hoveredArea, setHoveredArea] = useState<string | null>(null);

  const cityData = HEATMAP_DATA[selectedCity] || {};
  const areas = Object.entries(cityData);
  const maxValue = Math.max(...areas.map(([, v]) => v));

  return (
    <div className="chart-container h-full flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <div
            className="flex items-center justify-center rounded-xl"
            style={{ width: 38, height: 38, background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.15)" }}
          >
            <MapPin size={17} style={{ color: "#00D4FF" }} />
          </div>
          <div>
            <h3 className="text-base font-semibold" style={{ color: "#F8FAFC" }}>
              Consumption Heat Map
            </h3>
            <p className="text-xs" style={{ color: "#475569" }}>Real-time density by area</p>
          </div>
        </div>

        {/* City Selector */}
        <div className="flex items-center gap-2">
          {CITIES.slice(0, 6).map((city) => (
            <button
              key={city}
              onClick={() => { setSelectedCity(city); setSelectedArea(null); }}
              className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
              style={{
                background: selectedCity === city ? "rgba(0,212,255,0.15)" : "rgba(255,255,255,0.04)",
                color: selectedCity === city ? "#00D4FF" : "#64748B",
                border: `1px solid ${selectedCity === city ? "rgba(0,212,255,0.3)" : "rgba(255,255,255,0.06)"}`,
                cursor: "pointer",
              }}
            >
              {city}
            </button>
          ))}
        </div>
      </div>

      {/* Map Canvas */}
      <div
        className="flex-1 rounded-2xl overflow-hidden relative"
        style={{
          background: "radial-gradient(ellipse at center, rgba(0,212,255,0.03) 0%, #0a0c12 70%)",
          border: "1px solid rgba(255,255,255,0.05)",
          minHeight: compact ? 260 : 320,
        }}
      >
        {/* Grid background */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />

        {/* City label */}
        <div
          className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full"
          style={{ background: "rgba(0,0,0,0.6)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(10px)" }}
        >
          <MapPin size={12} style={{ color: "#00D4FF" }} />
          <span className="text-xs font-semibold" style={{ color: "#F8FAFC" }}>{selectedCity}, Pakistan</span>
        </div>

        {/* Floating info */}
        {hoveredArea && (
          <div
            className="absolute top-4 right-4 px-4 py-3 rounded-xl"
            style={{ background: "rgba(15,17,23,0.95)", border: "1px solid rgba(0,212,255,0.2)", backdropFilter: "blur(20px)" }}
          >
            <div className="text-xs font-semibold mb-1" style={{ color: "#00D4FF" }}>{hoveredArea}</div>
            <div className="text-xl font-bold" style={{ color: "#F8FAFC" }}>{cityData[hoveredArea]}</div>
            <div className="text-xs" style={{ color: "#475569" }}>Demand Index</div>
          </div>
        )}

        {/* Heat Cells Grid */}
        <div
          className="absolute inset-0 flex items-center justify-center p-8"
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${Math.ceil(Math.sqrt(areas.length))}, 1fr)`,
              gap: 10,
              width: "100%",
            }}
          >
            {areas.map(([area, value]) => {
              const color = getHeatColor(value);
              const opacity = getHeatOpacity(value);
              const isSelected = selectedArea === area;
              const size = 60 + (value / 100) * 30;

              return (
                <div
                  key={area}
                  className="heat-cell relative flex flex-col items-center justify-center cursor-pointer"
                  style={{
                    height: Math.max(70, size),
                    background: `${color}${Math.round(opacity * 0.3 * 255).toString(16).padStart(2, '0')}`,
                    border: `1px solid ${color}${Math.round(opacity * 0.6 * 255).toString(16).padStart(2, '0')}`,
                    borderRadius: 12,
                    boxShadow: isSelected
                      ? `0 0 30px ${color}60, inset 0 0 20px ${color}20`
                      : `0 0 ${value / 5}px ${color}${Math.round(opacity * 0.4 * 255).toString(16).padStart(2, '0')}`,
                    transform: isSelected ? "scale(1.05)" : "scale(1)",
                  }}
                  onMouseEnter={() => setHoveredArea(area)}
                  onMouseLeave={() => setHoveredArea(null)}
                  onClick={() => setSelectedArea(isSelected ? null : area)}
                >
                  <div
                    className="text-xs font-bold mb-1"
                    style={{ color, textShadow: `0 0 10px ${color}` }}
                  >
                    {value}
                  </div>
                  <div
                    className="text-center font-medium leading-tight px-1"
                    style={{ fontSize: 10, color: "rgba(255,255,255,0.7)" }}
                  >
                    {area}
                  </div>
                  {value === maxValue && (
                    <div
                      className="absolute -top-1.5 -right-1.5 rounded-full"
                      style={{ width: 10, height: 10, background: "#22C55E", boxShadow: "0 0 8px rgba(34,197,94,0.8)" }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-xs" style={{ color: "#334155" }}>Demand Index:</span>
          {[
            { label: "90+", color: "#00D4FF" },
            { label: "75+", color: "#3B82F6" },
            { label: "60+", color: "#8B5CF6" },
            { label: "45+", color: "#F59E0B" },
            { label: "<45", color: "#EF4444" },
          ].map(({ label, color }) => (
            <div key={label} className="flex items-center gap-1.5">
              <div className="rounded" style={{ width: 12, height: 12, background: color, opacity: 0.8 }} />
              <span className="text-xs" style={{ color: "#475569" }}>{label}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-1" style={{ color: "#334155", fontSize: 11 }}>
          <Layers size={12} />
          <span>SKU: All · Brand: Peek Freans</span>
        </div>
      </div>
    </div>
  );
}
