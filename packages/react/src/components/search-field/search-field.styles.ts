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
    isOnSurface: {
      true: {
        group: "search-field__group--on-surface",
        input: "search-field__input--on-surface",
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
    fullWidth: false,
  },
});

export type SearchFieldVariants = VariantProps<typeof searchFieldVariants>;
