"use client";

import {useCallback, useRef, useState, useSyncExternalStore} from "react";

import {useIsomorphicLayoutEffect} from "./use-isomorphic-layout-effect";

const THEME_STORAGE_KEY = "heroui-theme";
const PREFERS_DARK_MEDIA = "(prefers-color-scheme: dark)";

export type Theme = string;

/**
 * Subscribes to OS color-scheme changes. No-op on the server.
 */
function subscribeSystemPreference(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};

  const media = window.matchMedia(PREFERS_DARK_MEDIA);

  media.addEventListener("change", callback);

  return () => media.removeEventListener("change", callback);
}

/**
 * Reads the current OS color-scheme preference. Client-only.
 */
function getSystemPreference(): "dark" | "light" {
  return window.matchMedia?.(PREFERS_DARK_MEDIA).matches ? "dark" : "light";
}

/**
 * Server snapshot for the system preference — unknown without `window.matchMedia`.
 */
function getServerSystemPreference(): undefined {
  return undefined;
}

/**
 * Applies the resolved theme to the document element (classList + data-theme attribute).
 * No-op when the resolved value matches the previously-applied class to avoid
 * redundant DOM writes (which can trigger MutationObservers and view transitions).
 */
function applyThemeToDOM(resolved: string, previous?: string) {
  if (previous === resolved) return;

  if (previous) {
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
 * @returns `theme` (the stored intent, e.g. "system"), `resolvedTheme` (the
 *          concrete class applied to the DOM — undefined during SSR), and `setTheme`.
 */
export function useTheme(defaultTheme: Theme = "system") {
  // The stored theme value — the user's intent (may be "system" or a concrete name).
  const [theme, setThemeState] = useState<Theme>(() => {
    // SSR guard — browser APIs are not available on the server.
    if (typeof window === "undefined") return defaultTheme;

    return localStorage.getItem(THEME_STORAGE_KEY) ?? defaultTheme;
  });

  // Reactive snapshot of the OS color-scheme preference.
  // Returns `undefined` on the server (no `matchMedia`).
  const systemTheme = useSyncExternalStore(
    subscribeSystemPreference,
    getSystemPreference,
    getServerSystemPreference,
  );

  // Derived during render — no extra state, no setState-in-effect.
  // When `theme === "system"`, follows the OS; otherwise echoes `theme`.
  const resolvedTheme: string | undefined = theme === "system" ? systemTheme : theme;

  // Track the last class written to the DOM so we can remove it on change.
  const appliedRef = useRef<string | undefined>(undefined);

  // Sync the document with the resolved theme.
  // Uses a layout effect so the DOM is updated before paint (no FOUC).
  useIsomorphicLayoutEffect(() => {
    if (!resolvedTheme) return;

    applyThemeToDOM(resolvedTheme, appliedRef.current);
    appliedRef.current = resolvedTheme;
  }, [resolvedTheme]);

  // Stable callback — empty deps, reads nothing from the render closure.
  const setTheme = useCallback((newTheme: Theme) => {
    // SSR guard
    if (typeof window === "undefined") return;

    // Persist the user's intent (e.g. "system"), not the resolved value.
    localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    setThemeState(newTheme);
    // The DOM is updated in the layout effect above when `resolvedTheme` changes.
  }, []);

  return {resolvedTheme, setTheme, theme};
}
