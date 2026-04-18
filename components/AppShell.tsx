"use client";
import { useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";
import { ThemeProvider } from "./ThemeProvider";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <ThemeProvider>
      <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
        {sidebarOpen && (
          <Sidebar onHide={() => setSidebarOpen(false)} />
        )}

        {!sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(true)}
            title="Show sidebar"
            style={{
              position: "fixed", top: 20, left: 20, zIndex: 100,
              width: 40, height: 40, borderRadius: 10,
              background: "var(--kq-card)", border: "1px solid var(--kq-border)",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", color: "var(--kq-text)",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
          >
            <Menu size={18} />
          </button>
        )}

        <main style={{
          flex: 1,
          overflowY: "auto",
          background: "var(--kq-bg)",
          transition: "all 0.25s ease",
        }}>
          {children}
        </main>
      </div>
    </ThemeProvider>
  );
}
