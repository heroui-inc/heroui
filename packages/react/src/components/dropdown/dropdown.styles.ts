import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const dropdownVariants = tv({
  slots: {
    root: "dropdown",
    trigger: "dropdown__trigger",
    content: "dropdown__content",
    menu: "dropdown__menu",
  },
});

export type DropdownVariants = VariantProps<typeof dropdownVariants>;
