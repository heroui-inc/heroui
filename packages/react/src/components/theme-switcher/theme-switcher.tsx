"use client";

import type {Theme} from "../../theme";

import * as React from "react";

import {applyTheme} from "../../theme";
import {Button} from "../button";

export interface ThemeSwitcherProps {
  defaultTheme?: Theme | null;
  showSystemOption?: boolean;
  className?: string;
}

const themes: Array<{value: Theme | null; label: string}> = [
  {value: null, label: "System"},
  {value: "light", label: "Light"},
  {value: "dark", label: "Dark"},
  {value: "light-glass", label: "Light Glass"},
  {value: "dark-glass", label: "Dark Glass"},
];

export const ThemeSwitcher = React.forwardRef<HTMLDivElement, ThemeSwitcherProps>(
  ({className, defaultTheme = null, showSystemOption = true}, ref) => {
    const [currentTheme, setCurrentTheme] = React.useState<Theme | null>(defaultTheme);

    React.useEffect(() => {
      // Load saved theme from localStorage
      const savedTheme = localStorage.getItem("theme") as Theme | null;

      if (savedTheme) {
        setCurrentTheme(savedTheme);
        applyTheme(savedTheme);
      }
    }, []);

    const handleThemeChange = (theme: Theme | null) => {
      setCurrentTheme(theme);

      if (theme === null) {
        document.documentElement.removeAttribute("data-theme");
        localStorage.removeItem("theme");
      } else {
        applyTheme(theme);
        localStorage.setItem("theme", theme);
      }
    };

    const displayThemes = showSystemOption ? themes : themes.filter((t) => t.value !== null);

    return (
      <div ref={ref} className={className}>
        <div className="flex flex-wrap gap-2">
          {displayThemes.map((theme) => (
            <Button
              key={theme.value ?? "system"}
              size="sm"
              variant={currentTheme === theme.value ? "primary" : "secondary"}
              onPress={() => handleThemeChange(theme.value)}
            >
              {theme.label}
            </Button>
          ))}
        </div>
      </div>
    );
  },
);

ThemeSwitcher.displayName = "HeroUI.ThemeSwitcher";
