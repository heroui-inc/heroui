import type {ComponentProps} from "react";

import {MenuItemIndicator, MenuItemRoot} from "./menu-item";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const MenuItem = Object.assign(MenuItemRoot, {
  Root: MenuItemRoot,
  Indicator: MenuItemIndicator,
});

export type MenuItem = {
  Props: ComponentProps<typeof MenuItemRoot>;
  RootProps: ComponentProps<typeof MenuItemRoot>;
  IndicatorProps: ComponentProps<typeof MenuItemIndicator>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {MenuItemRoot, MenuItemIndicator};

export type {
  MenuItemRootProps,
  MenuItemRootProps as MenuItemProps,
  MenuItemIndicatorProps,
} from "./menu-item";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {menuItemVariants} from "./menu-item.styles";
export type {MenuItemVariants} from "./menu-item.styles";
