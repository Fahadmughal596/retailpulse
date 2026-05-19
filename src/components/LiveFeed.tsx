"use client";
import { RECENT_TRANSACTIONS } from "@/lib/mockData";
import { Activity, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

export default function LiveFeed() {
  const [transactions, setTransactions] = useState(RECENT_TRANSACTIONS);
  const [newPing, setNewPing] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const stores = ["Zubair Kiryana", "Rehman Store", "New City Mart", "Tahir General"];
      const products = ["Sooper Biscuits 150g", "Milk Pak 1L", "Tapal Danedar", "Lays Classic 50g"];
      const areas = ["Gulshan, KHI", "Model Town, LHR", "Blue Area, ISB", "G-9, ISB"];
      const amounts = [105, 140, 180, 220, 260];

      const newTxn = {
        id: `txn_${Math.floor(Math.random() * 9999)}`,
        store: stores[Math.floor(Math.random() * stores.length)],
        area: areas[Math.floor(Math.random() * areas.length)],
        product: products[Math.floor(Math.random() * products.length)],
        qty: Math.floor(Math.random() * 4) + 1,
        amount: amounts[Math.floor(Math.random() * amounts.length)],
        time: "just now",
      };

      setTransactions(prev => [newTxn, ...prev.slice(0, 9)]);
      setNewPing(true);
      setTimeout(() => setNewPing(false), 800);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="chart-container flex flex-col gap-4 h-full">
      <div className="flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <div
            style={{
              width: 38, height: 38,
              background: newPing ? "rgba(34,197,94,0.15)" : "rgba(34,197,94,0.08)",
              border: `1px solid ${newPing ? "rgba(34,197,94,0.4)" : "rgba(34,197,94,0.15)"}`,
              borderRadius: 10,
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.3s ease",
            }}
          >
            <Activity size={17} style={{ color: "#22C55E" }} />
          </div>
          <div>
            <h3 style={{ color: "#F8FAFC", fontWeight: 600, fontSize: 15 }}>Live Transaction Feed</h3>
            <p style={{ color: "#475569", fontSize: 12 }}>Real-time Kiryana store events</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="live-indicator" />
          <span style={{ color: "#22C55E", fontSize: 12, fontWeight: 600 }}>Streaming</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto flex flex-col gap-2" style={{ maxHeight: 340 }}>
        {transactions.map((txn, idx) => (
          <div
            key={txn.id}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all"
            style={{
              background: idx === 0 && newPing ? "rgba(34,197,94,0.06)" : "rgba(255,255,255,0.02)",
              border: `1px solid ${idx === 0 && newPing ? "rgba(34,197,94,0.15)" : "rgba(255,255,255,0.04)"}`,
              transition: "all 0.4s ease",
            }}
          >
            <div
              style={{
                width: 8, height: 8, borderRadius: "50%", flexShrink: 0,
                background: idx === 0 ? "#22C55E" : "#334155",
                boxShadow: idx === 0 ? "0 0 8px rgba(34,197,94,0.6)" : "none",
              }}
            />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: "#F8FAFC", fontSize: 13, fontWeight: 500 }}>{txn.store}</span>
                <span style={{ color: "#22C55E", fontSize: 13, fontWeight: 700, flexShrink: 0 }}>
                  ₨ {txn.amount}
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: "#475569", fontSize: 11 }}>{txn.product} × {txn.qty}</span>
                <span style={{ color: "#334155", fontSize: 11 }}>{txn.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        className="w-full flex items-center justify-center gap-2 py-2 rounded-xl transition-all"
        style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", color: "#475569", fontSize: 13, cursor: "pointer" }}
      >
        View All Transactions <ArrowRight size={13} />
      </button>
    </div>
  );
}
