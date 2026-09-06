"use client";

import { APPS } from "@/lib/apps";
import type { AppId } from "@/lib/types";

type DockProps = {
  openIds: AppId[];
  focusedId: AppId | null;
  onOpen: (id: AppId) => void;
};

export function Dock({ openIds, focusedId, onOpen }: DockProps) {
  return (
    <nav
      aria-label="Dock"
      className="absolute bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-end gap-1 rounded-2xl border border-desk-border/80 bg-desk-panel/90 px-2 py-2 shadow-dock backdrop-blur-md"
    >
      {APPS.map((app) => {
        const isOpen = openIds.includes(app.id);
        const isFocused = focusedId === app.id;
        return (
          <button
            key={app.id}
            type="button"
            onClick={() => onOpen(app.id)}
            aria-label={`Open ${app.title}`}
            aria-pressed={isFocused}
            className={`group flex w-14 flex-col items-center gap-1 rounded-xl px-1 py-1.5 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-desk-accent ${
              isFocused ? "bg-desk-raised" : "hover:bg-desk-raised/70"
            }`}
          >
            <span
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-desk-border bg-desk-bg text-lg text-desk-accent"
              aria-hidden
            >
              {app.icon}
            </span>
            <span className="max-w-full truncate text-[10px] text-desk-muted group-hover:text-desk-text">
              {app.label}
            </span>
            <span
              className={`h-1 w-1 rounded-full ${isOpen ? "bg-desk-accent" : "bg-transparent"}`}
              aria-hidden
            />
          </button>
        );
      })}
    </nav>
  );
}
