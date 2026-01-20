import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const listboxVariants = tv({
  base: "listbox",
  defaultVariants: {
    variant: "default",
  },
  variants: {
    variant: {
      danger: "listbox--danger",
      default: "listbox--default",
    },
  },
});

export type ListBoxVariants = VariantProps<typeof listboxVariants>;
