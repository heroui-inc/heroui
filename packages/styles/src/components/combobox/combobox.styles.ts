import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const comboboxVariants = tv({
  defaultVariants: {
    fullWidth: false,
  },
  slots: {
    base: "combobox",
    inputGroup: "combobox__input-group",
    popover: "combobox__popover",
    trigger: "combobox__trigger",
  },
  variants: {
    fullWidth: {
      false: {},
      true: {
        base: "combobox--full-width",
        inputGroup: "combobox__input-group--full-width",
      },
    },
  },
});

export type ComboBoxVariants = VariantProps<typeof comboboxVariants>;
