"use client";
import { useState } from "react";
import { Moon, Sun, Bell, Activity, Shield, Info, ChevronRight } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: "var(--kq-muted)", letterSpacing: "1.2px", textTransform: "uppercase", marginBottom: 12 }}>
        {title}
      </div>
      <div className="metric-card" style={{ overflow: "hidden" }}>
        {children}
      </div>
    </div>
  );
}

function SettingRow({
  icon: Icon,
  label,
  description,
  children,
  border = true,
}: {
  icon: React.ElementType;
  label: string;
  description?: string;
  children?: React.ReactNode;
  border?: boolean;
}) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 16, padding: "18px 24px",
      borderBottom: border ? "1px solid var(--kq-border)" : "none",
    }}>
      <div style={{
        width: 36, height: 36, borderRadius: 10, flexShrink: 0,
        background: "var(--kq-surface)", border: "1px solid var(--kq-border)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <Icon size={16} color="var(--kq-muted)" />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 500, color: "var(--kq-text)" }}>{label}</div>
        {description && (
          <div style={{ fontSize: 12, color: "var(--kq-muted)", marginTop: 2 }}>{description}</div>
        )}
      </div>
      {children}
    </div>
  );
}

function Toggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!value)}
      style={{
        width: 44, height: 24, borderRadius: 12, border: "none",
        background: value ? "var(--kq-accent)" : "var(--kq-subtle)",
        cursor: "pointer", position: "relative", transition: "background 0.2s ease",
        flexShrink: 0,
      }}
    >
      <span style={{
        position: "absolute", top: 3, left: value ? 23 : 3,
        width: 18, height: 18, borderRadius: "50%", background: "#fff",
        transition: "left 0.2s ease",
        boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
      }} />
    </button>
  );
}

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme();

  const [notifications,  setNotifications]  = useState(true);
  const [sessionReminder, setSessionReminder] = useState(true);
  const [soundEffects,   setSoundEffects]   = useState(false);
  const [hapticFeedback, setHapticFeedback] = useState(true);
  const [autoResume,     setAutoResume]     = useState(false);

  const [intensity,      setIntensity]      = useState(70);
  const [duration,       setDuration]       = useState(120);

  return (
    <div style={{ padding: "40px", maxWidth: 680 }}>
      {/* Header */}
      <div style={{ marginBottom: 36 }}>
        <div style={{ fontSize: 13, color: "var(--kq-muted)", fontWeight: 500, marginBottom: 6 }}>Configuration</div>
        <h1 style={{ fontSize: 30, fontWeight: 300, letterSpacing: "-0.5px", color: "var(--kq-text)" }}>Settings</h1>
      </div>

      {/* Appearance */}
      <Section title="Appearance">
        <SettingRow
          icon={theme === "dark" ? Moon : Sun}
          label="Theme"
          description={theme === "dark" ? "Dark mode is active" : "Light mode is active"}
        >
          <button
            onClick={toggleTheme}
            style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "8px 16px", borderRadius: 20,
              background: "var(--kq-surface)", border: "1px solid var(--kq-border)",
              cursor: "pointer", fontSize: 13, fontWeight: 500, color: "var(--kq-text)",
              transition: "all 0.15s ease",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--kq-accent)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--kq-border)"; }}
          >
            {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
            Switch to {theme === "dark" ? "Light" : "Dark"}
          </button>
        </SettingRow>
      </Section>

      {/* Session */}
      <Section title="Session Defaults">
        <SettingRow
          icon={Activity}
          label="Default Intensity"
          description={`Current: ${intensity}% stimulation strength`}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12, width: 160 }}>
            <input
              type="range" min={20} max={100} value={intensity}
              onChange={(e) => setIntensity(Number(e.target.value))}
              style={{ flex: 1 }}
            />
            <span style={{ fontSize: 13, fontWeight: 600, color: "var(--kq-text)", minWidth: 36, textAlign: "right" }}>
              {intensity}%
            </span>
          </div>
        </SettingRow>

        <SettingRow
          icon={Activity}
          label="Session Duration"
          description={`Default: ${duration} minutes`}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12, width: 160 }}>
            <input
              type="range" min={15} max={180} step={15} value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              style={{ flex: 1 }}
            />
            <span style={{ fontSize: 13, fontWeight: 600, color: "var(--kq-text)", minWidth: 36, textAlign: "right" }}>
              {duration}m
            </span>
          </div>
        </SettingRow>

        <SettingRow
          icon={Activity}
          label="Auto-resume after pause"
          description="Automatically resume session after 60 seconds of pause"
          border={false}
        >
          <Toggle value={autoResume} onChange={setAutoResume} />
        </SettingRow>
      </Section>

      {/* Notifications */}
      <Section title="Notifications">
        <SettingRow
          icon={Bell}
          label="Push Notifications"
          description="Reminders and session alerts"
        >
          <Toggle value={notifications} onChange={setNotifications} />
        </SettingRow>

        <SettingRow
          icon={Bell}
          label="Session Reminders"
          description="Notify me when it's time for my scheduled session"
        >
          <Toggle value={sessionReminder} onChange={setSessionReminder} />
        </SettingRow>

        <SettingRow
          icon={Bell}
          label="Sound Effects"
          description="Play sounds on session start and completion"
          border={false}
        >
          <Toggle value={soundEffects} onChange={setSoundEffects} />
        </SettingRow>
      </Section>

      {/* Device */}
      <Section title="Device & Haptics">
        <SettingRow
          icon={Activity}
          label="Haptic Feedback"
          description="Vibration confirmation for controls"
          border={false}
        >
          <Toggle value={hapticFeedback} onChange={setHapticFeedback} />
        </SettingRow>
      </Section>

      {/* Privacy */}
      <Section title="Privacy & Data">
        <SettingRow icon={Shield} label="Data & Privacy Policy">
          <ChevronRight size={16} color="var(--kq-muted)" />
        </SettingRow>
        <SettingRow icon={Shield} label="Export My Data" description="Download a CSV of your session history" border={false}>
          <button style={{
            padding: "7px 16px", borderRadius: 20,
            background: "var(--kq-surface)", border: "1px solid var(--kq-border)",
            cursor: "pointer", fontSize: 13, fontWeight: 500, color: "var(--kq-text)",
          }}>
            Export
          </button>
        </SettingRow>
      </Section>

      {/* About */}
      <Section title="About">
        <SettingRow icon={Info} label="KinetiQ Version" description="v0.1.0 — Early Access" border={false}>
          <span style={{ fontSize: 12, color: "var(--kq-muted)" }}>Based on Tass vCR research</span>
        </SettingRow>
      </Section>

      {/* Danger */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "var(--kq-muted)", letterSpacing: "1.2px", textTransform: "uppercase", marginBottom: 12 }}>
          Danger Zone
        </div>
        <button style={{
          padding: "12px 24px", borderRadius: 10, border: "1px solid var(--kq-danger)",
          background: "transparent", color: "var(--kq-danger)",
          cursor: "pointer", fontSize: 14, fontWeight: 500,
          transition: "all 0.15s ease",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = "var(--kq-danger)"; e.currentTarget.style.color = "#fff"; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--kq-danger)"; }}
        >
          Reset All Session Data
        </button>
      </div>
    </div>
  );
}
