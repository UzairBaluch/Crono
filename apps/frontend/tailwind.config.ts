import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--background) / <alpha-value>)",
        card: "rgb(var(--card) / <alpha-value>)",
        "card-secondary": "rgb(var(--card-secondary) / <alpha-value>)",
        border: "rgb(var(--border) / <alpha-value>)",
        hover: "rgb(var(--hover) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        "muted-foreground": "rgb(var(--muted-foreground) / <alpha-value>)"
      },
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "monospace"]
      }
    }
  },
  plugins: []
};

export default config;
