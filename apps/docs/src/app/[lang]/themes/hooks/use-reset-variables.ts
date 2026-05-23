"use client";

import {defaultThemeVariables} from "../constants";

import {useVariablesState} from "./use-variables-state";

export function useResetVariables() {
  const [, setVariables] = useVariablesState();
  const resetThemeVariables = () => {
    setVariables({
      ...defaultThemeVariables,
      lockedVariables: [],
    });
  };

  return resetThemeVariables;
}
