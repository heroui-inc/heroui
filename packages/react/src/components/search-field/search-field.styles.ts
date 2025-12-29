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
    inSurface: {
      default: {
        group: "search-field__group--in-surface-default",
        input: "search-field__input--in-surface-default",
      },
      secondary: {
        group: "search-field__group--in-surface-secondary",
        input: "search-field__input--in-surface-secondary",
      },
      tertiary: {
        group: "search-field__group--in-surface-tertiary",
        input: "search-field__input--in-surface-tertiary",
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
