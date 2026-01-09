"use client";

import {defaultThemeValues} from "../constants";

import {useVariablesState} from "./use-variables-state";

export function useResetVariables() {
  const [, setVariables] = useVariablesState();
  const resetThemeVariables = () => {
    setVariables({
      ...defaultThemeValues,
      lockedVariables: [],
    });
  };

  return resetThemeVariables;
}
