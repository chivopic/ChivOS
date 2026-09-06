"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "./ThemeProvider";

type RGB = readonly [number, number, number];

type Particle = {
  /** Normalized viewport X [0, 1]. */
  x: number;
  /** Normalized viewport Y [0, 1]. */
  y: number;
  size: number;
  alpha: number;
  /** Slow drift in normalized space. */
  driftX: number;
  driftY: number;
  /** Phase for shimmer. */
  phase: number;
  shimmer: number;
  /** Occasional sparkle: pulse rate + peak boost. */
  sparkle: number;
  sparklePhase: number;
  /** Palette parameter: 0 near BR (magenta) → 1 far (cyan/white). */
  colorT: number;
};

const PALETTE: readonly RGB[] = [
  [255, 88, 190], // hot magenta
  [245, 96, 220], // bright pink-magenta
  [200, 110, 255], // vivid purple
  [150, 150, 255], // violet-blue
  [80, 230, 255], // bright cyan
  [200, 245, 255], // icy cyan-white
  [255, 255, 255], // pure white tip
];

const MAX_DPR = 1.75;
/** High-count full-field nebula; still OK under DPR cap. */
const TARGET_COUNT = 6000;
/** Dense static full-field dust for reduced-motion (not full animation). */
const REDUCED_COUNT = 480;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v));
}

function colorAt(t: number): RGB {
  const x = clamp(t, 0, 1) * (PALETTE.length - 1);
  const i = Math.floor(x);
  const f = x - i;
  const a = PALETTE[i]!;
  const b = PALETTE[Math.min(i + 1, PALETTE.length - 1)]!;
  return [
    Math.round(lerp(a[0], b[0], f)),
    Math.round(lerp(a[1], b[1], f)),
    Math.round(lerp(a[2], b[2], f)),
  ];
}

/**
 * Full-viewport nebula spawn: every region gets particles; soft density
 * gradient toward bottom-right (not a thin BR arc spine).
 */
function sampleNebulaXY(): { x: number; y: number } {
  const mode = Math.random();
  if (mode < 0.42) {
    // Uniform coverage across the whole viewport.
    return { x: Math.random(), y: Math.random() };
  }
  if (mode < 0.72) {
    // Soft BR bias — still spans most of the field.
    return {
      x: 1 - Math.pow(Math.random(), 1.45),
      y: 1 - Math.pow(Math.random(), 1.35),
    };
  }
  if (mode < 0.9) {
    // Lower-right quadrant emphasis.
    return {
      x: 0.35 + Math.pow(Math.random(), 0.85) * 0.65,
      y: 0.3 + Math.pow(Math.random(), 0.9) * 0.7,
    };
  }
  // Tight BR nebula core cluster.
  return {
    x: 0.62 + Math.pow(Math.random(), 0.75) * 0.38,
    y: 0.55 + Math.pow(Math.random(), 0.8) * 0.45,
  };
}

/** Magenta near BR → cyan/white toward opposite corners. */
function colorTFromXY(x: number, y: number): number {
  const distFromBR = Math.hypot(1 - x, 1 - y) / Math.SQRT2;
  const jitter = (Math.random() - 0.5) * 0.12;
  return clamp(distFromBR * 0.92 + jitter, 0, 1);
}

function makeParticle(reduced: boolean): Particle {
  const { x, y } = sampleNebulaXY();
  const isSparkle = !reduced && Math.random() < 0.11;
  const size = reduced
    ? 0.55 + Math.random() * 1.5
    : 0.28 +
      Math.random() * 2.1 +
      (Math.random() < 0.12 ? Math.random() * 2.2 : 0) +
      (isSparkle ? 0.4 + Math.random() * 1.1 : 0);
  return {
    x,
    y,
    size,
    alpha: reduced
      ? 0.2 + Math.random() * 0.4
      : 0.14 +
        Math.random() * 0.62 +
        (Math.random() < 0.18 ? 0.22 : 0) +
        (isSparkle ? 0.15 : 0),
    driftX: (Math.random() - 0.5) * 0.018,
    driftY: (Math.random() - 0.5) * 0.016,
    phase: Math.random() * Math.PI * 2,
    shimmer: 0.45 + Math.random() * 1.15,
    sparkle: isSparkle ? 2.2 + Math.random() * 3.8 : 0,
    sparklePhase: Math.random() * Math.PI * 2,
    colorT: colorTFromXY(x, y),
  };
}

