import type {ComponentProps} from "react";

import {ErrorMessageRoot} from "./error-message";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const ErrorMessage = Object.assign(ErrorMessageRoot, {
  Root: ErrorMessageRoot,
});

export type ErrorMessage = {
  Props: ComponentProps<typeof ErrorMessageRoot>;
  RootProps: ComponentProps<typeof ErrorMessageRoot>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {ErrorMessageRoot};

export type {
  ErrorMessageRootProps,
  ErrorMessageRootProps as ErrorMessageProps,
} from "./error-message";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {errorMessageVariants} from "@heroui/styles";

export type {ErrorMessageVariants} from "@heroui/styles";
