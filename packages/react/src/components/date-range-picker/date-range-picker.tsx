"use client";

import type {SurfaceVariants} from "../surface";
import type {DateRangePickerVariants} from "@heroui/styles";
import type {ComponentPropsWithRef} from "react";
import type {DateValue} from "react-aria-components";

import {dateRangePickerVariants} from "@heroui/styles";
import {mergeRefs} from "@react-aria/utils";
import React, {createContext, useContext, useEffect, useRef} from "react";
import {
  Button as ButtonPrimitive,
  DateRangePicker as DateRangePickerPrimitive,
  Popover as PopoverPrimitive,
} from "react-aria-components";

import {dataAttr} from "../../utils/assertion";
import {composeSlotClassName, composeTwRenderProps} from "../../utils/compose";
import {IconCalendar} from "../icons";
import {SurfaceContext} from "../surface";

/* -------------------------------------------------------------------------------------------------
 * DateRangePicker Context
 * -----------------------------------------------------------------------------------------------*/
type DateRangePickerContext = {
  slots?: ReturnType<typeof dateRangePickerVariants>;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
};

const DateRangePickerContext = createContext<DateRangePickerContext>({
  triggerRef: {current: null},
});

/* -------------------------------------------------------------------------------------------------
 * DateRangePicker Root
 * -----------------------------------------------------------------------------------------------*/
interface DateRangePickerRootProps<T extends DateValue>
  extends ComponentPropsWithRef<typeof DateRangePickerPrimitive<T>>, DateRangePickerVariants {}

const DateRangePickerRoot = <T extends DateValue>({
  children,
  className,
  onOpenChange,
  ...props
}: DateRangePickerRootProps<T>) => {
  const slots = React.useMemo(() => dateRangePickerVariants(), []);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const shouldRestoreFocusToTriggerRef = useRef(false);

  useEffect(() => {
    if (!isOpen) return;

    const handleGlobalKeyDown = (event: KeyboardEvent) => {
      if (!event.metaKey && !event.ctrlKey && !event.altKey) {
        shouldRestoreFocusToTriggerRef.current = true;
      }
    };

    window.addEventListener("keydown", handleGlobalKeyDown, true);

    return () => {
      window.removeEventListener("keydown", handleGlobalKeyDown, true);
    };
  }, [isOpen]);

  const handleOpenChange = (nextIsOpen: boolean) => {
    setIsOpen(nextIsOpen);

    if (!nextIsOpen && shouldRestoreFocusToTriggerRef.current) {
      window.requestAnimationFrame(() => {
        triggerRef.current?.focus();
      });
    }

    shouldRestoreFocusToTriggerRef.current = false;
    onOpenChange?.(nextIsOpen);
  };

  return (
    <DateRangePickerContext value={{slots, triggerRef}}>
      <DateRangePickerPrimitive
        data-required={dataAttr(props.isRequired)}
        data-slot="date-range-picker"
        {...props}
        className={composeTwRenderProps(className, slots?.base())}
        onOpenChange={handleOpenChange}
      >
        {(values) => <>{typeof children === "function" ? children(values) : children}</>}
      </DateRangePickerPrimitive>
    </DateRangePickerContext>
  );
};

DateRangePickerRoot.displayName = "HeroUI.DateRangePicker";

/* -------------------------------------------------------------------------------------------------
 * DateRangePicker Trigger
 * -----------------------------------------------------------------------------------------------*/
interface DateRangePickerTriggerProps extends ComponentPropsWithRef<typeof ButtonPrimitive> {}

const DateRangePickerTrigger = React.forwardRef<HTMLButtonElement, DateRangePickerTriggerProps>(
  ({children, className, ...props}, ref) => {
    const {slots, triggerRef} = useContext(DateRangePickerContext);

    const contextRefCallback = React.useCallback(
      (node: HTMLButtonElement | null) => {
        triggerRef.current = node;
      },
      [triggerRef],
    );
    const mergedRef = mergeRefs(contextRefCallback, ref);

    return (
      <ButtonPrimitive
        ref={mergedRef}
        className={composeTwRenderProps(className, slots?.trigger())}
        data-slot="date-range-picker-trigger"
        {...props}
      >
        {(values) => <>{typeof children === "function" ? children(values) : children}</>}
      </ButtonPrimitive>
    );
  },
);

DateRangePickerTrigger.displayName = "HeroUI.DateRangePicker.Trigger";

/* -------------------------------------------------------------------------------------------------
 * DateRangePicker Trigger Indicator
 * -----------------------------------------------------------------------------------------------*/
interface DateRangePickerTriggerIndicatorProps extends Omit<
  ComponentPropsWithRef<"span">,
  "children"
> {
  children?: React.ReactNode;
}

const DateRangePickerTriggerIndicator = ({
  children,
  className,
  ...props
}: DateRangePickerTriggerIndicatorProps) => {
  const {slots} = useContext(DateRangePickerContext);

  return (
    <span
      aria-hidden="true"
      className={composeSlotClassName(slots?.triggerIndicator, className)}
      data-slot="date-range-picker-trigger-indicator"
      {...props}
    >
      {children || <IconCalendar />}
    </span>
  );
};

DateRangePickerTriggerIndicator.displayName = "HeroUI.DateRangePicker.TriggerIndicator";

/* -------------------------------------------------------------------------------------------------
 * DateRangePicker Range Separator
 * -----------------------------------------------------------------------------------------------*/
interface DateRangePickerRangeSeparatorProps extends ComponentPropsWithRef<"span"> {}

const DateRangePickerRangeSeparator = ({
  children = " - ",
  className,
  ...props
}: DateRangePickerRangeSeparatorProps) => {
  const {slots} = useContext(DateRangePickerContext);

  return (
    <span
      aria-hidden="true"
      className={composeSlotClassName(slots?.rangeSeparator, className)}
      data-slot="date-range-picker-range-separator"
      {...props}
    >
      {children}
    </span>
  );
};

DateRangePickerRangeSeparator.displayName = "HeroUI.DateRangePicker.RangeSeparator";

/* -------------------------------------------------------------------------------------------------
 * DateRangePicker Popover
 * -----------------------------------------------------------------------------------------------*/
interface DateRangePickerPopoverProps extends Omit<
  ComponentPropsWithRef<typeof PopoverPrimitive>,
  "children"
> {
  children: React.ReactNode;
}

const DateRangePickerPopover = ({
  children,
  className,
  placement = "bottom",
  ...props
}: DateRangePickerPopoverProps) => {
  const {slots} = useContext(DateRangePickerContext);

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

DateRangePickerPopover.displayName = "HeroUI.DateRangePicker.Popover";

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {
  DateRangePickerRoot,
  DateRangePickerTrigger,
  DateRangePickerTriggerIndicator,
  DateRangePickerRangeSeparator,
  DateRangePickerPopover,
};

export type {
  DateRangePickerRootProps,
  DateRangePickerTriggerProps,
  DateRangePickerTriggerIndicatorProps,
  DateRangePickerRangeSeparatorProps,
  DateRangePickerPopoverProps,
};
