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

const ListBoxInner = React.forwardRef<HTMLDivElement, ListBoxProps<object>>(
  ({className, variant, ...props}, ref) => {
    const slots = React.useMemo(() => listboxVariants({variant}), [variant]);

    return (
      <ListBoxContext.Provider value={{slots}}>
        <ListBoxPrimitive
          ref={ref}
          className={composeTwRenderProps(className, slots.base())}
          {...props}
        />
      </ListBoxContext.Provider>
    );
  },
);

ListBoxInner.displayName = "HeroUI.ListBox";

const ListBox = ListBoxInner as <T extends object>(
  props: ListBoxProps<T> & React.RefAttributes<HTMLDivElement>,
) => React.ReactElement;

export type ListBoxItemProps = ListBoxItemPrimitiveProps & {
  className?: string;
};

const ListBoxItem = React.forwardRef<HTMLDivElement, ListBoxItemProps>(
  ({children, className, ...props}, ref) => {
    const {slots} = React.useContext(ListBoxContext);

    return (
      <ListBoxItemPrimitive
        ref={ref}
        className={composeTwRenderProps(className, slots?.item())}
        {...props}
      >
        {(renderProps) => (
          <>
            {typeof children === "function" ? children(renderProps) : children}
            <ListBoxItemIndicator isSelected={renderProps.isSelected} />
          </>
        )}
      </ListBoxItemPrimitive>
    );
  },
);

ListBoxItem.displayName = "HeroUI.ListBoxItem";

export type ListBoxItemIndicatorProps = {
  className?: string;
  children?: React.ReactNode;
  isSelected?: boolean;
};

const ListBoxItemIndicator = React.forwardRef<HTMLSpanElement, ListBoxItemIndicatorProps>(
  ({children, className, isSelected}, ref) => {
    const {slots} = React.useContext(ListBoxContext);

    return (
      <span
        ref={ref}
        aria-hidden="true"
        className={slots?.itemIndicator({className})}
        data-visible={isSelected || undefined}
      >
        {children}
      </span>
    );
  },
);

ListBoxItemIndicator.displayName = "HeroUI.ListBoxItemIndicator";

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/

const Root = ListBox;
const Item = ListBoxItem;
const ItemIndicator = ListBoxItemIndicator;

export {
  ListBox,
  ListBoxItem,
  ListBoxItemIndicator,
  // named exports
  Root,
  Item,
  ItemIndicator,
};
