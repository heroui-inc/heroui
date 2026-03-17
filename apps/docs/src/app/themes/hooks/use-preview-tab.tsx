"use client";

import type {ReactElement, ReactNode} from "react";

import {createContext, useContext, useMemo, useState} from "react";

interface PreviewTabContextType {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
}

const PreviewTabContext = createContext<PreviewTabContextType | undefined>(undefined);

export function usePreviewTab(): PreviewTabContextType {
  const context = useContext(PreviewTabContext);

  if (!context) {
    throw new Error("usePreviewTab must be used within PreviewTabProvider");
  }

  return context;
}

interface PreviewTabProviderProps {
  children: ReactNode;
}

export function PreviewTabProvider({children}: PreviewTabProviderProps): ReactElement {
  const [selectedTab, setSelectedTab] = useState("components");

  const value = useMemo(
    () => ({
      selectedTab,
      setSelectedTab,
    }),
    [selectedTab],
  );

  return <PreviewTabContext value={value}>{children}</PreviewTabContext>;
}
