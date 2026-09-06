import type { ReactElement } from "react";
import type { AppId } from "@/lib/types";

type IconProps = {
  className?: string;
  strokeWidth?: number;
};

const strokeProps = (sw = 1.6) =>
  ({
    fill: "none",
    stroke: "currentColor",
    strokeWidth: sw,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  });

export function AboutGlyph({ className, strokeWidth }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...strokeProps(strokeWidth)}>
      <path d="M12 3.5 19.5 12 12 20.5 4.5 12 12 3.5Z" />
      <circle cx="12" cy="12" r="2.25" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function ProjectsGlyph({ className, strokeWidth }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...strokeProps(strokeWidth)}>
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" />
    </svg>
  );
}

export function NotesGlyph({ className, strokeWidth }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...strokeProps(strokeWidth)}>
      <path d="M14.5 4.5h-7A2.5 2.5 0 0 0 5 7v10a2.5 2.5 0 0 0 2.5 2.5h9A2.5 2.5 0 0 0 19 17V9.5L14.5 4.5Z" />
      <path d="M14 4.5V9h4.5" />
      <path d="M8.5 12.5h7M8.5 16h5" />
    </svg>
  );
}

export function NowGlyph({ className, strokeWidth }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...strokeProps(strokeWidth)}>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3.25" />
      <path d="M12 4v2.25M12 17.75V20M4 12h2.25M17.75 12H20" />
    </svg>
  );
}

export function ContactGlyph({ className, strokeWidth }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...strokeProps(strokeWidth)}>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2.5" />
      <path d="m5 8 7 5.5L19 8" />
    </svg>
  );
}

export const APP_ACCENTS: Record<
  AppId,
  { tileFrom: string; tileTo: string; color: string }
> = {
  about: { tileFrom: "#1a2744", tileTo: "#101826", color: "#6ea8ff" },
  projects: { tileFrom: "#132c2a", tileTo: "#0e1a1c", color: "#5ec8bf" },
  notes: { tileFrom: "#2a2414", tileTo: "#18140c", color: "#d4b44a" },
  now: { tileFrom: "#261a30", tileTo: "#160e1c", color: "#b794f6" },
  contact: { tileFrom: "#1a2838", tileTo: "#0e1620", color: "#7eb8ff" },
};

const GLYPHS: Record<AppId, (p: IconProps) => ReactElement> = {
  about: AboutGlyph,
  projects: ProjectsGlyph,
  notes: NotesGlyph,
  now: NowGlyph,
  contact: ContactGlyph,
};

type AppIconProps = {
  id: AppId;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const SIZE: Record<NonNullable<AppIconProps["size"]>, { box: string; glyph: string }> = {
  sm: { box: "h-9 w-9 rounded-[10px]", glyph: "h-[18px] w-[18px]" },
  md: { box: "h-11 w-11 rounded-xl", glyph: "h-5 w-5" },
  lg: { box: "h-12 w-12 rounded-[14px]", glyph: "h-[22px] w-[22px]" },
};

export function AppIcon({ id, size = "md", className = "" }: AppIconProps) {
  const accent = APP_ACCENTS[id];
  const Glyph = GLYPHS[id];
  const dims = SIZE[size];

  return (
    <span
      className={`relative inline-flex shrink-0 items-center justify-center shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_1px_2px_rgba(0,0,0,0.35)] ring-1 ring-white/[0.06] ${dims.box} ${className}`}
      style={{
        background: `linear-gradient(160deg, ${accent.tileFrom} 0%, ${accent.tileTo} 100%)`,
        color: accent.color,
      }}
      aria-hidden
    >
      <span
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-60"
        style={{
          background:
            "radial-gradient(120% 80% at 30% 15%, rgba(255,255,255,0.12), transparent 55%)",
        }}
      />
      <Glyph className={`relative ${dims.glyph}`} strokeWidth={1.65} />
    </span>
  );
}
