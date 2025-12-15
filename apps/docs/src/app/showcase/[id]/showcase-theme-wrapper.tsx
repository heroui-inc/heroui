"use client";

import type {Theme} from "@/showcases";

import React, {createContext, useContext, useEffect, useState} from "react";

interface ShowcaseThemeContextType {
  showcaseTheme: Theme;
  setShowcaseTheme: (theme: Theme) => void;
  supportsThemeSwitching: boolean;
}

const ShowcaseThemeContext = createContext<ShowcaseThemeContextType | undefined>(undefined);

export function useShowcaseTheme() {
  const context = useContext(ShowcaseThemeContext);

  if (!context) {
    throw new Error("useShowcaseTheme must be used within ShowcaseThemeWrapper");
  }

  return context;
}

interface ShowcaseThemeWrapperProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  supportsThemeSwitching?: boolean;
}

export function ShowcaseThemeWrapper({
  children,
  defaultTheme = "light",
  supportsThemeSwitching = true,
}: ShowcaseThemeWrapperProps) {
  const [showcaseTheme, setShowcaseTheme] = useState<Theme>(defaultTheme);

  useEffect(() => {
    // Set the showcase theme as a data attribute on the showcase container
    const showcaseElement = document.querySelector("[data-showcase-theme]");

    if (showcaseElement) {
      showcaseElement.setAttribute("data-showcase-theme", showcaseTheme);
    }
  }, [showcaseTheme]);

  return (
    <ShowcaseThemeContext
      value={{
        setShowcaseTheme,
        showcaseTheme,
        supportsThemeSwitching,
      }}
    >
      <div className={showcaseTheme} data-showcase-theme={showcaseTheme}>
        {children}
      </div>
    </ShowcaseThemeContext>
  );
}
