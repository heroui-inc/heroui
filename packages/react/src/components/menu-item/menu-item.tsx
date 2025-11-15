"use client";

import type {MenuItemVariants} from "./menu-item.styles";
import type {
  MenuItemProps as MenuItemPrimitiveProps,
  MenuItemRenderProps,
} from "react-aria-components";

import React, {createContext, useContext} from "react";
import {MenuItem as MenuItemPrimitive} from "react-aria-components";

import {composeTwRenderProps} from "../../utils";
import {IconChevronRight} from "../icons";

import {menuItemVariants} from "./menu-item.styles";

/* -------------------------------------------------------------------------------------------------
 * Menu Item Context
 * -----------------------------------------------------------------------------------------------*/
interface MenuItemContext {
  slots?: ReturnType<typeof menuItemVariants>;
  state?: MenuItemRenderProps;
}

const MenuItemContext = createContext<MenuItemContext>({});

/* -------------------------------------------------------------------------------------------------
 * Menu Item Root
 * -----------------------------------------------------------------------------------------------*/
interface MenuItemRootProps extends MenuItemPrimitiveProps, MenuItemVariants {
  className?: string;
}

const MenuItemRoot = ({children, className, variant, ...props}: MenuItemRootProps) => {
  const slots = React.useMemo(() => menuItemVariants({variant}), [variant]);

  return (
    <MenuItemPrimitive
      className={composeTwRenderProps(className, slots.item())}
      data-slot="menu-item"
      {...props}
    >
      {(values) => (
        <MenuItemContext value={{slots, state: values}}>
          {typeof children === "function" ? children(values) : children}
        </MenuItemContext>
      )}
    </MenuItemPrimitive>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Menu Item Indicator
 * -----------------------------------------------------------------------------------------------*/
interface MenuItemIndicatorProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> {
  children?: React.ReactNode | ((props: MenuItemRenderProps) => React.ReactNode);
  type?: "checkmark" | "dot";
}

const MenuItemIndicator = ({
  children,
  className,
  type = "checkmark",
  ...props
}: MenuItemIndicatorProps) => {
  const {slots, state} = useContext(MenuItemContext);
  const isSelected = state?.isSelected;

  const content =
    typeof children === "function" ? (
      children(state ?? ({} as MenuItemRenderProps))
    ) : children ? (
      children
    ) : type === "dot" ? (
      <svg
        aria-hidden="true"
        data-slot="menu-item-indicator--dot"
        fill="currentColor"
        fillRule="evenodd"
        role="presentation"
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path clipRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14" fillRule="evenodd" />
      </svg>
    ) : (
      <svg
        aria-hidden="true"
        data-slot="menu-item-indicator--checkmark"
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
      className={slots?.indicator({className})}
      data-slot="menu-item-indicator"
      data-type={type}
      data-visible={isSelected || undefined}
      {...props}
    >
      {content}
    </span>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Menu Item Submenu Indicator
 * -----------------------------------------------------------------------------------------------*/
interface MenuItemSubmenuIndicatorProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> {
  children?: React.ReactNode;
}

const MenuItemSubmenuIndicator = ({
  children,
  className,
  ...props
}: MenuItemSubmenuIndicatorProps) => {
  const {slots, state} = useContext(MenuItemContext);
  const hasSubmenu = state?.hasSubmenu;

  // Only render if hasSubmenu is true
  if (!hasSubmenu) {
    return null;
  }

  const defaultContent = <IconChevronRight />;
  const content = children ?? defaultContent;

  return (
    <span
      aria-hidden="true"
      className={slots?.submenuIndicator({className})}
      data-slot="submenu-indicator"
      {...props}
    >
      {content}
    </span>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {MenuItemRoot, MenuItemIndicator, MenuItemSubmenuIndicator};

export type {MenuItemRootProps, MenuItemIndicatorProps, MenuItemSubmenuIndicatorProps};
