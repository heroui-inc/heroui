import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const comboboxVariants = tv({
  slots: {
    base: "combobox",
    inputGroup: "combobox__input-group",
    trigger: "combobox__trigger",
    popover: "combobox__popover",
  },
  variants: {},
});

export type ComboBoxVariants = VariantProps<typeof comboboxVariants>;
