"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "./ThemeProvider";

type RGB = readonly [number, number, number];

type Particle = {
  /** Position along the band spine [0, 1] (0 = BR origin, 1 = far spray). */
  t: number;
  /** Signed offset from spine in band-normal units. */
  offset: number;
  size: number;
  alpha: number;
  /** Slow drift along spine. */
  driftT: number;
  /** Slow drift across band. */
  driftO: number;
  /** Phase for shimmer. */
  phase: number;
  shimmer: number;
  /** Occasional sparkle: pulse rate + peak boost. */
  sparkle: number;
  sparklePhase: number;
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
/** ~2.7× prior 2200 — dense showy spray; still OK under DPR cap. */
const TARGET_COUNT = 6000;
/** Denser static dust for reduced-motion (not full animation). */
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

/** Quadratic Bezier spine: bottom-right → mid-right arc → center-left. */
function spinePoint(t: number, w: number, h: number) {
  const p0x = w * 1.02;
  const p0y = h * 0.98;
  const p1x = w * 0.72;
  const p1y = h * 0.42;
  const p2x = w * 0.08;
  const p2y = h * 0.38;
  const u = 1 - t;
  const x = u * u * p0x + 2 * u * t * p1x + t * t * p2x;
  const y = u * u * p0y + 2 * u * t * p1y + t * t * p2y;
  const tx = 2 * u * (p1x - p0x) + 2 * t * (p2x - p1x);
  const ty = 2 * u * (p1y - p0y) + 2 * t * (p2y - p1y);
  const len = Math.hypot(tx, ty) || 1;
  return { x, y, nx: -ty / len, ny: tx / len };
}

/** Band half-width — slightly richer spray envelope. */
function bandHalfWidth(t: number, w: number, h: number) {
  const base = Math.min(w, h);
  return base * lerp(0.05, 0.32, Math.pow(t, 0.82));
}

function denserT(): number {
  // Heavier bias toward curved dense core; long sparse outer spray.
  const u = Math.random();
  if (u < 0.62) return Math.pow(Math.random(), 1.7);
  if (u < 0.88) return 0.22 + Math.random() * 0.48;
  return 0.55 + Math.pow(Math.random(), 0.65) * 0.45;
}

function makeParticle(reduced: boolean): Particle {
  const t = denserT();
  const g =
    (Math.random() + Math.random() + Math.random() + Math.random() - 2) / 2;
  const spread = Math.pow(t, 0.5) * (0.28 + Math.random() * 0.95);
  const isSparkle = !reduced && Math.random() < 0.11;
  // Wider size range: fine dust → occasional larger glints.
  const size = reduced
    ? 0.55 + Math.random() * 1.5
    : 0.28 +
      Math.random() * 2.1 +
      (Math.random() < 0.12 ? Math.random() * 2.2 : 0) +
      (isSparkle ? 0.4 + Math.random() * 1.1 : 0);
  return {
    t,
    offset: g * spread,
    size,
    alpha: reduced
      ? 0.2 + Math.random() * 0.4
      : 0.14 +
        Math.random() * 0.62 +
        (Math.random() < 0.18 ? 0.22 : 0) +
        (isSparkle ? 0.15 : 0),
    // Slightly faster / more dynamic drift — still gentle.
    driftT: (Math.random() - 0.5) * 0.028,
    driftO: (Math.random() - 0.5) * 0.055,
    phase: Math.random() * Math.PI * 2,
    shimmer: 0.45 + Math.random() * 1.15,
    sparkle: isSparkle ? 2.2 + Math.random() * 3.8 : 0,
    sparklePhase: Math.random() * Math.PI * 2,
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
          p.t += p.driftT * 0.016;
          p.offset += p.driftO * 0.016;
          if (p.t < -0.02 || p.t > 1.05) {
            const np = makeParticle(false);
            p.t = np.t;
            p.offset = np.offset;
            p.size = np.size;
            p.alpha = np.alpha;
            p.driftT = np.driftT;
            p.driftO = np.driftO;
            p.phase = np.phase;
            p.shimmer = np.shimmer;
            p.sparkle = np.sparkle;
            p.sparklePhase = np.sparklePhase;
          }
          // Soft pull toward band so spray stays coherent.
          p.offset *= 0.999;
        }

        const tt = clamp(p.t, 0, 1);
        const { x, y, nx, ny } = spinePoint(tt, w, h);
        const half = bandHalfWidth(tt, w, h);
        const px = x + nx * p.offset * half;
        const py = y + ny * p.offset * half;

        const edge = clamp(1 - Math.abs(p.offset), 0, 1);
        const along = 1 - tt * 0.32;
        const shimmer = animate
          ? 0.7 +
            0.3 * Math.sin(timeSec * p.shimmer + p.phase) * (0.5 + 0.5 * edge)
          : 0.88;

        let sparkleBoost = 1;
        if (animate && p.sparkle > 0) {
          // Sharp occasional twinkle peaks — showy but not strobing.
          const pulse = Math.sin(timeSec * p.sparkle + p.sparklePhase);
          const peak = Math.pow(Math.max(0, pulse), 8);
          sparkleBoost = 1 + peak * 1.85;
        }

        const a = p.alpha * edge * along * shimmer * sparkleBoost;
        if (a < 0.018) continue;

        const colorT = clamp(tt * 0.9 + Math.abs(p.offset) * 0.14, 0, 1);
        const [r, g, b] = colorAt(colorT);

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
