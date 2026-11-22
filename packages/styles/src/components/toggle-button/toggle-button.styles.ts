import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const toggleButtonVariants = tv({
  base: "toggle-button",
  defaultVariants: {
    fullWidth: false,
    isIconOnly: false,
    size: "md",
    variant: "default",
  },
  variants: {
    fullWidth: {
      true: "toggle-button--full-width",
    },
    isIconOnly: {
      true: "toggle-button--icon-only",
    },
    size: {
      lg: "toggle-button--lg",
      md: "toggle-button--md",
      sm: "toggle-button--sm",
    },
    variant: {
      default: "toggle-button--default",
      ghost: "toggle-button--ghost",
    },
  },
});

export type ToggleButtonVariants = VariantProps<typeof toggleButtonVariants>;
