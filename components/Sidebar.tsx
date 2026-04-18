"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Heart, History, Activity, FileText,
  User, BookOpen, Bell, Settings, Hand, Moon, Sun, PanelLeftClose,
} from "lucide-react";
import { useTheme } from "./ThemeProvider";

interface SidebarProps {
  onHide?: () => void;
}

export default function Sidebar({ onHide }: SidebarProps) {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  const nav = [
    { href: "/",          icon: Heart,    label: "Start Session" },
    { href: "/dashboard", icon: Activity, label: "Your Progress" },
    { href: "/modes",     icon: Hand,     label: "Therapy Types" },
    { href: "/history",   icon: History,  label: "Past Sessions" },
    { href: "/learn",     icon: BookOpen, label: "Library" },
    { href: "/reports",   icon: FileText, label: "Reports", premium: true },
    { href: "/reminders", icon: Bell,     label: "Schedule" },
    { href: "/profile",   icon: User,     label: "Profile" },
    { href: "/settings",  icon: Settings, label: "Settings" },
  ];

  return (
    <aside style={{
      width: 240,
      minWidth: 240,
      height: "100vh",
      background: "var(--kq-card)",
      borderRight: "1px solid var(--kq-border)",
      display: "flex",
      flexDirection: "column",
      overflowY: "auto",
    }}>
      {/* Logo + hide button */}
      <div style={{ padding: "24px 20px 18px", borderBottom: "1px solid var(--kq-border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div className="font-display" style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 36, height: 36,
            background: "var(--kq-text)",
            borderRadius: 10,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 18, fontWeight: 800, color: "var(--kq-card)",
            flexShrink: 0,
          }}>K</div>
          <div>
            <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-0.5px", color: "var(--kq-text)" }}>KinetiQ</div>
            <div style={{ fontSize: 9, color: "var(--kq-muted)", letterSpacing: "0.5px", marginTop: -2 }}>GENTLE THERAPY</div>
          </div>
        </div>
        {onHide && (
          <button
            onClick={onHide}
            title="Hide sidebar"
            style={{
              background: "none", border: "none", cursor: "pointer",
              color: "var(--kq-muted)", padding: 6, borderRadius: 8,
              display: "flex", alignItems: "center",
              transition: "color 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--kq-text)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--kq-muted)")}
          >
            <PanelLeftClose size={16} />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "20px 10px" }}>
        {nav.map(({ href, icon: Icon, label, premium }) => {
          const active = pathname === href || (href !== "/" && pathname.startsWith(href));
          return (
            <Link key={href} href={href} className={`nav-item${active ? " active" : ""}`}
              style={{ marginBottom: 2 }}>
              <Icon size={16} strokeWidth={active ? 2.5 : 2} />
              <span style={{ flex: 1 }}>{label}</span>
              {premium && (
                <span style={{
                  fontSize: 9, fontWeight: 700,
                  color: "var(--kq-text)",
                  border: "1px solid var(--kq-border)",
                  background: "var(--kq-surface)",
                  padding: "2px 6px", borderRadius: 4,
                }}>PRO</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom controls */}
      <div style={{ padding: "12px 10px 16px", borderTop: "1px solid var(--kq-border)", display: "flex", flexDirection: "column", gap: 8 }}>
        {/* Dark mode toggle */}
        <button
          onClick={toggleTheme}
          style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "10px 14px", borderRadius: 10,
            background: "none", border: "none", cursor: "pointer",
            color: "var(--kq-muted)", fontSize: "0.875rem", fontWeight: 500,
            transition: "all 0.15s ease", width: "100%",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "var(--kq-surface)"; e.currentTarget.style.color = "var(--kq-text)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "var(--kq-muted)"; }}
        >
          {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          {theme === "dark" ? "Light Mode" : "Dark Mode"}
        </button>

        {/* Upgrade CTA */}
        <Link href="/upgrade" style={{ textDecoration: "none" }}>
          <div style={{
            background: "var(--kq-surface)",
            border: "1px solid var(--kq-border)",
            borderRadius: 12,
            padding: "14px",
            cursor: "pointer",
            transition: "all 0.2s ease",
            textAlign: "center",
          }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: "var(--kq-text)" }}>Unlock KinetiQ Pro</span>
          </div>
        </Link>
      </div>
    </aside>
  );
}
