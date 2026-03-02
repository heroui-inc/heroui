import type {ComponentProps} from "react";

import {TextFieldRoot} from "./textfield";

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

export type {TextFieldRootProps, TextFieldRootProps as TextFieldProps} from "./textfield";

/* -------------------------------------------------------------------------------------------------
 * Context
 * -----------------------------------------------------------------------------------------------*/
export {TextFieldContext} from "./textfield";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {textFieldVariants} from "@heroui/styles";

export type {TextFieldVariants} from "@heroui/styles";
