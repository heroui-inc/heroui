import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const labelVariants = tv({
  base: ["text-base font-medium", "transition-colors duration-200", "select-none"],
  variants: {
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    },
    variant: {
      default: "text-foreground",
      muted: "text-muted-foreground",
      destructive: "text-destructive",
    },
    required: {
      true: "after:text-destructive after:ml-0.5 after:content-['*']",
    },
    disabled: {
      true: "cursor-not-allowed opacity-[var(--disabled-opacity)]",
    },
  },
  defaultVariants: {
    size: "md",
    variant: "default",
    required: false,
    disabled: false,
  },
});

export type LabelVariants = VariantProps<typeof labelVariants>;
