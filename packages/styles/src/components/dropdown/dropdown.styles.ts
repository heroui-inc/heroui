import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const dropdownVariants = tv({
  slots: {
    menu: "dropdown__menu",
    popover: "dropdown__popover",
    root: "dropdown",
    trigger: "dropdown__trigger",
  },
});

export type DropdownVariants = VariantProps<typeof dropdownVariants>;
