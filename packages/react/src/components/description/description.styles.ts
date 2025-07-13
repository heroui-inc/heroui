import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const descriptionVariants = tv({
  base: ["text-muted-foreground text-sm", "transition-colors duration-200"],
  variants: {
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
    },
    disabled: {
      true: "opacity-[var(--disabled-opacity)]",
    },
  },
  defaultVariants: {
    size: "md",
    disabled: false,
  },
});

export type DescriptionVariants = VariantProps<typeof descriptionVariants>;
