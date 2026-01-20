import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const buttonVariants = tv({
  base: "button",
  defaultVariants: {
    fullWidth: false,
    isIconOnly: false,
    size: "md",
    variant: "primary",
  },
  variants: {
    fullWidth: {
      false: "",
      true: "button--full-width",
    },
    isIconOnly: {
      true: "button--icon-only",
    },
    size: {
      lg: "button--lg",
      md: "button--md",
      sm: "button--sm",
    },
    variant: {
      danger: "button--danger",
      "danger-soft": "button--danger-soft",
      ghost: "button--ghost",
      outline: "button--outline",
      primary: "button--primary",
      secondary: "button--secondary",
      tertiary: "button--tertiary",
    },
  },
});

export type ButtonVariants = VariantProps<typeof buttonVariants>;
