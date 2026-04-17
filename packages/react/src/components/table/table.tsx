"use client";

import type {DOMRenderProps} from "../../utils/dom";
import type {TableVariants} from "@heroui/styles";
import type {ComponentPropsWithRef, ReactNode} from "react";

import {tableVariants} from "@heroui/styles";
import React, {createContext, useContext} from "react";
import {
  Cell as CellPrimitive,
  Collection as CollectionPrimitive,
  Column as ColumnPrimitive,
  ColumnResizer as ColumnResizerPrimitive,
  ResizableTableContainer as ResizableTableContainerPrimitive,
  Row as RowPrimitive,
  TableBody as TableBodyPrimitive,
  TableHeader as TableHeaderPrimitive,
  TableLoadMoreItem as TableLoadMoreItemPrimitive,
  Table as TablePrimitive,
} from "react-aria-components/Table";
import {cx} from "tailwind-variants";

import {composeSlotClassName, composeTwRenderProps} from "../../utils/compose";
import {dom} from "../../utils/dom";

/* -------------------------------------------------------------------------------------------------
 * Table Context
 * -----------------------------------------------------------------------------------------------*/
const TableContext = createContext<{
  slots?: ReturnType<typeof tableVariants>;
}>({});

/* -------------------------------------------------------------------------------------------------
 * Table Root
 * -----------------------------------------------------------------------------------------------*/
interface TableRootProps<
  E extends keyof React.JSX.IntrinsicElements = "div",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
  /** Visual variant. */
  variant?: TableVariants["variant"];
}

const TableRoot = <E extends keyof React.JSX.IntrinsicElements = "div">({
  children,
  className,
  variant,
  ...props
}: TableRootProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof TableRootProps<E>>) => {
  const slots = React.useMemo(() => tableVariants({variant}), [variant]);

  return (
    <TableContext value={{slots}}>
      <dom.div className={slots.base({className})} data-slot="table" {...(props as any)}>
        {children}
      </dom.div>
    </TableContext>
  );
};

TableRoot.displayName = "HeroUI.Table";

/* -------------------------------------------------------------------------------------------------
 * Table Scroll Container
 * -----------------------------------------------------------------------------------------------*/
interface TableScrollContainerProps<
  E extends keyof React.JSX.IntrinsicElements = "div",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

const TableScrollContainer = <E extends keyof React.JSX.IntrinsicElements = "div">({
  className,
  ...props
}: TableScrollContainerProps<E> &
  Omit<React.JSX.IntrinsicElements[E], keyof TableScrollContainerProps<E>>) => {
  const {slots} = useContext(TableContext);

  return (
    <dom.div
      className={composeSlotClassName(slots?.scrollContainer, className)}
      data-slot="table-scroll-container"
      {...(props as any)}
    />
  );
};

TableScrollContainer.displayName = "HeroUI.Table.ScrollContainer";

/* -------------------------------------------------------------------------------------------------
 * Table Content
 * -----------------------------------------------------------------------------------------------*/
interface TableContentProps extends Omit<
  ComponentPropsWithRef<typeof TablePrimitive>,
  "className"
> {
  className?: string;
}

function TableContent({className, ...props}: TableContentProps) {
  const {slots} = useContext(TableContext);

  return (
    <TablePrimitive
      className={composeTwRenderProps(className, slots?.content())}
      data-slot="table-content"
      {...props}
    />
  );
}

(TableContent as React.FC).displayName = "HeroUI.Table.Content";

/* -------------------------------------------------------------------------------------------------
 * Table Header
 * -----------------------------------------------------------------------------------------------*/
interface TableHeaderProps<T extends object> extends ComponentPropsWithRef<
  typeof TableHeaderPrimitive<T>
> {}

function TableHeader<T extends object>({className, ...props}: TableHeaderProps<T>) {
  const {slots} = useContext(TableContext);

  return (
    <TableHeaderPrimitive
      className={composeTwRenderProps(className, slots?.header())}
      data-slot="table-header"
      {...props}
    />
  );
}

(TableHeader as React.FC).displayName = "HeroUI.Table.Header";

/* -------------------------------------------------------------------------------------------------
 * Table Column
 * -----------------------------------------------------------------------------------------------*/
interface TableColumnProps extends ComponentPropsWithRef<typeof ColumnPrimitive> {}

const TableColumn = React.forwardRef<HTMLTableCellElement, TableColumnProps>(
  ({className, ...props}, ref) => {
    const {slots} = useContext(TableContext);

    return (
      <ColumnPrimitive
        ref={ref}
        className={composeTwRenderProps(className, slots?.column())}
        data-slot="table-column"
        {...props}
      />
    );
  },
);

TableColumn.displayName = "HeroUI.Table.Column";

/* -------------------------------------------------------------------------------------------------
 * Table Body
 * -----------------------------------------------------------------------------------------------*/
interface TableBodyProps<T extends object> extends ComponentPropsWithRef<
  typeof TableBodyPrimitive<T>
> {}

function TableBody<T extends object>({className, ...props}: TableBodyProps<T>) {
  const {slots} = useContext(TableContext);

  return (
    <TableBodyPrimitive
      className={composeTwRenderProps(className, slots?.body())}
      data-slot="table-body"
      {...props}
    />
  );
}

(TableBody as React.FC).displayName = "HeroUI.Table.Body";

/* -------------------------------------------------------------------------------------------------
 * Table Row
 * -----------------------------------------------------------------------------------------------*/
interface TableRowProps<T extends object> extends ComponentPropsWithRef<typeof RowPrimitive<T>> {}

