import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const autocompleteVariants = tv({
  slots: {
    base: "autocomplete",
    group: "autocomplete__group",
    trigger: "autocomplete__trigger",
    value: "autocomplete__value",
    indicator: "autocomplete__indicator",
    popover: "autocomplete__popover",
    filter: "autocomplete__filter",
  },
});

export type AutocompleteVariants = VariantProps<typeof autocompleteVariants>;
