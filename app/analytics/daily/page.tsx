"use client";
import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area, ReferenceLine, ScatterChart, Scatter, ZAxis } from "recharts";
import { Calendar, ChevronLeft, ChevronRight, Activity } from "lucide-react";
import Link from "next/link";

const dailySymptomData = [
  { time: "08:00", tremor: 7, rigidity: 6 },
  { time: "10:00", tremor: 8, rigidity: 7 },
  { time: "12:00", tremor: 6, rigidity: 6 },
  { time: "14:00", tremor: 5, rigidity: 5 },
  { time: "16:00", tremor: 7, rigidity: 6 },
  { time: "18:00", tremor: 5, rigidity: 4 },
  { time: "20:00", tremor: 8, rigidity: 8 },
  { time: "22:00", tremor: 7, rigidity: 7 },
];

export default function DailyAnalyticsPage() {
  const [date, setDate] = useState("April 17, 2026");

  return (
    <div style={{ padding: "40px", maxWidth: 1100 }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 32 }}>
        <div>
          <div style={{ fontSize: 13, color: "var(--kq-muted)", fontWeight: 500, marginBottom: 8 }}>
            Analytics
          </div>
          <h1 style={{ fontSize: 32, fontWeight: 300, letterSpacing: "-0.5px", color: "var(--kq-text)" }}>
            Daily Summary
          </h1>
        </div>
        <div style={{ display: "flex", background: "var(--kq-surface)", borderRadius: 12, border: "1px solid var(--kq-border)", padding: 4 }}>
          <button className="btn-ghost" style={{ padding: "8px", border: "none", background: "transparent" }}><ChevronLeft size={16} /></button>
          <div style={{ padding: "0 16px", display: "flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 500 }}>
            <Calendar size={14} /> {date}
          </div>
          <button className="btn-ghost" style={{ padding: "8px", border: "none", background: "transparent" }}><ChevronRight size={16} /></button>
        </div>
      </div>

      {/* Nav Tabs */}
      <div style={{ display: "flex", gap: 24, marginBottom: 32, borderBottom: "1px solid var(--kq-border)" }}>
        <div style={{ padding: "0 4px 16px", borderBottom: "2px solid var(--kq-accent)", color: "var(--kq-text)", fontWeight: 600, fontSize: 14 }}>Daily Summary</div>
        <Link href="/analytics/weekly" style={{ padding: "0 4px 16px", color: "var(--kq-muted)", fontWeight: 500, fontSize: 14, textDecoration: "none" }}>Weekly Trends</Link>
      </div>

      {/* Summary Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, marginBottom: 24 }}>
        <div className="metric-card" style={{ padding: "24px" }}>
          <div style={{ fontSize: 13, color: "var(--kq-muted)", marginBottom: 8 }}>Sessions Completed</div>
          <div style={{ fontSize: 28, fontWeight: 300 }}>2 <span style={{ fontSize: 16, color: "var(--kq-muted)", fontWeight: 400 }}>/ 2</span></div>
        </div>
        <div className="metric-card" style={{ padding: "24px" }}>
          <div style={{ fontSize: 13, color: "var(--kq-muted)", marginBottom: 8 }}>Time Spent</div>
          <div style={{ fontSize: 28, fontWeight: 300, color: "var(--kq-text)" }}>3h 55m</div>
        </div>
        <div className="metric-card" style={{ padding: "24px" }}>
          <div style={{ fontSize: 13, color: "var(--kq-muted)", marginBottom: 8 }}>Avg Ease (Reported)</div>
          <div style={{ fontSize: 28, fontWeight: 300, color: "var(--kq-text)" }}>6.6 <span style={{ fontSize: 14, color: "var(--kq-muted)", fontWeight: 400 }}>(out of 10)</span></div>
        </div>
        <div className="metric-card" style={{ padding: "24px" }}>
          <div style={{ fontSize: 13, color: "var(--kq-muted)", marginBottom: 8 }}>Avg Comfort</div>
          <div style={{ fontSize: 28, fontWeight: 300, color: "var(--kq-text)" }}>6.1 <span style={{ fontSize: 14, color: "var(--kq-muted)", fontWeight: 400 }}>(out of 10)</span></div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 24, alignItems: "start" }}>
        {/* Main Chart */}
        <div className="metric-card" style={{ padding: "32px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
            <div>
              <h2 style={{ fontSize: 18, fontWeight: 600 }}>Symptom Fluctuations & Therapy</h2>
              <p style={{ fontSize: 14, color: "var(--kq-muted)", marginTop: 4 }}>Comfort levels vs. therapy periods over the day</p>
            </div>
            <div style={{ display: "flex", gap: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 10, height: 10, borderRadius: 2, background: "var(--kq-accent)" }} />
                <span style={{ fontSize: 12, color: "var(--kq-muted)" }}>Tremor Comfort</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 10, height: 10, borderRadius: 2, background: "var(--kq-accent2)" }} />
                <span style={{ fontSize: 12, color: "var(--kq-muted)" }}>Rigidity Comfort</span>
              </div>
            </div>
          </div>
          
          <div style={{ width: "100%", height: 320 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dailySymptomData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorTremor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#9e816a" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#9e816a" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorRigid" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#bda18a" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#bda18a" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" stroke="var(--kq-border)" tick={{ fill: "var(--kq-muted)", fontSize: 12 }} />
                <YAxis stroke="var(--kq-border)" tick={{ fill: "var(--kq-muted)", fontSize: 12 }} domain={[0, 10]} />
                <Tooltip />
                <ReferenceLine x="08:00" stroke="#6d8f72" strokeDasharray="3 3" label={{ position: 'top', value: 'Session Start', fill: '#6d8f72', fontSize: 11 }} />
                <ReferenceLine x="10:00" stroke="#ba5c5c" strokeDasharray="3 3" label={{ position: 'top', value: 'Session End', fill: '#ba5c5c', fontSize: 11 }} />
                
                <ReferenceLine x="18:00" stroke="#6d8f72" strokeDasharray="3 3" />
                <ReferenceLine x="20:00" stroke="#ba5c5c" strokeDasharray="3 3" />

                <Area type="monotone" dataKey="tremor" stroke="#9e816a" strokeWidth={3} fillOpacity={1} fill="url(#colorTremor)" />
                <Area type="monotone" dataKey="rigidity" stroke="#bda18a" strokeWidth={3} fillOpacity={1} fill="url(#colorRigid)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Timeline Log */}
        <div className="metric-card" style={{ padding: "32px" }}>
          <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 24 }}>Event Log</h2>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", left: 15, top: 10, bottom: 10, width: 2, background: "var(--kq-border)" }} />
            
            <div style={{ display: "flex", gap: 16, marginBottom: 24, position: "relative" }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--kq-surface)", border: "1px solid var(--kq-border)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1, flexShrink: 0 }}>
                <Activity size={14} color="var(--kq-accent)" />
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "var(--kq-text)" }}>Morning Session</div>
                <div style={{ fontSize: 12, color: "var(--kq-muted)", marginTop: 4 }}>07:45 AM - 09:45 AM · 2h 00m</div>
                <div style={{ fontSize: 12, color: "var(--kq-text)", marginTop: 4 }}>Comfort level: High</div>
              </div>
            </div>

            <div style={{ display: "flex", gap: 16, marginBottom: 24, position: "relative" }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--kq-surface)", border: "1px solid var(--kq-border)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1, flexShrink: 0 }}>
                <span style={{ fontSize: 10, color: "var(--kq-muted)" }}>MED</span>
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "var(--kq-text)" }}>Medication: Levodopa</div>
                <div style={{ fontSize: 12, color: "var(--kq-muted)", marginTop: 4 }}>01:30 PM</div>
              </div>
            </div>

            <div style={{ display: "flex", gap: 16, position: "relative" }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--kq-surface)", border: "1px solid var(--kq-border)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1, flexShrink: 0 }}>
                <Activity size={14} color="var(--kq-accent)" />
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "var(--kq-text)" }}>Evening Session</div>
                <div style={{ fontSize: 12, color: "var(--kq-muted)", marginTop: 4 }}>07:30 PM - 09:25 PM · 1h 55m</div>
                <div style={{ fontSize: 12, color: "var(--kq-text)", marginTop: 4 }}>Comfort level: High</div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
