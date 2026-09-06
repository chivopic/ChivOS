"use client";

import { APPS } from "@/lib/apps";
import type { AppId } from "@/lib/types";

type DesktopIconsProps = {
  onOpen: (id: AppId) => void;
};

export function DesktopIcons({ onOpen }: DesktopIconsProps) {
  return (
    <ul
      className="absolute left-4 top-14 z-10 hidden flex-col gap-3 md:flex"
      aria-label="Desktop icons"
    >
      {APPS.map((app) => (
        <li key={app.id}>
          <button
            type="button"
            onDoubleClick={() => onOpen(app.id)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onOpen(app.id);
              }
            }}
            onClick={() => onOpen(app.id)}
            className="flex w-20 flex-col items-center gap-1 rounded-lg p-2 text-center transition hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-desk-accent"
            aria-label={`Open ${app.title}`}
          >
            <span
              className="flex h-12 w-12 items-center justify-center rounded-xl border border-desk-border bg-desk-panel text-xl text-desk-accent shadow-sm"
              aria-hidden
            >
              {app.icon}
            </span>
            <span className="text-xs text-desk-text drop-shadow">{app.label}</span>
          </button>
        </li>
      ))}
    </ul>
  );
}
