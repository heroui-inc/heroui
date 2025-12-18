import type {ComponentProps} from "react";

import {ButtonGroupRoot} from "./button-group";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const ButtonGroup = Object.assign(ButtonGroupRoot, {
  Root: ButtonGroupRoot,
});

export type ButtonGroup = {
  Props: ComponentProps<typeof ButtonGroupRoot>;
  RootProps: ComponentProps<typeof ButtonGroupRoot>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {ButtonGroupRoot};

export type {ButtonGroupRootProps, ButtonGroupRootProps as ButtonGroupProps} from "./button-group";

/* -------------------------------------------------------------------------------------------------
 * Context
 * -----------------------------------------------------------------------------------------------*/
export {ButtonGroupContext} from "./button-group";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {buttonGroupVariants} from "./button-group.styles";

export type {ButtonGroupVariants} from "./button-group.styles";
