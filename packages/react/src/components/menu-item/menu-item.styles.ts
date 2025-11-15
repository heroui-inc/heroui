import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const menuItemVariants = tv({
  slots: {
    item: "menu-item",
    indicator: "menu-item__indicator",
    submenuIndicator: "menu-item__indicator menu-item__indicator--submenu",
  },
  variants: {
    variant: {
      default: {
        item: "menu-item--default",
      },
      danger: {
        item: "menu-item--danger",
      },
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export type MenuItemVariants = VariantProps<typeof menuItemVariants>;
