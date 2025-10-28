import type {ComponentProps} from "react";

import {DescriptionRoot} from "./description";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const Description = Object.assign(DescriptionRoot, {
  Root: DescriptionRoot,
});

export type Description = {
  Props: ComponentProps<typeof DescriptionRoot>;
  RootProps: ComponentProps<typeof DescriptionRoot>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {DescriptionRoot};

export type {DescriptionRootProps, DescriptionRootProps as DescriptionProps} from "./description";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {descriptionVariants} from "./description.styles";

export type {DescriptionVariants} from "./description.styles";
