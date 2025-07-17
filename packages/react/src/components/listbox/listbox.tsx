"use client";

import type {ListBoxVariants} from "./listbox.styles";
import type {
  ListBoxItemProps as ListBoxItemPrimitiveProps,
  ListBoxProps as ListBoxPrimitiveProps,
} from "react-aria-components";

import React from "react";
import {
  Collection,
  ListBoxItem as ListBoxItemPrimitive,
  ListBox as ListBoxPrimitive,
} from "react-aria-components";

import {composeTwRenderProps} from "../../utils";

import {listboxVariants} from "./listbox.styles";

type ListBoxContextValue = {
  slots?: ReturnType<typeof listboxVariants>;
};

const ListBoxContext = React.createContext<ListBoxContextValue>({});

export type ListBoxRootProps<T extends object> = ListBoxPrimitiveProps<T> &
  ListBoxVariants & {
    className?: string;
  };

const ListBoxRootInner = React.forwardRef<HTMLDivElement, ListBoxRootProps<object>>(
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

ListBoxRootInner.displayName = "HeroUI.ListBox.Root";

const ListBoxRoot = ListBoxRootInner as <T extends object>(
  props: ListBoxRootProps<T> & React.RefAttributes<HTMLDivElement>,
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

ListBoxItem.displayName = "HeroUI.ListBox.Item";

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

ListBoxItemIndicator.displayName = "HeroUI.ListBox.ItemIndicator";

export {
  ListBoxRoot as Root,
  ListBoxItem as Item,
  ListBoxItemIndicator as ItemIndicator,
  Collection,
};
