import type {ComponentProps} from "react";

import {ToggleButtonGroupRoot, ToggleButtonGroupSeparator} from "./toggle-button-group";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const ToggleButtonGroup = Object.assign(ToggleButtonGroupRoot, {
  Root: ToggleButtonGroupRoot,
  Separator: ToggleButtonGroupSeparator,
});

export type ToggleButtonGroup = {
  Props: ComponentProps<typeof ToggleButtonGroupRoot>;
  RootProps: ComponentProps<typeof ToggleButtonGroupRoot>;
  SeparatorProps: ComponentProps<typeof ToggleButtonGroupSeparator>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {ToggleButtonGroupRoot, ToggleButtonGroupSeparator};

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
