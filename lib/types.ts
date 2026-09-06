export type AppId = "about" | "projects" | "notes" | "now" | "contact";

export type AppDef = {
  id: AppId;
  title: string;
  label: string;
  defaultSize: { width: number; height: number };
};

export type WindowState = {
  id: AppId;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  minimized: boolean;
};
