"use client";
import { BookOpen, HelpCircle, Activity, Heart } from "lucide-react";

const articles = [
  {
    title: "Understanding Your Therapy",
    icon: Heart,
    color: "var(--kq-accent)",
    readTime: "4 min read",
    snippet: "KinetiQ uses gentle fingertip vibrations to help your nervous system relax. By providing carefully timed inputs, it helps guide your body away from the rigid patterns associated with Parkinson's.",
  },
  {
    title: "The Science of 250 Hz",
    icon: Activity,
    color: "var(--kq-accent2)",
    readTime: "3 min read",
    snippet: "Why 250 Hz? This specific vibration frequency is optimized to trigger the gentle touch receptors in your skin, which provide the most soothing and direct sensory feedback to your brain.",
  },
  {
    title: "Why We Use the 3:2 Pattern",
    icon: BookOpen,
    color: "var(--kq-warn)",
    readTime: "5 min read",
    snippet: "Our therapy routines cycle through periods of stimulation followed by periods of rest. These built-in 'rest' phases are critical—they allow your nervous system time to adapt and relax.",
  },
  {
    title: "Medication vs. Stimulation",
    icon: HelpCircle,
    color: "var(--kq-success)",
    readTime: "6 min read",
    snippet: "How do KinetiQ's vibrations fit in alongside your existing medication routine? Explore how these complementary approaches work together to improve your daily comfort.",
  },
];

export default function LearnPage() {
  return (
    <div style={{ padding: "40px", maxWidth: 1000 }}>
      <div style={{ marginBottom: 40 }}>
        <div style={{ fontSize: 13, color: "var(--kq-muted)", fontWeight: 500, marginBottom: 8 }}>
          Education Hub
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 300, letterSpacing: "-0.5px", marginBottom: 12, color: "var(--kq-text)" }}>
          The Science Simplified
        </h1>
        <p style={{ color: "var(--kq-muted)", fontSize: 15, maxWidth: 640, lineHeight: 1.6 }}>
          KinetiQ is built on the foundation of rigorous clinical research from Stanford University. 
          Here, we explain how the therapy works to bring you relief.
        </p>
      </div>

      {/* Explainer Graphic */}
      <div className="metric-card" style={{ padding: 0, marginBottom: 40, display: "flex", flexWrap: "wrap", border: "1px solid var(--kq-border)" }}>
        <div style={{ flex: "1 1 300px", padding: "40px", background: "var(--kq-surface)", borderRight: "1px solid var(--kq-border)" }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16 }}>Gentle Stimulation</h2>
          <p style={{ fontSize: 14, color: "var(--kq-muted)", lineHeight: 1.6, marginBottom: 24 }}>
            The therapy delivers precise vibrations to the tips of your fingers (excluding the thumb). 
            By targeting these specific nerve endings, we can send calming signals back up your arm.
          </p>
          <ul style={{ fontSize: 14, color: "var(--kq-text)", display: "flex", flexDirection: "column", gap: 14 }}>
            <li style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ color: "var(--kq-accent)", fontSize: 18 }}>•</span> Index Finger
            </li>
            <li style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ color: "var(--kq-accent2)", fontSize: 18 }}>•</span> Middle Finger
            </li>
            <li style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ color: "var(--kq-success)", fontSize: 18 }}>•</span> Ring Finger
            </li>
            <li style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ color: "var(--kq-warn)", fontSize: 18 }}>•</span> Pinky Finger
            </li>
          </ul>
        </div>
        <div style={{ flex: "1 1 300px", padding: "40px", display: "flex", alignItems: "center", justifyContent: "center", minHeight: 300, background: "#fff" }}>
          {/* Calm wave visual placeholder */}
          <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Heart size={60} color="var(--kq-border)" strokeWidth={1} />
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 140, height: 140, border: "1px solid var(--kq-surface)", borderRadius: "50%" }} />
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 220, height: 220, border: "1px solid var(--kq-surface)", borderRadius: "50%" }} />
          </div>
        </div>
      </div>

      <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 24, color: "var(--kq-text)" }}>Recommended Reading</h2>
      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))", gap: 24 }}>
        {articles.map((article, i) => {
          const Icon = article.icon;
          return (
            <div key={i} className="metric-card" style={{
              padding: "32px", cursor: "pointer", transition: "transform 0.2s, box-shadow 0.2s",
            }} onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.02)"; }} onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 12,
                  background: "#fff", border: "1px solid var(--kq-border)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Icon size={20} color={article.color} />
                </div>
                <div style={{ fontSize: 12, color: "var(--kq-text)", fontWeight: 500, background: "var(--kq-surface)", padding: "6px 12px", borderRadius: 20 }}>
                  {article.readTime}
                </div>
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12 }}>{article.title}</h3>
              <p style={{ fontSize: 14, color: "var(--kq-muted)", lineHeight: 1.6 }}>{article.snippet}</p>
              <div style={{ marginTop: 24, fontSize: 14, color: "var(--kq-text)", fontWeight: 600, display: "flex", alignItems: "center", gap: 8 }}>
                Read Article <span style={{ color: "var(--kq-accent)" }}>→</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
