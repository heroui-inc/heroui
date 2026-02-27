import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const tableVariants = tv({
  defaultVariants: {
    variant: "primary",
  },
  slots: {
    base: "table-root",
    body: "table__body",
    cell: "table__cell",
    column: "table__column",
    columnResizer: "table__column-resizer",
    content: "table__content",
    footer: "table__footer",
    header: "table__header",
    loadMore: "table__load-more",
    resizableContainer: "table__resizable-container",
    row: "table__row",
    scrollContainer: "table__scroll-container",
  },
  variants: {
    variant: {
      primary: {
        base: "table-root--primary",
      },
      secondary: {
        base: "table-root--secondary",
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
