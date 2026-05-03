"use client";

import type {ReactElement, ReactNode} from "react";

import {createContext, useCallback, useContext, useMemo, useState} from "react";

interface CodePanelContextType {
  isCodeVisible: boolean;
  setIsCodeVisible: (visible: boolean) => void;
  toggleCode: () => void;
}

const CodePanelContext = createContext<CodePanelContextType | undefined>(undefined);

export function useCodePanel(): CodePanelContextType {
  const context = useContext(CodePanelContext);

  if (!context) {
    throw new Error("useCodePanel must be used within CodePanelProvider");
  }

  return context;
}

interface CodePanelProviderProps {
  children: ReactNode;
}

export function CodePanelProvider({children}: CodePanelProviderProps): ReactElement {
  const [isCodeVisible, setIsCodeVisible] = useState(false);

  const toggleCode = useCallback(() => {
    setIsCodeVisible((prev) => !prev);
  }, []);

  const value = useMemo(
    () => ({
      isCodeVisible,
      setIsCodeVisible,
      toggleCode,
    }),
    [isCodeVisible, toggleCode],
  );

  return <CodePanelContext value={value}>{children}</CodePanelContext>;
}
