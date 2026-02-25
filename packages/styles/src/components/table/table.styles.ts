import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const tableVariants = tv({
  defaultVariants: {
    variant: "primary",
  },
  slots: {
    base: "table",
    body: "table__body",
    cell: "table__cell",
    column: "table__column",
    footer: "table__footer",
    header: "table__header",
    row: "table__row",
    scrollContainer: "table__scroll-container",
    wrapper: "table-wrapper",
  },
  variants: {
    variant: {
      primary: {
        wrapper: "table-wrapper--primary",
      },
      secondary: {
        wrapper: "table-wrapper--secondary",
      },
    },
  },
});

// Exclude React Aria render prop keys from the variant types
type TableRenderPropsKeys =
  | "isHovered"
  | "isFocused"
  | "isFocusVisible"
  | "isSelected"
  | "isDisabled"
  | "isDragging"
  | "isDropTarget"
  | "state";

export type TableVariants = Omit<VariantProps<typeof tableVariants>, TableRenderPropsKeys>;
