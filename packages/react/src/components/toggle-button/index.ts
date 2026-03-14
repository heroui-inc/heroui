import type {ComponentProps} from "react";

import {ToggleButtonRoot} from "./toggle-button";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const ToggleButton = Object.assign(ToggleButtonRoot, {
  Root: ToggleButtonRoot,
});

export type ToggleButton = {
  Props: ComponentProps<typeof ToggleButtonRoot>;
  RootProps: ComponentProps<typeof ToggleButtonRoot>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {ToggleButtonRoot};

export type {
  ToggleButtonRootProps,
  ToggleButtonRootProps as ToggleButtonProps,
} from "./toggle-button";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {toggleButtonVariants} from "@heroui/styles";

export type {ToggleButtonVariants} from "@heroui/styles";
