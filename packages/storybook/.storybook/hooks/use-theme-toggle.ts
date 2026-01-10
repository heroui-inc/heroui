import {useCallback, useEffect, useState} from "react";

export type Theme = "light" | "dark";

/**
 * Hook to manage theme switching for a specific container
 */
export function useThemeToggle(containerRef?: React.RefObject<HTMLElement>) {
  const [theme, setTheme] = useState<Theme>("light");

  /**
   * Apply theme to the container element
   */
  const applyTheme = useCallback(
    (newTheme: Theme) => {
      const element = containerRef?.current;

      if (element) {
        // Remove existing theme classes/attributes
        element.classList.remove("light", "dark");
        element.removeAttribute("data-theme");

        // Apply new theme
        element.classList.add(newTheme);
        element.setAttribute("data-theme", newTheme);
      }

      setTheme(newTheme);
    },
    [containerRef],
  );

  /**
   * Toggle between light and dark themes
   */
  const toggleTheme = useCallback(() => {
    const newTheme = theme === "light" ? "dark" : "light";

    applyTheme(newTheme);
  }, [theme, applyTheme]);

  /**
   * Initialize theme on mount
   */
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    applyTheme(theme);
  }, [applyTheme, theme]);

  return {
    theme,
    setTheme: applyTheme,
    toggleTheme,
  };
}

/**
 * Get system preferred color scheme
 */
export function getSystemTheme(): Theme {
  if (typeof window === "undefined") return "light";

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
