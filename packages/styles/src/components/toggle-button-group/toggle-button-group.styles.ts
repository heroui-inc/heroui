import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const toggleButtonGroupVariants = tv({
  base: "toggle-button-group",
  defaultVariants: {
    fullWidth: false,
    orientation: "horizontal",
  },
  variants: {
    fullWidth: {
      false: "",
      true: "toggle-button-group--full-width",
    },
    orientation: {
      horizontal: "toggle-button-group--horizontal",
      vertical: "toggle-button-group--vertical",
    },
  },
});

export type ToggleButtonGroupVariants = VariantProps<typeof toggleButtonGroupVariants>;
