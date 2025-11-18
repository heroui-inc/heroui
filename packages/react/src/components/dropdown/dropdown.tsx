"use client";

import type {DropdownVariants} from "./dropdown.styles";
import type {MenuItemIndicatorProps, MenuItemRootProps} from "../menu-item";
import type {MenuSectionRootProps} from "../menu-section";
import type {SurfaceVariants} from "../surface";
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
import {MenuItemIndicator, MenuItemRoot, MenuItemSubmenuIndicator} from "../menu-item";
import {MenuSectionRoot} from "../menu-section";
import {SurfaceContext} from "../surface";

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
 * Dropdown Popover (Popover wrapper)
 * -----------------------------------------------------------------------------------------------*/
interface DropdownPopoverProps extends Omit<PopoverPrimitiveProps, "children">, DropdownVariants {
  children: React.ReactNode;
}

const DropdownPopover = ({children, className, placement, ...props}: DropdownPopoverProps) => {
  const {slots} = useContext(DropdownContext);

  return (
    <SurfaceContext.Provider
      value={{
        variant: "default" as SurfaceVariants["variant"],
      }}
    >
      <PopoverPrimitive
        {...props}
        className={composeTwRenderProps(className, slots?.popover())}
        placement={placement}
      >
        {children}
      </PopoverPrimitive>
    </SurfaceContext.Provider>
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
 * Dropdown Submenu Indicator (MenuItemSubmenuIndicator wrapper)
 * -----------------------------------------------------------------------------------------------*/
interface DropdownSubmenuIndicatorProps
  extends React.ComponentProps<typeof MenuItemSubmenuIndicator> {}

const DropdownSubmenuIndicator = (props: DropdownSubmenuIndicatorProps) => {
  return <MenuItemSubmenuIndicator {...props} />;
};

/* -------------------------------------------------------------------------------------------------
 * Dropdown Submenu Trigger
 * -----------------------------------------------------------------------------------------------*/
type DropdownSubmenuTriggerProps = React.ComponentProps<typeof SubmenuTriggerPrimitive>;

const DropdownSubmenuTrigger = ({children, ...props}: DropdownSubmenuTriggerProps) => {
  return (
    <SubmenuTriggerPrimitive data-slot="dropdown-submenu-trigger" {...props}>
      {children}
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
  DropdownItem,
  DropdownItemIndicator,
  DropdownMenu,
  DropdownPopover,
  DropdownRoot,
  DropdownSection,
  DropdownSubmenuIndicator,
  DropdownSubmenuTrigger,
  DropdownTrigger,
};

export type {
  DropdownItemIndicatorProps,
  DropdownItemProps,
  DropdownMenuProps,
  DropdownPopoverProps,
  DropdownRootProps,
  DropdownSectionProps,
  DropdownSubmenuIndicatorProps,
  DropdownSubmenuTriggerProps,
  DropdownTriggerProps,
};
