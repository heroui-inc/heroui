"use client";

import type {DOMRenderProps} from "../../utils/dom";
import type {TableVariants} from "@heroui/styles";
import type {ComponentPropsWithRef, ReactNode} from "react";

import {tableVariants} from "@heroui/styles";
import React, {createContext, memo, useContext, useMemo} from "react";
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

import {composeTwRenderProps} from "../../utils/compose";
import {dom} from "../../utils/dom";
import {IconChevronUp} from "../icons";

/* -------------------------------------------------------------------------------------------------
 * Table Context
 * -----------------------------------------------------------------------------------------------*/
type TableContext = {
  baseClassName?: string;
  bodyClassName?: string;
  cellClassName?: string;
  columnClassName?: string;
  columnResizerClassName?: string;
  contentClassName?: string;
  footerClassName?: string;
  headerClassName?: string;
  loadMoreClassName?: string;
  loadMoreContentClassName?: string;
  resizableContainerClassName?: string;
  rowClassName?: string;
  scrollContainerClassName?: string;
  sortableColumnHeaderClassName?: string;
  sortableColumnIndicatorClassName?: string;
};

const TableContext = createContext<TableContext>({});

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

function TableRootInner<E extends keyof React.JSX.IntrinsicElements = "div">({
  children,
  className,
  variant,
  ...props
}: TableRootProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof TableRootProps<E>>) {
  const slots = useMemo(() => tableVariants({variant}), [variant]);
  const contextValue = useMemo<TableContext>(
    () => ({
      baseClassName: slots.base(),
      bodyClassName: slots.body(),
      cellClassName: slots.cell(),
      columnClassName: slots.column(),
      columnResizerClassName: slots.columnResizer(),
      contentClassName: slots.content(),
      footerClassName: slots.footer(),
      headerClassName: slots.header(),
      loadMoreClassName: slots.loadMore(),
      loadMoreContentClassName: slots.loadMoreContent(),
      resizableContainerClassName: slots.resizableContainer(),
      rowClassName: slots.row(),
      scrollContainerClassName: slots.scrollContainer(),
      sortableColumnHeaderClassName: slots.sortableColumnHeader(),
      sortableColumnIndicatorClassName: slots.sortableColumnIndicator(),
    }),
    [slots],
  );
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, contextValue.baseClassName) as string,
    [className, contextValue.baseClassName],
  );

  return (
    <TableContext value={contextValue}>
      <dom.div className={resolvedClassName} data-slot="table" {...(props as any)}>
        {children}
      </dom.div>
    </TableContext>
  );
}

TableRootInner.displayName = "HeroUI.Table";

const TableRoot = memo(TableRootInner) as <E extends keyof React.JSX.IntrinsicElements = "div">(
  props: TableRootProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof TableRootProps<E>>,
) => React.JSX.Element;

/* -------------------------------------------------------------------------------------------------
 * Table Scroll Container
 * -----------------------------------------------------------------------------------------------*/
interface TableScrollContainerProps<
  E extends keyof React.JSX.IntrinsicElements = "div",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

function TableScrollContainerInner<E extends keyof React.JSX.IntrinsicElements = "div">({
  children,
  className,
  ...props
}: TableScrollContainerProps<E> &
  Omit<React.JSX.IntrinsicElements[E], keyof TableScrollContainerProps<E>>) {
  const {scrollContainerClassName} = useContext(TableContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, scrollContainerClassName) as string,
    [className, scrollContainerClassName],
  );

  return (
    <dom.div className={resolvedClassName} data-slot="table-scroll-container" {...(props as any)}>
      {children}
    </dom.div>
  );
}

TableScrollContainerInner.displayName = "HeroUI.Table.ScrollContainer";

const TableScrollContainer = memo(TableScrollContainerInner) as <
  E extends keyof React.JSX.IntrinsicElements = "div",
>(
  props: TableScrollContainerProps<E> &
    Omit<React.JSX.IntrinsicElements[E], keyof TableScrollContainerProps<E>>,
) => React.JSX.Element;

/* -------------------------------------------------------------------------------------------------
 * Table Content
 * -----------------------------------------------------------------------------------------------*/
interface TableContentProps extends Omit<
  ComponentPropsWithRef<typeof TablePrimitive>,
  "className"
> {
  className?: string;
}

const TableContent = memo(function TableContent({className, ...props}: TableContentProps) {
  const {contentClassName} = useContext(TableContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, contentClassName),
    [className, contentClassName],
  );

  return <TablePrimitive className={resolvedClassName} data-slot="table-content" {...props} />;
});

TableContent.displayName = "HeroUI.Table.Content";

/* -------------------------------------------------------------------------------------------------
 * Table Header
 * -----------------------------------------------------------------------------------------------*/
interface TableHeaderProps<T extends object> extends ComponentPropsWithRef<
  typeof TableHeaderPrimitive<T>
> {}

function TableHeaderInner<T extends object>({className, ...props}: TableHeaderProps<T>) {
  const {headerClassName} = useContext(TableContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, headerClassName),
    [className, headerClassName],
  );

  return <TableHeaderPrimitive className={resolvedClassName} data-slot="table-header" {...props} />;
}

