"use client";

import type {ListBoxVariants} from "./listbox.styles";
import type {
  ListBoxItemProps as ListBoxItemPrimitiveProps,
  ListBoxProps as ListBoxPrimitiveProps,
} from "react-aria-components";

import React from "react";
import {
  ListBoxItem as ListBoxItemPrimitive,
  ListBox as ListBoxPrimitive,
} from "react-aria-components";

import {composeTwRenderProps} from "../../utils";

import {listboxVariants} from "./listbox.styles";

/* -------------------------------------------------------------------------------------------------
 * ListBox Context
 * -----------------------------------------------------------------------------------------------*/
type ListBoxContext = {
  slots?: ReturnType<typeof listboxVariants>;
};

const ListBoxContext = React.createContext<ListBoxContext>({});

/* -------------------------------------------------------------------------------------------------
 * ListBox Root
 * -----------------------------------------------------------------------------------------------*/
type ListBoxRootProps<T extends object> = ListBoxPrimitiveProps<T> &
  ListBoxVariants & {
    className?: string;
  };

function ListBoxRoot<T extends object>({className, variant, ...props}: ListBoxRootProps<T>) {
  const slots = React.useMemo(() => listboxVariants({variant}), [variant]);

  return (
    <ListBoxContext value={{slots}}>
      <ListBoxPrimitive className={composeTwRenderProps(className, slots.base())} {...props} />
    </ListBoxContext>
  );
}

/* -------------------------------------------------------------------------------------------------
 * ListBox Item
 * -----------------------------------------------------------------------------------------------*/
type ListBoxItemProps = ListBoxItemPrimitiveProps & {
  className?: string;
};

const ListBoxItem = ({children, className, ...props}: ListBoxItemProps) => {
  const {slots} = React.useContext(ListBoxContext);

  return (
    <ListBoxItemPrimitive className={composeTwRenderProps(className, slots?.item())} {...props}>
      {(renderProps) => (
        <>
          {typeof children === "function" ? children(renderProps) : children}
          <ListBoxItemIndicator isSelected={renderProps.isSelected} />
        </>
      )}
    </ListBoxItemPrimitive>
  );
};

/* -------------------------------------------------------------------------------------------------
 * ListBox Item Indicator
 * -----------------------------------------------------------------------------------------------*/
type ListBoxItemIndicatorProps = {
  className?: string;
  children?: React.ReactNode;
  isSelected?: boolean;
};

const ListBoxItemIndicator = ({
  children,
  className,
  isSelected,
  ...props
}: ListBoxItemIndicatorProps) => {
  const {slots} = React.useContext(ListBoxContext);

  return (
    <span
      aria-hidden="true"
      className={slots?.itemIndicator({className})}
      data-visible={isSelected || undefined}
      {...props}
    >
      {children}
    </span>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {ListBoxRoot, ListBoxItem, ListBoxItemIndicator};

export type {ListBoxRootProps, ListBoxItemProps, ListBoxItemIndicatorProps};
