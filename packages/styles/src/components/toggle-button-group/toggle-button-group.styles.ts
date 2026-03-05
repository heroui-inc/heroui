import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const toggleButtonGroupVariants = tv({
  defaultVariants: {
    fullWidth: false,
    isDetached: false,
    orientation: "horizontal",
  },
  slots: {
    base: "toggle-button-group",
    separator: "toggle-button-group__separator",
  },
  variants: {
    fullWidth: {
      false: {},
      true: {
        base: "toggle-button-group--full-width",
      },
    },
    isDetached: {
      false: {},
      true: {
        base: "toggle-button-group--detached",
      },
    },
    orientation: {
      horizontal: {
        base: "toggle-button-group--horizontal",
      },
      vertical: {
        base: "toggle-button-group--vertical",
      },
    },
  },
});

export type ToggleButtonGroupVariants = VariantProps<typeof toggleButtonGroupVariants>;
