import type {ComponentProps} from "react";

import {MenuItemIndicator, MenuItemRoot, MenuItemSubmenuIndicator} from "./menu-item";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const MenuItem = Object.assign(MenuItemRoot, {
  Root: MenuItemRoot,
  Indicator: MenuItemIndicator,
  SubmenuIndicator: MenuItemSubmenuIndicator,
});

export type MenuItem = {
  Props: ComponentProps<typeof MenuItemRoot>;
  RootProps: ComponentProps<typeof MenuItemRoot>;
  IndicatorProps: ComponentProps<typeof MenuItemIndicator>;
  SubmenuIndicatorProps: ComponentProps<typeof MenuItemSubmenuIndicator>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {MenuItemRoot, MenuItemIndicator, MenuItemSubmenuIndicator};

export type {
  MenuItemRootProps,
  MenuItemRootProps as MenuItemProps,
  MenuItemIndicatorProps,
  MenuItemSubmenuIndicatorProps,
} from "./menu-item";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {menuItemVariants} from "@heroui/styles";
export type {MenuItemVariants} from "@heroui/styles";
