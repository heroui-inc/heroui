import type {ComponentProps} from "react";

import {SpinnerRoot} from "./spinner";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const Spinner = Object.assign(SpinnerRoot, {
  Root: SpinnerRoot,
});

export type Spinner = {
  Props: ComponentProps<typeof SpinnerRoot>;
  RootProps: ComponentProps<typeof SpinnerRoot>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {SpinnerRoot};

export type {SpinnerRootProps, SpinnerRootProps as SpinnerProps} from "./spinner";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {spinnerVariants} from "@heroui/styles";

export type {SpinnerVariants} from "@heroui/styles";
