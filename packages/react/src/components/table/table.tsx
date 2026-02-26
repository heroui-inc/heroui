"use client";

import type {TableVariants} from "@heroui/styles";
import type {ComponentPropsWithRef} from "react";

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
  Table as TablePrimitive,
} from "react-aria-components";
import {cx} from "tailwind-variants";

import {composeSlotClassName, composeTwRenderProps} from "../../utils/compose";

/* -------------------------------------------------------------------------------------------------
 * Table Context
 * -----------------------------------------------------------------------------------------------*/
const TableContext = createContext<{
  slots?: ReturnType<typeof tableVariants>;
}>({});

/* -------------------------------------------------------------------------------------------------
 * Table Root
 * -----------------------------------------------------------------------------------------------*/
interface TableRootProps
  extends Omit<ComponentPropsWithRef<typeof TablePrimitive>, "className">, TableVariants {
  className?: string;
  /** Additional className applied to the wrapper div. */
  wrapperClassName?: string;
  children?: React.ReactNode;
}

const TableRoot = React.forwardRef<HTMLDivElement, TableRootProps>(
  ({children, className, variant, wrapperClassName, ...tableProps}, ref) => {
    const slots = React.useMemo(() => tableVariants({variant}), [variant]);

    // Separate Footer children from table children (Header/Body)
    const tableChildren: React.ReactNode[] = [];
    const footerChildren: React.ReactNode[] = [];

    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child) && child.type === TableFooter) {
        footerChildren.push(child);
      } else {
        tableChildren.push(child);
      }
    });

    return (
      <TableContext value={{slots}}>
        <div
          ref={ref}
          className={slots.wrapper({className: wrapperClassName})}
          data-slot="table-wrapper"
        >
          <div className={slots.scrollContainer()} data-slot="table-scroll-container">
            <TablePrimitive
              className={composeTwRenderProps(className, slots.base())}
              data-slot="table"
              {...tableProps}
            >
              {tableChildren}
            </TablePrimitive>
          </div>
          {footerChildren}
        </div>
      </TableContext>
    );
  },
);

TableRoot.displayName = "HeroUI.Table";

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
interface TableFooterProps extends ComponentPropsWithRef<"div"> {
  className?: string;
}

const TableFooter = React.forwardRef<HTMLDivElement, TableFooterProps>(
  ({className, ...props}, ref) => {
    const {slots} = useContext(TableContext);

    return (
      <div
        ref={ref}
        className={composeSlotClassName(slots?.footer, className)}
        data-slot="table-footer"
        {...props}
      />
    );
  },
);

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
 * Exports
 * -----------------------------------------------------------------------------------------------*/
// Re-export Collection from React Aria for dynamic cell rendering within rows.
// Users wrap their dynamic cells in <Table.Collection items={columns}> when they
// need to render additional static cells (e.g. checkbox, drag handle) alongside
// dynamic column-based cells.
const TableCollection = CollectionPrimitive;

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
  TableResizableContainer,
};

export type {
  TableRootProps,
  TableHeaderProps,
  TableColumnProps,
  TableColumnResizerProps,
  TableBodyProps,
  TableRowProps,
  TableCellProps,
  TableFooterProps,
  TableResizableContainerProps,
};
