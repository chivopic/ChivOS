"use client";

import { APPS } from "@/lib/apps";
import type { AppId } from "@/lib/types";
import { AppIcon } from "./icons/AppIcon";

type DesktopIconsProps = {
  onOpen: (id: AppId) => void;
};

export function DesktopIcons({ onOpen }: DesktopIconsProps) {
  return (
    <ul
      className="absolute left-5 top-14 z-10 hidden flex-col gap-2.5 md:flex"
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
            className="group flex w-[4.75rem] flex-col items-center gap-1.5 rounded-xl p-2 text-center transition hover:bg-desk-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-desk-accent"
            aria-label={`Open ${app.title}`}
          >
            <AppIcon
              id={app.id}
              size="lg"
              className="transition duration-150 group-hover:scale-[1.03] group-active:scale-[0.98]"
            />
            <span
              className="text-[11px] font-medium tracking-wide text-desk-text/90"
              style={{ textShadow: "var(--desk-label-shadow)" }}
            >
              {app.label}
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}
