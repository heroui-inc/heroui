import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const comboBoxVariants = tv({
  defaultVariants: {
    fullWidth: false,
  },
  slots: {
    base: "combo-box",
    inputGroup: "combo-box__input-group",
    popover: "combo-box__popover",
    trigger: "combo-box__trigger",
  },
  variants: {
    fullWidth: {
      false: {},
      true: {
        base: "combo-box--full-width",
        inputGroup: "combo-box__input-group--full-width",
      },
    },
  },
});

export type ComboBoxVariants = VariantProps<typeof comboBoxVariants>;
