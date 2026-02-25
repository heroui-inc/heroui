import type {ComponentProps} from "react";

import {
  TableBody,
  TableCell,
  TableCollection,
  TableColumn,
  TableFooter,
  TableHeader,
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
  Footer: TableFooter,
  Header: TableHeader,
  Root: TableRoot,
  Row: TableRow,
});

export type Table = {
  Props: ComponentProps<typeof TableRoot>;
  RootProps: ComponentProps<typeof TableRoot>;
  HeaderProps: ComponentProps<typeof TableHeader>;
  ColumnProps: ComponentProps<typeof TableColumn>;
  BodyProps: ComponentProps<typeof TableBody>;
  RowProps: ComponentProps<typeof TableRow>;
  CellProps: ComponentProps<typeof TableCell>;
  FooterProps: ComponentProps<typeof TableFooter>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {
  TableRoot,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  TableFooter,
  TableCollection,
};

export type {
  TableRootProps,
  TableRootProps as TableProps,
  TableHeaderProps,
  TableColumnProps,
  TableBodyProps,
  TableRowProps,
  TableCellProps,
  TableFooterProps,
} from "./table";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {tableVariants} from "@heroui/styles";

export type {TableVariants} from "@heroui/styles";
