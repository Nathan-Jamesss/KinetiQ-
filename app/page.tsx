"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import ParticleSpotlightBg from "@/components/ui/particle-spotlight-bg";
import { Play, Square, Pause, Settings2, Zap } from "lucide-react";
import { 
  VCR_PARAMS, FINGER_COLORS, THERAPY_MODES, nextRVSSequence, formatDuration, type Finger 
} from "@/lib/utils";

function RealisticHand({ hand, firingFinger, isOnCycle }: {
  hand: "left" | "right";
  firingFinger: { hand: "left" | "right"; finger: Finger } | null;
  isOnCycle: boolean;
}) {
  const isL = hand === "left";
  
  // Symmetrical Coordinate System: Center is 100 on a 200 width SVG
  const getFingers = () => {
    const basePts = {
      pinky:  { cx: 40,  cy: 90 },
      ring:   { cx: 70,  cy: 45 },
      middle: { cx: 100, cy: 30 },
      index:  { cx: 130, cy: 50 },
      thumb:  { cx: 170, cy: 130 }
    };

    if (isL) return basePts;
    
    // Perfect Mirror for Right Hand
    return {
      pinky:  { cx: 160, cy: 90 },
      ring:   { cx: 130, cy: 45 },
      middle: { cx: 100, cy: 30 },
      index:  { cx: 70,  cy: 50 },
      thumb:  { cx: 30,  cy: 130 }
    };
  };

  const pts = getFingers();

  const renderHandSilhouette = () => {
    return (
      <g stroke="var(--kq-hand-stroke)" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" fill="none">
        {/* Centered Palm */}
        <rect x="50" y="110" width="100" height="90" rx="30" fill="var(--kq-hand)" stroke="none" />
        
        {/* Finger connections starting from palm edges or top */}
        <line x1={isL ? 60 : 140} y1="130" x2={pts.pinky.cx} y2={pts.pinky.cy} />
        <line x1={isL ? 80 : 120} y1="120" x2={pts.ring.cx} y2={pts.ring.cy} />
        <line x1="100" y1="115" x2={pts.middle.cx} y2={pts.middle.cy} />
        <line x1={isL ? 120 : 80} y1="120" x2={pts.index.cx} y2={pts.index.cy} />
        
        {/* Curved Thumb connection */}
        <path d={`M ${isL ? 140 : 60} 180 Q ${isL ? 180 : 20} 175 ${pts.thumb.cx} ${pts.thumb.cy}`} />

        {/* Wrist Base */}
        <line x1="75" y1="200" x2="75" y2="260" strokeWidth="40" stroke="var(--kq-hand)" />
        <line x1="125" y1="200" x2="125" y2="260" strokeWidth="40" stroke="var(--kq-hand)" />
      </g>
    );
  };

  const renderDot = (finger: Finger, point: {cx: number, cy: number}) => {
    const isFiring = firingFinger?.hand === hand && firingFinger?.finger === finger;
    const color = "var(--kq-accent)";

    return (
      <g key={finger}>
        {isFiring && (
          <circle cx={point.cx} cy={point.cy} r={28} fill={color} opacity={0.4}>
            <animate attributeName="r" values="14; 36; 14" dur="0.12s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.6; 0; 0.6" dur="0.12s" repeatCount="indefinite" />
          </circle>
        )}
        <circle 
          cx={point.cx} cy={point.cy} 
          r={isFiring ? 12 : 7} 
          fill={isFiring ? color : isOnCycle ? "var(--kq-surface)" : "transparent"} 
          stroke={isFiring ? "#fff" : isOnCycle ? "var(--kq-hand-stroke)" : "var(--kq-border)"}
          strokeWidth={isFiring ? 3 : 1}
          style={{ transition: "all 0.1s ease" }}
        />
      </g>
    );
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
      <div style={{ position: "relative", width: "12vw", maxWidth: 280, minWidth: 180, aspectRatio: "200/260" }}>
        <svg viewBox="0 0 200 260" style={{ width: "100%", height: "100%", overflow: "visible" }}>
          {renderHandSilhouette()}
          {renderDot("pinky", pts.pinky)}
          {renderDot("ring", pts.ring)}
          {renderDot("middle", pts.middle)}
          {renderDot("index", pts.index)}
          {renderDot("thumb", pts.thumb)}
        </svg>
      </div>
      <div style={{
        fontSize: 11, fontWeight: 800, color: "var(--kq-muted)", letterSpacing: "3px", textTransform: "uppercase", opacity: 0.5
      }}>
        {hand} 
      </div>
    </div>
  );
}

