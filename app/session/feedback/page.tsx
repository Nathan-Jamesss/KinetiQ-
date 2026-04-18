"use client";
import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { THERAPY_MODES, formatDuration } from "@/lib/utils";
import { CheckCircle, Star, Activity, Maximize2, Clock, Battery, MessageCircle, Hand } from "lucide-react";

function getSymptomIcon(id: string) {
  switch (id) {
    case "tremor": return <Activity size={16} />;
    case "rigidity": return <Maximize2 size={16} />;
    case "bradykinesia": return <Clock size={16} />;
    case "fatigue": return <Battery size={16} />;
    case "mood": return <MessageCircle size={16} />;
    default: return <Activity size={16} />;
  }
}

const SYMPTOMS = [
  { id: "tremor", label: "Tremor", desc: "Resting or action tremor presence", color: "var(--kq-accent)" },
  { id: "rigidity", label: "Rigidity", desc: "Muscle stiffness or resistance", color: "var(--kq-accent2)" },
  { id: "bradykinesia", label: "Movement Speed", desc: "Pacing and fluidity", color: "var(--kq-success)" },
  { id: "fatigue", label: "Energy Level", desc: "Overall physical tiredness", color: "var(--kq-warn)" },
  { id: "mood", label: "Mood", desc: "Emotional well-being", color: "var(--kq-danger)" },
];

const SIDE_EFFECTS = [
  "Skin irritation", "Tingling after session", "Discomfort during use",
  "Headache", "Nausea", "Joint discomfort", "None of the above",
];

function FeedbackContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const modeId = searchParams.get("mode") || "standard-vcr";
  const duration = parseInt(searchParams.get("duration") || "0");
  const mode = THERAPY_MODES.find((m) => m.id === modeId) || THERAPY_MODES[0];

  const [scores, setScores] = useState<Record<string, number>>({
    tremor: 5, rigidity: 5, bradykinesia: 5, fatigue: 5, mood: 5,
  });
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [notes, setNotes] = useState("");
  const [sideEffects, setSideEffects] = useState<string[]>(["None of the above"]);
  const [submitted, setSubmitted] = useState(false);

  const toggleSideEffect = (effect: string) => {
    if (effect === "None of the above") {
      setSideEffects(["None of the above"]);
    } else {
      setSideEffects((prev) => {
        const withoutNone = prev.filter((e) => e !== "None of the above");
        return prev.includes(effect)
          ? withoutNone.filter((e) => e !== effect)
          : [...withoutNone, effect];
      });
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => router.push("/history"), 2000);
  };

  if (submitted) {
    return (
      <div style={{
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        minHeight: "70vh", gap: 20,
      }}>
        <div style={{
          width: 80, height: 80, borderRadius: "50%",
          background: "var(--kq-surface)", border: "2px solid var(--kq-border)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <CheckCircle size={40} color="var(--kq-success)" />
        </div>
        <h2 className="font-display" style={{ fontSize: 24, fontWeight: 300, color: "var(--kq-text)" }}>Report Saved</h2>
        <p style={{ color: "var(--kq-muted)", fontSize: 14 }}>Returning to your journal...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "40px", maxWidth: 760 }}>
      {/* Header */}
      <div style={{ marginBottom: 40 }}>
        <div style={{ fontSize: 13, color: "var(--kq-muted)", fontWeight: 500, letterSpacing: "0.5px", marginBottom: 8 }}>
          Post-Session Journal
        </div>
        <h1 className="font-display" style={{ fontSize: 32, fontWeight: 300, letterSpacing: "-0.5px", marginBottom: 12, color: "var(--kq-text)" }}>
          How are you feeling?
        </h1>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "8px 16px", borderRadius: 20,
            background: "var(--kq-surface)", border: "1px solid var(--kq-border)",
          }}>
            <Hand size={16} color="var(--kq-accent)" />
            <span style={{ fontSize: 13, fontWeight: 500, color: "var(--kq-text)" }}>{mode.name}</span>
          </div>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            padding: "8px 16px", borderRadius: 20,
            background: "var(--kq-surface)", border: "1px solid var(--kq-border)",
          }}>
            <span style={{ fontSize: 13, color: "var(--kq-muted)" }}>Duration:</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: "var(--kq-text)" }}>{formatDuration(duration)}</span>
          </div>
        </div>
      </div>

      {/* Session Rating */}
      <div className="metric-card" style={{ padding: "32px", marginBottom: 24 }}>
        <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>Overall Comfort</h2>
        <p style={{ fontSize: 14, color: "var(--kq-muted)", marginBottom: 20 }}>How relaxed and comfortable did you feel during this session?</p>
        <div style={{ display: "flex", gap: 12 }}>
          {[1, 2, 3, 4, 5].map((s) => (
            <button key={s}
              onClick={() => setRating(s)}
              onMouseEnter={() => setHoverRating(s)}
              onMouseLeave={() => setHoverRating(0)}
              style={{
                width: 52, height: 52, borderRadius: "50%", border: "1px solid var(--kq-border)",
                background: s <= (hoverRating || rating)
                  ? "var(--kq-surface)"
                  : "transparent",
                cursor: "pointer", transition: "all 0.15s ease",
                display: "flex", alignItems: "center", justifyContent: "center",
                transform: s <= (hoverRating || rating) ? "scale(1.05)" : "scale(1)",
              }}>
              <Star size={24} color={s <= (hoverRating || rating) ? "var(--kq-warn)" : "var(--kq-subtle)"}
                fill={s <= (hoverRating || rating) ? "var(--kq-warn)" : "none"} />
            </button>
          ))}
          {rating > 0 && (
            <div style={{ display: "flex", alignItems: "center", marginLeft: 12 }}>
              <span style={{ fontSize: 15, fontWeight: 500, color: "var(--kq-text)" }}>
                {["", "Uncomfortable", "Needs Adjustment", "Okay", "Relaxing", "Very Relaxing"][rating]}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Symptom sliders */}
      <div className="metric-card" style={{ padding: "32px", marginBottom: 24 }}>
        <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>Body Check-in</h2>
        <p style={{ fontSize: 14, color: "var(--kq-muted)", marginBottom: 32 }}>
          Rate where your body is at right now (1 = very rigid/present, 10 = relaxed/absent).
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          {SYMPTOMS.map(({ id, label, desc, color }) => (
            <div key={id}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ color: color }}>{getSymptomIcon(id)}</span>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 500, color: "var(--kq-text)" }}>{label}</div>
                    <div style={{ fontSize: 12, color: "var(--kq-muted)", marginTop: 2 }}>{desc}</div>
                  </div>
                </div>
                <div style={{
                  minWidth: 40, height: 40, borderRadius: 10,
                  background: "var(--kq-surface)", border: `1px solid var(--kq-border)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 15, fontWeight: 600, color: "var(--kq-text)",
                }}>
                  {scores[id]}
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 11, color: "var(--kq-muted)", minWidth: 40 }}>Noticeable</span>
                <input type="range" min={1} max={10} value={scores[id]}
                  onChange={(e) => setScores((s) => ({ ...s, [id]: parseInt(e.target.value) }))}
                  style={{ flex: 1, accentColor: color }}
                />
                <span style={{ fontSize: 11, color: "var(--kq-muted)", minWidth: 40, textAlign: "right" }}>Relaxed</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Side effects */}
      <div className="metric-card" style={{ padding: "32px", marginBottom: 24 }}>
        <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>Physical Sensations</h2>
        <p style={{ fontSize: 14, color: "var(--kq-muted)", marginBottom: 20 }}>Did you experience anything unexpected?</p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {SIDE_EFFECTS.map((effect) => {
            const selected = sideEffects.includes(effect);
            return (
              <button key={effect}
                onClick={() => toggleSideEffect(effect)}
                style={{
                  padding: "10px 18px", borderRadius: 20, fontSize: 13, fontWeight: 500,
                  cursor: "pointer", transition: "all 0.15s ease",
                  background: selected ? "var(--kq-text)" : "var(--kq-surface)",
                  border: `1px solid ${selected ? "var(--kq-text)" : "var(--kq-border)"}`,
                  color: selected ? "#fff" : "var(--kq-muted)",
                }}>
                {selected ? "✓ " : ""}{effect}
              </button>
            );
          })}
        </div>
      </div>

      {/* Notes */}
      <div className="metric-card" style={{ padding: "32px", marginBottom: 32 }}>
        <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>Personal Notes</h2>
        <p style={{ fontSize: 14, color: "var(--kq-muted)", marginBottom: 16 }}>
          Any other gentle observations you'd like to remember?
        </p>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="e.g. 'Felt very calming. Right hand eased immediately...'"
          rows={4}
          style={{
            width: "100%", padding: "16px 20px",
            background: "var(--kq-surface)", border: "1px solid var(--kq-border)",
            borderRadius: 12, color: "var(--kq-text)", fontSize: 14, lineHeight: 1.6,
            resize: "vertical", fontFamily: "inherit", outline: "none",
            transition: "border-color 0.2s",
          }}
          onFocus={(e) => e.target.style.borderColor = "var(--kq-accent)"}
          onBlur={(e) => e.target.style.borderColor = "var(--kq-border)"}
        />
      </div>

      {/* Submit */}
      <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
        <button
          className="btn-primary"
          onClick={handleSubmit}
          disabled={rating === 0}
          style={{
            padding: "16px 40px", fontSize: 15, borderRadius: 30,
            opacity: rating === 0 ? 0.5 : 1, cursor: rating === 0 ? "not-allowed" : "pointer",
          }}>
          Save to Journal →
        </button>
        <button className="btn-ghost" style={{ padding: "16px 28px", fontSize: 15, borderRadius: 30 }}
          onClick={() => router.push("/history")}>
          Skip
        </button>
        {rating === 0 && (
          <span style={{ fontSize: 13, color: "var(--kq-muted)" }}>Please provide an overall comfort rating.</span>
        )}
      </div>

      <p style={{ marginTop: 24, fontSize: 12, color: "var(--kq-muted)", lineHeight: 1.5 }}>
        ⚕️ Your reflections are private and stored locally. You can share your journal with your care team from the Reports page.
      </p>
    </div>
  );
}

export default function FeedbackPage() {
  return (
    <Suspense fallback={<div style={{ padding: 40, color: "var(--kq-muted)" }}>Loading...</div>}>
      <FeedbackContent />
    </Suspense>
  );
}
