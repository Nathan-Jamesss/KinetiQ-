import type { Metadata } from "next";
import { Bell, Clock, Plus, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Reminders — KinetiQ",
  description: "Schedule your therapy sessions and manage notifications.",
};

const schedule = [
  { time: "08:00 AM", mode: "Standard vCR", active: true, days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] },
  { time: "07:30 PM", mode: "Noisy vCR", active: true, days: ["Mon", "Wed", "Fri"] },
  { time: "09:00 PM", mode: "Sleep Protocol", active: false, days: ["Tue", "Thu", "Sun"] },
];

export default function RemindersPage() {
  return (
    <div style={{ padding: "60px 80px", maxWidth: 1000 }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 48 }}>
        <div>
          <div style={{ fontSize: 12, color: "var(--kq-accent)", fontWeight: 700, letterSpacing: "2px", marginBottom: 12, textTransform: "uppercase" }}>
            Optimization Schedule
          </div>
          <h1 className="font-display" style={{ fontSize: 44, fontWeight: 900, letterSpacing: "-1.5px", color: "#fff" }}>
            Session Reminders
          </h1>
        </div>
        <button style={{ 
          background: "var(--kq-accent)", color: "#05060f", border: "none", 
          padding: "14px 28px", borderRadius: 40, fontSize: 13, fontWeight: 700, 
          display: "flex", alignItems: "center", gap: 8, cursor: "pointer",
          textTransform: "uppercase", letterSpacing: "1px"
        }}>
          <Plus size={16} strokeWidth={3} /> Add Reminder
        </button>
      </div>

      <div style={{ display: "grid", gap: 32 }}>
        
        {/* Global Settings */}
        <div style={{ background: "rgba(0, 242, 255, 0.03)", border: "1px solid var(--kq-border)", borderRadius: 24, padding: "32px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, display: "flex", alignItems: "center", gap: 12, color: "#fff" }}>
              <Zap size={18} color="var(--kq-accent)" /> System Alerts
            </h2>
          </div>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: 280, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px", background: "rgba(157, 195, 247, 0.05)", borderRadius: 16, border: "1px solid var(--kq-border)" }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>Session Proximity</div>
                <div style={{ fontSize: 12, color: "var(--kq-muted)", marginTop: 2 }}>Alert 15m before cycle start</div>
              </div>
              <div style={{ width: 44, height: 24, borderRadius: 12, background: "var(--kq-accent)", position: "relative" }}>
                <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#05060f", position: "absolute", right: 3, top: 3 }} />
              </div>
            </div>
            <div style={{ flex: 1, minWidth: 280, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px", background: "rgba(157, 195, 247, 0.05)", borderRadius: 16, border: "1px solid var(--kq-border)" }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>Therapy Analytics</div>
                <div style={{ fontSize: 12, color: "var(--kq-muted)", marginTop: 2 }}>Weekly performance summary</div>
              </div>
              <div style={{ width: 44, height: 24, borderRadius: 12, background: "rgba(157,195,247,0.1)", position: "relative", border: "1px solid var(--kq-border)" }}>
                <div style={{ width: 18, height: 18, borderRadius: "50%", background: "var(--kq-muted)", position: "absolute", left: 3, top: 2 }} />
              </div>
            </div>
          </div>
        </div>

        {/* Schedule List */}
        <h2 style={{ fontSize: 20, fontWeight: 800, marginTop: 16, color: "#fff", letterSpacing: "-0.5px" }}>Active Protocols</h2>
        
        <div style={{ display: "grid", gap: 16 }}>
          {schedule.map((item, i) => (
            <div key={i} style={{ 
              background: "rgba(157, 195, 247, 0.03)", 
              border: "1px solid var(--kq-border)", 
              borderRadius: 20, padding: "24px", 
              display: "flex", alignItems: "center", justifyContent: "space-between", 
              opacity: item.active ? 1 : 0.5,
              transition: "all 0.3s ease"
            }}>
              <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
                <div style={{
                  width: 56, height: 56, borderRadius: 18,
                  background: item.active ? "rgba(0,242,255,0.08)" : "rgba(157,195,247,0.05)",
                  border: `1px solid ${item.active ? "rgba(0,242,255,0.2)" : "var(--kq-border)"}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: item.active ? "var(--kq-accent)" : "var(--kq-muted)"
                }}>
                  <Clock size={24} />
                </div>
                <div>
                  <div style={{ fontSize: 28, fontWeight: 300, color: "#fff", letterSpacing: "-1px" }}>
                    {item.time}
                  </div>
                  <div style={{ fontSize: 13, color: "var(--kq-muted)", marginTop: 2 }}>
                    <span style={{ color: "var(--kq-accent)", fontWeight: 600 }}>{item.mode}</span> protocol
                  </div>
                  <div style={{ display: "flex", gap: 6, marginTop: 12 }}>
                    {["M", "T", "W", "T", "F", "S", "S"].map((day, idx) => {
                      const fullDay = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][idx];
                      const isSet = item.days.includes(fullDay);
                      return (
                        <span key={idx} style={{
                          fontSize: 9, fontWeight: 800, width: 22, height: 22, borderRadius: 6,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          background: isSet ? "rgba(0,242,255,0.15)" : "transparent",
                          color: isSet ? "var(--kq-accent)" : "rgba(157,195,247,0.2)",
                          border: isSet ? "1px solid rgba(0,242,255,0.3)" : "1px solid transparent"
                        }}>
                          {day}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
              
              <div style={{ 
                width: 50, height: 26, borderRadius: 13, 
                background: item.active ? "var(--kq-accent)" : "rgba(157,195,247,0.1)", 
                position: "relative", border: item.active ? "none" : "1px solid var(--kq-border)", 
                cursor: "pointer" 
              }}>
                <div style={{ 
                  width: 20, height: 20, borderRadius: "50%", 
                  background: item.active ? "#05060f" : "var(--kq-muted)", 
                  position: "absolute", 
                  right: item.active ? 3 : undefined, 
                  left: item.active ? undefined : 3, 
                  top: 3 
                }} />
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
