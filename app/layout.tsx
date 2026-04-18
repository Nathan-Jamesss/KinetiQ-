import type { Metadata } from "next";
import "./globals.css";
import { AppShell } from "@/components/AppShell";

export const metadata: Metadata = {
  title: "KinetiQ — Therapeutic Glove Platform",
  description:
    "Next-generation Parkinson's therapeutic glove companion app. Based on Peter A. Tass vibrotactile Coordinated Reset (vCR) research.",
  keywords: ["Parkinson's", "therapy", "vibrotactile", "KinetiQ", "coordinated reset", "glove"],
  openGraph: {
    title: "KinetiQ Therapeutic Platform",
    description: "Science-backed vibrotactile therapy for Parkinson's patients.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased" style={{ background: "var(--kq-bg)", color: "var(--kq-text)", fontFamily: "'Inter', sans-serif" }}>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
