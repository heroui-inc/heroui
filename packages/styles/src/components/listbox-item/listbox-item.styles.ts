import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const listboxItemVariants = tv({
  defaultVariants: {
    variant: "default",
  },
  slots: {
    indicator: "listbox-item__indicator",
    item: "listbox-item",
  },
  variants: {
    variant: {
      danger: {
        item: "listbox-item--danger",
      },
      default: {
        item: "listbox-item--default",
      },
    },
  },
});

export type ListBoxItemVariants = VariantProps<typeof listboxItemVariants>;
