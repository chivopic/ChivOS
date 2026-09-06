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
          bg: "var(--desk-bg)",
          panel: "var(--desk-panel)",
          raised: "var(--desk-raised)",
          border: "var(--desk-border)",
          muted: "var(--desk-muted)",
          text: "var(--desk-text)",
          accent: "var(--desk-accent)",
          accentDim: "var(--desk-accent-dim)",
          warm: "var(--desk-warm)",
          hover: "var(--desk-hover)",
          hoverStrong: "var(--desk-hover-strong)",
          glassBorder: "var(--desk-glass-border)",
          statusBorder: "var(--desk-status-border)",
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
        window: "var(--desk-shadow-window)",
        dock: "var(--desk-shadow-dock)",
      },
    },
  },
  plugins: [],
};

export default config;
