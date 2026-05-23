"use client";

import {useCallback, useEffect, useRef, useState} from "react";

const THEME_STORAGE_KEY = "heroui-theme";
const PREFERS_DARK_MEDIA = "(prefers-color-scheme: dark)";

export type Theme = string;

/**
 * Resolves a theme value to its applied class name.
 * "system" resolves to "dark" or "light" based on OS preference.
 */
function resolveTheme(theme: Theme): string {
  if (theme === "system") {
    return window.matchMedia?.(PREFERS_DARK_MEDIA).matches ? "dark" : "light";
  }

  return theme;
}

/**
 * Applies the resolved theme to the document element (classList + data-theme attribute).
 */
function applyThemeToDOM(resolved: string, previous?: string) {
  if (previous && previous !== resolved) {
    document.documentElement.classList.remove(previous);
  }

  document.documentElement.classList.add(resolved);
  document.documentElement.setAttribute("data-theme", resolved);
}

/**
 * React hook to switch between themes.
 *
 * Accepts any theme name ("light", "dark", "brutalism-light", etc.).
 * Pass "system" to follow the OS preference (resolves to "light" or "dark").
 *
 * @param defaultTheme - the initial theme name (defaults to "system")
 */
export function useTheme(defaultTheme: Theme = "system") {
  // The stored theme value (may be "system" or a concrete theme name)
  const [theme, setThemeState] = useState<Theme>(() => {
    // SSR guard — browser APIs are not available on the server
    if (typeof window === "undefined") return defaultTheme;

    const stored = localStorage.getItem(THEME_STORAGE_KEY);

    if (stored) return stored;

    return defaultTheme;
  });

  // Track the currently-applied resolved class to remove it on change
  const appliedRef = useRef<string | undefined>(undefined);

  const setTheme = useCallback((newTheme: Theme) => {
    // SSR guard
    if (typeof window === "undefined") return;

    const resolved = resolveTheme(newTheme);

    // Store the user's intent (e.g. "system"), not the resolved value
    localStorage.setItem(THEME_STORAGE_KEY, newTheme);

    applyThemeToDOM(resolved, appliedRef.current);
    appliedRef.current = resolved;

    setThemeState(newTheme);
  }, []);

  // Apply theme to DOM on mount and when theme changes
  useEffect(() => {
    const resolved = resolveTheme(theme);

    applyThemeToDOM(resolved, appliedRef.current);
    appliedRef.current = resolved;
  }, [theme]);

  // Listen for OS color scheme changes when tracking "system"
  useEffect(() => {
    // Only respond to media query changes if the current theme is "system"
    if (theme !== "system") return;

    const media = window.matchMedia(PREFERS_DARK_MEDIA);

    const handleChange = (e: MediaQueryListEvent) => {
      const resolved = e.matches ? "dark" : "light";

      applyThemeToDOM(resolved, appliedRef.current);
      appliedRef.current = resolved;
      // Keep state as "system" — don't overwrite with the resolved value
      setThemeState("system");
    };

    media.addEventListener("change", handleChange);

    return () => media.removeEventListener("change", handleChange);
  }, [theme]);

  return {theme, setTheme};
}
