import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}h ${m.toString().padStart(2, "0")}m`;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

export function formatTime(date: Date): string {
  return new Intl.DateTimeFormat("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(date);
}

// Tass vCR protocol constants
export const VCR_PARAMS = {
  FREQ_HZ: 250,
  BURST_MS: 100,
  CR_FREQ_HZ: 1.5,
  CYCLE_MS: 667,       // 1000 / 1.5
  ON_CYCLES: 3,
  OFF_CYCLES: 2,
  JITTER_PCT: 0.235,   // ±23.5% for noisy vCR
  FINGERS: ["index", "middle", "ring", "pinky", "thumb"] as const,
};

export type Finger = typeof VCR_PARAMS.FINGERS[number];
export type Hand = "left" | "right";

export function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Generate next RVS sequence (randomized each cycle)
export function nextRVSSequence(): Finger[] {
  return shuffleArray([...VCR_PARAMS.FINGERS]);
}

// With ±23.5% jitter
export function jitteredInterval(baseMs: number, jitter = VCR_PARAMS.JITTER_PCT): number {
  const factor = 1 + (Math.random() * 2 - 1) * jitter;
  return Math.round(baseMs * factor);
}

export const FINGER_COLORS: Record<Finger, string> = {
  index:  "#00f2ff", // Neon Cyan
  middle: "#ffd700", // Metallic Gold
  ring:   "#39ff14", // Neon Lime
  pinky:  "#bc13fe", // Neon Purple
  thumb: "#c9bfa9",
};

export const FINGER_LABELS: Record<Finger, string> = {
  index:  "Index",
  middle: "Middle",
  ring:   "Ring",
  pinky:  "Pinky",
      thumb: "Thumb",
};

export const THERAPY_MODES = [
  {
    id: "standard-vcr",
    name: "Standard Protocol",
    badge: "Most Popular",
    badgeColor: "#1a1612",
    description: "The foundational clinical protocol. Gentle 250 Hz bursts with rhythmic rest cycles.",
    howItWorks: [
      "250Hz rhythmic stimulation",
      "Calculated 3-on, 2-off cycle",
      "Targets major sensorimotor nodes"
    ],
    whyUseful: [
      "Manage tremors and rigidity",
      "Improve baseline movement ease",
      "Establish routine neuro-balance"
    ],
    duration: 120,
    intensity: 70,
    tier: "free",
    params: { freq: 250, burstMs: 100, crFreq: 1.5, pattern: "3:2", noisy: false, bilateral: true },
    targets: ["Tremor", "Rigidity", "Movement ease"],
  },
  {
    id: "noisy-vcr",
    name: "Neuro-Plastic (nCR)",
    badge: "Researcher Choice",
    badgeColor: "#b8a994",
    description: "Advanced protocol introducing random timing jitter to maximize neural desynchronization.",
    howItWorks: [
      "Introduces ±23.5% timing jitter",
      "Disrupts persistent synchrony",
      "Randomized inter-burst intervals"
    ],
    whyUseful: [
      "Prevents brain habituation",
      "Longer-lasting therapeutic relief",
      "Induces deep-brain 'unlearning'"
    ],
    duration: 60,
    intensity: 75,
    tier: "free",
    params: { freq: 250, burstMs: 100, crFreq: 1.5, pattern: "3:2", noisy: true, bilateral: true },
    targets: ["Deep Desync", "Plateau Breaker"],
  },
  {
    id: "shuffle-vcr",
    name: "Adaptive Shuffle",
    badge: "Dynamic",
    badgeColor: "#7a6f62",
    description: "Randomizes the finger sequence every cycle to optimize multi-sensory neural resetting.",
    howItWorks: [
      "Shuffles finger order every cycle",
      "Total sequence unpredictability",
      "Multi-sensory input variation"
    ],
    whyUseful: [
      "Optimizes neural 'unlearning'",
      "Engages multiple sensory-motor nodes",
      "Maintains focus during therapy"
    ],
    duration: 90,
    intensity: 65,
    tier: "free",
    params: { freq: 250, burstMs: 100, crFreq: 1.5, pattern: "RVS", noisy: false, bilateral: true },
    targets: ["Coordination", "Focus Mode"],
  },
  {
    id: "gentle-warmup",
    name: "Quick Start",
    badge: "Beginner",
    badgeColor: "#dccfb2",
    description: "Reduced intensity, shorter session with simple progressive steps.",
    howItWorks: [
      "Low intensity (50%)",
      "Short duration (30m)",
      "Simple sequence progression"
    ],
    whyUseful: [
      "Patient onboarding",
      "Morning muscle loosening",
      "Quick relaxation boost"
    ],
    duration: 30,
    intensity: 50,
    tier: "free",
    params: { freq: 250, burstMs: 100, crFreq: 1.5, pattern: "3:2", noisy: false, bilateral: true, warmup: true },
    targets: ["Relaxation", "Onboarding"],
  },
  {
    id: "sleep-protocol",
    name: "Evening Rest",
    badge: "Calming",
    badgeColor: "#a68c99",
    description: "Lower frequency session to help ease rigid muscles before bed.",
    howItWorks: [
      "Reduced 180Hz frequency",
      "Slower CR rhythm (1.0Hz)",
      "Smooth intensity ramps"
    ],
    whyUseful: [
      "Ease muscle rigidity at night",
      "Prepare nervous system for rest",
      "Reduce nocturnal discomfort"
    ],
    duration: 45,
    intensity: 45,
    tier: "free",
    params: { freq: 180, burstMs: 100, crFreq: 1.0, pattern: "3:2", noisy: false, bilateral: true },
    targets: ["Night-Time Ease", "Restful Transition"],
  },
] as const;

export type TherapyMode = typeof THERAPY_MODES[number];
