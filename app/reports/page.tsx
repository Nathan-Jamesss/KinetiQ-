import type { Metadata } from "next";
import { FileText, Download, Share2, Lock } from "lucide-react";

export const metadata: Metadata = {
  title: "Clinical Reports — KinetiQ",
  description: "Generate and export clinical MDS-UPDRS reports.",
};

export default function ReportsPage() {
  return (
    <div style={{ padding: "36px 40px", maxWidth: 900 }}>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 32 }}>
        <div>
          <div style={{ fontSize: 12, color: "var(--kq-muted)", fontWeight: 600, letterSpacing: "0.5px", marginBottom: 8, textTransform: "uppercase" }}>
            Data Export
          </div>
          <h1 className="font-display" style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-0.5px" }}>
            Clinical Reports
          </h1>
        </div>
      </div>

      <div style={{
        background: "linear-gradient(135deg, rgba(124,58,237,0.08), rgba(99,102,241,0.05))",
        border: "1px solid rgba(124,58,237,0.3)",
        borderRadius: 16, padding: "40px", textAlign: "center",
      }}>
        <div style={{
          width: 64, height: 64, borderRadius: "50%", background: "rgba(124,58,237,0.15)",
          display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px"
        }}>
          <Lock size={32} color="#a78bfa" />
        </div>
        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}>Pro Feature Locked</h2>
        <p style={{ fontSize: 15, color: "var(--kq-muted)", maxWidth: 500, margin: "0 auto 30px", lineHeight: 1.6 }}>
          Upgrade to KinetiQ Pro to automatically generate beautiful, HIPAA-compliant PDF reports containing your MDS-UPDRS trends and session logs to share directly with your neurologist.
        </p>
        <button style={{
          padding: "14px 32px", fontSize: 15, fontWeight: 600,
          background: "linear-gradient(135deg, #7c3aed, #a78bfa)", border: "none",
          borderRadius: 12, color: "#fff", cursor: "pointer",
          boxShadow: "0 0 20px rgba(124,58,237,0.4)"
        }}>
          Upgrade to Pro
        </button>

        <div style={{ marginTop: 40, borderTop: "1px solid rgba(124,58,237,0.2)", paddingTop: 30, display: "flex", gap: 20, justifyContent: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <FileText size={20} color="var(--kq-muted)" /> <span style={{ color: "var(--kq-muted)" }}>Export PDF/CSV</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Share2 size={20} color="var(--kq-muted)" /> <span style={{ color: "var(--kq-muted)" }}>Secure Clinician Links</span>
          </div>
        </div>
      </div>
    </div>
  );
}
