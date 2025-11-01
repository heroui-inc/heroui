import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const selectVariants = tv({
  slots: {
    base: "select",
    trigger: "select__trigger",
    value: "select__value",
    indicator: "select__indicator",
    content: "select__content",
  },
  variants: {
    isOnSurface: {
      true: {
        trigger: "select__trigger--on-surface",
      },
    },
  },
});

export type SelectVariants = VariantProps<typeof selectVariants>;
