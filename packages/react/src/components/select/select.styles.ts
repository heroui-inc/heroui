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
    inSurface: {
      default: {
        trigger: "select__trigger--in-surface-default",
      },
      secondary: {
        trigger: "select__trigger--in-surface-secondary",
      },
      tertiary: {
        trigger: "select__trigger--in-surface-tertiary",
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
    fullWidth: false,
  },
});

export type SelectVariants = VariantProps<typeof selectVariants>;
