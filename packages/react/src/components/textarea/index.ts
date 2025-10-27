import type {ComponentProps} from "react";

import {TextAreaRoot} from "./textarea";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const TextArea = Object.assign(TextAreaRoot, {
  Root: TextAreaRoot,
});

export type TextArea = {
  Props: ComponentProps<typeof TextAreaRoot>;
  RootProps: ComponentProps<typeof TextAreaRoot>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {TextAreaRoot};

export type {TextAreaRootProps, TextAreaRootProps as TextAreaProps} from "./textarea";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {textAreaVariants} from "./textarea.styles";

export type {TextAreaVariants} from "./textarea.styles";
