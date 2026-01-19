"use client";

import {fontIds, radiusIds} from "../constants";

import {useVariablesState} from "./use-variables-state";

export function useRandomizeVariables() {
  const [variables, setVariables] = useVariablesState();
  const randomize = () => {
    const randomPick = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)] as T;
    const truncate2 = (v: number) => Math.round(v * 100) / 100;
    const randomInRange = (min: number, max: number) =>
      truncate2(min + Math.random() * (max - min));
    const lockedVariables = variables.lockedVariables;

    setVariables({
      base: lockedVariables.includes("base") ? variables.base : Math.random() * 0.02,
      chroma: lockedVariables.includes("chroma") ? variables.chroma : randomInRange(0.1, 0.26),
      fontFamily: lockedVariables.includes("fontFamily")
        ? variables.fontFamily
        : randomPick([...fontIds]),
      formRadius: lockedVariables.includes("formRadius")
        ? variables.formRadius
        : randomPick([...radiusIds]),
      hue: lockedVariables.includes("hue") ? variables.hue : Math.floor(Math.random() * 360),
      lightness: lockedVariables.includes("lightness")
        ? variables.lightness
        : randomInRange(0.5, 0.85),
      radius: lockedVariables.includes("radius") ? variables.radius : randomPick([...radiusIds]),
    });
  };

  return randomize;
}
