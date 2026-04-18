"use client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";
import Link from "next/link";
import { Brain, FileText } from "lucide-react";

const weeklySymptomData = [
  { week: "Week 1", tremor: 18, rigidity: 14, bradykinesia: 12 },
  { week: "Week 2", tremor: 16, rigidity: 13, bradykinesia: 12 },
  { week: "Week 3", tremor: 16, rigidity: 12, bradykinesia: 11 },
  { week: "Week 4", tremor: 14, rigidity: 11, bradykinesia: 9 }, // Current
];

const weeklyTherapyData = [
  { week: "Week 1", hours: 22, target: 28 },
  { week: "Week 2", hours: 24, target: 28 },
  { week: "Week 3", hours: 26, target: 28 },
  { week: "Week 4", hours: 20, target: 28 }, // In progress
];

export default function WeeklyAnalyticsPage() {
  return (
    <div style={{ padding: "40px", maxWidth: 1100 }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 32 }}>
        <div>
          <div style={{ fontSize: 13, color: "var(--kq-muted)", fontWeight: 500, marginBottom: 8 }}>
            Analytics
          </div>
          <h1 style={{ fontSize: 32, fontWeight: 300, letterSpacing: "-0.5px", display: "flex", alignItems: "center", gap: 12, color: "var(--kq-text)" }}>
            Weekly Trends
          </h1>
        </div>
      </div>

      {/* Nav Tabs */}
      <div style={{ display: "flex", gap: 24, marginBottom: 32, borderBottom: "1px solid var(--kq-border)" }}>
        <Link href="/analytics/daily" style={{ padding: "0 4px 16px", color: "var(--kq-muted)", fontWeight: 500, fontSize: 14, textDecoration: "none" }}>Daily Summary</Link>
        <div style={{ padding: "0 4px 16px", borderBottom: "2px solid var(--kq-accent)", color: "var(--kq-text)", fontWeight: 600, fontSize: 14 }}>Weekly Trends</div>
      </div>

      {/* Insight Box */}
      <div style={{
        background: "var(--kq-surface)",
        border: "1px solid var(--kq-border)", borderRadius: 16,
        padding: "32px", marginBottom: 40, display: "flex", gap: 20, alignItems: "flex-start",
      }}>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: "#fff", border: "1px solid var(--kq-border)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Brain size={20} color="var(--kq-text)" />
        </div>
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 600, color: "var(--kq-text)", marginBottom: 8 }}>Weekly Insight</h2>
          <p style={{ fontSize: 15, color: "var(--kq-muted)", lineHeight: 1.6, maxWidth: 800 }}>
            Your self-reported tremor relief scores have steadily improved over the last 4 weeks. 
            This aligns well with your consistent evening therapy routines. Try to maintain the 2-hour pre-sleep sessions for continued comfort.
          </p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        {/* Symptom Chart */}
        <div className="metric-card" style={{ padding: "32px" }}>
          <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 6 }}>Symptom Fluctuations</h2>
          <p style={{ fontSize: 14, color: "var(--kq-muted)", marginBottom: 32 }}>Lower scores mean greater comfort levels</p>
          
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklySymptomData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--kq-border)" vertical={false} />
                <XAxis dataKey="week" stroke="var(--kq-border)" tick={{ fill: "var(--kq-muted)", fontSize: 12 }} />
                <YAxis stroke="var(--kq-border)" tick={{ fill: "var(--kq-muted)", fontSize: 12 }} />
                <Tooltip cursor={{ fill: "var(--kq-surface)" }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 13, paddingTop: 16 }} />
                <Bar dataKey="tremor" name="Tremor" fill="#9e816a" radius={[4, 4, 0, 0]} />
                <Bar dataKey="rigidity" name="Rigidity" fill="#bda18a" radius={[4, 4, 0, 0]} />
                <Bar dataKey="bradykinesia" name="Movement Ease" fill="#8a9c8b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Therapy Hours Chart */}
        <div className="metric-card" style={{ padding: "32px" }}>
          <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 6 }}>Therapy Time Completed</h2>
          <p style={{ fontSize: 14, color: "var(--kq-muted)", marginBottom: 32 }}>Weekly duration compared to recommended targets</p>
          
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyTherapyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--kq-border)" vertical={false} />
                <XAxis dataKey="week" stroke="var(--kq-border)" tick={{ fill: "var(--kq-muted)", fontSize: 12 }} />
                <YAxis stroke="var(--kq-border)" tick={{ fill: "var(--kq-muted)", fontSize: 12 }} />
                <Tooltip cursor={{ fill: "var(--kq-surface)" }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 13, paddingTop: 16 }} />
                <Bar dataKey="hours" name="Actual Hours" fill="var(--kq-accent)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="target" name="Target (28h)" fill="var(--kq-border)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
