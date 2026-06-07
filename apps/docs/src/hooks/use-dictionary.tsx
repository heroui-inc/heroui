"use client";

import type {Dictionary} from "@/lib/dictionaries";
import type {ReactElement, ReactNode} from "react";

import {createContext, useContext} from "react";

const DictionaryContext = createContext<Dictionary | undefined>(undefined);

export function useDictionary(): Dictionary {
  const context = useContext(DictionaryContext);

  if (!context) {
    throw new Error("useDictionary must be used within DictionaryProvider");
  }

  return context;
}

interface DictionaryProviderProps {
  dict: Dictionary;
  children: ReactNode;
}

export function DictionaryProvider({children, dict}: DictionaryProviderProps): ReactElement {
  return <DictionaryContext value={dict}>{children}</DictionaryContext>;
}
