"use client";

import {parseAsArrayOf, parseAsStringLiteral, useQueryStates} from "nuqs";

import {
  colorIds,
  defaultThemeValues,
  fontIds,
  radiusIds,
  themeIds,
  themeVariableKeys,
} from "../constants";

export function useVariablesState() {
  return useQueryStates(
    {
      accentColor: parseAsStringLiteral(colorIds).withDefault(defaultThemeValues.accentColor),
      fontFamily: parseAsStringLiteral(fontIds).withDefault(defaultThemeValues.fontFamily),
      formRadius: parseAsStringLiteral(radiusIds).withDefault(defaultThemeValues.formRadius),
      lockedVariables: parseAsArrayOf(parseAsStringLiteral(themeVariableKeys)).withDefault([]),
      radius: parseAsStringLiteral(radiusIds).withDefault(defaultThemeValues.radius),
      theme: parseAsStringLiteral(themeIds).withDefault(defaultThemeValues.theme),
    },
    {
      history: "push",
    },
  );
}
