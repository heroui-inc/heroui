import type {ComponentProps} from "react";

import {ListBoxItem, ListBoxItemIndicator, ListBoxRoot} from "./listbox";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const ListBox = Object.assign(ListBoxRoot, {
  Root: ListBoxRoot,
  Item: ListBoxItem,
  ItemIndicator: ListBoxItemIndicator,
});

export type ListBox = {
  Props: ComponentProps<typeof ListBoxRoot>;
  RootProps: ComponentProps<typeof ListBoxRoot>;
  ItemProps: ComponentProps<typeof ListBoxItem>;
  ItemIndicatorProps: ComponentProps<typeof ListBoxItemIndicator>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {ListBoxRoot, ListBoxItem, ListBoxItemIndicator};

export type {
  ListBoxRootProps,
  ListBoxRootProps as ListBoxProps,
  ListBoxItemProps,
  ListBoxItemIndicatorProps,
} from "./listbox";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {listboxVariants} from "./listbox.styles";

export type {ListBoxVariants} from "./listbox.styles";
