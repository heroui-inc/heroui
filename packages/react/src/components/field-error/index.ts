import type {ComponentProps} from "react";

import {FieldErrorRoot} from "./field-error";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const FieldError = Object.assign(FieldErrorRoot, {
  Root: FieldErrorRoot,
});

export type FieldError = {
  Props: ComponentProps<typeof FieldErrorRoot>;
  RootProps: ComponentProps<typeof FieldErrorRoot>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {FieldErrorRoot};

export type {FieldErrorRootProps, FieldErrorRootProps as FieldErrorProps} from "./field-error";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {fieldErrorVariants} from "./field-error.styles";

export type {FieldErrorVariants} from "./field-error.styles";
