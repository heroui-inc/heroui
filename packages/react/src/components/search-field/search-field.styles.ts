import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const searchFieldVariants = tv({
  slots: {
    base: "search-field",
    group: "search-field__group",
    input: "search-field__input",
    searchIcon: "search-field__search-icon",
    clearButton: "search-field__clear-button",
  },
  variants: {
    variant: {
      primary: {
        base: "search-field--primary",
      },
      secondary: {
        base: "search-field--secondary",
      },
    },
    fullWidth: {
      true: {
        base: "search-field--full-width",
        group: "search-field__group--full-width",
      },
      false: {},
    },
  },
  defaultVariants: {
    variant: "primary",
    fullWidth: false,
  },
});

export type SearchFieldVariants = VariantProps<typeof searchFieldVariants>;
