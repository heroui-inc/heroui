import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const spinnerVariants = tv({
  base: "relative animate-spin",
  defaultVariants: {
    color: "accent",
    size: "md",
  },
  variants: {
    color: {
      accent: "text-accent",
      current: "text-current",
      danger: "text-danger",
      success: "text-success",
      warning: "text-warning",
    },
    size: {
      lg: "size-8",
      md: "size-6",
      sm: "size-4",
      xl: "size-10",
    },
  },
});

export type SpinnerVariants = VariantProps<typeof spinnerVariants>;
