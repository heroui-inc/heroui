"use client";

import {colorIds, fontIds, radiusIds} from "../constants";

import {useVariablesState} from "./use-variables-state";

export function useRandomizeVariables() {
  const [variables, setVariables] = useVariablesState();
  const randomize = () => {
    const randomPick = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)] as T;
    const lockedVariables = variables.lockedVariables;

    setVariables({
      accentColor: lockedVariables.includes("accentColor")
        ? variables.accentColor
        : randomPick([...colorIds]),
      fontFamily: lockedVariables.includes("fontFamily")
        ? variables.fontFamily
        : randomPick([...fontIds]),
      formRadius: lockedVariables.includes("formRadius")
        ? variables.formRadius
        : randomPick([...radiusIds]),
      radius: lockedVariables.includes("radius") ? variables.radius : randomPick([...radiusIds]),
    });
  };

  return randomize;
}
