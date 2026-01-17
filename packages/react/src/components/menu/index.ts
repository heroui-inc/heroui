import type {MenuItemRoot} from "../menu-item";
import type {MenuSectionRoot} from "../menu-section";
import type {ComponentProps} from "react";

import {MenuItem, MenuItemIndicator} from "../menu-item";
import {MenuSection} from "../menu-section";

import {MenuRoot} from "./menu";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const Menu = Object.assign(MenuRoot, {
  Root: MenuRoot,
  Item: MenuItem,
  ItemIndicator: MenuItemIndicator,
  Section: MenuSection,
});

export type Menu<T extends object = object> = {
  Props: ComponentProps<typeof MenuRoot<T>>;
  RootProps: ComponentProps<typeof MenuRoot<T>>;
  ItemProps: ComponentProps<typeof MenuItemRoot>;
  SectionProps: ComponentProps<typeof MenuSectionRoot>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {MenuRoot};

export type {MenuRootProps, MenuRootProps as MenuProps} from "./menu";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {menuVariants} from "@heroui/styles";

export type {MenuVariants} from "@heroui/styles";
