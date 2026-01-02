import type {ThemeVariables} from "../constants";

import {useVariablesState} from "./use-variables-state";

export function useVariableSetter() {
  const [variables, setVariables] = useVariablesState();
  const setVariable = (variable: keyof ThemeVariables, value: string) => {
    setVariables({
      ...variables,
      [variable]: value,
    });
  };

  return {setVariable, variables};
}
