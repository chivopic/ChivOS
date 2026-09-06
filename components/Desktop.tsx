"use client";

import { useCallback, useMemo, useState } from "react";
import { APPS, getApp } from "@/lib/apps";
import type { AppId, WindowState } from "@/lib/types";
import { StatusBar } from "./StatusBar";
import { Dock } from "./Dock";
import { DesktopIcons } from "./DesktopIcons";
import { WindowFrame } from "./Window";
import { MobileAppList } from "./MobileAppList";
import { ParticleField } from "./ParticleField";
import { AboutWindow } from "./windows/AboutWindow";
import { ProjectsWindow } from "./windows/ProjectsWindow";
import { NotesWindow } from "./windows/NotesWindow";
import { NowWindow } from "./windows/NowWindow";
import { ContactWindow } from "./windows/ContactWindow";

function AppBody({ id }: { id: AppId }) {
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

function cascadePosition(index: number) {
  const baseX = 120;
  const baseY = 72;
  const step = 28;
  return { x: baseX + index * step, y: baseY + index * step };
}

export function Desktop() {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [topZ, setTopZ] = useState(10);
  const [focusedId, setFocusedId] = useState<AppId | null>(null);
  const [mobileActive, setMobileActive] = useState<AppId | null>(null);

  const openIds = useMemo(() => windows.map((w) => w.id), [windows]);

  const openApp = useCallback(
    (id: AppId) => {
      setMobileActive(id);
      setWindows((prev) => {
        const existing = prev.find((w) => w.id === id);
        if (existing) {
          const z = topZ + 1;
          setTopZ(z);
          setFocusedId(id);
          return prev.map((w) =>
            w.id === id ? { ...w, zIndex: z, minimized: false } : w,
          );
        }
        const app = getApp(id);
        if (!app) return prev;
        const z = topZ + 1;
        setTopZ(z);
        setFocusedId(id);
        const pos = cascadePosition(prev.length);
        return [
          ...prev,
          {
            id,
            x: pos.x,
            y: pos.y,
            width: app.defaultSize.width,
            height: app.defaultSize.height,
            zIndex: z,
            minimized: false,
          },
        ];
      });
    },
    [topZ],
  );

  const focusApp = useCallback(
    (id: AppId) => {
      setFocusedId(id);
      setWindows((prev) => {
        const z = topZ + 1;
        setTopZ(z);
        return prev.map((w) => (w.id === id ? { ...w, zIndex: z } : w));
      });
    },
    [topZ],
  );

  const closeApp = useCallback((id: AppId) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
    setFocusedId((cur) => (cur === id ? null : cur));
    setMobileActive((cur) => (cur === id ? null : cur));
  }, []);

  const moveApp = useCallback((id: AppId, x: number, y: number) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, x, y } : w)));
  }, []);

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden bg-desk-bg">
      {/* Wallpaper — Background A+ grid / noise / cool corners + soft depth (theme CSS) */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="desk-wallpaper absolute inset-0" />
        <div className="desk-noise absolute inset-0" />
        <div className="desk-grid absolute inset-0" />
      </div>

      {/* Dark-theme particle dust band (omp-like) — above wallpaper, under UI */}
      <ParticleField />

      <StatusBar />

      {/* Mobile */}
      <MobileAppList
        active={mobileActive}
        onOpen={openApp}
        onClose={() => setMobileActive(null)}
      />

      {/* Desktop */}
      <div className="relative hidden h-full md:block">
        <DesktopIcons onOpen={openApp} />

        <div className="pointer-events-none absolute bottom-24 left-1/2 z-[1] -translate-x-1/2 text-center">
          <p className="font-mono text-[11px] tracking-[0.18em] text-desk-muted/70">
            build things · explore deeply · stay curious
          </p>
        </div>

        {windows
          .filter((w) => !w.minimized)
          .map((w) => {
            const app = getApp(w.id);
            if (!app) return null;
            return (
              <WindowFrame
                key={w.id}
                id={w.id}
                title={app.title}
                x={w.x}
                y={w.y}
                width={w.width}
                height={w.height}
                zIndex={w.zIndex}
                focused={focusedId === w.id}
                onFocus={focusApp}
                onClose={closeApp}
                onMove={moveApp}
              >
                <AppBody id={w.id} />
              </WindowFrame>
            );
          })}

        <Dock openIds={openIds} focusedId={focusedId} onOpen={openApp} />
      </div>

      <p className="sr-only">
        ChivOS desktop. Use dock or icons to open About, Projects, Notes, Now, and
        Contact. Press Escape to close a focused window. Apps available:{" "}
        {APPS.map((a) => a.title).join(", ")}.
      </p>
    </div>
  );
}
