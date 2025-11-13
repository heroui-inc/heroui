"use client";

import type {DropdownVariants} from "./dropdown.styles";
import type {MenuItemIndicatorProps, MenuItemRootProps} from "../menu-item";
import type {MenuSectionRootProps} from "../menu-section";
import type {
  ButtonProps,
  MenuProps as MenuPrimitiveProps,
  MenuTriggerProps as MenuTriggerPrimitiveProps,
  PopoverProps as PopoverPrimitiveProps,
} from "react-aria-components";

import React, {createContext, useContext} from "react";
import {
  Button,
  Menu as MenuPrimitive,
  MenuTrigger as MenuTriggerPrimitive,
  Popover as PopoverPrimitive,
  SubmenuTrigger as SubmenuTriggerPrimitive,
} from "react-aria-components";

import {composeTwRenderProps} from "../../utils/compose";
import {IconChevronRight} from "../icons";
import {MenuItemIndicator, MenuItemRoot} from "../menu-item";
import {MenuSectionRoot} from "../menu-section";

import {dropdownVariants} from "./dropdown.styles";

/* -------------------------------------------------------------------------------------------------
 * Dropdown Context
 * -----------------------------------------------------------------------------------------------*/
type DropdownContext = {
  slots?: ReturnType<typeof dropdownVariants>;
};

const DropdownContext = createContext<DropdownContext>({});

/* -------------------------------------------------------------------------------------------------
 * Dropdown Root (MenuTrigger wrapper)
 * -----------------------------------------------------------------------------------------------*/
interface DropdownRootProps extends MenuTriggerPrimitiveProps, DropdownVariants {
  className?: string;
}

const DropdownRoot = ({children, ...props}: DropdownRootProps) => {
  const slots = React.useMemo(() => dropdownVariants(), []);

  return (
    <DropdownContext.Provider value={{slots}}>
      <MenuTriggerPrimitive {...props}>{children}</MenuTriggerPrimitive>
    </DropdownContext.Provider>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Dropdown Trigger (Button wrapper)
 * -----------------------------------------------------------------------------------------------*/
interface DropdownTriggerProps extends ButtonProps {}

const DropdownTrigger = ({children, className, ...props}: DropdownTriggerProps) => {
  const {slots} = useContext(DropdownContext);

  return (
    <Button
      className={composeTwRenderProps(className, slots?.trigger())}
      data-slot="dropdown-trigger"
      {...props}
    >
      {(values) => <>{typeof children === "function" ? children(values) : children}</>}
    </Button>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Dropdown Content (Popover wrapper)
 * -----------------------------------------------------------------------------------------------*/
interface DropdownContentProps extends Omit<PopoverPrimitiveProps, "children">, DropdownVariants {
  children: React.ReactNode;
}

const DropdownContent = ({
  children,
  className,
  placement = "bottom",
  ...props
}: DropdownContentProps) => {
  const {slots} = useContext(DropdownContext);

  return (
    <PopoverPrimitive
      {...props}
      className={composeTwRenderProps(className, slots?.content())}
      placement={placement}
    >
      {children}
    </PopoverPrimitive>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Dropdown Menu (Menu wrapper)
 * -----------------------------------------------------------------------------------------------*/
interface DropdownMenuProps<T extends object> extends MenuPrimitiveProps<T>, DropdownVariants {
  className?: string;
}

function DropdownMenu<T extends object>({className, ...props}: DropdownMenuProps<T>) {
  const {slots} = useContext(DropdownContext);

  return (
    <MenuPrimitive
      className={composeTwRenderProps(className, slots?.menu())}
      data-selection-mode={props.selectionMode}
      data-slot="dropdown-menu"
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------------------------------
 * Dropdown Item (MenuItem wrapper)
 * -----------------------------------------------------------------------------------------------*/
interface DropdownItemProps extends MenuItemRootProps {}

const DropdownItem = (props: DropdownItemProps) => {
  return <MenuItemRoot {...props} />;
};

/* -------------------------------------------------------------------------------------------------
 * Dropdown Submenu Trigger
 * -----------------------------------------------------------------------------------------------*/
type DropdownSubmenuTriggerProps = React.ComponentProps<typeof SubmenuTriggerPrimitive>;

const DropdownSubmenuTrigger = ({children, ...props}: DropdownSubmenuTriggerProps) => {
  const childrenArray = React.Children.toArray(children) as React.ReactElement[];
  const firstChild = childrenArray[0];

  if (!firstChild || !React.isValidElement(firstChild)) {
    return null;
  }

  // Clone the first child (MenuItem) to add the submenu indicator
  const firstChildProps = firstChild.props as {children?: React.ReactNode};
  const menuItemWithIndicator = React.cloneElement(firstChild, {
    children: (
      <>
        {firstChildProps.children}
        <span
          aria-hidden="true"
          className="menu-item__indicator menu-item__indicator--submenu"
          data-slot="submenu-indicator"
        >
          <IconChevronRight />
        </span>
      </>
    ),
  } as Partial<unknown>);

  return (
    <SubmenuTriggerPrimitive data-slot="dropdown-submenu-trigger" {...props}>
      {[menuItemWithIndicator, ...childrenArray.slice(1)]}
    </SubmenuTriggerPrimitive>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Dropdown Item Indicator (MenuItemIndicator wrapper)
 * -----------------------------------------------------------------------------------------------*/
interface DropdownItemIndicatorProps extends MenuItemIndicatorProps {}

const DropdownItemIndicator = (props: DropdownItemIndicatorProps) => {
  return <MenuItemIndicator {...props} />;
};

/* -------------------------------------------------------------------------------------------------
 * Dropdown Section (MenuSection wrapper)
 * -----------------------------------------------------------------------------------------------*/
interface DropdownSectionProps extends MenuSectionRootProps {}

const DropdownSection = (props: DropdownSectionProps) => {
  return <MenuSectionRoot {...props} />;
};

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {
  DropdownContent,
  DropdownItem,
  DropdownItemIndicator,
  DropdownMenu,
  DropdownRoot,
  DropdownSection,
  DropdownSubmenuTrigger,
  DropdownTrigger,
};

export type {
  DropdownContentProps,
  DropdownItemIndicatorProps,
  DropdownItemProps,
  DropdownMenuProps,
  DropdownRootProps,
  DropdownSectionProps,
  DropdownSubmenuTriggerProps,
  DropdownTriggerProps,
};
