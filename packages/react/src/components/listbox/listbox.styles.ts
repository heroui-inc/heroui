import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const listboxVariants = tv({
  base: "listbox",
  variants: {
    variant: {
      default: "listbox--default",
      danger: "listbox--danger",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export type ListBoxVariants = VariantProps<typeof listboxVariants>;