function CircularProgress({ percent, elapsed, remaining, endTime }: { percent: number; elapsed: string; remaining: string; endTime: string }) {
  const radius = 100;
  const stroke = 6;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  return (
    <div style={{ position: "relative", width: radius * 2, height: radius * 2, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <svg height={radius * 2} width={radius * 2} style={{ position: "absolute", transform: "rotate(-90deg)" }}>
        <circle
          stroke="var(--kq-border)"
          fill="transparent"
          strokeWidth={2}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          style={{ opacity: 0.1 }}
        />
        <circle
          stroke="var(--kq-accent)"
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={circumference + ' ' + circumference}
          style={{ strokeDashoffset, transition: "stroke-dashoffset 0.8s linear" }}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", zIndex: 1, textAlign: "center" }}>
        {/* Arial Bold Timer */}
        <span style={{ fontSize: 52, fontFamily: "Arial, sans-serif", fontWeight: "bold", color: "var(--kq-text)", letterSpacing: "-1px" }}>{elapsed}</span>
        <div style={{ marginTop: 4 }}>
          <p style={{ fontSize: 9, color: "var(--kq-muted)", textTransform: "uppercase", letterSpacing: "1.5px", fontWeight: 700 }}>Remaining: {remaining}</p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginTop: 8, color: "var(--kq-accent)", opacity: 0.8 }}>
            <span style={{ fontSize: 10, fontWeight: 800 }}>Completion: {endTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const mode = THERAPY_MODES[0];
  const totalSeconds = mode.duration * 60;

  const [state, setState] = useState<"idle" | "running" | "paused" | "done">("idle");
  const [elapsed, setElapsed] = useState(0);
  const [cycleIndex, setCycleIndex] = useState(0);
  const [fingerSeq, setFingerSeq] = useState<Finger[]>(nextRVSSequence());
  const [seqIdx, setSeqIdx] = useState(0);
  const [firingFinger, setFiringFinger] = useState<{ hand: "left" | "right"; finger: Finger } | null>(null);
  const [isOnCycle, setIsOnCycle] = useState(true);
  const [handToggle, setHandToggle] = useState<"left" | "right">("left");
  const [sessionEndTime, setSessionEndTime] = useState<string>("");

  const remaining = totalSeconds - elapsed;
  const progress = (elapsed / totalSeconds) * 100;

  const calculateEndTime = useCallback(() => {
    const now = new Date();
    const end = new Date(now.getTime() + remaining * 1000);
    return end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  }, [remaining]);

  useEffect(() => {
    if (state === "running") {
      setSessionEndTime(calculateEndTime());
    }
  }, [state, calculateEndTime]);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const protocolRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (state === "running") {
      timerRef.current = setInterval(() => {
        setElapsed((e) => {
          if (e >= totalSeconds - 1) { setState("done"); return e; }
          return e + 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [state, totalSeconds]);

  const runProtocol = useCallback(() => {
    if (state !== "running") return;
    const cycle = cycleIndex;
    const isOn = cycle < VCR_PARAMS.ON_CYCLES;
    setIsOnCycle(isOn);

    if (isOn) {
      const hand = handToggle;
      const finger = fingerSeq[seqIdx];
      setFiringFinger({ hand, finger });

      protocolRef.current = setTimeout(() => {
        setFiringFinger(null);
        const nextSeqIdx = (seqIdx + 1) % VCR_PARAMS.FINGERS.length;
        
        if (nextSeqIdx === 0) {
          const nextCycle = (cycle + 1) % (VCR_PARAMS.ON_CYCLES + VCR_PARAMS.OFF_CYCLES);
          setCycleIndex(nextCycle);
          setFingerSeq(nextRVSSequence());
          setHandToggle((h) => h === "left" ? "right" : "left");
        }
        setSeqIdx(nextSeqIdx);
      }, VCR_PARAMS.BURST_MS);
    } else {
      setFiringFinger(null);
      protocolRef.current = setTimeout(() => {
        const nextCycle = (cycle + 1) % (VCR_PARAMS.ON_CYCLES + VCR_PARAMS.OFF_CYCLES);
        setCycleIndex(nextCycle);
      }, VCR_PARAMS.CYCLE_MS);
    }
  }, [state, cycleIndex, fingerSeq, seqIdx, handToggle]);

  useEffect(() => {
    if (state === "running") {
      protocolRef.current = setTimeout(runProtocol, 50);
    }
    return () => { if (protocolRef.current) clearTimeout(protocolRef.current); };
  }, [state, cycleIndex, seqIdx, runProtocol]);

  return (
    <div style={{ position: "relative", minHeight: "100vh", width: "100%", overflow: "hidden", background: "var(--kq-bg)" }}>
      <ParticleSpotlightBg />

      <div style={{ position: "absolute", inset: 0, zIndex: 10, display: "flex", flexDirection: "column", width: "100%" }}>
        
        <div style={{
          padding: "60px 80px", display: "flex", justifyContent: "space-between", alignItems: "flex-start",
          transition: "opacity 0.6s ease", opacity: state === "running" ? 0.05 : 1, pointerEvents: state === "running" ? "none" : "auto", width: "100%"
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              <h1 style={{ 
                fontSize: 100, fontWeight: 900, color: "#fff", letterSpacing: "-6px", marginBottom: -10,
                textShadow: "0 4px 12px rgba(0,0,0,0.1), 0 0 40px rgba(0,0,0,0.05)"
              }} className="font-display">
                KinetiQ
              </h1>
              <p style={{ 
                fontSize: 16, color: "#fff", letterSpacing: "6px", fontWeight: 700, textTransform: "uppercase", 
                opacity: 0.9, textShadow: "0 2px 4px rgba(0,0,0,0.1)"
              }}>
                Vibrotactile Therapy Suite
              </p>
            </div>
            <div style={{ marginTop: 40, display: "flex", gap: 40, alignItems: "center" }}>
              <div style={{ borderLeft: "2px solid var(--kq-border)", paddingLeft: 20 }}>
                <h2 style={{ fontSize: 24, fontWeight: 300, color: "var(--kq-text)", opacity: 0.9 }}>
                  Ready to Flow?
                </h2>
                <p style={{ color: "var(--kq-muted)", fontSize: 16, marginTop: 2 }}>
                  Selected: {mode.name}
                </p>
              </div>
              <div style={{ borderLeft: "2px solid var(--kq-border)", paddingLeft: 20 }}>
                <p style={{ fontSize: 10, color: "var(--kq-muted)", textTransform: "uppercase", letterSpacing: "2px", fontWeight: 700 }}>Output</p>
                <p style={{ fontSize: 16, color: "var(--kq-text)", fontWeight: 600 }}>250Hz Noisy vCR</p>
              </div>
            </div>
          </div>
          <div style={{ padding: "14px 28px", background: "var(--kq-surface)", backdropFilter: "blur(20px)", border: "1px solid var(--kq-border)", color: "var(--kq-accent)", borderRadius: 50, fontSize: 12, fontWeight: 800, letterSpacing: "1.5px" }}>
            {state === "idle" ? "○ DEVICE READY" : state === "running" ? "● DISCHARGING" : "○ PAUSED"}
          </div>
        </div>

        <div style={{ flex: 1, width: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "center", paddingTop: "5vh" }}>
          
          <div style={{ 
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "center", 
            width: "100%", 
            maxWidth: "1000px",
            padding: "0 40px",
            opacity: state === "idle" ? 0.3 : 1, 
            transition: "all 1s ease" 
          }}>
            <RealisticHand hand="left" firingFinger={firingFinger} isOnCycle={state === "running" && isOnCycle} />
            
            {state !== "idle" ? (
              <CircularProgress 
                percent={progress} 
                elapsed={formatDuration(elapsed)} 
                remaining={formatDuration(remaining)}
                endTime={sessionEndTime}
              />
            ) : (
              <div style={{ width: 1, height: 160, background: "linear-gradient(to bottom, transparent, var(--kq-border), transparent)", opacity: 0.3 }} />
            )}

            <RealisticHand hand="right" firingFinger={firingFinger} isOnCycle={state === "running" && isOnCycle} />
          </div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24, marginTop: "4vh" }}>
            
            <div style={{ display: "flex", gap: 16 }}>
              {state === "idle" && (
                <button
                  onClick={() => setState("running")}
                  style={{
                    background: "var(--kq-accent)", color: "#fff", border: "none",
                    padding: "20px 72px", borderRadius: 40, fontSize: 16, fontWeight: 800,
                    cursor: "pointer", display: "flex", alignItems: "center", gap: 12,
                    boxShadow: "0 0 40px var(--kq-subtle)", transition: "all 0.2s ease",
                    textTransform: "uppercase", letterSpacing: "2px"
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-4px) scale(1.02)"}
                  onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0) scale(1)"}
                >
                  <Play fill="#fff" size={20} /> Start Session
                </button>
              )}

              {state === "running" && (
                <button
                  onClick={() => setState("paused")}
                  style={{
                    background: "var(--kq-surface)", color: "var(--kq-accent)", border: "1px solid var(--kq-border)",
                    padding: "16px 48px", borderRadius: 40, fontSize: 14, fontWeight: 700,
                    cursor: "pointer", display: "flex", alignItems: "center", gap: 10,
                    backdropFilter: "blur(10px)"
                  }}
                >
                  <Pause size={18} /> Pause
                </button>
              )}

              {state === "paused" && (
                <button
                  onClick={() => setState("running")}
                  style={{
                    background: "var(--kq-accent)", color: "#fff", border: "none",
                    padding: "16px 48px", borderRadius: 40, fontSize: 14, fontWeight: 700,
                    cursor: "pointer", display: "flex", alignItems: "center", gap: 10,
                  }}
                >
                  <Play fill="#fff" size={18} /> Resume
                </button>
              )}

              {state !== "idle" && (
                <button
                  onClick={() => setState("idle")}
                  style={{
                    background: "transparent", color: "var(--kq-muted)", border: "1px solid var(--kq-border)",
                    padding: "16px 32px", borderRadius: 40, fontSize: 14, fontWeight: 700,
                    cursor: "pointer", display: "flex", alignItems: "center", gap: 10,
                    backdropFilter: "blur(10px)"
                  }}
                >
                  <Square size={18} /> Reset
                </button>
              )}
            </div>
            
            <div style={{
              display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "var(--kq-muted)", 
              transition: "opacity 0.6s ease", opacity: state === "running" ? 0 : 0.6, pointerEvents: state === "running" ? "none" : "auto"
            }}>
              <Zap size={16} color="var(--kq-accent)" /> 
              <span>Vibrotactile Protocol Active</span>
            </div>

          </div>
        </div>
        
      </div>
    </div>
  );
}
