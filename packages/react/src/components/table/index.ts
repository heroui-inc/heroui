import type {ComponentProps} from "react";

import {
  TableBody,
  TableCell,
  TableCollection,
  TableColumn,
  TableColumnResizer,
  TableFooter,
  TableHeader,
  TableLoadMoreItem,
  TableResizableContainer,
  TableRoot,
  TableRow,
} from "./table";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const Table = Object.assign(TableRoot, {
  Body: TableBody,
  Cell: TableCell,
  Collection: TableCollection,
  Column: TableColumn,
  ColumnResizer: TableColumnResizer,
  Footer: TableFooter,
  Header: TableHeader,
  LoadMore: TableLoadMoreItem,
  ResizableContainer: TableResizableContainer,
  Root: TableRoot,
  Row: TableRow,
});

export type Table = {
  Props: ComponentProps<typeof TableRoot>;
  RootProps: ComponentProps<typeof TableRoot>;
  HeaderProps: ComponentProps<typeof TableHeader>;
  ColumnProps: ComponentProps<typeof TableColumn>;
  ColumnResizerProps: ComponentProps<typeof TableColumnResizer>;
  BodyProps: ComponentProps<typeof TableBody>;
  RowProps: ComponentProps<typeof TableRow>;
  CellProps: ComponentProps<typeof TableCell>;
  FooterProps: ComponentProps<typeof TableFooter>;
  LoadMoreProps: ComponentProps<typeof TableLoadMoreItem>;
  ResizableContainerProps: ComponentProps<typeof TableResizableContainer>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {
  TableRoot,
  TableHeader,
  TableColumn,
  TableColumnResizer,
  TableBody,
  TableRow,
  TableCell,
  TableFooter,
  TableCollection,
  TableLoadMoreItem,
  TableResizableContainer,
};

export type {
  TableRootProps,
  TableRootProps as TableProps,
  TableHeaderProps,
  TableColumnProps,
  TableColumnResizerProps,
  TableBodyProps,
  TableRowProps,
  TableCellProps,
  TableFooterProps,
  TableLoadMoreItemProps,
  TableResizableContainerProps,
} from "./table";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {tableVariants} from "@heroui/styles";

export type {TableVariants} from "@heroui/styles";
