import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const spinnerVariants = tv({
  base: "relative animate-spin stroke-current",
  defaultVariants: {
    color: "base",
    size: "small",
  },
  variants: {
    color: {
      accent: "text-accent",
      base: "text-base-foreground",
      danger: "text-danger",
      success: "text-success",
      warning: "text-warning",
    },
    size: {
      "extra-large": "size-10",
      large: "size-8",
      medium: "size-6",
      small: "size-4",
    },
  },
});

export type SpinnerVariants = VariantProps<typeof spinnerVariants>;
