"use client";
import Link from "next/link";
import { formatDuration } from "@/lib/utils";
import { Calendar, Clock, Star, Download, Filter, Moon, Heart, Activity } from "lucide-react";

const mockHistory = [
  { id: 1, date: "Apr 17, 2026", time: "07:45 AM", mode: "Standard Protocol", duration: 7200, score: 4, compliance: 100 },
  { id: 2, date: "Apr 16, 2026", time: "08:10 AM", mode: "Varied Routine", duration: 6900, score: 4, compliance: 96 },
  { id: 3, date: "Apr 16, 2026", time: "07:30 PM", mode: "Standard Protocol", duration: 7200, score: 3, compliance: 100 },
  { id: 4, date: "Apr 15, 2026", time: "08:00 AM", mode: "Standard Protocol", duration: 7200, score: 5, compliance: 100 },
  { id: 5, date: "Apr 14, 2026", time: "09:00 AM", mode: "Gentle Start", duration: 1800, score: 4, compliance: 100 },
  { id: 6, date: "Apr 13, 2026", time: "07:50 AM", mode: "Standard Protocol", duration: 7200, score: 4, compliance: 100 },
  { id: 7, date: "Apr 13, 2026", time: "08:15 PM", mode: "Evening Rest", duration: 2700, score: 5, compliance: 100 },
];

export default function HistoryPage() {
  return (
    <div style={{ padding: "40px", maxWidth: 1000 }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 32, flexWrap: "wrap", gap: 20 }}>
        <div>
          <div style={{ fontSize: 13, color: "var(--kq-muted)", fontWeight: 500, marginBottom: 8 }}>
            Session Log
          </div>
          <h1 style={{ fontSize: 32, fontWeight: 300, letterSpacing: "-0.5px", color: "var(--kq-text)" }}>
            History & Reports
          </h1>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <button className="btn-ghost" style={{ padding: "10px 16px", fontSize: 13, display: "flex", alignItems: "center", gap: 8 }}>
            <Filter size={16} /> Filter
          </button>
          <button className="btn-ghost" style={{ padding: "10px 16px", fontSize: 13, display: "flex", alignItems: "center", gap: 8 }}>
            <Download size={16} /> Export CSV
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginBottom: 32 }}>
        <div className="metric-card" style={{ padding: "24px" }}>
          <div style={{ fontSize: 13, color: "var(--kq-muted)", marginBottom: 8 }}>Total Sessions</div>
          <div style={{ fontSize: 28, fontWeight: 300, color: "var(--kq-text)" }}>142</div>
        </div>
        <div className="metric-card" style={{ padding: "24px" }}>
          <div style={{ fontSize: 13, color: "var(--kq-muted)", marginBottom: 8 }}>Total Time</div>
          <div style={{ fontSize: 28, fontWeight: 300, color: "var(--kq-text)" }}>268 hrs</div>
        </div>
        <div className="metric-card" style={{ padding: "24px" }}>
          <div style={{ fontSize: 13, color: "var(--kq-muted)", marginBottom: 8 }}>Avg. Comfort</div>
          <div style={{ fontSize: 28, fontWeight: 300, color: "var(--kq-text)", display: "flex", alignItems: "baseline", gap: 6 }}>
            4.2 <span style={{ fontSize: 14, color: "var(--kq-muted)" }}>/ 5</span>
          </div>
        </div>
      </div>

      {/* History List */}
      <div className="metric-card" style={{ padding: 0 }}>
        {mockHistory.map((session, i) => (
          <div key={session.id} style={{
            padding: "20px 24px",
            borderBottom: i < mockHistory.length - 1 ? "1px solid var(--kq-border)" : "none",
            display: "flex", alignItems: "center", gap: 24,
            transition: "background 0.2s",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = "var(--kq-surface)"}
          onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
            
            {/* Icon */}
            <div style={{
              width: 48, height: 48, borderRadius: 12,
              background: "#fff", border: "1px solid var(--kq-border)",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>
              {session.mode.includes("Rest") ? <Moon size={20} color="var(--kq-accent)" /> : session.mode.includes("Gentle") ? <Heart size={20} color="var(--kq-accent)" /> : <Activity size={20} color="var(--kq-accent)" />}
            </div>

            {/* Details */}
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 16, fontWeight: 600, color: "var(--kq-text)", marginBottom: 6 }}>{session.mode}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 16, color: "var(--kq-muted)", fontSize: 13 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}><Calendar size={14} /> {session.date}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}><Clock size={14} /> {session.time}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  Duration: <strong style={{ color: "var(--kq-text)", fontWeight: 500 }}>{formatDuration(session.duration)}</strong>
                </div>
              </div>
            </div>

            {/* Score & Compliance */}
            <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 12, color: "var(--kq-muted)", marginBottom: 4 }}>Completion</div>
                <div style={{ fontSize: 15, fontWeight: 600, color: "var(--kq-text)" }}>
                  {session.compliance}%
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 12, color: "var(--kq-muted)", marginBottom: 4 }}>Comfort</div>
                <div style={{ display: "flex", gap: 4 }}>
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} size={14} fill={j < session.score ? "var(--kq-accent)" : "none"} color={j < session.score ? "var(--kq-accent)" : "var(--kq-border)"} />
                  ))}
                </div>
              </div>
              
              <Link href="/reports">
                <button className="btn-ghost" style={{ padding: "10px 16px", fontSize: 13, borderRadius: 8 }}>
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
