import type {ComponentProps} from "react";

import {ToggleButtonGroupRoot} from "./toggle-button-group";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const ToggleButtonGroup = Object.assign(ToggleButtonGroupRoot, {
  Root: ToggleButtonGroupRoot,
});

export type ToggleButtonGroup = {
  Props: ComponentProps<typeof ToggleButtonGroupRoot>;
  RootProps: ComponentProps<typeof ToggleButtonGroupRoot>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {ToggleButtonGroupRoot};

export type {
  ToggleButtonGroupRootProps,
  ToggleButtonGroupRootProps as ToggleButtonGroupProps,
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