TableHeaderInner.displayName = "HeroUI.Table.Header";

const TableHeader = memo(TableHeaderInner) as <T extends object>(
  props: TableHeaderProps<T>,
) => React.JSX.Element;

/* -------------------------------------------------------------------------------------------------
 * Table Column
 * -----------------------------------------------------------------------------------------------*/
interface TableColumnProps extends ComponentPropsWithRef<typeof ColumnPrimitive> {}

const TableColumn = memo(
  React.forwardRef<HTMLTableCellElement, TableColumnProps>(({className, ...props}, ref) => {
    const {columnClassName} = useContext(TableContext);
    const resolvedClassName = useMemo(
      () => composeTwRenderProps(className, columnClassName),
      [className, columnClassName],
    );

    return (
      <ColumnPrimitive
        ref={ref}
        className={resolvedClassName}
        data-slot="table-column"
        {...props}
      />
    );
  }),
);

TableColumn.displayName = "HeroUI.Table.Column";

/* -------------------------------------------------------------------------------------------------
 * Table Body
 * -----------------------------------------------------------------------------------------------*/
interface TableBodyProps<T extends object> extends ComponentPropsWithRef<
  typeof TableBodyPrimitive<T>
> {}

function TableBodyInner<T extends object>({className, ...props}: TableBodyProps<T>) {
  const {bodyClassName} = useContext(TableContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, bodyClassName),
    [className, bodyClassName],
  );

  return <TableBodyPrimitive className={resolvedClassName} data-slot="table-body" {...props} />;
}

TableBodyInner.displayName = "HeroUI.Table.Body";

const TableBody = memo(TableBodyInner) as <T extends object>(
  props: TableBodyProps<T>,
) => React.JSX.Element;

/* -------------------------------------------------------------------------------------------------
 * Table Row
 * -----------------------------------------------------------------------------------------------*/
interface TableRowProps<T extends object> extends ComponentPropsWithRef<typeof RowPrimitive<T>> {}

function TableRowInner<T extends object>({className, ...props}: TableRowProps<T>) {
  const {rowClassName} = useContext(TableContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, rowClassName),
    [className, rowClassName],
  );

  return <RowPrimitive className={resolvedClassName} data-slot="table-row" {...props} />;
}

TableRowInner.displayName = "HeroUI.Table.Row";

const TableRow = memo(TableRowInner) as <T extends object>(
  props: TableRowProps<T>,
) => React.JSX.Element;

/* -------------------------------------------------------------------------------------------------
 * Table Cell
 * -----------------------------------------------------------------------------------------------*/
interface TableCellProps extends ComponentPropsWithRef<typeof CellPrimitive> {}

const TableCell = memo(
  React.forwardRef<HTMLTableCellElement, TableCellProps>(({className, ...props}, ref) => {
    const {cellClassName} = useContext(TableContext);
    const resolvedClassName = useMemo(
      () => composeTwRenderProps(className, cellClassName),
      [className, cellClassName],
    );

    return (
      <CellPrimitive ref={ref} className={resolvedClassName} data-slot="table-cell" {...props} />
    );
  }),
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

function TableFooterInner<E extends keyof React.JSX.IntrinsicElements = "div">({
  children,
  className,
  ...props
}: TableFooterProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof TableFooterProps<E>>) {
  const {footerClassName} = useContext(TableContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, footerClassName) as string,
    [className, footerClassName],
  );

  return (
    <dom.div className={resolvedClassName} data-slot="table-footer" {...(props as any)}>
      {children}
    </dom.div>
  );
}

TableFooterInner.displayName = "HeroUI.Table.Footer";

const TableFooter = memo(TableFooterInner) as <E extends keyof React.JSX.IntrinsicElements = "div">(
  props: TableFooterProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof TableFooterProps<E>>,
) => React.JSX.Element;

/* -------------------------------------------------------------------------------------------------
 * Table Resizable Container
 * -----------------------------------------------------------------------------------------------*/
interface TableResizableContainerProps extends ComponentPropsWithRef<
  typeof ResizableTableContainerPrimitive
> {}

const TableResizableContainer = memo(
  React.forwardRef<HTMLDivElement, TableResizableContainerProps>(({className, ...props}, ref) => {
    const {resizableContainerClassName} = useContext(TableContext);
    const resolvedClassName = useMemo(
      () => composeTwRenderProps(className, resizableContainerClassName) as string,
      [className, resizableContainerClassName],
    );

    return (
      <ResizableTableContainerPrimitive
        ref={ref}
        className={resolvedClassName}
        data-slot="table-resizable-container"
        {...props}
      />
    );
  }),
);

TableResizableContainer.displayName = "HeroUI.Table.ResizableContainer";

/* -------------------------------------------------------------------------------------------------
 * Table Column Resizer
 * -----------------------------------------------------------------------------------------------*/
interface TableColumnResizerProps extends ComponentPropsWithRef<typeof ColumnResizerPrimitive> {}

