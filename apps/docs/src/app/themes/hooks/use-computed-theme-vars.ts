"use client";

import type {ThemeValues} from "../constants";

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
  getColorVariablesForElement,
  getDerivedColorVariables,
  parseOklch,
  radiusDerivedVariables,
} from "../utils/generate-theme-colors";

import {useVariablesState} from "./use-variables-state";

export interface FontMeta {
  cdnUrl: string;
  variable: string;
  family: string;
}

export interface ComputedThemeVars {
  fullLightVars: Record<string, string>;
  fullDarkVars: Record<string, string>;
  fontMeta: FontMeta;
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

export function computeThemeVars(variables: ThemeValues): ComputedThemeVars {
  const {base, chroma, hue, lightness} = variables;
  const accentColor = `oklch(${lightness} ${chroma} ${hue})`;
  const isAdaptive = accentColor in adaptiveColors;

  const matchingThemeId = findMatchingTheme(variables);
  const semanticOverrides = matchingThemeId
    ? themeValuesById[matchingThemeId].semanticOverrides
    : undefined;

  // Resolve font variable and metadata
  const fontFamily = variables.fontFamily;
  let fontVariable: string;
  let fontMeta: FontMeta;

  if (isCustomFontUrl(fontFamily)) {
    const customFontInfo = getCustomFontInfoFromUrl(fontFamily);

    if (customFontInfo) {
      fontVariable = customFontInfo.variable;
      fontMeta = {
        cdnUrl: customFontInfo.url,
        family: customFontInfo.fontFamily,
        variable: customFontInfo.variable,
      };
    } else {
      const interFont = fontMap.inter;

      fontVariable = interFont.variable;
      fontMeta = {cdnUrl: interFont.cdnUrl, family: interFont.label, variable: interFont.variable};
    }
  } else {
    const predefinedFont = fontMap[fontFamily as keyof typeof fontMap] ?? fontMap.inter;

    fontVariable = predefinedFont.variable;
    fontMeta = {
      cdnUrl: predefinedFont.cdnUrl,
      family: predefinedFont.label,
      variable: predefinedFont.variable,
    };
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
    };
    const darkAccentVars = {
      "--accent": adaptiveConfig.dark,
      "--accent-foreground": darkFg,
      "--focus": adaptiveConfig.dark,
    };

    const colorLightVars = {
      ...lightVars,
      ...lightAccentVars,
      ...getDerivedColorVariables({...lightVars, ...lightAccentVars}),
    };
    const colorDarkVars = {
      ...darkVars,
      ...darkAccentVars,
      ...getDerivedColorVariables({...darkVars, ...darkAccentVars}),
    };

    return {
      fontMeta,
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

  const colorLightVars = {...lightVars, ...getDerivedColorVariables(lightVars)};
  const colorDarkVars = {...darkVars, ...getDerivedColorVariables(darkVars)};

  return {
    fontMeta,
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
