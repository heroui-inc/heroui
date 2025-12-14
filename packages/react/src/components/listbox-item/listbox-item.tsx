"use client";

import type {ListBoxItemVariants} from "./listbox-item.styles";
import type {ComponentPropsWithRef} from "react";
import type {ListBoxItemRenderProps} from "react-aria-components";

import React, {createContext, useContext} from "react";
import {ListBoxItem as ListBoxItemPrimitive} from "react-aria-components";

import {composeSlotClassName, composeTwRenderProps} from "../../utils";

import {listboxItemVariants} from "./listbox-item.styles";

/* -------------------------------------------------------------------------------------------------
 * ListBox Item Context
 * -----------------------------------------------------------------------------------------------*/
interface ListBoxItemContext {
  slots?: ReturnType<typeof listboxItemVariants>;
  state?: ListBoxItemRenderProps;
}

const ListBoxItemContext = createContext<ListBoxItemContext>({});

/* -------------------------------------------------------------------------------------------------
 * ListBox Item Root
 * -----------------------------------------------------------------------------------------------*/
interface ListBoxItemRootProps
  extends ComponentPropsWithRef<typeof ListBoxItemPrimitive>, ListBoxItemVariants {
  className?: string;
}

const ListBoxItemRoot = ({children, className, variant, ...props}: ListBoxItemRootProps) => {
  const slots = React.useMemo(() => listboxItemVariants({variant}), [variant]);

  return (
    <ListBoxItemPrimitive
      className={composeTwRenderProps(className, slots.item())}
      data-slot="listbox-item"
      {...props}
    >
      {(values) => (
        <ListBoxItemContext value={{slots, state: values}}>
          {typeof children === "function" ? children(values) : children}
        </ListBoxItemContext>
      )}
    </ListBoxItemPrimitive>
  );
};

/* -------------------------------------------------------------------------------------------------
 * ListBox Item Indicator
 * -----------------------------------------------------------------------------------------------*/
interface ListBoxItemIndicatorProps extends Omit<ComponentPropsWithRef<"span">, "children"> {
  children?: React.ReactNode | ((props: ListBoxItemRenderProps) => React.ReactNode);
}

const ListBoxItemIndicator = ({children, className, ...props}: ListBoxItemIndicatorProps) => {
  const {slots, state} = useContext(ListBoxItemContext);
  const isSelected = state?.isSelected;

  const content =
    typeof children === "function" ? (
      children(state ?? ({} as ListBoxItemRenderProps))
    ) : children ? (
      children
    ) : (
      <svg
        aria-hidden="true"
        data-slot="listbox-item-indicator--checkmark"
        fill="none"
        role="presentation"
        stroke="currentColor"
        strokeDasharray={22}
        strokeDashoffset={isSelected ? 44 : 66}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        viewBox="0 0 17 18"
      >
        <polyline points="1 9 7 14 15 4" />
      </svg>
    );

  return (
    <span
      aria-hidden="true"
      className={composeSlotClassName(slots?.indicator, className)}
      data-slot="listbox-item-indicator"
      data-visible={isSelected || undefined}
      {...props}
    >
      {content}
    </span>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {ListBoxItemRoot, ListBoxItemIndicator};

export type {ListBoxItemRootProps, ListBoxItemIndicatorProps};
