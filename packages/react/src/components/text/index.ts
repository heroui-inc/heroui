import type {ComponentProps} from "react";

import {TextRoot} from "./text";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const Text = Object.assign(TextRoot, {
  Root: TextRoot,
});

export type Text = {
  Props: ComponentProps<typeof TextRoot>;
  RootProps: ComponentProps<typeof TextRoot>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {TextRoot};

export type {TextRootProps, TextRootProps as TextProps} from "./text";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {textVariants} from "./text.styles";

export type {TextVariants} from "./text.styles";