function seedParticles(count: number, reduced: boolean): Particle[] {
  const out: Particle[] = [];
  for (let i = 0; i < count; i++) out.push(makeParticle(reduced));
  return out;
}

export function ParticleField() {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);
  const sizeRef = useRef({ w: 0, h: 0, dpr: 1 });

  useEffect(() => {
    if (theme !== "dark") {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
      const c = canvasRef.current;
      if (c) {
        const ctx = c.getContext("2d");
        ctx?.clearRect(0, 0, c.width, c.height);
      }
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const count = reducedMotion ? REDUCED_COUNT : TARGET_COUNT;
    if (particlesRef.current.length !== count) {
      particlesRef.current = seedParticles(count, reducedMotion);
    }

    const resize = () => {
      const parent = canvas.parentElement ?? document.documentElement;
      const w = parent.clientWidth || window.innerWidth;
      const h = parent.clientHeight || window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      sizeRef.current = { w, h, dpr };
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawFrame = (timeSec: number, animate: boolean) => {
      const { w, h } = sizeRef.current;
      if (w <= 0 || h <= 0) return;
      ctx.clearRect(0, 0, w, h);

      ctx.globalCompositeOperation = "lighter";

      const particles = particlesRef.current;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]!;
        if (animate) {
          p.x += p.driftX * 0.016;
          p.y += p.driftY * 0.016;
          // Soft wrap / respawn so the nebula stays full-field (no band collapse).
          if (p.x < -0.04 || p.x > 1.04 || p.y < -0.04 || p.y > 1.04) {
            const np = makeParticle(false);
            p.x = np.x;
            p.y = np.y;
            p.size = np.size;
            p.alpha = np.alpha;
            p.driftX = np.driftX;
            p.driftY = np.driftY;
            p.phase = np.phase;
            p.shimmer = np.shimmer;
            p.sparkle = np.sparkle;
            p.sparklePhase = np.sparklePhase;
            p.colorT = np.colorT;
          }
        }

        const px = p.x * w;
        const py = p.y * h;

        // Soft falloff near extreme edges so the cloud feels nebular, not clipped.
        const edgeFadeX = clamp(1 - Math.abs(p.x - 0.5) * 1.85, 0.35, 1);
        const edgeFadeY = clamp(1 - Math.abs(p.y - 0.5) * 1.85, 0.35, 1);
        const edge = edgeFadeX * edgeFadeY;

        const shimmer = animate
          ? 0.7 +
            0.3 * Math.sin(timeSec * p.shimmer + p.phase) * (0.55 + 0.45 * edge)
          : 0.88;

        let sparkleBoost = 1;
        if (animate && p.sparkle > 0) {
          const pulse = Math.sin(timeSec * p.sparkle + p.sparklePhase);
          const peak = Math.pow(Math.max(0, pulse), 8);
          sparkleBoost = 1 + peak * 1.85;
        }

        const a = p.alpha * edge * shimmer * sparkleBoost;
        if (a < 0.018) continue;

        const [r, g, b] = colorAt(p.colorT);

        const drawSize =
          p.size *
          (sparkleBoost > 1.2 ? 1 + (sparkleBoost - 1) * 0.35 : 1);

        ctx.beginPath();
        ctx.fillStyle = `rgba(${r},${g},${b},${Math.min(1, a)})`;
        ctx.arc(px, py, drawSize, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalCompositeOperation = "source-over";
    };

    resize();

    if (reducedMotion) {
      drawFrame(0, false);
      const onResize = () => {
        resize();
        drawFrame(0, false);
      };
      window.addEventListener("resize", onResize);
      return () => {
        window.removeEventListener("resize", onResize);
      };
    }

    let running = document.visibilityState !== "hidden";
    let last = performance.now();

    const tick = (now: number) => {
      rafRef.current = 0;
      if (!running) return;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      void dt;
      drawFrame(now / 1000, true);
      rafRef.current = requestAnimationFrame(tick);
    };

    const onVisibility = () => {
      running = document.visibilityState !== "hidden";
      if (running && !rafRef.current) {
        last = performance.now();
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    const onResize = () => resize();

    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      running = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [theme]);

  if (theme !== "dark") return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-[1]"
      aria-hidden
    />
  );
}
