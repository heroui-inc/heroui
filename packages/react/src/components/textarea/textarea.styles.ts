import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const textAreaVariants = tv({
  base: "textarea",
  variants: {
    inSurface: {
      transparent: "textarea--in-surface-transparent",
      default: "textarea--in-surface-default",
      secondary: "textarea--in-surface-secondary",
      tertiary: "textarea--in-surface-tertiary",
    },
    fullWidth: {
      true: "textarea--full-width",
      false: "",
    },
  },
  defaultVariants: {
    inSurface: undefined,
    fullWidth: false,
  },
});

export type TextAreaVariants = VariantProps<typeof textAreaVariants>;
