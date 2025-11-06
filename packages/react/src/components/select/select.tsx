"use client";

import type {SelectVariants} from "./select.styles";
import type {Booleanish} from "../../utils/assertion";
import type {ButtonProps, SelectProps as SelectPrimitiveProps} from "react-aria-components";

import React, {createContext, useContext} from "react";
import {
  Button,
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
  extends SelectPrimitiveProps<T, M>,
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
    <SelectContext.Provider value={{slots}}>
      <SelectPrimitive
        data-slot="select"
        {...props}
        className={composeTwRenderProps(className, slots?.base())}
      >
        {(values) => <>{typeof children === "function" ? children(values) : children}</>}
      </SelectPrimitive>
    </SelectContext.Provider>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Select Trigger
 * -----------------------------------------------------------------------------------------------*/
interface SelectTriggerProps extends ButtonProps {}

const SelectTrigger = ({children, className, ...props}: SelectTriggerProps) => {
  const {slots} = useContext(SelectContext);

  return (
    <Button
      className={composeTwRenderProps(className, slots?.trigger())}
      data-slot="select-trigger"
      {...props}
    >
      {(values) => <>{typeof children === "function" ? children(values) : children}</>}
    </Button>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Select Value
 * -----------------------------------------------------------------------------------------------*/
interface SelectValueProps extends React.ComponentProps<typeof SelectValuePrimitive> {}

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
interface SelectIndicatorProps extends React.ComponentProps<"svg"> {
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
 * Select Content
 * -----------------------------------------------------------------------------------------------*/
interface SelectContentProps
  extends Omit<React.ComponentProps<typeof PopoverPrimitive>, "children"> {
  children: React.ReactNode;
}

const SelectContent = ({
  children,
  className,
  placement = "bottom",
  ...props
}: SelectContentProps) => {
  const {slots} = useContext(SelectContext);

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
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {SelectRoot, SelectTrigger, SelectValue, SelectIndicator, SelectContent};

export type {
  SelectRootProps,
  SelectTriggerProps,
  SelectValueProps,
  SelectIndicatorProps,
  SelectContentProps,
};
