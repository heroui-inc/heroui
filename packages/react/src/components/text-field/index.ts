import type {ComponentProps} from "react";

import {TextFieldRoot} from "./text-field";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const TextField = Object.assign(TextFieldRoot, {
  Root: TextFieldRoot,
});

export type TextField = {
  Props: ComponentProps<typeof TextFieldRoot>;
  RootProps: ComponentProps<typeof TextFieldRoot>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {TextFieldRoot};

export type {TextFieldRootProps, TextFieldRootProps as TextFieldProps} from "./text-field";

/* -------------------------------------------------------------------------------------------------
 * Context
 * -----------------------------------------------------------------------------------------------*/
export {TextFieldContext} from "./text-field";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {textFieldVariants} from "@heroui/styles";

export type {TextFieldVariants} from "@heroui/styles";
