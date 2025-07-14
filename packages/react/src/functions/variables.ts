/**
 * Theme variables for Tailwind extend
 */

import type {ThemeConfig} from "tailwindcss/plugin";

const variables: ThemeConfig = {
  colors: {
    background: "var(--background)",
    foreground: "var(--foreground)",
    panel: "var(--panel)",
    muted: {
      DEFAULT: "var(--muted)",
      foreground: "var(--muted-foreground)",
    },
    surface: {
      DEFAULT: "var(--surface)",
      foreground: "var(--surface-foreground)",
      1: "var(--surface-1)",
      2: "var(--surface-2)",
      3: "var(--surface-3)",
    },
    accent: {
      DEFAULT: "var(--accent)",
      foreground: "var(--accent-foreground)",
      soft: "var(--accent-soft)",
      "soft-foreground": "var(--accent-soft-foreground)",
      hover: "color-mix(in oklab, var(--accent) 90%, var(--accent-foreground) 20%)",
      "soft-hover":
        "color-mix(in oklab, var(--accent-soft) 10%, var(--accent-soft-foreground) 18%)",
    },
    base: {
      DEFAULT: "var(--base)",
      foreground: "var(--base-foreground)",
      hover: "color-mix(in oklab, var(--base) 90%, var(--base-foreground) 5%)",
    },
    success: {
      DEFAULT: "var(--success)",
      foreground: "var(--success-foreground)",
      hover: "color-mix(in oklab, var(--success) 90%, var(--success-foreground) 10%)",
    },
    warning: {
      DEFAULT: "var(--warning)",
      foreground: "var(--warning-foreground)",
      hover: "color-mix(in oklab, var(--warning) 90%, var(--warning-foreground) 10%)",
    },
    danger: {
      DEFAULT: "var(--danger)",
      foreground: "var(--danger-foreground)",
      hover: "color-mix(in oklab, var(--danger) 90%, var(--danger-foreground) 10%)",
    },
    border: "var(--border)",
    focus: "var(--focus)",
    link: "var(--link)",
  },
  borderRadius: {
    xs: "calc(var(--radius) * 0.25)",
    sm: "calc(var(--radius) * 0.5)",
    md: "calc(var(--radius) * 0.75)",
    lg: "calc(var(--radius) * 1)",
    xl: "calc(var(--radius) * 1.5)",
    "2xl": "calc(var(--radius) * 2)",
    "3xl": "calc(var(--radius) * 3)",
    "4xl": "calc(var(--radius) * 4)",
  },
  boxShadow: {
    border: "var(--shadow-border)",
  },
};

export default variables;
