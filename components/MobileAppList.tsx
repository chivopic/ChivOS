"use client";

import { APPS } from "@/lib/apps";
import type { AppId } from "@/lib/types";
import { AppIcon } from "./icons/AppIcon";
import { AboutWindow } from "./windows/AboutWindow";
import { ProjectsWindow } from "./windows/ProjectsWindow";
import { NotesWindow } from "./windows/NotesWindow";
import { NowWindow } from "./windows/NowWindow";
import { ContactWindow } from "./windows/ContactWindow";

type MobileAppListProps = {
  active: AppId | null;
  onOpen: (id: AppId) => void;
  onClose: () => void;
};

function Panel({ id }: { id: AppId }) {
  switch (id) {
    case "about":
      return <AboutWindow />;
    case "projects":
      return <ProjectsWindow />;
    case "notes":
      return <NotesWindow />;
    case "now":
      return <NowWindow />;
    case "contact":
      return <ContactWindow />;
  }
}

export function MobileAppList({ active, onOpen, onClose }: MobileAppListProps) {
  if (active) {
    const app = APPS.find((a) => a.id === active);
    return (
      <div className="flex h-full flex-col md:hidden">
        <div className="flex items-center gap-2 border-b border-desk-border/80 bg-desk-panel/40 px-3 py-3 backdrop-blur-md">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-2 py-1 text-sm text-desk-accent transition hover:bg-white/[0.04] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-desk-accent"
          >
            ← Back
          </button>
          <div className="flex flex-1 items-center gap-2">
            {app ? <AppIcon id={app.id} size="sm" /> : null}
            <h2 className="text-sm font-medium text-desk-text">{app?.title}</h2>
          </div>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-5">
          <Panel id={active} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col px-4 pb-8 pt-14 md:hidden">
      <p className="mb-1 font-mono text-[11px] tracking-wide text-desk-warm/90">
        build things · explore deeply · stay curious
      </p>
      <h1 className="mb-7 text-2xl font-semibold tracking-tight text-desk-text">
        ChivOS
      </h1>
      <ul className="space-y-2.5" aria-label="Apps">
        {APPS.map((app) => (
          <li key={app.id}>
            <button
              type="button"
              onClick={() => onOpen(app.id)}
              className="flex w-full items-center gap-3.5 rounded-2xl border border-desk-border/80 bg-desk-panel/80 px-3.5 py-3.5 text-left shadow-sm transition hover:border-desk-accent/35 hover:bg-desk-raised/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-desk-accent"
            >
              <AppIcon id={app.id} size="md" />
              <span className="font-medium tracking-wide text-desk-text">
                {app.title}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
