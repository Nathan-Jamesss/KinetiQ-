"use client";
import Link from "next/link";
import { Activity, Clock, Heart, TrendingUp, Calendar, Award, BarChart2, ChevronRight } from "lucide-react";

const recentSessions = [
  { date: "Today, 07:45 AM",       mode: "Standard Protocol", duration: "2h 00m", compliance: 100 },
  { date: "Yesterday, 08:10 AM",   mode: "Varied Routine",    duration: "1h 55m", compliance: 96  },
  { date: "Yesterday, 07:30 PM",   mode: "Standard Protocol", duration: "2h 00m", compliance: 100 },
  { date: "Apr 14, 09:00 AM",      mode: "Gentle Start",      duration: "30m",    compliance: 100 },
];

const weekData = [
  { day: "Mon", hours: 4.0 },
  { day: "Tue", hours: 3.8 },
  { day: "Wed", hours: 2.0 },
  { day: "Thu", hours: 4.0 },
  { day: "Fri", hours: 3.9 },
  { day: "Sat", hours: 2.0 },
  { day: "Sun", hours: 0   },
];

const monthData = [
  { week: "Wk 1", pct: 92 },
  { week: "Wk 2", pct: 88 },
  { week: "Wk 3", pct: 95 },
  { week: "Wk 4", pct: 78 },
];

const fingerEngagement = [
  { finger: "Index",  color: "#b5765c", pct: 26 },
  { finger: "Middle", color: "#c2956e", pct: 25 },
  { finger: "Ring",   color: "#8a9c8b", pct: 24 },
  { finger: "Pinky",  color: "#a68c99", pct: 25 },
];

const comfortTrend = [62, 65, 68, 66, 70, 74, 73, 77, 75, 80, 78, 82, 84, 86];

const MAX_HOURS = 4;

function StatCard({ icon: Icon, label, value, sub, accent }: {
  icon: React.ElementType; label: string; value: string; sub?: string; accent?: string;
}) {
  return (
    <div className="metric-card" style={{ padding: "22px 24px" }}>
      <div style={{
        width: 36, height: 36,
        background: accent ? `${accent}18` : "var(--kq-surface)",
        border: `1px solid ${accent ? `${accent}30` : "var(--kq-border)"}`,
        borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center",
        marginBottom: 16,
      }}>
        <Icon size={17} color={accent ?? "var(--kq-muted)"} />
      </div>
      <div style={{ fontSize: 26, fontWeight: 300, letterSpacing: "-0.5px", color: "var(--kq-text)", marginBottom: 6 }}>
        {value}
      </div>
      <div style={{ fontSize: 13, fontWeight: 500, color: "var(--kq-text)", marginBottom: 3 }}>{label}</div>
      {sub && <div style={{ fontSize: 12, color: "var(--kq-muted)" }}>{sub}</div>}
    </div>
  );
}

/* Mini sparkline using SVG */
function Sparkline({ data }: { data: number[] }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const W = 200; const H = 48;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * W;
    const y = H - ((v - min) / (max - min || 1)) * H;
    return `${x},${y}`;
  });
  const area = `M ${pts[0]} ` + pts.slice(1).map((p) => `L ${p}`).join(" ") + ` L ${W},${H} L 0,${H} Z`;
  const line = `M ${pts[0]} ` + pts.slice(1).map((p) => `L ${p}`).join(" ");

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: 48 }} preserveAspectRatio="none">
      <path d={area} fill="var(--kq-accent)" opacity={0.12} />
      <path d={line} fill="none" stroke="var(--kq-accent)" strokeWidth={2} strokeLinejoin="round" />
      <circle cx={pts[pts.length - 1].split(",")[0]} cy={pts[pts.length - 1].split(",")[1]} r={3.5} fill="var(--kq-accent)" />
    </svg>
  );
}

