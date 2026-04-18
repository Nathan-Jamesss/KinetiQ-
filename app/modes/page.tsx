"use client";
import React, { useState } from "react";
import Link from "next/link";
import { THERAPY_MODES } from "@/lib/utils";
import { Hand, Activity, Zap, Moon, Heart, ChevronRight, Info } from "lucide-react";

export default function ModesPage() {
  const [hoveredMode, setHoveredMode] = useState<string | null>(null);

  return (
    <div style={{ padding: "40px 60px", maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ marginBottom: 48 }}>
        <div style={{ fontSize: 13, color: "var(--kq-accent)", fontWeight: 800, letterSpacing: "2px", marginBottom: 12, textTransform: "uppercase" }}>
          Clinical Library
        </div>
        <h1 className="font-display" style={{ fontSize: 48, fontWeight: 900, letterSpacing: "-1.5px", marginBottom: 16, color: "var(--kq-text)" }}>
          Therapy Protocols
        </h1>
        <p style={{ color: "var(--kq-muted)", fontSize: 17, maxWidth: 700, lineHeight: 1.7, fontWeight: 500 }}>
          Scientifically-grounded Vibrotactile Coordinated Reset (vCR) routines designed to disrupt pathological neural synchrony.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))", gap: 32 }}>
        {THERAPY_MODES.map((mode) => (
          <div 
            key={mode.id} 
            className="metric-card" 
            style={{
              position: "relative",
              padding: "32px",
              minHeight: "420px",
              display: "flex",
              flexDirection: "column",
              background: "var(--kq-card)",
              borderRadius: "24px",
              boxShadow: hoveredMode === mode.id ? "0 20px 40px rgba(0,0,0,0.08)" : "0 4px 12px rgba(0,0,0,0.02)",
              transform: hoveredMode === mode.id ? "translateY(-8px)" : "translateY(0)",
              transition: "all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)",
              cursor: "pointer",
              overflow: "hidden"
            }}
            onMouseEnter={() => setHoveredMode(mode.id)}
            onMouseLeave={() => setHoveredMode(null)}
          >
            {/* Standard Content */}
            <div style={{ 
              opacity: hoveredMode === mode.id ? 0 : 1, 
              visibility: hoveredMode === mode.id ? "hidden" : "visible",
              transition: "all 0.3s ease",
              flex: 1
            }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
                <div style={{
                  width: 56, height: 56, borderRadius: "16px",
                  background: "var(--kq-surface)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  border: "1px solid var(--kq-border)"
                }}>
                  {mode.id.includes("warmup") ? <Heart color={mode.badgeColor} size={28} /> :
                   mode.id.includes("noisy") ? <Zap color={mode.badgeColor} size={28} /> :
                   mode.id.includes("sleep") ? <Moon color={mode.badgeColor} size={28} /> :
                   mode.id.includes("shuffle") ? <Activity color={mode.badgeColor} size={28} /> :
                   <Hand color={mode.badgeColor} size={28} />}
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 18, fontWeight: 800, color: "var(--kq-text)" }}>{mode.duration} min</div>
                  <div style={{ fontSize: 12, color: "var(--kq-muted)", fontWeight: 700, textTransform: "uppercase" }}>Session</div>
                </div>
              </div>

              <div style={{
                display: "inline-flex", marginBottom: 12,
                fontSize: 11, fontWeight: 800, padding: "4px 12px",
                borderRadius: 20, letterSpacing: "1px",
                background: "var(--kq-surface)",
                color: mode.badgeColor,
                textTransform: "uppercase",
                border: `1px solid var(--kq-border)`,
              }}>
                {mode.badge}
              </div>

              <h2 style={{ fontSize: 24, fontWeight: 800, color: "var(--kq-text)", marginBottom: 12 }}>{mode.name}</h2>
              <p style={{ fontSize: 15, color: "var(--kq-muted)", lineHeight: 1.6, marginBottom: 20 }}>
                {mode.description}
              </p>

              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {mode.targets.map((t) => (
                  <span key={t} style={{
                    fontSize: 11, padding: "6px 14px", borderRadius: 20,
                    background: "var(--kq-surface)", border: "1px solid var(--kq-border)",
                    color: "var(--kq-muted)", fontWeight: 700,
                  }}>{t}</span>
                ))}
              </div>
            </div>

            {/* Hover Info Overlay */}
            <div style={{
              position: "absolute",
              inset: 0,
              padding: "32px",
              background: "var(--kq-surface)",
              opacity: hoveredMode === mode.id ? 1 : 0,
              visibility: hoveredMode === mode.id ? "visible" : "hidden",
              transform: hoveredMode === mode.id ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)",
              display: "flex",
              flexDirection: "column",
              gap: 24,
              zIndex: 2
            }}>
              <div>
                <h3 style={{ fontSize: 12, fontWeight: 900, color: "var(--kq-accent)", textTransform: "uppercase", letterSpacing: "2px", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
                  <Zap size={14} /> Mechanism (How)
                </h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                  {mode.howItWorks?.map((point, i) => (
                    <li key={i} style={{ fontSize: 14, color: "var(--kq-text)", fontWeight: 600, display: "flex", gap: 12, alignItems: "flex-start" }}>
                      <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--kq-accent)", marginTop: 7, flexShrink: 0 }} />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 style={{ fontSize: 12, fontWeight: 900, color: "var(--kq-accent)", textTransform: "uppercase", letterSpacing: "2px", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
                  <Info size={14} /> Clinical Benefit (Why)
                </h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                  {mode.whyUseful?.map((point, i) => (
                    <li key={i} style={{ fontSize: 14, color: "var(--kq-text)", fontWeight: 600, display: "flex", gap: 12, alignItems: "flex-start" }}>
                      <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--kq-accent)", marginTop: 7, flexShrink: 0 }} />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Button Always Visible or with state */}
            <div style={{ marginTop: "auto", zIndex: 3 }}>
              <Link href="/">
                <button 
                  className="btn-primary" 
                  style={{ 
                    width: "100%", 
                    padding: "16px", 
                    fontSize: 14, 
                    borderRadius: "14px", 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center", 
                    gap: 8,
                    background: hoveredMode === mode.id ? "var(--kq-text)" : "var(--kq-surface)",
                    color: hoveredMode === mode.id ? "#fff" : "var(--kq-text)",
                    border: hoveredMode === mode.id ? "none" : "1px solid var(--kq-border)",
                    transition: "all 0.3s ease"
                  }}
                >
                  Select Routine <ChevronRight size={16} />
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
