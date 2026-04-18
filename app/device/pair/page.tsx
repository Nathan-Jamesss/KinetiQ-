"use client";
import React, { useState, useEffect } from "react";
import ParticleSpotlightBg from "@/components/ui/particle-spotlight-bg";
import { Bluetooth, BluetoothSearching, CheckCircle2, ChevronRight, Cpu, Radio, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function PairPage() {
  const [step, setStep] = useState<"intro" | "searching" | "confirming" | "success">("intro");
  const [foundGloves, setFoundGloves] = useState(false);

  useEffect(() => {
    if (step === "searching") {
      const timer = setTimeout(() => {
        setFoundGloves(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  return (
    <div style={{ position: "relative", minHeight: "100vh", width: "100%", overflow: "hidden", background: "#05060f" }}>
      <ParticleSpotlightBg />

      <div style={{ position: "absolute", inset: 0, zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px" }}>
        
        {step === "intro" && (
          <div style={{ maxWidth: 600, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 32 }}>
            <div style={{ 
              width: 120, height: 120, borderRadius: 60, background: "rgba(0, 242, 255, 0.05)", 
              display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid var(--kq-border)" 
            }}>
              <Bluetooth size={48} color="var(--kq-accent)" strokeWidth={1.5} />
            </div>
            <div>
              <h1 className="font-display" style={{ fontSize: 44, fontWeight: 900, color: "#fff", letterSpacing: "-1.5px" }}>Pair Your Gloves</h1>
              <p style={{ color: "var(--kq-muted)", fontSize: 18, marginTop: 12, lineHeight: 1.6 }}>
                Ensure your KinetiQ gloves are powered on and within 3 feet of your device to begin the initialization.
              </p>
            </div>
            <button 
              onClick={() => setStep("searching")}
              style={{
                background: "var(--kq-accent)", color: "#05060f", border: "none",
                padding: "18px 48px", borderRadius: 40, fontSize: 16, fontWeight: 800,
                cursor: "pointer", display: "flex", alignItems: "center", gap: 12,
                boxShadow: "0 0 40px rgba(0,242,255,0.3)", transition: "all 0.2s ease",
                textTransform: "uppercase", letterSpacing: "2px"
              }}
            >
              Start Discovery <ChevronRight size={20} />
            </button>
          </div>
        )}

        {step === "searching" && (
          <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 48 }}>
            <div style={{ position: "relative", width: 300, height: 300, display: "flex", alignItems: "center", justifyContent: "center" }}>
              {/* Radar Rings */}
              {[1, 2, 3].map(i => (
                <div key={i} style={{
                  position: "absolute", width: "100%", height: "100%", borderRadius: "50%",
                  border: "1px solid var(--kq-accent)", opacity: 0,
                  animation: `radar-ripple 3s infinite ${i}s ease-out`
                }} />
              ))}
              <div style={{ 
                width: 100, height: 100, borderRadius: 50, background: "var(--kq-accent)", 
                display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2
              }}>
                <BluetoothSearching size={40} color="#05060f" />
              </div>
              
              {foundGloves && (
                <>
                  <div 
                    onClick={() => setStep("confirming")}
                    style={{ 
                      position: "absolute", top: "10%", right: "10%", padding: "12px 20px", 
                      background: "rgba(0, 242, 255, 0.1)", border: "1px solid var(--kq-accent)", 
                      borderRadius: 16, cursor: "pointer", animation: "fade-in 0.5s forwards",
                      display: "flex", alignItems: "center", gap: 10
                    }}
                  >
                    <Radio size={16} color="var(--kq-accent)" />
                    <span style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>KinetiQ_L_v4</span>
                  </div>
                  <div 
                    onClick={() => setStep("confirming")}
                    style={{ 
                      position: "absolute", bottom: "15%", left: "5%", padding: "12px 20px", 
                      background: "rgba(0, 242, 255, 0.1)", border: "1px solid var(--kq-accent)", 
                      borderRadius: 16, cursor: "pointer", animation: "fade-in 0.5s forwards 0.2s",
                      display: "flex", alignItems: "center", gap: 10
                    }}
                  >
                    <Radio size={16} color="var(--kq-accent)" />
                    <span style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>KinetiQ_R_v4</span>
                  </div>
                </>
              )}
            </div>

            <div style={{ maxWidth: 400 }}>
              <h2 style={{ fontSize: 24, fontWeight: 800, color: "#fff" }}>
                {foundGloves ? "Nearby Gloves Detected" : "Scanning for Bluetooth Devices..."}
              </h2>
              <p style={{ color: "var(--kq-muted)", marginTop: 8 }}>
                {foundGloves ? "Select your detected gloves to establish a secure link." : "Keep your gloves close and in pairing mode."}
              </p>
            </div>

            <style>{`
              @keyframes radar-ripple {
                0% { transform: scale(0.2); opacity: 0.8; }
                100% { transform: scale(1.5); opacity: 0; }
              }
              @keyframes fade-in {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
              }
            `}</style>
          </div>
        )}

        {step === "confirming" && (
          <div style={{ maxWidth: 500, width: "100%", background: "rgba(157, 195, 247, 0.03)", border: "1px solid var(--kq-border)", borderRadius: 32, padding: "48px", textAlign: "center" }}>
            <Cpu size={56} color="var(--kq-accent)" style={{ marginBottom: 24 }} />
            <h2 style={{ fontSize: 32, fontWeight: 900, color: "#fff", letterSpacing: "-1px" }}>Establish Link</h2>
            <p style={{ color: "var(--kq-muted)", marginTop: 12 }}>Securing encrypted vibrotactile channel...</p>
            
            <div style={{ marginTop: 40, display: "grid", gap: 12 }}>
              <div style={{ padding: "16px", background: "rgba(0, 242, 255, 0.05)", borderRadius: 16, border: "1px solid var(--kq-border)", display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontWeight: 600, color: "#fff" }}>Left Glove</span>
                <span style={{ color: "var(--kq-accent)", fontWeight: 700 }}>AUTHENTICATING</span>
              </div>
              <div style={{ padding: "16px", background: "rgba(0, 242, 255, 0.05)", borderRadius: 16, border: "1px solid var(--kq-border)", display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontWeight: 600, color: "#fff" }}>Right Glove</span>
                <span style={{ color: "var(--kq-accent)", fontWeight: 700 }}>AUTHENTICATING</span>
              </div>
            </div>

            <button 
              onClick={() => setStep("success")}
              style={{
                width: "100%", marginTop: 40, background: "var(--kq-accent)", color: "#05060f", border: "none",
                padding: "18px", borderRadius: 40, fontSize: 16, fontWeight: 800, cursor: "pointer",
                textTransform: "uppercase", letterSpacing: "1px"
              }}
            >
              Confirm Connection
            </button>
          </div>
        )}

        {step === "success" && (
          <div style={{ maxWidth: 500, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 32 }}>
            <div style={{ padding: 20, borderRadius: "50%", background: "rgba(57, 255, 20, 0.1)", border: "2px solid #39ff14" }}>
              <CheckCircle2 size={64} color="#39ff14" />
            </div>
            <div>
              <h1 style={{ fontSize: 44, fontWeight: 900, color: "#fff", letterSpacing: "-1.5px" }}>Initialization Complete</h1>
              <p style={{ color: "var(--kq-muted)", fontSize: 18, marginTop: 12, lineHeight: 1.6 }}>
                Your KinetiQ gloves are successfully synced and ready for your first therapy session.
              </p>
            </div>
            
            <div style={{ width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div style={{ padding: 20, background: "rgba(186, 215, 247, 0.03)", borderRadius: 20, border: "1px solid var(--kq-border)" }}>
                <div style={{ fontSize: 10, color: "var(--kq-muted)", textTransform: "uppercase", letterSpacing: "1px" }}>Signal</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: "#fff" }}>98% Strength</div>
              </div>
              <div style={{ padding: 20, background: "rgba(186, 215, 247, 0.03)", borderRadius: 20, border: "1px solid var(--kq-border)" }}>
                <div style={{ fontSize: 10, color: "var(--kq-muted)", textTransform: "uppercase", letterSpacing: "1px" }}>Latency</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: "#fff" }}>1.2 ms</div>
              </div>
            </div>

            <Link href="/" style={{ textDecoration: "none", width: "100%" }}>
              <button 
                style={{
                  width: "100%", background: "#fff", color: "#05060f", border: "none",
                  padding: "18px", borderRadius: 40, fontSize: 16, fontWeight: 800, cursor: "pointer",
                  textTransform: "uppercase", letterSpacing: "2px", boxShadow: "0 0 30px rgba(255,255,255,0.2)"
                }}
              >
                Go to Dashboard
              </button>
            </Link>
          </div>
        )}

        {/* Back Link */}
        <Link href="/" style={{ position: "fixed", bottom: 40, color: "var(--kq-muted)", fontSize: 12, textTransform: "uppercase", letterSpacing: "2px", textDecoration: "none" }}>
          Cancel Initialization
        </Link>

      </div>
    </div>
  );
}
