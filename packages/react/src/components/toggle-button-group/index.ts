import type {ComponentProps} from "react";

import {
  ToggleButtonGroupIndicator,
  ToggleButtonGroupRoot,
  ToggleButtonGroupSeparator,
} from "./toggle-button-group";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const ToggleButtonGroup = Object.assign(ToggleButtonGroupRoot, {
  Root: ToggleButtonGroupRoot,
  Indicator: ToggleButtonGroupIndicator,
  Separator: ToggleButtonGroupSeparator,
});

export type ToggleButtonGroup = {
  Props: ComponentProps<typeof ToggleButtonGroupRoot>;
  RootProps: ComponentProps<typeof ToggleButtonGroupRoot>;
  IndicatorProps: ComponentProps<typeof ToggleButtonGroupIndicator>;
  SeparatorProps: ComponentProps<typeof ToggleButtonGroupSeparator>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {ToggleButtonGroupRoot, ToggleButtonGroupIndicator, ToggleButtonGroupSeparator};

export type {
  ToggleButtonGroupRootProps,
  ToggleButtonGroupRootProps as ToggleButtonGroupProps,
  ToggleButtonGroupSeparatorProps,
} from "./toggle-button-group";

/* -------------------------------------------------------------------------------------------------
 * Context
 * -----------------------------------------------------------------------------------------------*/
export {ToggleButtonGroupContext, TOGGLE_BUTTON_GROUP_CHILD} from "./toggle-button-group";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {toggleButtonGroupVariants} from "@heroui/styles";

export type {ToggleButtonGroupVariants} from "@heroui/styles";
