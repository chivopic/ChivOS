import type { ReactElement } from "react";
import type { AppId } from "@/lib/types";

type IconProps = {
  className?: string;
  strokeWidth?: number;
};

const strokeProps = (sw = 2) =>
  ({
    fill: "none",
    stroke: "currentColor",
    strokeWidth: sw,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  });

/** Person / ID-card silhouette */
export function AboutGlyph({ className, strokeWidth }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...strokeProps(strokeWidth)}>
      <circle cx="12" cy="8" r="3.25" />
      <path d="M5.5 19.25c.7-3.4 3.1-5 6.5-5s5.8 1.6 6.5 5" />
    </svg>
  );
}

/** Folder / layered apps */
export function ProjectsGlyph({ className, strokeWidth }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...strokeProps(strokeWidth)}>
      <path d="M3.75 8.5V7a2 2 0 0 1 2-2h4.1l1.6 1.75h6.8a2 2 0 0 1 2 2V9" />
      <rect x="3.75" y="8.5" width="16.5" height="10.25" rx="2" />
    </svg>
  );
}

/** Notepad with lines */
export function NotesGlyph({ className, strokeWidth }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...strokeProps(strokeWidth)}>
      <rect x="5.5" y="3.5" width="13" height="17" rx="2" />
      <path d="M8.5 8h7M8.5 12h7M8.5 16h4.5" />
    </svg>
  );
}

/** Clock */
export function NowGlyph({ className, strokeWidth }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...strokeProps(strokeWidth)}>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 7.5V12l3.25 2.25" />
    </svg>
  );
}

/** Simple envelope */
export function ContactGlyph({ className, strokeWidth }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...strokeProps(strokeWidth)}>
      <rect x="3.5" y="6" width="17" height="12" rx="2" />
      <path d="m4.75 8.25 7.25 5.25 7.25-5.25" />
    </svg>
  );
}

/** Flat, high-contrast tile colors (readable on dark + light desks) */
export const APP_ACCENTS: Record<
  AppId,
  { tile: string; color: string }
> = {
  about: { tile: "#23406e", color: "#9ec2ff" },
  projects: { tile: "#1b4a46", color: "#7ee0d6" },
  notes: { tile: "#4a3c16", color: "#efc85a" },
  now: { tile: "#3d2a52", color: "#cbb0ff" },
  contact: { tile: "#1f3d5c", color: "#8fc2ff" },
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
      className={`relative inline-flex shrink-0 items-center justify-center ring-1 ${dims.box} ${className}`}
      style={{
        background: accent.tile,
        color: accent.color,
        boxShadow: "var(--desk-icon-inset)",
        // ring color via style for theme adapt
        ["--tw-ring-color" as string]: "var(--desk-icon-ring)",
      }}
      aria-hidden
    >
      <Glyph className={`relative ${dims.glyph}`} strokeWidth={2.15} />
    </span>
  );
}
