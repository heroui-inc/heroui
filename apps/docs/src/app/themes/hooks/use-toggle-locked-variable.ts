"use client";

import type {themeVariableKeys} from "../constants";

import {useVariablesState} from "./use-variables-state";

type LockableThemeVariable = (typeof themeVariableKeys)[number];

export function useToggleLockedVariable(key: LockableThemeVariable) {
  const [variables, setVariables] = useVariablesState();
  const isLocked = variables.lockedVariables.includes(key);
  const toggleLockedVariable = () => {
    const lockedVariables = variables.lockedVariables;

    if (isLocked) {
      setVariables({
        ...variables,
        lockedVariables: lockedVariables.filter((v) => v !== key),
      });
    } else {
      setVariables({
        ...variables,
        lockedVariables: [...lockedVariables, key],
      });
    }
  };

  return {isLocked, toggleLockedVariable};
}
