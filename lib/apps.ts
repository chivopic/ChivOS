import type { AppDef } from "./types";

export const APPS: AppDef[] = [
  {
    id: "about",
    title: "About",
    label: "About",
    defaultSize: { width: 480, height: 420 },
  },
  {
    id: "projects",
    title: "Projects",
    label: "Projects",
    defaultSize: { width: 560, height: 460 },
  },
  {
    id: "notes",
    title: "Notes",
    label: "Notes",
    defaultSize: { width: 440, height: 380 },
  },
  {
    id: "now",
    title: "Now",
    label: "Now",
    defaultSize: { width: 440, height: 400 },
  },
  {
    id: "contact",
    title: "Contact",
    label: "Contact",
    defaultSize: { width: 420, height: 340 },
  },
];

export function getApp(id: string): AppDef | undefined {
  return APPS.find((a) => a.id === id);
}
