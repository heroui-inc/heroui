import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const autocompleteVariants = tv({
  slots: {
    base: "autocomplete",
    trigger: "autocomplete__trigger",
    value: "autocomplete__value",
    indicator: "autocomplete__indicator",
    popover: "autocomplete__popover",
    filter: "autocomplete__filter",
  },
  variants: {
    variant: {
      primary: {
        base: "autocomplete--primary",
      },
      secondary: {
        base: "autocomplete--secondary",
      },
    },
    fullWidth: {
      true: {
        base: "autocomplete--full-width",
        trigger: "autocomplete__trigger--full-width",
      },
      false: {},
    },
  },
  defaultVariants: {
    variant: "primary",
    fullWidth: false,
  },
});

export type AutocompleteVariants = VariantProps<typeof autocompleteVariants>;
