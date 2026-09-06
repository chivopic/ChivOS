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
};

const PALETTE: readonly RGB[] = [
  [255, 64, 160], // magenta / hot pink
  [220, 72, 200], // pink-magenta
  [168, 96, 255], // purple
  [120, 140, 255], // violet-blue
  [64, 210, 235], // cyan
  [180, 230, 255], // icy cyan-white
  [236, 242, 250], // silver / white
];

const MAX_DPR = 1.75;
const TARGET_COUNT = 2200;
const REDUCED_COUNT = 180;

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
  // Tangent for normals
  const tx = 2 * u * (p1x - p0x) + 2 * t * (p2x - p1x);
  const ty = 2 * u * (p1y - p0y) + 2 * t * (p2y - p1y);
  const len = Math.hypot(tx, ty) || 1;
  return { x, y, nx: -ty / len, ny: tx / len };
}

/** Band half-width grows along the spray (dense core → sparse outer). */
function bandHalfWidth(t: number, w: number, h: number) {
  const base = Math.min(w, h);
  return base * lerp(0.045, 0.28, Math.pow(t, 0.85));
}

function denserT(): number {
  // Bias samples toward the curved dense core (lower t), with a long sparse tail.
  const u = Math.random();
  // Mix of dense near-origin and mid-band body.
  if (u < 0.55) return Math.pow(Math.random(), 1.55);
  if (u < 0.85) return 0.25 + Math.random() * 0.45;
  return 0.55 + Math.pow(Math.random(), 0.7) * 0.45;
}

function makeParticle(reduced: boolean): Particle {
  const t = denserT();
  // Gaussian-ish offset; tighter near dense spine.
  const g = (Math.random() + Math.random() + Math.random() + Math.random() - 2) / 2;
  const spread = Math.pow(t, 0.55) * (0.35 + Math.random() * 0.9);
  return {
    t,
    offset: g * spread,
    size: reduced
      ? 0.6 + Math.random() * 1.4
      : 0.35 + Math.random() * 1.85 + (Math.random() < 0.08 ? Math.random() * 1.6 : 0),
    alpha: reduced
      ? 0.18 + Math.random() * 0.35
      : 0.12 + Math.random() * 0.55 + (Math.random() < 0.12 ? 0.2 : 0),
    driftT: (Math.random() - 0.5) * 0.018,
    driftO: (Math.random() - 0.5) * 0.04,
    phase: Math.random() * Math.PI * 2,
    shimmer: 0.35 + Math.random() * 0.9,
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

      // Soft additive-ish look via lighter composite for bright spray tips.
      ctx.globalCompositeOperation = "lighter";

      const particles = particlesRef.current;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]!;
        if (animate) {
          p.t += p.driftT * 0.016;
          p.offset += p.driftO * 0.016;
          if (p.t < -0.02 || p.t > 1.05) {
            p.t = denserT();
            p.offset =
              ((Math.random() + Math.random() + Math.random() + Math.random() - 2) /
                2) *
              Math.pow(p.t, 0.55) *
              (0.35 + Math.random() * 0.9);
          }
          // Soft pull back toward band so spray stays coherent.
          p.offset *= 0.9992;
        }

        const tt = clamp(p.t, 0, 1);
        const { x, y, nx, ny } = spinePoint(tt, w, h);
        const half = bandHalfWidth(tt, w, h);
        const px = x + nx * p.offset * half;
        const py = y + ny * p.offset * half;

        // Density falloff away from spine + toward far spray.
        const edge = clamp(1 - Math.abs(p.offset), 0, 1);
        const along = 1 - tt * 0.35;
        const shimmer = animate
          ? 0.72 +
            0.28 * Math.sin(timeSec * p.shimmer + p.phase) *
              (0.55 + 0.45 * edge)
          : 0.85;
        const a = p.alpha * edge * along * shimmer;
        if (a < 0.02) continue;

        // Color advances along band; slight silver lift on outer spray.
        const colorT = clamp(tt * 0.92 + Math.abs(p.offset) * 0.12, 0, 1);
        const [r, g, b] = colorAt(colorT);

        ctx.beginPath();
        ctx.fillStyle = `rgba(${r},${g},${b},${a})`;
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
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
      // Use wall time for shimmer phase; dt reserved if we need frame-rate independence later.
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
