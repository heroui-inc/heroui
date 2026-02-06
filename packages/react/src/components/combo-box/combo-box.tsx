"use client";

import type {SurfaceVariants} from "../surface";
import type {ComboBoxVariants} from "@heroui/styles";
import type {ComponentPropsWithRef, ReactNode} from "react";
import type {ButtonProps} from "react-aria-components";

import {comboBoxVariants} from "@heroui/styles";
import React, {createContext, useContext} from "react";
import {
  Button,
  ComboBox as ComboBoxPrimitive,
  ComboBoxStateContext,
  Popover as PopoverPrimitive,
} from "react-aria-components";

import {dataAttr} from "../../utils/assertion";
import {composeSlotClassName, composeTwRenderProps} from "../../utils/compose";
import {IconChevronDown} from "../icons";
import {SurfaceContext} from "../surface";

/* -------------------------------------------------------------------------------------------------
 * ComboBox Context
 * -----------------------------------------------------------------------------------------------*/
type ComboBoxContext = {
  slots?: ReturnType<typeof comboBoxVariants>;
};

const ComboBoxContext = createContext<ComboBoxContext>({});

/* -------------------------------------------------------------------------------------------------
 * ComboBox Root
 * -----------------------------------------------------------------------------------------------*/
interface ComboBoxRootProps<T extends object>
  extends ComponentPropsWithRef<typeof ComboBoxPrimitive<T>>, ComboBoxVariants {
  items?: Iterable<T>;
}

const ComboBoxRoot = <T extends object = object>({
  children,
  className,
  fullWidth,
  menuTrigger = "focus",
  ...props
}: ComboBoxRootProps<T>) => {
  const slots = React.useMemo(() => comboBoxVariants({fullWidth}), [fullWidth]);

  return (
    <ComboBoxContext value={{slots}}>
      <ComboBoxPrimitive
        data-slot="combo-box"
        menuTrigger={menuTrigger}
        {...props}
        className={composeTwRenderProps(className, slots?.base())}
      >
        {(values) => <>{typeof children === "function" ? children(values) : children}</>}
      </ComboBoxPrimitive>
    </ComboBoxContext>
  );
};

/* -------------------------------------------------------------------------------------------------
 * ComboBox InputGroup
 * -----------------------------------------------------------------------------------------------*/
interface ComboBoxInputGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

const ComboBoxInputGroup = ({children, className, ...props}: ComboBoxInputGroupProps) => {
  const {slots} = useContext(ComboBoxContext);
  const inputGroupClassName = composeSlotClassName(slots?.inputGroup, className);

  return (
    <div className={inputGroupClassName} data-slot="combo-box-input-group" {...props}>
      {children}
    </div>
  );
};

/* -------------------------------------------------------------------------------------------------
 * ComboBox Trigger
 * -----------------------------------------------------------------------------------------------*/
interface ComboBoxTriggerProps extends ButtonProps {
  className?: string;
  children?: ReactNode;
}

const ComboBoxTrigger = ({children, className, ...rest}: ComboBoxTriggerProps) => {
  const {slots} = useContext(ComboBoxContext);
  const state = useContext(ComboBoxStateContext);

  return (
    <Button
      className={composeTwRenderProps(className, slots?.trigger())}
      data-open={dataAttr(state?.isOpen)}
      data-slot="combo-box-trigger"
      {...rest}
    >
      {children ?? <IconChevronDown data-slot="combo-box-trigger-default-icon" />}
    </Button>
  );
};

/* -------------------------------------------------------------------------------------------------
 * ComboBox Popover
 * -----------------------------------------------------------------------------------------------*/
interface ComboBoxPopoverProps extends Omit<
  ComponentPropsWithRef<typeof PopoverPrimitive>,
  "children"
> {
  children: React.ReactNode;
}

const ComboBoxPopover = ({
  children,
  className,
  placement = "bottom",
  ...props
}: ComboBoxPopoverProps) => {
  const {slots} = useContext(ComboBoxContext);

  return (
    <SurfaceContext
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
    </SurfaceContext>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {ComboBoxRoot, ComboBoxInputGroup, ComboBoxTrigger, ComboBoxPopover};

export type {
  ComboBoxRootProps,
  ComboBoxInputGroupProps,
  ComboBoxTriggerProps,
  ComboBoxPopoverProps,
};
