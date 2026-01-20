import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const menuItemVariants = tv({
  defaultVariants: {
    variant: "default",
  },
  slots: {
    indicator: "menu-item__indicator",
    item: "menu-item",
    submenuIndicator: "menu-item__indicator menu-item__indicator--submenu",
  },
  variants: {
    variant: {
      danger: {
        item: "menu-item--danger",
      },
      default: {
        item: "menu-item--default",
      },
    },
  },
});

export type MenuItemVariants = VariantProps<typeof menuItemVariants>;