const TableColumnResizer = memo(
  React.forwardRef<HTMLDivElement, TableColumnResizerProps>(({className, ...props}, ref) => {
    const {columnResizerClassName} = useContext(TableContext);
    const resolvedClassName = useMemo(
      () => composeTwRenderProps(className, columnResizerClassName),
      [className, columnResizerClassName],
    );

    return (
      <ColumnResizerPrimitive
        ref={ref}
        className={resolvedClassName}
        data-slot="table-column-resizer"
        {...props}
      />
    );
  }),
);

TableColumnResizer.displayName = "HeroUI.Table.ColumnResizer";

/* -------------------------------------------------------------------------------------------------
 * Table Load More Item
 * -----------------------------------------------------------------------------------------------*/
interface TableLoadMoreItemProps extends ComponentPropsWithRef<typeof TableLoadMoreItemPrimitive> {}

const TableLoadMoreItem = memo(
  React.forwardRef<HTMLTableRowElement, TableLoadMoreItemProps>(({className, ...props}, ref) => {
    const {loadMoreClassName} = useContext(TableContext);
    const resolvedClassName = useMemo(
      () => composeTwRenderProps(className, loadMoreClassName) as string,
      [className, loadMoreClassName],
    );

    return (
      <TableLoadMoreItemPrimitive
        ref={ref}
        className={resolvedClassName}
        data-slot="table-load-more"
        {...props}
      />
    );
  }),
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

function TableLoadMoreContentInner<E extends keyof React.JSX.IntrinsicElements = "div">({
  children,
  className,
  ...props
}: TableLoadMoreContentProps<E> &
  Omit<React.JSX.IntrinsicElements[E], keyof TableLoadMoreContentProps<E>>) {
  const {loadMoreContentClassName} = useContext(TableContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, loadMoreContentClassName) as string,
    [className, loadMoreContentClassName],
  );

  return (
    <dom.div className={resolvedClassName} data-slot="table-load-more-content" {...(props as any)}>
      {children}
    </dom.div>
  );
}

TableLoadMoreContentInner.displayName = "HeroUI.Table.LoadMoreContent";

const TableLoadMoreContent = memo(TableLoadMoreContentInner) as <
  E extends keyof React.JSX.IntrinsicElements = "div",
>(
  props: TableLoadMoreContentProps<E> &
    Omit<React.JSX.IntrinsicElements[E], keyof TableLoadMoreContentProps<E>>,
) => React.JSX.Element;

/* -------------------------------------------------------------------------------------------------
 * Table Sortable Column Header
 * -----------------------------------------------------------------------------------------------*/
type TableSortDirection = "ascending" | "descending";

interface TableSortableColumnHeaderProps extends Omit<
  React.ComponentPropsWithoutRef<"span">,
  "children"
> {
  /** Label content of the column header. */
  children?: ReactNode;
  /**
   * Current sort direction for the column. Pass the `sortDirection` value
   * received from `Table.Column`'s render-prop callback.
   */
  sortDirection?: TableSortDirection;
  /**
   * Whether to render the sort indicator icon when a direction is set.
   * @default true
   */
  showIndicator?: boolean;
  /**
   * Custom indicator element. When provided, overrides the default chevron.
   * The indicator receives a `data-direction` attribute reflecting the
   * current sort direction.
   */
  indicator?: ReactNode;
}

const TableSortableColumnHeader = memo(
  React.forwardRef<HTMLSpanElement, TableSortableColumnHeaderProps>(
    ({children, className, indicator, showIndicator = true, sortDirection, ...props}, ref) => {
      const {sortableColumnHeaderClassName, sortableColumnIndicatorClassName} =
        useContext(TableContext);

      const resolvedClassName = useMemo(
        () => composeTwRenderProps(className, sortableColumnHeaderClassName) as string,
        [className, sortableColumnHeaderClassName],
      );

      const shouldRenderIndicator = showIndicator && !!sortDirection;

      let indicatorElement: ReactNode = null;

      if (shouldRenderIndicator) {
        if (indicator === undefined) {
          indicatorElement = (
            <IconChevronUp
              className={sortableColumnIndicatorClassName}
              data-direction={sortDirection}
              data-slot="table-sortable-column-indicator"
            />
          );
        } else if (React.isValidElement(indicator)) {
          const element = indicator as React.ReactElement<{
            className?: string;
            "data-direction"?: TableSortDirection;
            "data-slot"?: "table-sortable-column-indicator";
          }>;

          indicatorElement = React.cloneElement(element, {
            className: composeTwRenderProps(
              element.props.className,
              sortableColumnIndicatorClassName,
            ) as string,
            "data-direction": sortDirection,
            "data-slot": "table-sortable-column-indicator",
          });
        } else {
          indicatorElement = indicator;
        }
      }

      return (
        <span
          ref={ref}
          className={resolvedClassName}
          data-direction={sortDirection}
          data-slot="table-sortable-column-header"
          {...props}
        >
          {children}
          {indicatorElement}
        </span>
      );
    },
  ),
);

TableSortableColumnHeader.displayName = "HeroUI.Table.SortableColumnHeader";

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
  TableSortableColumnHeader,
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
  TableSortableColumnHeaderProps,
  TableSortDirection,
};
