"use client";

import type {DropdownVariants} from "./dropdown.styles";
import type {SurfaceVariants} from "../surface";
import type {ComponentPropsWithRef} from "react";

import React, {createContext, useContext} from "react";
import {
  Button,
  Menu as MenuPrimitive,
  MenuTrigger as MenuTriggerPrimitive,
  Popover as PopoverPrimitive,
  SubmenuTrigger as SubmenuTriggerPrimitive,
} from "react-aria-components";
import {useMediaQuery} from "usehooks-ts";

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
interface DropdownRootProps
  extends ComponentPropsWithRef<typeof MenuTriggerPrimitive>, DropdownVariants {
  className?: string;
}

const DropdownRoot = ({children, ...props}: DropdownRootProps) => {
  const slots = React.useMemo(() => dropdownVariants(), []);

  return (
    <DropdownContext value={{slots}}>
      <MenuTriggerPrimitive {...props}>{children}</MenuTriggerPrimitive>
    </DropdownContext>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Dropdown Trigger (Button wrapper)
 * -----------------------------------------------------------------------------------------------*/
interface DropdownTriggerProps extends ComponentPropsWithRef<typeof Button> {}

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
interface DropdownPopoverProps
  extends Omit<ComponentPropsWithRef<typeof PopoverPrimitive>, "children">, DropdownVariants {
  children: React.ReactNode;
}

const DropdownPopover = ({children, className, placement, ...props}: DropdownPopoverProps) => {
  const {slots} = useContext(DropdownContext);

  const isMobile = useMediaQuery("(max-width: 767px)");

  return (
    <SurfaceContext
      value={{
        variant: "default" as SurfaceVariants["variant"],
      }}
    >
      <PopoverPrimitive
        {...props}
        className={composeTwRenderProps(className, slots?.popover())}
        placement={placement ?? (isMobile ? "bottom" : undefined)}
      >
        {children}
      </PopoverPrimitive>
    </SurfaceContext>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Dropdown Menu (Menu wrapper)
 * -----------------------------------------------------------------------------------------------*/
interface DropdownMenuProps<T extends object>
  extends ComponentPropsWithRef<typeof MenuPrimitive<T>>, DropdownVariants {
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
interface DropdownItemProps extends ComponentPropsWithRef<typeof MenuItemRoot> {}

const DropdownItem = (props: DropdownItemProps) => {
  return <MenuItemRoot {...props} />;
};

/* -------------------------------------------------------------------------------------------------
 * Dropdown Submenu Indicator (MenuItemSubmenuIndicator wrapper)
 * -----------------------------------------------------------------------------------------------*/
interface DropdownSubmenuIndicatorProps extends ComponentPropsWithRef<
  typeof MenuItemSubmenuIndicator
> {}

const DropdownSubmenuIndicator = (props: DropdownSubmenuIndicatorProps) => {
  return <MenuItemSubmenuIndicator {...props} />;
};

/* -------------------------------------------------------------------------------------------------
 * Dropdown Submenu Trigger
 * -----------------------------------------------------------------------------------------------*/
interface DropdownSubmenuTriggerProps extends ComponentPropsWithRef<
  typeof SubmenuTriggerPrimitive
> {}

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
interface DropdownItemIndicatorProps extends ComponentPropsWithRef<typeof MenuItemIndicator> {}

const DropdownItemIndicator = (props: DropdownItemIndicatorProps) => {
  return <MenuItemIndicator {...props} />;
};

/* -------------------------------------------------------------------------------------------------
 * Dropdown Section (MenuSection wrapper)
 * -----------------------------------------------------------------------------------------------*/
interface DropdownSectionProps extends ComponentPropsWithRef<typeof MenuSectionRoot> {}

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
