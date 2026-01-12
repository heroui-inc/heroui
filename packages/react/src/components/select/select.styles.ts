import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const selectVariants = tv({
  slots: {
    base: "select",
    trigger: "select__trigger",
    value: "select__value",
    indicator: "select__indicator",
    popover: "select__popover",
  },
  variants: {
    variant: {
      primary: {
        base: "select--primary",
      },
      secondary: {
        base: "select--secondary",
      },
    },
    fullWidth: {
      true: {
        base: "select--full-width",
        trigger: "select__trigger--full-width",
      },
      false: {},
    },
  },
  defaultVariants: {
    variant: "primary",
    fullWidth: false,
  },
});

export type SelectVariants = VariantProps<typeof selectVariants>;
