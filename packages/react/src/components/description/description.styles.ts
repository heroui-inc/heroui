import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const descriptionVariants = tv({
  base: "description",
  variants: {
    size: {
      sm: "description--sm",
      md: "description--md",
      lg: "description--lg",
    },
    disabled: {
      true: "description--disabled",
    },
  },
  defaultVariants: {
    size: "md",
    disabled: false,
  },
});

export type DescriptionVariants = VariantProps<typeof descriptionVariants>;
