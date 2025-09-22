import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const chipVariants = tv({
  base: "chip",
  defaultVariants: {
    type: "default",
    variant: "secondary",
  },
  variants: {
    type: {
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
    },
  },
});

export type ChipVariants = VariantProps<typeof chipVariants>;
