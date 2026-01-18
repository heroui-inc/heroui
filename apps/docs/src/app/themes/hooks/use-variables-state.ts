"use client";

import {
  parseAsArrayOf,
  parseAsFloat,
  parseAsString,
  parseAsStringLiteral,
  useQueryStates,
} from "nuqs";

import {defaultThemeValues, fontIds, radiusIds, themeIds, themeVariableKeys} from "../constants";

export function useVariablesState() {
  return useQueryStates(
    {
      // Use parseAsString for accentColor to allow custom colors from the ColorPicker
      accentColor: parseAsString.withDefault(defaultThemeValues.accentColor),
      base: parseAsFloat.withDefault(defaultThemeValues.base),
      chroma: parseAsFloat.withDefault(defaultThemeValues.chroma),
      fontFamily: parseAsStringLiteral(fontIds).withDefault(defaultThemeValues.fontFamily),
      formRadius: parseAsStringLiteral(radiusIds).withDefault(defaultThemeValues.formRadius),
      hue: parseAsFloat.withDefault(defaultThemeValues.hue),
      lightness: parseAsFloat.withDefault(defaultThemeValues.lightness),
      lockedVariables: parseAsArrayOf(parseAsStringLiteral(themeVariableKeys)).withDefault([]),
      radius: parseAsStringLiteral(radiusIds).withDefault(defaultThemeValues.radius),
      theme: parseAsStringLiteral(themeIds).withDefault(defaultThemeValues.theme),
    },
    {
      history: "push",
    },
  );
}
