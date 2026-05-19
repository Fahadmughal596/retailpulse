"use client";
import { useState } from "react";
import { Bell, Search, Filter, ChevronDown, RefreshCw } from "lucide-react";

interface TopbarProps {
  title: string;
  subtitle?: string;
}

export default function Topbar({ title, subtitle }: TopbarProps) {
  const [notifications] = useState(5);

  return (
    <header
      className="flex items-center justify-between px-8 py-4 sticky top-0 z-40"
      style={{
        background: "rgba(15,17,23,0.85)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      {/* Left: Title */}
      <div>
        <h1 className="text-xl font-bold" style={{ color: "#F8FAFC", letterSpacing: "-0.3px" }}>
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm mt-0.5" style={{ color: "#64748B" }}>
            {subtitle}
          </p>
        )}
      </div>

      {/* Center: Search */}
      <div className="flex items-center gap-2 mx-8 flex-1 max-w-md">
        <div className="relative flex-1">
          <Search
            size={14}
            style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#475569" }}
          />
          <input
            className="input-glass pl-9 text-sm"
            placeholder="Search stores, products, SKUs..."
            id="topbar-search"
          />
        </div>
        <button className="btn-ghost flex items-center gap-2 text-sm px-3 py-2">
          <Filter size={13} />
          Filter
        </button>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3">
        {/* Date Range */}
        <button
          className="btn-ghost flex items-center gap-2 text-sm"
          style={{ fontSize: 13, padding: "8px 14px" }}
        >
          <span style={{ color: "#94A3B8" }}>Last 7 Days</span>
          <ChevronDown size={12} style={{ color: "#475569" }} />
        </button>

        {/* Refresh */}
        <button
          className="flex items-center justify-center rounded-xl transition-all hover:bg-white/5"
          style={{ width: 38, height: 38, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
          title="Refresh data"
        >
          <RefreshCw size={15} style={{ color: "#64748B" }} />
        </button>

        {/* Notifications */}
        <button
          className="relative flex items-center justify-center rounded-xl transition-all hover:bg-white/5"
          style={{ width: 38, height: 38, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
          id="notifications-btn"
        >
          <Bell size={15} style={{ color: "#64748B" }} />
          {notifications > 0 && (
            <span
              className="absolute -top-1 -right-1 flex items-center justify-center rounded-full text-white font-bold"
              style={{ width: 16, height: 16, fontSize: 9, background: "#00D4FF" }}
            >
              {notifications}
            </span>
          )}
        </button>

        {/* Live indicator */}
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-xl"
          style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.15)" }}
        >
          <div className="live-indicator" />
          <span className="text-xs font-semibold" style={{ color: "#22C55E" }}>
            LIVE
          </span>
        </div>
      </div>
    </header>
  );
}
