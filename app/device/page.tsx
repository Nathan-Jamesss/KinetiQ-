import type { Metadata } from "next";
import { Cpu, Bluetooth, Battery, ShieldAlert, Settings, Wrench } from "lucide-react";

export const metadata: Metadata = {
  title: "Device Manager — KinetiQ",
  description: "Manage your KinetiQ therapeutic gloves, check battery, and update firmware.",
};

export default function DevicePage() {
  return (
    <div style={{ padding: "36px 40px", maxWidth: 900 }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 32 }}>
        <div>
          <div style={{ fontSize: 12, color: "var(--kq-muted)", fontWeight: 600, letterSpacing: "0.5px", marginBottom: 8, textTransform: "uppercase" }}>
            Hardware
          </div>
          <h1 className="font-display" style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-0.5px" }}>
            Device Manager
          </h1>
        </div>
        <button className="btn-primary" style={{ padding: "10px 18px", fontSize: 13, display: "flex", alignItems: "center", gap: 8 }}>
          <Bluetooth size={16} /> Pair New Device
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 24 }}>
        {/* Left Glove */}
        <div className="metric-card" style={{ padding: "24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <div style={{ width: 48, height: 48, background: "rgba(30,48,72,0.4)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Cpu size={24} color="var(--kq-muted)" />
              </div>
              <div>
                <h2 style={{ fontSize: 16, fontWeight: 700 }}>Left Glove</h2>
                <div style={{ fontSize: 12, color: "var(--kq-muted)" }}>ID: KQ-L-8821</div>
              </div>
            </div>
            <div style={{ padding: "4px 8px", background: "rgba(30,48,72,0.6)", borderRadius: 6, fontSize: 11, color: "var(--kq-muted)", fontWeight: 600 }}>
              OFFLINE
            </div>
          </div>
          
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
              <span style={{ color: "var(--kq-muted)", display: "flex", alignItems: "center", gap: 8 }}><Battery size={14} /> Battery</span>
              <span>--</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
              <span style={{ color: "var(--kq-muted)", display: "flex", alignItems: "center", gap: 8 }}><ShieldAlert size={14} /> Firmware</span>
              <span>v1.2.4</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
              <span style={{ color: "var(--kq-muted)", display: "flex", alignItems: "center", gap: 8 }}><Settings size={14} /> Intensity Cal.</span>
              <span>Pending</span>
            </div>
          </div>
        </div>

        {/* Right Glove */}
        <div className="metric-card" style={{ padding: "24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <div style={{ width: 48, height: 48, background: "rgba(30,48,72,0.4)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Cpu size={24} color="var(--kq-muted)" />
              </div>
              <div>
                <h2 style={{ fontSize: 16, fontWeight: 700 }}>Right Glove</h2>
                <div style={{ fontSize: 12, color: "var(--kq-muted)" }}>ID: KQ-R-8822</div>
              </div>
            </div>
            <div style={{ padding: "4px 8px", background: "rgba(30,48,72,0.6)", borderRadius: 6, fontSize: 11, color: "var(--kq-muted)", fontWeight: 600 }}>
              OFFLINE
            </div>
          </div>
          
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
              <span style={{ color: "var(--kq-muted)", display: "flex", alignItems: "center", gap: 8 }}><Battery size={14} /> Battery</span>
              <span>--</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
              <span style={{ color: "var(--kq-muted)", display: "flex", alignItems: "center", gap: 8 }}><ShieldAlert size={14} /> Firmware</span>
              <span>v1.2.4</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
              <span style={{ color: "var(--kq-muted)", display: "flex", alignItems: "center", gap: 8 }}><Settings size={14} /> Intensity Cal.</span>
              <span>Pending</span>
            </div>
          </div>
        </div>
      </div>

      <div className="metric-card" style={{ padding: "24px", display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ width: 40, height: 40, background: "rgba(0,200,255,0.1)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Wrench size={20} color="#00c8ff" />
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 2 }}>Troubleshooting & Diagnostics</h3>
          <p style={{ fontSize: 12, color: "var(--kq-muted)" }}>Run a motor check, recalibrate sensors, or factory reset your hardware.</p>
        </div>
        <button className="btn-ghost" style={{ padding: "8px 16px", fontSize: 12 }}>Run Diagnostics</button>
      </div>

    </div>
  );
}
