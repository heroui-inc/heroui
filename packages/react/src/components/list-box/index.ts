import type {ComponentProps} from "react";

import {ListBoxItem, ListBoxItemIndicator} from "../list-box-item";
import {ListBoxSection} from "../list-box-section";

import {ListBoxRoot} from "./list-box";

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

export type {ListBoxRootProps, ListBoxRootProps as ListBoxProps} from "./list-box";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {listboxVariants} from "@heroui/styles";

export type {ListBoxVariants} from "@heroui/styles";
