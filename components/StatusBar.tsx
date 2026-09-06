"use client";

import { useEffect, useState } from "react";
import { BrandMark } from "./icons/BrandMark";
import { useTheme } from "./ThemeProvider";

function formatClock(d: Date) {
  return d.toLocaleString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function SunIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="none">
      <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="2" />
      <path
        d="M12 3.5v2.2M12 18.3v2.2M3.5 12h2.2M18.3 12h2.2M6.1 6.1l1.55 1.55M16.35 16.35l1.55 1.55M17.9 6.1l-1.55 1.55M7.65 16.35l-1.55 1.55"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="none">
      <path
        d="M18.5 13.6A7.2 7.2 0 0 1 10.4 5.5 7.4 7.4 0 1 0 18.5 13.6Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function StatusBar() {
  const [now, setNow] = useState<string>("");
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === "light";

  useEffect(() => {
    const tick = () => setNow(formatClock(new Date()));
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <header className="desk-status-glass pointer-events-none absolute inset-x-0 top-0 z-50 flex h-11 items-center justify-between border-b border-desk-statusBorder px-4 text-sm text-desk-muted backdrop-blur-md">
      <div className="pointer-events-auto flex items-center gap-2.5">
        <BrandMark className="h-[15px] w-[15px]" />
        <span className="text-[13px] font-semibold tracking-wide text-desk-text">
          ChivOS
        </span>
        <span
          className="hidden h-3 w-px bg-desk-border sm:block"
          aria-hidden
        />
        <span className="hidden font-mono text-[10px] uppercase tracking-[0.14em] text-desk-muted sm:inline">
          v1
        </span>
      </div>
      <div className="pointer-events-auto flex items-center gap-2.5">
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={isLight ? "Switch to dark theme" : "Switch to light theme"}
          aria-pressed={isLight}
          title={isLight ? "Dark theme" : "Light theme"}
          className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-desk-muted transition hover:bg-desk-hover hover:text-desk-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-desk-accent"
        >
          {isLight ? (
            <MoonIcon className="h-4 w-4" />
          ) : (
            <SunIcon className="h-4 w-4" />
          )}
        </button>
        <time
          className="font-mono text-[11px] tabular-nums tracking-wide text-desk-muted"
          dateTime={now || undefined}
        >
          {now || "—"}
        </time>
      </div>
    </header>
  );
}