export default function Dashboard() {
  return (
    <div style={{ padding: "40px", maxWidth: 1100 }}>
      {/* Header */}
      <div style={{ marginBottom: 36, display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}>
        <div>
          <div style={{ fontSize: 13, color: "var(--kq-muted)", fontWeight: 500, marginBottom: 6 }}>
            Thursday, April 17
          </div>
          <h1 style={{ fontSize: 30, fontWeight: 300, letterSpacing: "-0.5px", marginBottom: 6, color: "var(--kq-text)" }}>
            Welcome back, John
          </h1>
          <p style={{ color: "var(--kq-muted)", fontSize: 14 }}>
            One session done today — you're on track.
          </p>
        </div>
        <Link href="/">
          <button className="btn-primary" style={{ padding: "13px 28px", fontSize: 14, borderRadius: 30 }}>
            Start Next Session
          </button>
        </Link>
      </div>

      {/* Stats grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))", gap: 16, marginBottom: 32 }}>
        <StatCard icon={Clock}     label="Time Today"          value="2h"        sub="Target: 4 hours"             accent="#9e816a" />
        <StatCard icon={Activity}  label="Sessions Completed"  value="1 / 2"     sub="Next: Evening routine"       accent="#6d8f72" />
        <StatCard icon={Award}     label="Consistent Days"     value="12"        sub="Personal best: 18"           accent="#b5765c" />
        <StatCard icon={TrendingUp} label="Comfort Trend"      value="↑ 86%"     sub="Improving vs last week"      accent="#8a9c8b" />
      </div>

      {/* Charts row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
        {/* Weekly hours bar chart */}
        <div className="metric-card" style={{ padding: "28px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
            <h2 style={{ fontSize: 16, fontWeight: 600 }}>This Week</h2>
            <Link href="/analytics/weekly" style={{ fontSize: 12, color: "var(--kq-muted)", textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>
              Full view <ChevronRight size={13} />
            </Link>
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: 140, paddingBottom: 4 }}>
            {weekData.map((d) => {
              const pct = d.hours / MAX_HOURS;
              const today = d.day === "Thu";
              return (
                <div key={d.day} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                  <div style={{ fontSize: 10, color: "var(--kq-muted)", height: 14 }}>{d.hours > 0 ? `${d.hours}h` : ""}</div>
                  <div style={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end", height: 100 }}>
                    <div style={{
                      width: "100%",
                      height: `${Math.max(pct * 100, d.hours > 0 ? 6 : 3)}%`,
                      background: today ? "var(--kq-accent)" : d.hours === 0 ? "var(--kq-surface)" : "var(--kq-accent2)",
                      borderRadius: "5px 5px 0 0",
                      transition: "height 0.4s ease",
                      opacity: pct >= 0.95 ? 1 : 0.65,
                    }} />
                  </div>
                  <div style={{ fontSize: 11, color: today ? "var(--kq-accent)" : d.hours === 0 ? "var(--kq-subtle)" : "var(--kq-text)", fontWeight: today ? 700 : 500 }}>{d.day}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Comfort trend sparkline */}
        <div className="metric-card" style={{ padding: "28px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
            <h2 style={{ fontSize: 16, fontWeight: 600 }}>Comfort Trend</h2>
            <span style={{ fontSize: 12, color: "var(--kq-success)", fontWeight: 600 }}>↑ Improving</span>
          </div>
          <div style={{ fontSize: 12, color: "var(--kq-muted)", marginBottom: 16 }}>14-day self-reported comfort score</div>
          <Sparkline data={comfortTrend} />
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
            <span style={{ fontSize: 11, color: "var(--kq-muted)" }}>14 days ago</span>
            <span style={{ fontSize: 11, color: "var(--kq-muted)" }}>Today</span>
          </div>
        </div>
      </div>

      {/* Analytics row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 360px", gap: 20, marginBottom: 20, alignItems: "start" }}>
        {/* Monthly compliance */}
        <div className="metric-card" style={{ padding: "28px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
            <h2 style={{ fontSize: 16, fontWeight: 600 }}>Monthly Compliance</h2>
            <BarChart2 size={16} color="var(--kq-muted)" />
          </div>
          <div style={{ display: "flex", gap: 12, alignItems: "flex-end", height: 100 }}>
            {monthData.map((w) => (
              <div key={w.week} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <div style={{ fontSize: 11, color: "var(--kq-muted)" }}>{w.pct}%</div>
                <div style={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end", height: 70 }}>
                  <div style={{
                    width: "100%", height: `${w.pct}%`,
                    background: w.pct >= 90 ? "var(--kq-success)" : w.pct >= 80 ? "var(--kq-accent2)" : "var(--kq-warn)",
                    borderRadius: "5px 5px 0 0", opacity: 0.85,
                  }} />
                </div>
                <div style={{ fontSize: 11, color: "var(--kq-text)", fontWeight: 500 }}>{w.week}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Finger engagement */}
        <div className="metric-card" style={{ padding: "28px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
            <h2 style={{ fontSize: 16, fontWeight: 600 }}>Finger Balance</h2>
            <span style={{ fontSize: 11, color: "var(--kq-success)", fontWeight: 600 }}>Balanced</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {fingerEngagement.map((f) => (
              <div key={f.finger} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: f.color, flexShrink: 0 }} />
                <div style={{ fontSize: 12, color: "var(--kq-text)", width: 48, fontWeight: 500 }}>{f.finger}</div>
                <div style={{ flex: 1, height: 6, borderRadius: 3, background: "var(--kq-surface)", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${f.pct * 4}%`, background: f.color, borderRadius: 3, opacity: 0.8 }} />
                </div>
                <div style={{ fontSize: 11, color: "var(--kq-muted)", width: 30, textAlign: "right" }}>{f.pct}%</div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent sessions */}
        <div className="metric-card" style={{ padding: "28px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
            <h2 style={{ fontSize: 16, fontWeight: 600 }}>Latest Activity</h2>
            <Link href="/history" style={{ fontSize: 12, color: "var(--kq-muted)", textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>
              View all <ChevronRight size={13} />
            </Link>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {recentSessions.map((s, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "12px 14px", borderRadius: 10,
                background: "var(--kq-surface)", border: "1px solid var(--kq-border)",
              }}>
                <div style={{
                  width: 34, height: 34, borderRadius: 9,
                  background: "var(--kq-card)", border: "1px solid var(--kq-border)",
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}>
                  <Heart size={14} color="var(--kq-accent)" />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {s.mode}
                  </div>
                  <div style={{ fontSize: 11, color: "var(--kq-muted)" }}>{s.date} · {s.duration}</div>
                </div>
                <div style={{
                  fontSize: 10, fontWeight: 700, color: s.compliance === 100 ? "var(--kq-success)" : "var(--kq-warn)",
                  background: s.compliance === 100 ? "rgba(109,143,114,0.12)" : "rgba(214,145,94,0.12)",
                  padding: "3px 7px", borderRadius: 6, flexShrink: 0,
                }}>
                  {s.compliance}%
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Evening reminder */}
      <div style={{
        background: "var(--kq-surface)", border: "1px solid var(--kq-border)",
        borderRadius: 16, padding: "22px 28px",
        display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap",
      }}>
        <div style={{ width: 44, height: 44, borderRadius: 11, background: "var(--kq-card)", border: "1px solid var(--kq-border)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Calendar size={20} color="var(--kq-accent)" />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: "var(--kq-text)" }}>Evening Set Reminder</div>
          <div style={{ fontSize: 13, color: "var(--kq-muted)", marginTop: 2 }}>
            Scheduled at 7:00 PM · Standard Protocol · 2 hours
          </div>
        </div>
        <Link href="/reminders">
          <button className="btn-ghost" style={{ padding: "10px 22px", fontSize: 13, borderRadius: 10 }}>Manage Schedule</button>
        </Link>
      </div>
    </div>
  );
}
