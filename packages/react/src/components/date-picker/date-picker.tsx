"use client";

import type {SurfaceVariants} from "../surface";
import type {DatePickerVariants} from "@heroui/styles";
import type {ComponentPropsWithRef} from "react";
import type {DateValue} from "react-aria-components";

import {datePickerVariants} from "@heroui/styles";
import React, {createContext, useContext} from "react";
import {
  Button as ButtonPrimitive,
  DatePicker as DatePickerPrimitive,
  Popover as PopoverPrimitive,
} from "react-aria-components";

import {composeSlotClassName, composeTwRenderProps} from "../../utils/compose";
import {IconCalendar} from "../icons";
import {SurfaceContext} from "../surface";

/* -------------------------------------------------------------------------------------------------
 * DatePicker Context
 * -----------------------------------------------------------------------------------------------*/
type DatePickerContext = {
  slots?: ReturnType<typeof datePickerVariants>;
};

const DatePickerContext = createContext<DatePickerContext>({});

/* -------------------------------------------------------------------------------------------------
 * DatePicker Root
 * -----------------------------------------------------------------------------------------------*/
interface DatePickerRootProps<T extends DateValue>
  extends ComponentPropsWithRef<typeof DatePickerPrimitive<T>>, DatePickerVariants {}

const DatePickerRoot = <T extends DateValue>({
  children,
  className,
  ...props
}: DatePickerRootProps<T>) => {
  const slots = React.useMemo(() => datePickerVariants(), []);

  return (
    <DatePickerContext value={{slots}}>
      <DatePickerPrimitive
        data-slot="date-picker"
        {...props}
        className={composeTwRenderProps(className, slots?.base())}
      >
        {(values) => <>{typeof children === "function" ? children(values) : children}</>}
      </DatePickerPrimitive>
    </DatePickerContext>
  );
};

DatePickerRoot.displayName = "HeroUI.DatePicker";

/* -------------------------------------------------------------------------------------------------
 * DatePicker Trigger
 * -----------------------------------------------------------------------------------------------*/
interface DatePickerTriggerProps extends ComponentPropsWithRef<typeof ButtonPrimitive> {}

const DatePickerTrigger = ({children, className, ...props}: DatePickerTriggerProps) => {
  const {slots} = useContext(DatePickerContext);

  return (
    <ButtonPrimitive
      className={composeTwRenderProps(className, slots?.trigger())}
      data-slot="date-picker-trigger"
      {...props}
    >
      {(values) => <>{typeof children === "function" ? children(values) : children}</>}
    </ButtonPrimitive>
  );
};

DatePickerTrigger.displayName = "HeroUI.DatePicker.Trigger";

/* -------------------------------------------------------------------------------------------------
 * DatePicker Trigger Indicator
 * -----------------------------------------------------------------------------------------------*/
interface DatePickerTriggerIndicatorProps extends Omit<ComponentPropsWithRef<"span">, "children"> {
  children?: React.ReactNode;
}

const DatePickerTriggerIndicator = ({
  children,
  className,
  ...props
}: DatePickerTriggerIndicatorProps) => {
  const {slots} = useContext(DatePickerContext);

  return (
    <span
      aria-hidden="true"
      className={composeSlotClassName(slots?.triggerIndicator, className)}
      data-slot="date-picker-trigger-indicator"
      {...props}
    >
      {children || <IconCalendar />}
    </span>
  );
};

DatePickerTriggerIndicator.displayName = "HeroUI.DatePicker.TriggerIndicator";

/* -------------------------------------------------------------------------------------------------
 * DatePicker Popover
 * -----------------------------------------------------------------------------------------------*/
interface DatePickerPopoverProps extends Omit<
  ComponentPropsWithRef<typeof PopoverPrimitive>,
  "children"
> {
  children: React.ReactNode;
}

const DatePickerPopover = ({
  children,
  className,
  placement = "bottom start",
  ...props
}: DatePickerPopoverProps) => {
  const {slots} = useContext(DatePickerContext);

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

DatePickerPopover.displayName = "HeroUI.DatePicker.Popover";

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {DatePickerRoot, DatePickerTrigger, DatePickerTriggerIndicator, DatePickerPopover};

export type {
  DatePickerRootProps,
  DatePickerTriggerProps,
  DatePickerTriggerIndicatorProps,
  DatePickerPopoverProps,
};
