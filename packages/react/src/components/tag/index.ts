import type {ComponentProps} from "react";

import {TagRemoveButton, TagRoot} from "./tag";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const Tag = Object.assign(TagRoot, {
  Root: TagRoot,
  RemoveButton: TagRemoveButton,
});

export type Tag = {
  Props: ComponentProps<typeof TagRoot>;
  RootProps: ComponentProps<typeof TagRoot>;
  RemoveButtonProps: ComponentProps<typeof TagRemoveButton>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {TagRoot, TagRemoveButton};

export type {TagRootProps, TagRemoveButtonProps} from "./tag";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {tagVariants} from "@heroui/styles";

export type {TagVariants} from "@heroui/styles";
