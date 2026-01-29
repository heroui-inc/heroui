import type {ComponentProps} from "react";

import {
  ColorInputGroupInput,
  ColorInputGroupPrefix,
  ColorInputGroupRoot,
  ColorInputGroupSuffix,
} from "./color-input-group";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const ColorInputGroup = Object.assign(ColorInputGroupRoot, {
  Root: ColorInputGroupRoot,
  Input: ColorInputGroupInput,
  Prefix: ColorInputGroupPrefix,
  Suffix: ColorInputGroupSuffix,
});

export type ColorInputGroup = {
  Props: ComponentProps<typeof ColorInputGroupRoot>;
  RootProps: ComponentProps<typeof ColorInputGroupRoot>;
  InputProps: ComponentProps<typeof ColorInputGroupInput>;
  PrefixProps: ComponentProps<typeof ColorInputGroupPrefix>;
  SuffixProps: ComponentProps<typeof ColorInputGroupSuffix>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {ColorInputGroupInput, ColorInputGroupPrefix, ColorInputGroupRoot, ColorInputGroupSuffix};

export type {
  ColorInputGroupRootProps,
  ColorInputGroupRootProps as ColorInputGroupProps,
  ColorInputGroupInputProps,
  ColorInputGroupPrefixProps,
  ColorInputGroupSuffixProps,
} from "./color-input-group";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {colorInputGroupVariants} from "@heroui/styles";

export type {ColorInputGroupVariants} from "@heroui/styles";
