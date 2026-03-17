"use client";

import {useMemo} from "react";

import {
  adaptiveColors,
  findMatchingTheme,
  fontMap,
  radiusCssMap,
  themeValuesById,
} from "../constants";
import {getCustomFontInfoFromUrl, isCustomFontUrl} from "../utils/font-utils";
import {
  calculateAccentForeground,
  generateThemeColors,
  getAccentDerivedVariables,
  getColorVariablesForElement,
  getFieldDerivedVariables,
  getSemanticDerivedVariables,
  parseOklch,
  radiusDerivedVariables,
} from "../utils/generate-theme-colors";

import {useVariablesState} from "./use-variables-state";

interface ComputedThemeVars {
  fullLightVars: Record<string, string>;
  fullDarkVars: Record<string, string>;
}

function getCommonVars(
  radius: string,
  fieldRadius: string,
  fontVariable: string,
): Record<string, string> {
  return {
    "--field-radius": fieldRadius,
    "--font-sans": `var(${fontVariable})`,
    "--radius": radius,
    ...radiusDerivedVariables,
  };
}

function getDerivedColorVars(
  baseVars: Record<string, string>,
  accentDerived: Record<string, string>,
) {
  const successDerived = getSemanticDerivedVariables(
    "success",
    baseVars["--success"] ?? "",
    baseVars["--success-foreground"] ?? "",
  );
  const warningDerived = getSemanticDerivedVariables(
    "warning",
    baseVars["--warning"] ?? "",
    baseVars["--warning-foreground"] ?? "",
  );
  const dangerDerived = getSemanticDerivedVariables(
    "danger",
    baseVars["--danger"] ?? "",
    baseVars["--danger-foreground"] ?? "",
  );
  const fieldDerived = getFieldDerivedVariables(
    baseVars["--field-background"] ?? "",
    baseVars["--field-foreground"] ?? "",
    baseVars["--field-placeholder"] ?? "",
    baseVars["--border"] ?? "",
  );
  const defaultHover = `color-mix(in oklab, ${baseVars["--default"]} 90%, ${baseVars["--foreground"]} 10%)`;

  return {
    ...baseVars,
    ...accentDerived,
    ...successDerived,
    ...warningDerived,
    ...dangerDerived,
    ...fieldDerived,
    "--color-default-hover": defaultHover,
  };
}

function computeThemeVars(variables: ReturnType<typeof useVariablesState>[0]): ComputedThemeVars {
  const {base, chroma, hue, lightness} = variables;
  const accentColor = `oklch(${lightness} ${chroma} ${hue})`;
  const isAdaptive = accentColor in adaptiveColors;

  const matchingThemeId = findMatchingTheme(variables);
  const semanticOverrides = matchingThemeId
    ? themeValuesById[matchingThemeId].semanticOverrides
    : undefined;

  // Resolve font variable
  const fontFamily = variables.fontFamily;
  let fontVariable: string;

  if (isCustomFontUrl(fontFamily)) {
    const customFontInfo = getCustomFontInfoFromUrl(fontFamily);

    fontVariable = customFontInfo?.variable ?? fontMap.inter.variable;
  } else {
    fontVariable = (fontMap[fontFamily as keyof typeof fontMap] ?? fontMap.inter).variable;
  }

  const commonVars = getCommonVars(
    radiusCssMap[variables.radius],
    radiusCssMap[variables.formRadius],
    fontVariable,
  );

  if (isAdaptive) {
    const adaptiveConfig = adaptiveColors[accentColor]!;
    const lightAccent = parseOklch(adaptiveConfig.light);
    const darkAccent = parseOklch(adaptiveConfig.dark);

    const lightFg = lightAccent
      ? calculateAccentForeground(lightAccent.l, lightAccent.c, lightAccent.h)
      : calculateAccentForeground(0, 0, 0);
    const darkFg = darkAccent
      ? calculateAccentForeground(darkAccent.l, darkAccent.c, darkAccent.h)
      : calculateAccentForeground(1, 0, 0);

    const colors = generateThemeColors({chroma, hue, lightness, semanticOverrides});
    const lightVars = getColorVariablesForElement(colors, "light");
    const darkVars = getColorVariablesForElement(colors, "dark");

    const lightAccentVars = {
      "--accent": adaptiveConfig.light,
      "--accent-foreground": lightFg,
      "--focus": adaptiveConfig.light,
      ...getAccentDerivedVariables(adaptiveConfig.light, lightFg),
    };
    const darkAccentVars = {
      "--accent": adaptiveConfig.dark,
      "--accent-foreground": darkFg,
      "--focus": adaptiveConfig.dark,
      ...getAccentDerivedVariables(adaptiveConfig.dark, darkFg),
    };

    const colorLightVars = getDerivedColorVars(lightVars, lightAccentVars);
    const colorDarkVars = getDerivedColorVars(darkVars, darkAccentVars);

    return {
      fullDarkVars: {...commonVars, ...colorDarkVars},
      fullLightVars: {...commonVars, ...colorLightVars},
    };
  }

  // Standard (non-adaptive) colors
  const colors = generateThemeColors({
    chroma,
    grayChroma: base,
    hue,
    lightness,
    semanticOverrides,
  });
  const lightVars = getColorVariablesForElement(colors, "light");
  const darkVars = getColorVariablesForElement(colors, "dark");

  const accentDerivedLight = getAccentDerivedVariables(
    colors.accent.oklchLight,
    colors.accentForeground.oklchLight,
  );
  const accentDerivedDark = getAccentDerivedVariables(
    colors.accent.oklchDark,
    colors.accentForeground.oklchDark,
  );

  const colorLightVars = getDerivedColorVars(lightVars, accentDerivedLight);
  const colorDarkVars = getDerivedColorVars(darkVars, accentDerivedDark);

  return {
    fullDarkVars: {...commonVars, ...colorDarkVars},
    fullLightVars: {...commonVars, ...colorLightVars},
  };
}

/**
 * Computes the full set of CSS theme variables for both light and dark modes.
 * Used by PreviewContainer to sync theme variables to iframes via postMessage.
 */
export function useComputedThemeVars(): ComputedThemeVars {
  const [variables] = useVariablesState();

  return useMemo(() => computeThemeVars(variables), [variables]);
}
