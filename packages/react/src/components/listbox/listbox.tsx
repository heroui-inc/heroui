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

type ListBoxContextValue = {
  slots?: ReturnType<typeof listboxVariants>;
};
const ListBoxContext = React.createContext<ListBoxContextValue>({});

export type ListBoxProps<T extends object> = ListBoxPrimitiveProps<T> &
  ListBoxVariants & {
    className?: string;
  };
function ListBox<T extends object>({className, variant, ...props}: ListBoxProps<T>) {
  const slots = React.useMemo(() => listboxVariants({variant}), [variant]);

  return (
    <ListBoxContext.Provider value={{slots}}>
      <ListBoxPrimitive className={composeTwRenderProps(className, slots.base())} {...props} />
    </ListBoxContext.Provider>
  );
}
export type ListBoxItemProps = ListBoxItemPrimitiveProps & {
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

export type ListBoxItemIndicatorProps = {
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

export {ListBox, ListBoxItem, ListBoxItemIndicator};