function TableRow<T extends object>({className, ...props}: TableRowProps<T>) {
  const {slots} = useContext(TableContext);

  return (
    <RowPrimitive
      className={composeTwRenderProps(className, slots?.row())}
      data-slot="table-row"
      {...props}
    />
  );
}

(TableRow as React.FC).displayName = "HeroUI.Table.Row";

/* -------------------------------------------------------------------------------------------------
 * Table Cell
 * -----------------------------------------------------------------------------------------------*/
interface TableCellProps extends ComponentPropsWithRef<typeof CellPrimitive> {}

const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({className, ...props}, ref) => {
    const {slots} = useContext(TableContext);

    return (
      <CellPrimitive
        ref={ref}
        className={composeTwRenderProps(className, slots?.cell())}
        data-slot="table-cell"
        {...props}
      />
    );
  },
);

TableCell.displayName = "HeroUI.Table.Cell";

/* -------------------------------------------------------------------------------------------------
 * Table Footer
 * -----------------------------------------------------------------------------------------------*/
interface TableFooterProps<
  E extends keyof React.JSX.IntrinsicElements = "div",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

const TableFooter = <E extends keyof React.JSX.IntrinsicElements = "div">({
  className,
  ...props
}: TableFooterProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof TableFooterProps<E>>) => {
  const {slots} = useContext(TableContext);

  return (
    <dom.div
      className={composeSlotClassName(slots?.footer, className)}
      data-slot="table-footer"
      {...(props as any)}
    />
  );
};

TableFooter.displayName = "HeroUI.Table.Footer";

/* -------------------------------------------------------------------------------------------------
 * Table Resizable Container
 * -----------------------------------------------------------------------------------------------*/
interface TableResizableContainerProps extends ComponentPropsWithRef<
  typeof ResizableTableContainerPrimitive
> {}

const TableResizableContainer = React.forwardRef<HTMLDivElement, TableResizableContainerProps>(
  ({className, ...props}, ref) => {
    return (
      <ResizableTableContainerPrimitive
        ref={ref}
        className={cx("table__resizable-container", className)}
        data-slot="table-resizable-container"
        {...props}
      />
    );
  },
);

TableResizableContainer.displayName = "HeroUI.Table.ResizableContainer";

/* -------------------------------------------------------------------------------------------------
 * Table Column Resizer
 * -----------------------------------------------------------------------------------------------*/
interface TableColumnResizerProps extends ComponentPropsWithRef<typeof ColumnResizerPrimitive> {}

const TableColumnResizer = React.forwardRef<HTMLDivElement, TableColumnResizerProps>(
  ({className, ...props}, ref) => {
    const {slots} = useContext(TableContext);

    return (
      <ColumnResizerPrimitive
        ref={ref}
        className={composeTwRenderProps(className, slots?.columnResizer())}
        data-slot="table-column-resizer"
        {...props}
      />
    );
  },
);

TableColumnResizer.displayName = "HeroUI.Table.ColumnResizer";

/* -------------------------------------------------------------------------------------------------
 * Table Load More Item
 * -----------------------------------------------------------------------------------------------*/
interface TableLoadMoreItemProps extends ComponentPropsWithRef<typeof TableLoadMoreItemPrimitive> {}

const TableLoadMoreItem = React.forwardRef<HTMLTableRowElement, TableLoadMoreItemProps>(
  ({className, ...props}, ref) => {
    const {slots} = useContext(TableContext);

    return (
      <TableLoadMoreItemPrimitive
        ref={ref}
        className={composeSlotClassName(slots?.loadMore, className)}
        data-slot="table-load-more"
        {...props}
      />
    );
  },
);

TableLoadMoreItem.displayName = "HeroUI.Table.LoadMore";

/* -------------------------------------------------------------------------------------------------
 * Table Load More Content
 * -----------------------------------------------------------------------------------------------*/
interface TableLoadMoreContentProps<
  E extends keyof React.JSX.IntrinsicElements = "div",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

const TableLoadMoreContent = <E extends keyof React.JSX.IntrinsicElements = "div">({
  className,
  ...props
}: TableLoadMoreContentProps<E> &
  Omit<React.JSX.IntrinsicElements[E], keyof TableLoadMoreContentProps<E>>) => {
  const {slots} = useContext(TableContext);

  return (
    <dom.div
      className={composeSlotClassName(slots?.loadMoreContent, className)}
      data-slot="table-load-more-content"
      {...(props as any)}
    />
  );
};

TableLoadMoreContent.displayName = "HeroUI.Table.LoadMoreContent";

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
// Re-export Collection from React Aria for dynamic cell rendering within rows.
// Users wrap their dynamic cells in <Table.Collection items={columns}> when they
// need to render additional static cells (e.g. checkbox, drag handle) alongside
// dynamic column-based cells.
const TableCollection = CollectionPrimitive;

export {
  TableRoot,
  TableScrollContainer,
  TableContent,
  TableHeader,
  TableColumn,
  TableColumnResizer,
  TableBody,
  TableRow,
  TableCell,
  TableFooter,
  TableCollection,
  TableLoadMoreItem,
  TableLoadMoreContent,
  TableResizableContainer,
};

export type {
  TableRootProps,
  TableScrollContainerProps,
  TableContentProps,
  TableHeaderProps,
  TableColumnProps,
  TableColumnResizerProps,
  TableBodyProps,
  TableRowProps,
  TableCellProps,
  TableFooterProps,
  TableLoadMoreItemProps,
  TableLoadMoreContentProps,
  TableResizableContainerProps,
};
