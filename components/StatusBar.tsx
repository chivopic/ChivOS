"use client";

import { useEffect, useState } from "react";
import { BrandMark } from "./icons/BrandMark";

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
    <header className="pointer-events-none absolute inset-x-0 top-0 z-50 flex h-11 items-center justify-between border-b border-white/[0.04] bg-desk-bg/40 px-4 text-sm text-desk-muted backdrop-blur-md">
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
      <time
        className="pointer-events-auto font-mono text-[11px] tabular-nums tracking-wide text-desk-muted"
        dateTime={now || undefined}
      >
        {now || "—"}
      </time>
    </header>
  );
}
