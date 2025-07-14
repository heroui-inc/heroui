"use client";

// Theme type definitions
export type Theme = "light" | "dark" | "light-glass" | "dark-glass";

// Theme switching utilities
export function setTheme(theme: Theme) {
  if (typeof document !== "undefined") {
    document.documentElement.setAttribute("data-theme", theme);
  }
}

export function getTheme(): Theme | null {
  if (typeof document !== "undefined") {
    return document.documentElement.getAttribute("data-theme") as Theme;
  }

  return null;
}

export function applyTheme(theme: Theme | null) {
  if (!theme) {
    // Remove theme attribute to use system preference
    if (typeof document !== "undefined") {
      document.documentElement.removeAttribute("data-theme");
    }
  } else {
    setTheme(theme);
  }
}
