import type {ComponentProps} from "react";

import {DateFieldRoot} from "./date-field";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const DateField = Object.assign(DateFieldRoot, {
  Root: DateFieldRoot,
});

export type DateField = {
  Props: ComponentProps<typeof DateFieldRoot>;
  RootProps: ComponentProps<typeof DateFieldRoot>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {DateFieldRoot};

export type {DateFieldRootProps, DateFieldRootProps as DateFieldProps} from "./date-field";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {dateFieldVariants} from "./date-field.styles";

export type {DateFieldVariants} from "./date-field.styles";
