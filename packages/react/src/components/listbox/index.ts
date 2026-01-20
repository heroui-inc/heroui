import type {ComponentProps} from "react";

import {ListBoxItem, ListBoxItemIndicator} from "../listbox-item";
import {ListBoxSection} from "../listbox-section";

import {ListBoxRoot} from "./listbox";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const ListBox = Object.assign(ListBoxRoot, {
  Root: ListBoxRoot,
  Item: ListBoxItem,
  ItemIndicator: ListBoxItemIndicator,
  Section: ListBoxSection,
});

export type ListBox = {
  Props: ComponentProps<typeof ListBoxRoot>;
  RootProps: ComponentProps<typeof ListBoxRoot>;
  ItemProps: ComponentProps<typeof ListBoxItem>;
  SectionProps: ComponentProps<typeof ListBoxSection>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {ListBoxRoot};

export type {ListBoxRootProps, ListBoxRootProps as ListBoxProps} from "./listbox";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {listboxVariants} from "@heroui/styles";

export type {ListBoxVariants} from "@heroui/styles";
