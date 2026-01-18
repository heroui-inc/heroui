import type {ComponentProps} from "react";

import {ListBoxItemIndicator, ListBoxItemRoot} from "./listbox-item";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const ListBoxItem = Object.assign(ListBoxItemRoot, {
  Root: ListBoxItemRoot,
  Indicator: ListBoxItemIndicator,
});

export type ListBoxItem = {
  Props: ComponentProps<typeof ListBoxItemRoot>;
  RootProps: ComponentProps<typeof ListBoxItemRoot>;
  IndicatorProps: ComponentProps<typeof ListBoxItemIndicator>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {ListBoxItemRoot, ListBoxItemIndicator};

export type {
  ListBoxItemRootProps,
  ListBoxItemRootProps as ListBoxItemProps,
  ListBoxItemIndicatorProps,
} from "./listbox-item";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {listboxItemVariants} from "@heroui/styles";
export type {ListBoxItemVariants} from "@heroui/styles";
