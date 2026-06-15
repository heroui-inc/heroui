"use client";

import type {DOMRenderProps} from "../../utils/dom";
import type {MenuItemVariants} from "@heroui/styles";
import type {ComponentPropsWithRef} from "react";
import type {MenuItemRenderProps} from "react-aria-components/Menu";

import {menuItemVariants} from "@heroui/styles";
import React, {createContext, memo, useContext, useMemo} from "react";
import {MenuItem as MenuItemPrimitive} from "react-aria-components/Menu";

import {composeTwRenderProps} from "../../utils";
import {dom} from "../../utils/dom";
import {IconChevronRight} from "../icons";

/* -------------------------------------------------------------------------------------------------
 * Menu Item Context
 * -----------------------------------------------------------------------------------------------*/
interface MenuItemContext {
  indicatorClassName?: string;
  state?: MenuItemRenderProps;
  submenuIndicatorClassName?: string;
}

const MenuItemContext = createContext<MenuItemContext>({});

/* -------------------------------------------------------------------------------------------------
 * Menu Item Root
 * -----------------------------------------------------------------------------------------------*/
interface MenuItemRootProps
  extends ComponentPropsWithRef<typeof MenuItemPrimitive>, MenuItemVariants {
  className?: string;
}

const MenuItemRoot = memo(function MenuItemRoot({
  children,
  className,
  variant,
  ...props
}: MenuItemRootProps) {
  const slots = useMemo(() => menuItemVariants({variant}), [variant]);
  const baseClassName = useMemo(() => slots.item(), [slots]);
  const indicatorClassName = useMemo(() => slots.indicator(), [slots]);
  const submenuIndicatorClassName = useMemo(() => slots.submenuIndicator(), [slots]);

  return (
    <MenuItemPrimitive
      className={composeTwRenderProps(className, baseClassName)}
      data-slot="menu-item"
      {...props}
    >
      {(values) => (
        <MenuItemContext
          value={{
            indicatorClassName,
            state: values,
            submenuIndicatorClassName,
          }}
        >
          {typeof children === "function" ? children(values) : children}
        </MenuItemContext>
      )}
    </MenuItemPrimitive>
  );
});

/* -------------------------------------------------------------------------------------------------
 * Menu Item Indicator
 * -----------------------------------------------------------------------------------------------*/
interface MenuItemIndicatorProps<
  E extends keyof React.JSX.IntrinsicElements = "span",
> extends DOMRenderProps<E, undefined> {
  children?: React.ReactNode | ((props: MenuItemRenderProps) => React.ReactNode);
  className?: string;
  type?: "checkmark" | "dot";
}

function MenuItemIndicatorInner<E extends keyof React.JSX.IntrinsicElements = "span">({
  children,
  className,
  type = "checkmark",
  ...props
}: MenuItemIndicatorProps<E> &
  Omit<React.JSX.IntrinsicElements[E], keyof MenuItemIndicatorProps<E>>) {
  const {indicatorClassName, state} = useContext(MenuItemContext);
  const isSelected = state?.isSelected;
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, indicatorClassName) as string,
    [className, indicatorClassName],
  );

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
    <dom.span
      aria-hidden="true"
      className={resolvedClassName}
      data-slot="menu-item-indicator"
      data-type={type}
      data-visible={isSelected || undefined}
      {...(props as any)}
    >
      {content}
    </dom.span>
  );
}

const MenuItemIndicator = memo(MenuItemIndicatorInner) as <
  E extends keyof React.JSX.IntrinsicElements = "span",
>(
  props: MenuItemIndicatorProps<E> &
    Omit<React.JSX.IntrinsicElements[E], keyof MenuItemIndicatorProps<E>>,
) => React.JSX.Element;

/* -------------------------------------------------------------------------------------------------
 * Menu Item Submenu Indicator
 * -----------------------------------------------------------------------------------------------*/
interface MenuItemSubmenuIndicatorProps<
  E extends keyof React.JSX.IntrinsicElements = "span",
> extends DOMRenderProps<E, undefined> {
  children?: React.ReactNode;
  className?: string;
}

function MenuItemSubmenuIndicatorInner<E extends keyof React.JSX.IntrinsicElements = "span">({
  children,
  className,
  ...props
}: MenuItemSubmenuIndicatorProps<E> &
  Omit<React.JSX.IntrinsicElements[E], keyof MenuItemSubmenuIndicatorProps<E>>) {
  const {state, submenuIndicatorClassName} = useContext(MenuItemContext);
  const hasSubmenu = state?.hasSubmenu;
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, submenuIndicatorClassName) as string,
    [className, submenuIndicatorClassName],
  );

  if (!hasSubmenu) {
    return null;
  }

  const defaultContent = <IconChevronRight />;
  const content = children ?? defaultContent;

  return (
    <dom.span
      aria-hidden="true"
      className={resolvedClassName}
      data-slot="submenu-indicator"
      {...(props as any)}
    >
      {content}
    </dom.span>
  );
}

const MenuItemSubmenuIndicator = memo(MenuItemSubmenuIndicatorInner) as <
  E extends keyof React.JSX.IntrinsicElements = "span",
>(
  props: MenuItemSubmenuIndicatorProps<E> &
    Omit<React.JSX.IntrinsicElements[E], keyof MenuItemSubmenuIndicatorProps<E>>,
) => React.JSX.Element;

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {MenuItemRoot, MenuItemIndicator, MenuItemSubmenuIndicator};

export type {MenuItemRootProps, MenuItemIndicatorProps, MenuItemSubmenuIndicatorProps};
