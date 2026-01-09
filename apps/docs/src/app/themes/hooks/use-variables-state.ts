"use client";

import {parseAsArrayOf, parseAsString, parseAsStringLiteral, useQueryStates} from "nuqs";

import {defaultThemeValues, fontIds, radiusIds, themeIds, themeVariableKeys} from "../constants";

export function useVariablesState() {
  return useQueryStates(
    {
      // Use parseAsString for accentColor to allow custom colors from the ColorPicker
      accentColor: parseAsString.withDefault(defaultThemeValues.accentColor),
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
