"use client";
import { CITY_PERFORMANCE } from "@/lib/mockData";
import { MapPin, TrendingUp, TrendingDown } from "lucide-react";

export default function CityTable() {
  return (
    <div className="chart-container flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div style={{ width: 38, height: 38, background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.15)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <MapPin size={17} style={{ color: "#F59E0B" }} />
          </div>
          <div>
            <h3 style={{ color: "#F8FAFC", fontWeight: 600, fontSize: 15 }}>City Performance</h3>
            <p style={{ color: "#475569", fontSize: 12 }}>Top markets by transaction volume</p>
          </div>
        </div>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>City</th>
            <th>Active Stores</th>
            <th>Transactions</th>
            <th>Est. Revenue</th>
            <th>Growth</th>
            <th>Coverage</th>
          </tr>
        </thead>
        <tbody>
          {CITY_PERFORMANCE.map((row, idx) => (
            <tr key={row.city}>
              <td>
                <div className="flex items-center gap-2">
                  <span style={{ color: "#334155", fontSize: 12, fontWeight: 700, width: 20 }}>{idx + 1}</span>
                  <span style={{ color: "#F8FAFC", fontWeight: 500 }}>{row.city}</span>
                </div>
              </td>
              <td style={{ color: "#94A3B8" }}>{row.stores.toLocaleString()}</td>
              <td style={{ color: "#F8FAFC", fontWeight: 600 }}>{row.txns.toLocaleString()}</td>
              <td style={{ color: "#22C55E", fontWeight: 600 }}>₨ {(row.revenue / 1000000).toFixed(1)}M</td>
              <td>
                <div className="flex items-center gap-1"
                  style={{ color: row.growth > 0 ? "#22C55E" : "#EF4444", fontWeight: 600, fontSize: 13 }}
                >
                  {row.growth > 0 ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
                  +{row.growth}%
                </div>
              </td>
              <td>
                <div className="flex items-center gap-2">
                  <div style={{ flex: 1, height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 2, minWidth: 60 }}>
                    <div style={{
                      height: "100%",
                      width: `${row.coverage}%`,
                      background: row.coverage >= 70 ? "#22C55E" : row.coverage >= 50 ? "#F59E0B" : "#EF4444",
                      borderRadius: 2,
                    }} />
                  </div>
                  <span style={{ color: "#94A3B8", fontSize: 12, flexShrink: 0 }}>{row.coverage}%</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
