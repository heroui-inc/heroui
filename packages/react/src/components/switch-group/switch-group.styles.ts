import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const switchGroupVariants = tv({
  slots: {
    base: "switch-group",
    items: "switch-group__items",
  },
  variants: {
    orientation: {
      horizontal: {
        base: "switch-group--horizontal",
      },
      vertical: {
        base: "switch-group--vertical",
      },
    },
  },
  defaultVariants: {
    orientation: "vertical",
  },
});

export type SwitchGroupVariants = VariantProps<typeof switchGroupVariants>;
