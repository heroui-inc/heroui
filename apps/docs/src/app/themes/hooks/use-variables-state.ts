"use client";

import {
  parseAsArrayOf,
  parseAsFloat,
  parseAsString,
  parseAsStringLiteral,
  useQueryStates,
} from "nuqs";

import {defaultThemeVariables, radiusIds, themeVariableKeys} from "../constants";

export function useVariablesState() {
  return useQueryStates(
    {
      base: parseAsFloat.withDefault(defaultThemeVariables.base),
      chroma: parseAsFloat.withDefault(defaultThemeVariables.chroma),
      // Use parseAsString for fontFamily to allow custom fonts (prefixed with "custom-")
      fontFamily: parseAsString.withDefault(defaultThemeVariables.fontFamily),
      formRadius: parseAsStringLiteral(radiusIds).withDefault(defaultThemeVariables.formRadius),
      hue: parseAsFloat.withDefault(defaultThemeVariables.hue),
      lightness: parseAsFloat.withDefault(defaultThemeVariables.lightness),
      lockedVariables: parseAsArrayOf(parseAsStringLiteral(themeVariableKeys)).withDefault([]),
      radius: parseAsStringLiteral(radiusIds).withDefault(defaultThemeVariables.radius),
    },
    {
      history: "push",
    },
  );
}
