"use client";
import Topbar from "@/components/Topbar";
import AIInsightsPanel from "@/components/AIInsightsPanel";
import { AI_INSIGHTS, CATEGORIES, CITIES } from "@/lib/mockData";
import { Brain, Sparkles, MessageSquare, Send, Mic, RefreshCw } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const SAMPLE_QUESTIONS = [
  "Which areas in Karachi have the highest biscuit demand this week?",
  "Predict demand for Sooper Biscuits next month in Lahore",
  "Compare Rawalpindi vs Islamabad tea consumption trends",
  "Identify opportunities for brand expansion in Gujranwala",
  "Show anomalies in the last 7 days for my SKUs",
];

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  time: string;
}

const MOCK_RESPONSES: Record<string, string> = {
  default: `Based on current RetailPulse data analysis:\n\n📊 **Key Finding:** Biscuit category demand across your tracked areas shows a **+23.4% surge** compared to last week's baseline.\n\n🔍 **Top Areas:**\n• Satellite Town, Rawalpindi: Index 84 (↑34%)\n• Clifton, Karachi: Index 94 (↑12%)\n• F-7, Islamabad: Index 92 (stable)\n\n💡 **AI Recommendation:** Consider increasing distribution capacity to Satellite Town and North Nazimabad where demand-to-supply gaps are widest. Estimated revenue opportunity: ₨ 4.2M/month.\n\n⚠️ **Anomaly Alert:** Saddar, Karachi showing -22% below baseline — supply disruption suspected, not demand loss.`,
};

export default function InsightsPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: "Hello! I'm RetailPulse AI, powered by Gemini. I have access to real-time transaction data from 3,847 Kiryana stores across Pakistan. Ask me anything about your brand's performance, demand trends, or market opportunities.",
      time: "now",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (text?: string) => {
    const msg = text || input.trim();
    if (!msg) return;
    setInput("");

    const userMsg: ChatMessage = { role: "user", content: msg, time: "now" };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    setTimeout(() => {
      const response = MOCK_RESPONSES.default;
      setMessages(prev => [...prev, { role: "assistant", content: response, time: "now" }]);
      setLoading(false);
    }, 1800);
  };

  return (
    <div>
      <Topbar title="AI Insights Engine" subtitle="Gemini-powered retail intelligence · Brand-isolated analysis" />

      <div style={{ padding: "28px 32px", display: "flex", flexDirection: "column", gap: 24 }}>

        {/* Stats Row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {[
            { label: "Active Insights", value: AI_INSIGHTS.length, color: "#8B5CF6", icon: "🧠" },
            { label: "High Priority", value: AI_INSIGHTS.filter(i => i.severity === "high").length, color: "#EF4444", icon: "⚠️" },
            { label: "Avg Confidence", value: `${Math.round(AI_INSIGHTS.reduce((a, i) => a + i.confidence, 0) / AI_INSIGHTS.length)}%`, color: "#00D4FF", icon: "🎯" },
            { label: "Cities Analyzed", value: new Set(AI_INSIGHTS.map(i => i.city)).size, color: "#22C55E", icon: "🗺️" },
          ].map((s) => (
            <div key={s.label} className="kpi-card" style={{ padding: "16px 20px" }}>
              <div className="flex items-center justify-between">
                <div>
                  <div style={{ color: "#475569", fontSize: 11, marginBottom: 8 }}>{s.label}</div>
                  <div style={{ color: s.color, fontSize: 28, fontWeight: 700 }}>{s.value}</div>
                </div>
                <span style={{ fontSize: 28 }}>{s.icon}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Main Layout: Insights + AI Chat */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>

          {/* Left: All Insights */}
          <div style={{ maxHeight: 700, overflowY: "auto" }}>
            <AIInsightsPanel />
          </div>

          {/* Right: AI Chatbot */}
          <div
            className="chart-container flex flex-col"
            style={{ height: 700 }}
          >
            {/* Chat Header */}
            <div className="flex items-center justify-between mb-4 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div
                  style={{
                    width: 40, height: 40, borderRadius: "50%",
                    background: "linear-gradient(135deg, #8B5CF6, #00D4FF)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: "0 0 20px rgba(139,92,246,0.3)",
                  }}
                >
                  <Sparkles size={18} color="white" />
                </div>
                <div>
                  <div style={{ color: "#F8FAFC", fontWeight: 600, fontSize: 15 }}>RetailPulse AI</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div className="live-indicator" />
                    <span style={{ color: "#22C55E", fontSize: 11, fontWeight: 500 }}>Online · Gemini Pro</span>
                  </div>
                </div>
              </div>
              <button className="btn-ghost" style={{ fontSize: 12, padding: "6px 12px" }}>
                <RefreshCw size={12} style={{ display: "inline", marginRight: 4 }} />
                Clear
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto flex flex-col gap-4 mb-4" style={{ minHeight: 0 }}>
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                  }}
                >
                  <div
                    style={{
                      maxWidth: "85%",
                      padding: "12px 16px",
                      borderRadius: msg.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                      background: msg.role === "user"
                        ? "linear-gradient(135deg, rgba(0,212,255,0.15), rgba(139,92,246,0.15))"
                        : "rgba(255,255,255,0.04)",
                      border: `1px solid ${msg.role === "user" ? "rgba(0,212,255,0.2)" : "rgba(255,255,255,0.06)"}`,
                      fontSize: 13,
                      lineHeight: 1.6,
                      color: "#E2E8F0",
                      whiteSpace: "pre-line",
                    }}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div
                    style={{
                      padding: "12px 16px",
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.06)",
                      borderRadius: "16px 16px 16px 4px",
                      display: "flex", gap: 6,
                    }}
                  >
                    {[0, 1, 2].map(i => (
                      <div
                        key={i}
                        style={{
                          width: 7, height: 7, borderRadius: "50%",
                          background: "#8B5CF6",
                          animation: `pulse-glow 1.2s ease-in-out ${i * 0.2}s infinite`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Sample Questions */}
            <div className="mb-3 flex-shrink-0">
              <div style={{ color: "#334155", fontSize: 11, marginBottom: 6 }}>SUGGESTED QUESTIONS</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {SAMPLE_QUESTIONS.slice(0, 3).map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    style={{
                      padding: "4px 10px",
                      borderRadius: 20,
                      fontSize: 11,
                      cursor: "pointer",
                      background: "rgba(139,92,246,0.08)",
                      color: "#8B5CF6",
                      border: "1px solid rgba(139,92,246,0.15)",
                      textAlign: "left",
                    }}
                  >
                    {q.length > 45 ? q.slice(0, 45) + "..." : q}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="relative flex-1">
                <input
                  className="input-glass pr-10"
                  placeholder="Ask about your brand's performance..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  id="ai-chat-input"
                />
                <Mic
                  size={15}
                  style={{
                    position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
                    color: "#475569", cursor: "pointer",
                  }}
                />
              </div>
              <button
                onClick={() => sendMessage()}
                style={{
                  width: 42, height: 42, borderRadius: 12,
                  background: "linear-gradient(135deg, #00D4FF, #8B5CF6)",
                  border: "none", display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", flexShrink: 0,
                  boxShadow: "0 4px 15px rgba(0,212,255,0.25)",
                }}
              >
                <Send size={15} color="white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
