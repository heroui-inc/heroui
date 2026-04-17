"use client";

import {useCallback, useEffect, useState} from "react";

const THEME_STORAGE_KEY = "heroui-theme";
const PREFERS_DARK_MEDIA = "(prefers-color-scheme: dark)";

export type Theme = string;

/**
 * React hook to switch between themes.
 *
 * Accepts any theme name ("light", "dark", "brutalism-light", etc.).
 * Pass "system" to follow the OS preference (resolves to "light" or "dark").
 *
 * @param defaultTheme - the initial theme name (defaults to "system")
 */
export function useTheme(defaultTheme: Theme = "system") {
  const [theme, setThemeState] = useState<Theme>(() => {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);

    if (stored) return stored;

    if (defaultTheme === "system") {
      return window.matchMedia?.(PREFERS_DARK_MEDIA).matches ? "dark" : "light";
    }

    return defaultTheme;
  });

  const setTheme = useCallback(
    (newTheme: Theme) => {
      const resolved =
        newTheme === "system"
          ? window.matchMedia?.(PREFERS_DARK_MEDIA).matches
            ? "dark"
            : "light"
          : newTheme;

      localStorage.setItem(THEME_STORAGE_KEY, newTheme);

      const previous = theme;

      if (previous && previous !== resolved) {
        document.documentElement.classList.remove(previous);
      }

      document.documentElement.classList.add(resolved);
      document.documentElement.setAttribute("data-theme", resolved);

      setThemeState(newTheme);
    },
    [theme],
  );

  const handleMediaQuery = useCallback(
    (e: MediaQueryListEvent | MediaQueryList) => {
      if (defaultTheme === "system") {
        setTheme(e.matches ? "dark" : "light");
      }
    },
    [defaultTheme, setTheme],
  );

  useEffect(() => {
    queueMicrotask(() => {
      setTheme(theme);
    });
  }, [theme, setTheme]);

  useEffect(() => {
    const media = window.matchMedia(PREFERS_DARK_MEDIA);

    media.addEventListener("change", handleMediaQuery);

    return () => media.removeEventListener("change", handleMediaQuery);
  }, [handleMediaQuery]);

  return {theme, setTheme};
}
