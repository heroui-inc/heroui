import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const inputVariants = tv({
  base: "input",
  variants: {
    inSurface: {
      transparent: "input--in-surface-transparent",
      default: "input--in-surface-default",
      secondary: "input--in-surface-secondary",
      tertiary: "input--in-surface-tertiary",
    },
    fullWidth: {
      true: "input--full-width",
      false: "",
    },
  },
  defaultVariants: {
    inSurface: undefined,
    fullWidth: false,
  },
});

export type InputVariants = VariantProps<typeof inputVariants>;
