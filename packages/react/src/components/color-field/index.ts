import type {ComponentProps} from "react";

import {
  ColorInputGroupInput,
  ColorInputGroupPrefix,
  ColorInputGroupRoot,
  ColorInputGroupSuffix,
} from "../color-input-group";

import {ColorFieldRoot} from "./color-field";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const ColorField = Object.assign(ColorFieldRoot, {
  Root: ColorFieldRoot,
  Group: ColorInputGroupRoot,
  Input: ColorInputGroupInput,
  Prefix: ColorInputGroupPrefix,
  Suffix: ColorInputGroupSuffix,
});

export type ColorField = {
  Props: ComponentProps<typeof ColorFieldRoot>;
  RootProps: ComponentProps<typeof ColorFieldRoot>;
  GroupProps: ComponentProps<typeof ColorInputGroupRoot>;
  InputProps: ComponentProps<typeof ColorInputGroupInput>;
  PrefixProps: ComponentProps<typeof ColorInputGroupPrefix>;
  SuffixProps: ComponentProps<typeof ColorInputGroupSuffix>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {ColorFieldRoot};

export type {
  ColorFieldRootProps,
  ColorFieldRootProps as ColorFieldProps,
  ColorValue,
} from "./color-field";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {colorFieldVariants} from "@heroui/styles";

export type {ColorFieldVariants} from "@heroui/styles";
