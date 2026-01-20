import type {ComponentProps} from "react";

import {BUTTON_GROUP_CHILD} from "../button-group";

import {ButtonRoot} from "./button";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const Button = Object.assign(ButtonRoot, {
  Root: ButtonRoot,
});

export type Button = {
  Props: ComponentProps<typeof ButtonRoot>;
  RootProps: ComponentProps<typeof ButtonRoot>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {ButtonRoot};

export type {ButtonRootProps, ButtonRootProps as ButtonProps} from "./button";

/* -------------------------------------------------------------------------------------------------
 * Re-export BUTTON_GROUP_CHILD for type declarations
 * -----------------------------------------------------------------------------------------------*/
export {BUTTON_GROUP_CHILD};

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {buttonVariants} from "@heroui/styles";

export type {ButtonVariants} from "@heroui/styles";
