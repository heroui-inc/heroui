import type {ThemeVariables} from "../constants";

import {useVariablesState} from "./use-variables-state";

export function useToggleLockedVariable(key: keyof ThemeVariables) {
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
