import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const switchGroupVariants = tv({
  defaultVariants: {
    orientation: "vertical",
  },
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
});

export type SwitchGroupVariants = VariantProps<typeof switchGroupVariants>;
