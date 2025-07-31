import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const buttonVariants = tv({
  base: "button",
  defaultVariants: {
    isIconOnly: false,
    size: "md",
    variant: "primary",
  },
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
      danger: "button--danger",
      ghost: "button--ghost",
      primary: "button--primary",
      secondary: "button--secondary",
      tertiary: "button--tertiary",
    },
  },
});

export type ButtonVariants = VariantProps<typeof buttonVariants>;
