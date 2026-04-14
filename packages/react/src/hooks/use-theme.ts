"use client";

import {useCallback, useEffect, useState} from "react";

// constant properties for Theme
export const ThemeProps = {
  // localStorage key for storing the current theme
  THEME_KEY: "heroui-theme",
  // localStorage key for storing the custom theme
  CUSTOM_THEME_KEY: "heroui-custom-theme",
  // light theme
  LIGHT: "light",
  // dark theme
  DARK: "dark",
  // system theme
  SYSTEM: "system",
} as const;

// type definition for Theme using system theme names or custom theme names
export type customTheme = string;
export type Theme =
  | typeof ThemeProps.LIGHT
  | typeof ThemeProps.DARK
  | typeof ThemeProps.SYSTEM
  | customTheme;

/**
 * React hook to switch between themes
 *
 * @param defaultTheme the default theme name (e.g. light, dark, purple-dark and etc)
 * @returns An object containing the current theme and theme manipulation functions
 */
export function useTheme(defaultTheme: Theme = ThemeProps.SYSTEM) {
  const PREFERS_COLOR_SCHEME_MEDIA = "(prefers-color-scheme: dark)";

  const [theme, setThemeState] = useState<Theme>(() => {
    const storedTheme = localStorage.getItem(ThemeProps.THEME_KEY) as Theme | null;

    // return stored theme if it is selected previously
    if (storedTheme) return storedTheme;

    // if it is using system theme, check `prefers-color-scheme` value
    // return light theme if not specified
    if (defaultTheme === ThemeProps.SYSTEM) {
      return window.matchMedia?.(PREFERS_COLOR_SCHEME_MEDIA).matches
        ? ThemeProps.DARK
        : ThemeProps.LIGHT;
    }

    return defaultTheme;
  });

  const setTheme = useCallback(
    (newTheme: Theme) => {
      const targetTheme =
        newTheme === ThemeProps.SYSTEM
          ? window.matchMedia?.(PREFERS_COLOR_SCHEME_MEDIA).matches
            ? ThemeProps.DARK
            : ThemeProps.LIGHT
          : newTheme;

      localStorage.setItem(ThemeProps.THEME_KEY, newTheme);

      const isBuiltinTheme =
        newTheme === ThemeProps.LIGHT ||
        newTheme === ThemeProps.DARK ||
        newTheme === ThemeProps.SYSTEM;

      if (!isBuiltinTheme) {
        localStorage.setItem(ThemeProps.CUSTOM_THEME_KEY, newTheme);
      }

      document.documentElement.classList.remove(
        // Built-in theme
        ThemeProps.LIGHT,
        ThemeProps.DARK,
        ThemeProps.SYSTEM,
        // Custom theme if it exists
        localStorage.getItem(ThemeProps.CUSTOM_THEME_KEY) ?? "",
      );

      document.documentElement.classList.add(targetTheme);
      document.documentElement.setAttribute("data-theme", targetTheme);

      setThemeState(newTheme);
    },
    [theme],
  );

  const handleMediaQuery = useCallback(
    (e: MediaQueryListEvent | MediaQueryList) => {
      if (defaultTheme === ThemeProps.SYSTEM) {
        setTheme(e.matches ? ThemeProps.DARK : ThemeProps.LIGHT);
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
    const media = window.matchMedia(PREFERS_COLOR_SCHEME_MEDIA);

    media.addEventListener("change", handleMediaQuery);

    return () => media.removeEventListener("change", handleMediaQuery);
  }, [handleMediaQuery]);

  return {theme, setTheme};
}
