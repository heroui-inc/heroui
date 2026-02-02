import type {ComponentProps} from "react";

import {ListBoxSectionRoot} from "./list-box-section";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const ListBoxSection = ListBoxSectionRoot;

export type ListBoxSection = {
  Props: ComponentProps<typeof ListBoxSectionRoot>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {ListBoxSectionRoot};

export type {
  ListBoxSectionRootProps,
  ListBoxSectionRootProps as ListBoxSectionProps,
} from "./list-box-section";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {listboxSectionVariants} from "@heroui/styles";

export type {ListBoxSectionVariants} from "@heroui/styles";
