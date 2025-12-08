"use client";

import type {SelectVariants} from "./select.styles";
import type {Booleanish} from "../../utils/assertion";
import type {SurfaceVariants} from "../surface";
import type {ComponentPropsWithRef} from "react";

import React, {createContext, useContext} from "react";
import {
  Button as ButtonPrimitive,
  Popover as PopoverPrimitive,
  Select as SelectPrimitive,
  SelectStateContext,
  SelectValue as SelectValuePrimitive,
} from "react-aria-components";

import {dataAttr} from "../../utils/assertion";
import {composeTwRenderProps} from "../../utils/compose";
import {IconChevronDown} from "../icons";
import {SurfaceContext} from "../surface";

import {selectVariants} from "./select.styles";

/* -------------------------------------------------------------------------------------------------
 * Select Context
 * -----------------------------------------------------------------------------------------------*/
type SelectContext = {
  slots?: ReturnType<typeof selectVariants>;
};

const SelectContext = createContext<SelectContext>({});

/* -------------------------------------------------------------------------------------------------
 * Select Root
 * -----------------------------------------------------------------------------------------------*/
interface SelectRootProps<T extends object, M extends "single" | "multiple" = "single">
  extends ComponentPropsWithRef<typeof SelectPrimitive<T, M>>,
    SelectVariants {
  items?: Iterable<T, M>;
}

const SelectRoot = <T extends object = object, M extends "single" | "multiple" = "single">({
  children,
  className,
  isOnSurface,
  ...props
}: SelectRootProps<T, M>) => {
  const surfaceContext = useContext(SurfaceContext);
  const isOnSurfaceValue = isOnSurface ?? (surfaceContext.variant !== undefined ? true : false);
  const slots = React.useMemo(
    () => selectVariants({isOnSurface: isOnSurfaceValue}),
    [isOnSurfaceValue],
  );

  return (
    <SelectContext value={{slots}}>
      <SelectPrimitive
        data-slot="select"
        {...props}
        className={composeTwRenderProps(className, slots?.base())}
      >
        {(values) => <>{typeof children === "function" ? children(values) : children}</>}
      </SelectPrimitive>
    </SelectContext>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Select Trigger
 * -----------------------------------------------------------------------------------------------*/
interface SelectTriggerProps extends ComponentPropsWithRef<typeof ButtonPrimitive> {}

const SelectTrigger = ({children, className, ...props}: SelectTriggerProps) => {
  const {slots} = useContext(SelectContext);

  return (
    <ButtonPrimitive
      className={composeTwRenderProps(className, slots?.trigger())}
      data-slot="select-trigger"
      {...props}
    >
      {(values) => <>{typeof children === "function" ? children(values) : children}</>}
    </ButtonPrimitive>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Select Value
 * -----------------------------------------------------------------------------------------------*/
interface SelectValueProps extends ComponentPropsWithRef<typeof SelectValuePrimitive> {}

const SelectValue = ({children, className, ...props}: SelectValueProps) => {
  const {slots} = useContext(SelectContext);

  return (
    <SelectValuePrimitive
      className={composeTwRenderProps(className, slots?.value())}
      data-slot="select-value"
      {...props}
    >
      {children}
    </SelectValuePrimitive>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Select Indicator
 * -----------------------------------------------------------------------------------------------*/
interface SelectIndicatorProps extends ComponentPropsWithRef<"svg"> {
  className?: string;
}

const SelectIndicator = ({children, className, ...props}: SelectIndicatorProps) => {
  const {slots} = useContext(SelectContext);
  const state = useContext(SelectStateContext);

  if (children && React.isValidElement(children)) {
    return React.cloneElement(
      children as React.ReactElement<{
        className?: string;
        "data-slot"?: "select-indicator";
        "data-open"?: Booleanish;
      }>,
      {
        ...props,
        className: slots?.indicator({className}),
        "data-slot": "select-indicator",
        "data-open": dataAttr(state?.isOpen),
      },
    );
  }

  return (
    <IconChevronDown
      className={slots?.indicator({className})}
      data-open={dataAttr(state?.isOpen)}
      data-slot="select-default-indicator"
      {...props}
    />
  );
};

/* -------------------------------------------------------------------------------------------------
 * Select Popover
 * -----------------------------------------------------------------------------------------------*/
interface SelectPopoverProps
  extends Omit<ComponentPropsWithRef<typeof PopoverPrimitive>, "children"> {
  children: React.ReactNode;
}

const SelectPopover = ({
  children,
  className,
  placement = "bottom",
  ...props
}: SelectPopoverProps) => {
  const {slots} = useContext(SelectContext);

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
export {SelectRoot, SelectTrigger, SelectValue, SelectIndicator, SelectPopover};

export type {
  SelectRootProps,
  SelectTriggerProps,
  SelectValueProps,
  SelectIndicatorProps,
  SelectPopoverProps,
};
