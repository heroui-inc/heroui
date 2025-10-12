import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const closeButtonVariants = tv({
  base: "close-button",
  variants: {
    size: {
      sm: "close-button--sm",
      md: "close-button--md",
      lg: "close-button--lg",
    },
    variant: {
      default: "close-button--default",
    },
  },
  defaultVariants: {
    size: "md",
    variant: "default",
  },
});

export type CloseButtonVariants = VariantProps<typeof closeButtonVariants>;
