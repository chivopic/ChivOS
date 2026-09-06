"use client";

import { useEffect, useState } from "react";

function formatClock(d: Date) {
  return d.toLocaleString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function StatusBar() {
  const [now, setNow] = useState<string>("");

  useEffect(() => {
    const tick = () => setNow(formatClock(new Date()));
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <header className="pointer-events-none absolute inset-x-0 top-0 z-50 flex h-10 items-center justify-between px-4 text-sm text-desk-muted">
      <div className="pointer-events-auto flex items-center gap-2">
        <span className="font-medium tracking-wide text-desk-text">ChivOS</span>
        <span className="hidden text-desk-border sm:inline" aria-hidden>
          /
        </span>
        <span className="hidden text-xs sm:inline">v1</span>
      </div>
      <time className="pointer-events-auto font-mono text-xs tabular-nums text-desk-muted" dateTime={now || undefined}>
        {now || "—"}
      </time>
    </header>
  );
}
