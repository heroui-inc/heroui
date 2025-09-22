"use client";

import type {Theme} from "@/showcases";

import React, {createContext, useContext, useEffect, useState} from "react";

interface ShowcaseContextType {
  showcaseTheme: Theme;
  setShowcaseTheme: (theme: Theme) => void;
  supportsThemeSwitching: boolean;
  isCodeVisible: boolean;
  setIsCodeVisible: (visible: boolean) => void;
  toggleCode: () => void;
}

const ShowcaseContext = createContext<ShowcaseContextType | undefined>(undefined);

export function useShowcase() {
  const context = useContext(ShowcaseContext);

  if (!context) {
    throw new Error("useShowcase must be used within ShowcaseWrapper");
  }

  return context;
}

interface ShowcaseWrapperProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  supportsThemeSwitching?: boolean;
}

export function ShowcaseWrapper({
  children,
  defaultTheme = "light",
  supportsThemeSwitching = true,
}: ShowcaseWrapperProps) {
  const [showcaseTheme, setShowcaseTheme] = useState<Theme>(defaultTheme);
  const [isCodeVisible, setIsCodeVisible] = useState(false);

  const toggleCode = () => {
    setIsCodeVisible((prev) => !prev);
  };

  useEffect(() => {
    // Set the showcase theme as a data attribute on the showcase container
    const showcaseElement = document.querySelector("[data-showcase-theme]");

    if (showcaseElement) {
      showcaseElement.setAttribute("data-showcase-theme", showcaseTheme);
    }
  }, [showcaseTheme]);

  return (
    <ShowcaseContext.Provider
      value={{
        isCodeVisible,
        setIsCodeVisible,
        setShowcaseTheme,
        showcaseTheme,
        supportsThemeSwitching,
        toggleCode,
      }}
    >
      <div className={showcaseTheme} data-showcase-theme={showcaseTheme}>
        {children}
      </div>
    </ShowcaseContext.Provider>
  );
}
