"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Map, Brain, TrendingUp, ShoppingBag,
  Store, Settings, Bell, ChevronLeft, ChevronRight,
  Zap, LogOut, HelpCircle, User
} from "lucide-react";

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
  { icon: Map, label: "Heat Maps", href: "/dashboard/heatmap" },
  { icon: Brain, label: "AI Insights", href: "/dashboard/insights" },
  { icon: TrendingUp, label: "Forecasting", href: "/dashboard/forecast" },
  { icon: ShoppingBag, label: "Products", href: "/dashboard/products" },
  { icon: Store, label: "Stores", href: "/dashboard/stores" },
];

const BOTTOM_ITEMS = [
  { icon: HelpCircle, label: "Help Center", href: "#" },
  { icon: Settings, label: "Settings", href: "#" },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <aside className={`sidebar ${collapsed ? "sidebar-collapsed" : ""}`}>
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-white/5">
        <div
          className="flex items-center justify-center rounded-xl flex-shrink-0"
          style={{
            width: 36, height: 36,
            background: "linear-gradient(135deg, #00D4FF, #8B5CF6)",
            boxShadow: "0 0 20px rgba(0,212,255,0.3)",
          }}
        >
          <Zap size={18} color="white" fill="white" />
        </div>
        {!collapsed && (
          <div>
            <div className="font-bold text-sm tracking-tight" style={{ color: "#F8FAFC" }}>
              RetailPulse
            </div>
            <div className="text-xs font-medium" style={{ color: "#00D4FF" }}>
              AI Platform
            </div>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto flex items-center justify-center rounded-lg transition-all"
          style={{
            width: 28, height: 28,
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "#64748B",
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>

      {/* Brand badge */}
      {!collapsed && (
        <div className="mx-3 mt-4 mb-2 px-3 py-2 rounded-xl" style={{
          background: "linear-gradient(135deg, rgba(0,212,255,0.08), rgba(139,92,246,0.08))",
          border: "1px solid rgba(0,212,255,0.12)",
        }}>
          <div className="flex items-center gap-2">
            <div className="live-indicator" />
            <span className="text-xs font-medium" style={{ color: "#94A3B8" }}>
              Peek Freans · Live
            </span>
          </div>
          <div className="text-xs mt-1" style={{ color: "#475569" }}>
            Brand Executive View
          </div>
        </div>
      )}

      {/* Nav Items */}
      <nav className="flex-1 px-2 py-3 overflow-y-auto">
        <div className="mb-1">
          {!collapsed && (
            <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-widest" style={{ color: "#334155" }}>
              Analytics
            </div>
          )}
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link key={item.href} href={item.href} className={`nav-item ${isActive ? "active" : ""}`}>
                <item.icon size={18} className="flex-shrink-0" />
                {!collapsed && <span>{item.label}</span>}
                {!collapsed && isActive && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full" style={{ background: "#00D4FF" }} />
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Bottom section */}
      <div className="border-t border-white/5 pt-3 px-2 pb-2">
        {BOTTOM_ITEMS.map((item) => (
          <Link key={item.label} href={item.href} className="nav-item">
            <item.icon size={18} className="flex-shrink-0" />
            {!collapsed && <span>{item.label}</span>}
          </Link>
        ))}
        <div className="divider" />
        {/* User profile */}
        <div className={`flex items-center gap-3 px-3 py-2 rounded-xl cursor-pointer transition-all hover:bg-white/5 ${collapsed ? "justify-center" : ""}`}>
          <div
            className="flex items-center justify-center rounded-full flex-shrink-0 font-bold text-xs"
            style={{ width: 32, height: 32, background: "linear-gradient(135deg, #8B5CF6, #00D4FF)", color: "white" }}
          >
            AK
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate" style={{ color: "#F8FAFC" }}>Ahmed Khan</div>
              <div className="text-xs truncate" style={{ color: "#475569" }}>Brand Executive</div>
            </div>
          )}
          {!collapsed && (
            <LogOut size={14} style={{ color: "#334155", flexShrink: 0 }} />
          )}
        </div>
      </div>
    </aside>
  );
}
