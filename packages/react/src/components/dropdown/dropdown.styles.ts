import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const dropdownVariants = tv({
  slots: {
    root: "dropdown",
    trigger: "dropdown__trigger",
    popover: "dropdown__popover",
    menu: "dropdown__menu",
  },
});

export type DropdownVariants = VariantProps<typeof dropdownVariants>;
