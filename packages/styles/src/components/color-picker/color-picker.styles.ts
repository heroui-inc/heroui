import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const colorPickerVariants = tv({
  slots: {
    base: "color-picker",
    popover: "color-picker__popover",
    trigger: "color-picker__trigger",
  },
});

export type ColorPickerVariants = VariantProps<typeof colorPickerVariants>;
