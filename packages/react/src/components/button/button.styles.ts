import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const buttonVariants = tv({
  base: "button",
  variants: {
    isIconOnly: {
      true: "button--icon-only",
    },
    size: {
      lg: "button--lg",
      md: "button--md",
      sm: "button--sm",
    },
    variant: {
      primary: "button--primary",
      secondary: "button--secondary",
      tertiary: "button--tertiary",
      ghost: "button--ghost",
      danger: "button--danger",
      "danger-soft": "button--danger-soft",
    },
    fullWidth: {
      true: "button--full-width",
      false: "",
    },
  },
  defaultVariants: {
    isIconOnly: false,
    size: "md",
    variant: "primary",
    fullWidth: false,
  },
});

export type ButtonVariants = VariantProps<typeof buttonVariants>;
