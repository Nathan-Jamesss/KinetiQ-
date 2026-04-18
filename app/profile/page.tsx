import type { Metadata } from "next";
import { User, Activity, AlertCircle, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "Patient Profile — KinetiQ",
  description: "View and edit your KinetiQ patient profile and clinical data.",
};

export default function ProfilePage() {
  return (
    <div style={{ padding: "40px", maxWidth: 860 }}>
      {/* Header */}
      <div style={{ marginBottom: 40 }}>
        <div style={{ fontSize: 13, color: "var(--kq-muted)", fontWeight: 500, marginBottom: 8 }}>
          Account Details
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 300, letterSpacing: "-0.5px", color: "var(--kq-text)" }}>
          Your Profile
        </h1>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 24 }}>
        {/* Basic Info */}
        <div className="metric-card" style={{ padding: "40px", display: "flex", gap: 32, alignItems: "center", flexWrap: "wrap" }}>
          <div style={{
            width: 100, height: 100, borderRadius: "50%",
            background: "var(--kq-surface)", border: "1px solid var(--kq-border)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 40, fontWeight: 300, color: "var(--kq-text)",
          }}>
            J
          </div>
          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 8 }}>John Doe</h2>
            <div style={{ display: "flex", gap: 16, color: "var(--kq-muted)", fontSize: 14, marginBottom: 16 }}>
              <span>Age: 62</span>
              <span>•</span>
              <span>Male</span>
              <span>•</span>
              <span>Joined April 2026</span>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <div style={{ padding: "6px 14px", borderRadius: 20, background: "var(--kq-surface)", border: "1px solid var(--kq-border)", color: "var(--kq-text)", fontSize: 12, fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 6 }}>
                <Award size={14} color="var(--kq-accent)" /> Active Member
              </div>
            </div>
          </div>
          <div>
            <button className="btn-ghost" style={{ padding: "12px 24px" }}>Edit Profile</button>
          </div>
        </div>

        {/* Clinical Profile */}
        <div className="metric-card" style={{ padding: "40px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32 }}>
            <Activity color="var(--kq-accent)" size={24} />
            <h2 style={{ fontSize: 20, fontWeight: 600 }}>History</h2>
          </div>
          
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
            <div>
              <div style={{ fontSize: 13, color: "var(--kq-muted)", marginBottom: 6 }}>Diagnosis</div>
              <div style={{ fontSize: 16, fontWeight: 500 }}>Idiopathic Parkinson's Disease</div>
            </div>
            <div>
              <div style={{ fontSize: 13, color: "var(--kq-muted)", marginBottom: 6 }}>Years since diagnosis</div>
              <div style={{ fontSize: 16, fontWeight: 500 }}>3 Years (2023)</div>
            </div>
            <div>
              <div style={{ fontSize: 13, color: "var(--kq-muted)", marginBottom: 6 }}>Stage</div>
              <div style={{ fontSize: 16, fontWeight: 500 }}>Stage 2 (Bilateral involvement)</div>
            </div>
            <div>
              <div style={{ fontSize: 13, color: "var(--kq-muted)", marginBottom: 6 }}>Dominant Hand</div>
              <div style={{ fontSize: 16, fontWeight: 500 }}>Right</div>
            </div>
          </div>
        </div>

        {/* Medications */}
        <div className="metric-card" style={{ padding: "40px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32 }}>
            <AlertCircle color="var(--kq-warn)" size={24} />
            <h2 style={{ fontSize: 20, fontWeight: 600 }}>Active Medications</h2>
          </div>
          
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ padding: "20px", background: "var(--kq-bg)", borderRadius: 12, border: "1px solid var(--kq-border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 16, fontWeight: 500, marginBottom: 4 }}>Carbidopa / Levodopa</div>
                <div style={{ fontSize: 14, color: "var(--kq-muted)" }}>25/100mg · 3 times daily</div>
              </div>
              <span style={{ fontSize: 12, background: "var(--kq-surface)", color: "var(--kq-text)", border: "1px solid var(--kq-border)", padding: "4px 10px", borderRadius: 6, fontWeight: 500 }}>Active</span>
            </div>
            <div style={{ padding: "20px", background: "var(--kq-bg)", borderRadius: 12, border: "1px solid var(--kq-border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 16, fontWeight: 500, marginBottom: 4 }}>Pramipexole</div>
                <div style={{ fontSize: 14, color: "var(--kq-muted)" }}>0.5mg · 1 time daily</div>
              </div>
              <span style={{ fontSize: 12, background: "var(--kq-surface)", color: "var(--kq-text)", border: "1px solid var(--kq-border)", padding: "4px 10px", borderRadius: 6, fontWeight: 500 }}>Active</span>
            </div>
          </div>
          <button className="btn-ghost" style={{ marginTop: 24, width: "100%", padding: "16px", borderStyle: "solid", background: "var(--kq-surface)" }}>
            + Update Medications
          </button>
        </div>
      </div>
    </div>
  );
}
