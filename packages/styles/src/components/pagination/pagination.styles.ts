import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const paginationVariants = tv({
  defaultVariants: {
    size: "md",
  },
  slots: {
    base: "pagination",
    content: "pagination__content",
    ellipsis: "pagination__ellipsis",
    item: "pagination__item",
    link: "pagination__link",
    summary: "pagination__summary",
  },
  variants: {
    size: {
      lg: {
        base: "pagination--lg",
      },
      md: {
        base: "pagination--md",
      },
      sm: {
        base: "pagination--sm",
      },
    },
  },
});

export type PaginationVariants = VariantProps<typeof paginationVariants>;
