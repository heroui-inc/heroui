import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const listboxItemVariants = tv({
  slots: {
    item: "listbox-item",
    indicator: "listbox-item__indicator",
  },
  variants: {
    variant: {
      default: {
        item: "listbox-item--default",
      },
      danger: {
        item: "listbox-item--danger",
      },
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export type ListBoxItemVariants = VariantProps<typeof listboxItemVariants>;
