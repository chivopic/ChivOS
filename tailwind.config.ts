import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        desk: {
          bg: "#0c0e12",
          panel: "#141820",
          raised: "#1a2030",
          border: "#2a3344",
          muted: "#8b95a8",
          text: "#e8ecf4",
          accent: "#6ea8ff",
          accentDim: "#3d6bb3",
          warm: "#c9a227",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-sans)",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        mono: [
          "var(--font-mono)",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "monospace",
        ],
      },
      boxShadow: {
        window:
          "0 18px 48px rgba(0,0,0,0.55), 0 0 0 1px rgba(42,51,68,0.55)",
        dock: "0 12px 40px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.06)",
      },
    },
  },
  plugins: [],
};

export default config;
