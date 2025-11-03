import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const chipVariants = tv({
  base: "chip",
  defaultVariants: {
    color: "default",
    variant: "secondary",
  },
  variants: {
    color: {
      accent: "chip--accent",
      danger: "chip--danger",
      default: "chip--default",
      success: "chip--success",
      warning: "chip--warning",
    },
    variant: {
      primary: "chip--primary",
      secondary: "chip--secondary",
      tertiary: "chip--tertiary",
      soft: "chip--soft",
    },
    size: {
      sm: "chip--sm",
      md: "chip--md",
      lg: "chip--lg",
    },
  },
});

export type ChipVariants = VariantProps<typeof chipVariants>;
