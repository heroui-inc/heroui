import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const textVariants = tv({
  base: ["transition-colors duration-200"],
  defaultVariants: {
    size: "base",
    variant: "default",
  },
  variants: {
    size: {
      base: "text-base",
      lg: "text-lg",
      sm: "text-sm",
      xl: "text-xl",
      xs: "text-xs",
    },
    variant: {
      danger: "text-danger",
      default: "text-foreground",
      muted: "text-muted",
      success: "text-success",
      warning: "text-warning",
    },
  },
});

export type TextVariants = VariantProps<typeof textVariants>;
