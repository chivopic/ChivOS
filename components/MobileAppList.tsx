"use client";

import { APPS } from "@/lib/apps";
import type { AppId } from "@/lib/types";
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
        <div className="flex items-center gap-2 border-b border-desk-border px-3 py-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-2 py-1 text-sm text-desk-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-desk-accent"
          >
            ← Back
          </button>
          <h2 className="flex-1 text-sm font-medium text-desk-text">{app?.title}</h2>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto p-4">
          <Panel id={active} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col px-4 pb-8 pt-14 md:hidden">
      <p className="mb-1 font-mono text-xs text-desk-warm">
        build things · explore deeply · stay curious
      </p>
      <h1 className="mb-6 text-2xl font-semibold text-desk-text">ChivOS</h1>
      <ul className="space-y-2" aria-label="Apps">
        {APPS.map((app) => (
          <li key={app.id}>
            <button
              type="button"
              onClick={() => onOpen(app.id)}
              className="flex w-full items-center gap-3 rounded-xl border border-desk-border bg-desk-panel px-3 py-3 text-left transition hover:border-desk-accent/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-desk-accent"
            >
              <span
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-desk-bg text-lg text-desk-accent"
                aria-hidden
              >
                {app.icon}
              </span>
              <span className="font-medium text-desk-text">{app.title}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
