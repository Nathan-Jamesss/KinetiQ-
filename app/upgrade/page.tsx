"use client";
import { Crown, Check } from "lucide-react";
import Link from "next/link";

const features = [
  "Advanced Weekly & Yearly Analytics",
  "AI Symptom Progression Insights (powered by Gemini)",
  "Auto-generated PDF Clinical Reports",
  "Doctor Portal & Secure Sharing Links",
  "Adaptive CR Mode (Biofeedback-driven)",
  "Sleep Protocol Delivery Mode",
  "Wearable Integration (Apple Watch/Fitbit)",
];

export default function UpgradePage() {
  return (
    <div style={{ padding: "40px", maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
      <div style={{
        width: 64, height: 64, borderRadius: "50%", background: "linear-gradient(135deg, rgba(124,58,237,0.2), rgba(99,102,241,0.1))",
        display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px",
        border: "1px solid rgba(124,58,237,0.4)"
      }}>
        <Crown size={32} color="#a78bfa" />
      </div>
      
      <h1 className="font-display" style={{ fontSize: 36, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 16 }}>
        Upgrade to KinetiQ <span style={{ background: "linear-gradient(135deg, #7c3aed, #a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Pro</span>
      </h1>
      
      <p style={{ fontSize: 16, color: "var(--kq-muted)", lineHeight: 1.6, maxWidth: 500, margin: "0 auto 40px" }}>
        Unlock the full clinical power of the KinetiQ platform. Advanced analytics, AI insights, and seamless neurologist integration.
      </p>

      <div className="metric-card" style={{ padding: "40px", textAlign: "left", display: "inline-block", width: "100%", maxWidth: 500 }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Pro Subscription</h2>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 32 }}>
          <span style={{ fontSize: 36, fontWeight: 800 }}>$19</span>
          <span style={{ fontSize: 16, color: "var(--kq-muted)" }}>/month</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 40 }}>
          {features.map((feature, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
              <div style={{ width: 20, height: 20, borderRadius: "50%", background: "rgba(10,245,200,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                <Check size={12} color="#0af5c8" />
              </div>
              <span style={{ fontSize: 15, color: "var(--kq-text)" }}>{feature}</span>
            </div>
          ))}
        </div>

        <button style={{
          width: "100%", padding: "16px", fontSize: 16, fontWeight: 700,
          background: "linear-gradient(135deg, #7c3aed, #a78bfa)", border: "none",
          borderRadius: 12, color: "#fff", cursor: "pointer",
          boxShadow: "0 0 20px rgba(124,58,237,0.4)", marginBottom: 16,
          transition: "transform 0.2s"
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
        onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}>
          Subscribe Now
        </button>
        <div style={{ textAlign: "center", fontSize: 12, color: "var(--kq-muted)" }}>
          Cancel anytime. Secure checkout via Stripe.
        </div>
      </div>
      
      <div style={{ marginTop: 32 }}>
        <Link href="/dashboard" style={{ fontSize: 14, color: "var(--kq-muted)", textDecoration: "none" }}>
          Maybe later, return to dashboard
        </Link>
      </div>
    </div>
  );
}
