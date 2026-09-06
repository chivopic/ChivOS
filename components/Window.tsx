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
  const posRef = useRef(pos);
  posRef.current = pos;

  useEffect(() => {
    setPos({ x, y });
  }, [x, y]);

  const onPointerDown = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      if ((e.target as HTMLElement).closest("[data-window-action]")) return;
      onFocus(id);
      dragging.current = true;
      origin.current = {
        px: e.clientX,
        py: e.clientY,
        wx: posRef.current.x,
        wy: posRef.current.y,
      };
      e.currentTarget.setPointerCapture(e.pointerId);
    },
    [id, onFocus],
  );

  const onPointerMove = useCallback((e: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    const dx = e.clientX - origin.current.px;
    const dy = e.clientY - origin.current.py;
    const next = {
      x: Math.max(0, origin.current.wx + dx),
      y: Math.max(40, origin.current.wy + dy),
    };
    posRef.current = next;
    setPos(next);
  }, []);

  const onPointerUp = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      if (!dragging.current) return;
      dragging.current = false;
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }
      onMove(id, posRef.current.x, posRef.current.y);
    },
    [id, onMove],
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
      className={`absolute flex flex-col overflow-hidden rounded-2xl border bg-desk-panel/95 shadow-window outline-none backdrop-blur-md transition-[border-color,box-shadow] duration-150 ${
        focused
          ? "border-desk-accent/45 ring-1 ring-desk-accent/20"
          : "border-desk-border/90"
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
        className="flex h-9 shrink-0 cursor-grab items-center gap-2 border-b border-desk-border/80 bg-desk-raised/70 px-3 backdrop-blur-sm active:cursor-grabbing"
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
            className="group relative flex h-3 w-3 items-center justify-center rounded-full bg-[#e86a5c] shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.25)] hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-desk-accent"
          >
            <span className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition group-hover:opacity-100">
              <span className="block h-[1.5px] w-1.5 rotate-45 rounded-full bg-black/55" />
              <span className="absolute block h-[1.5px] w-1.5 -rotate-45 rounded-full bg-black/55" />
            </span>
          </button>
          <span
            className="h-3 w-3 rounded-full bg-[#e6b04a]/70 shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.2)]"
            aria-hidden
          />
          <span
            className="h-3 w-3 rounded-full bg-[#5fcf7a]/65 shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.2)]"
            aria-hidden
          />
        </div>
        <h2 className="flex-1 truncate text-center text-[11px] font-medium tracking-wide text-desk-text/90">
          {title}
        </h2>
        <span className="w-10" aria-hidden />
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4 text-sm leading-relaxed text-desk-text">
        {children}
      </div>
    </section>
  );
}
