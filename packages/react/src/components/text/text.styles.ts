import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const textVariants = tv({
  base: ["transition-colors duration-200"],
  variants: {
    size: {
      xs: "text-xs",
      sm: "text-sm",
      base: "text-base",
      lg: "text-lg",
      xl: "text-xl",
    },
    variant: {
      default: "text-foreground",
      muted: "text-muted-foreground",
      success: "text-success",
      warning: "text-warning",
      danger: "text-danger",
    },
  },
  defaultVariants: {
    size: "base",
    variant: "default",
  },
});

export type TextVariants = VariantProps<typeof textVariants>;
