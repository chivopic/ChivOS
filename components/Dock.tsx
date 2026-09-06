"use client";

import { APPS } from "@/lib/apps";
import type { AppId } from "@/lib/types";
import { AppIcon } from "./icons/AppIcon";

type DockProps = {
  openIds: AppId[];
  focusedId: AppId | null;
  onOpen: (id: AppId) => void;
};

export function Dock({ openIds, focusedId, onOpen }: DockProps) {
  return (
    <nav
      aria-label="Dock"
      className="absolute bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-end gap-1 rounded-[22px] border border-desk-glassBorder bg-desk-panel/75 px-2.5 py-2 shadow-dock backdrop-blur-xl"
    >
      {APPS.map((app) => {
        const isOpen = openIds.includes(app.id);
        const isFocused = focusedId === app.id;
        return (
          <button
            key={app.id}
            type="button"
            onClick={() => onOpen(app.id)}
            title={app.title}
            aria-label={`Open ${app.title}`}
            aria-pressed={isFocused}
            className={`group relative flex h-14 w-14 flex-col items-center justify-center rounded-2xl transition duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-desk-accent ${
              isFocused
                ? "bg-desk-hoverStrong"
                : "hover:bg-desk-hover hover:-translate-y-0.5"
            }`}
          >
            <AppIcon
              id={app.id}
              size="md"
              className="transition duration-150 group-hover:scale-[1.04] group-active:scale-[0.98]"
            />
            <span
              className={`absolute bottom-1 h-1 rounded-full transition-all duration-150 ${
                isFocused
                  ? "w-3 bg-desk-accent"
                  : isOpen
                    ? "w-1.5 bg-desk-accent/80"
                    : "w-0 bg-transparent"
              }`}
              aria-hidden
            />
          </button>
        );
      })}
    </nav>
  );
}
