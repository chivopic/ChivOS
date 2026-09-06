"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import type { AppId } from "@/lib/types";

type WindowProps = {
  id: AppId;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  focused: boolean;
  onFocus: (id: AppId) => void;
  onClose: (id: AppId) => void;
  onMove: (id: AppId, x: number, y: number) => void;
  children: ReactNode;
};

export function WindowFrame({
  id,
  title,
  x,
  y,
  width,
  height,
  zIndex,
  focused,
  onFocus,
  onClose,
  onMove,
  children,
}: WindowProps) {
  const dragging = useRef(false);
  const origin = useRef({ px: 0, py: 0, wx: 0, wy: 0 });
  const [pos, setPos] = useState({ x, y });

  useEffect(() => {
    setPos({ x, y });
  }, [x, y]);

  const onPointerDown = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      if ((e.target as HTMLElement).closest("[data-window-action]")) return;
      onFocus(id);
      dragging.current = true;
      origin.current = { px: e.clientX, py: e.clientY, wx: pos.x, wy: pos.y };
      e.currentTarget.setPointerCapture(e.pointerId);
    },
    [id, onFocus, pos.x, pos.y],
  );

  const onPointerMove = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      if (!dragging.current) return;
      const dx = e.clientX - origin.current.px;
      const dy = e.clientY - origin.current.py;
      const next = {
        x: Math.max(0, origin.current.wx + dx),
        y: Math.max(40, origin.current.wy + dy),
      };
      setPos(next);
    },
    [],
  );

  const onPointerUp = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      if (!dragging.current) return;
      dragging.current = false;
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }
      onMove(id, pos.x, pos.y);
    },
    [id, onMove, pos.x, pos.y],
  );

  const onKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === "Escape") {
      e.stopPropagation();
      onClose(id);
    }
  };

  return (
    <section
      role="dialog"
      aria-label={title}
      aria-modal={false}
      tabIndex={-1}
      onMouseDown={() => onFocus(id)}
      onKeyDown={onKeyDown}
      className={`absolute flex flex-col overflow-hidden rounded-xl border bg-desk-panel shadow-window outline-none ${
        focused ? "border-desk-accent/50" : "border-desk-border"
      }`}
      style={{
        left: pos.x,
        top: pos.y,
        width,
        height,
        zIndex,
      }}
    >
      <div
        className="flex h-10 shrink-0 cursor-grab items-center gap-2 border-b border-desk-border bg-desk-raised/80 px-3 active:cursor-grabbing"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            data-window-action
            aria-label={`Close ${title}`}
            onClick={() => onClose(id)}
            className="h-3 w-3 rounded-full bg-[#e86a5c] hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-desk-accent"
          />
          <span className="h-3 w-3 rounded-full bg-desk-border" aria-hidden />
          <span className="h-3 w-3 rounded-full bg-desk-border" aria-hidden />
        </div>
        <h2 className="flex-1 truncate text-center text-xs font-medium text-desk-text">
          {title}
        </h2>
        <span className="w-10" aria-hidden />
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto p-4 text-sm text-desk-text">
        {children}
      </div>
    </section>
  );
}
