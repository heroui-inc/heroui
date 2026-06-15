"use client";

import type {DOMRenderProps} from "../../utils/dom";
import type {SurfaceVariants} from "../surface";
import type {DateRangePickerVariants} from "@heroui/styles";
import type {ComponentPropsWithRef, ReactNode} from "react";
import type {DateValue} from "react-aria-components/Calendar";

import {dateRangePickerVariants} from "@heroui/styles";
import {mergeRefs} from "@react-aria/utils";
import React, {
  createContext,
  forwardRef,
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {Button as ButtonPrimitive} from "react-aria-components/Button";
import {
  DateRangePicker as DateRangePickerPrimitive,
  Popover as PopoverPrimitive,
} from "react-aria-components/DateRangePicker";

import {dataAttr} from "../../utils/assertion";
import {composeTwRenderProps} from "../../utils/compose";
import {dom} from "../../utils/dom";
import {IconCalendar} from "../icons";
import {SurfaceContext} from "../surface";

/* -------------------------------------------------------------------------------------------------
 * DateRangePicker Context
 * -----------------------------------------------------------------------------------------------*/
type DateRangePickerContext = {
  popoverClassName?: string;
  rangeSeparatorClassName?: string;
  triggerClassName?: string;
  triggerIndicatorClassName?: string;
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

function DateRangePickerRootInner<T extends DateValue>({
  children,
  className,
  onOpenChange,
  ...props
}: DateRangePickerRootProps<T>) {
  const slots = useMemo(() => dateRangePickerVariants(), []);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const shouldRestoreFocusToTriggerRef = useRef(false);
  const contextValue = useMemo<DateRangePickerContext>(
    () => ({
      popoverClassName: slots.popover(),
      rangeSeparatorClassName: slots.rangeSeparator(),
      triggerClassName: slots.trigger(),
      triggerIndicatorClassName: slots.triggerIndicator(),
      triggerRef,
    }),
    [slots],
  );
  const baseClassName = useMemo(() => slots.base(), [slots]);

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
    <DateRangePickerContext value={contextValue}>
      <DateRangePickerPrimitive
        data-required={dataAttr(props.isRequired)}
        data-slot="date-range-picker"
        {...props}
        className={composeTwRenderProps(className, baseClassName)}
        onOpenChange={handleOpenChange}
      >
        {typeof children === "function" ? (values) => children(values) : children}
      </DateRangePickerPrimitive>
    </DateRangePickerContext>
  );
}

DateRangePickerRootInner.displayName = "HeroUI.DateRangePicker";

const DateRangePickerRoot = memo(DateRangePickerRootInner) as <T extends DateValue>(
  props: DateRangePickerRootProps<T>,
) => React.JSX.Element;

/* -------------------------------------------------------------------------------------------------
 * DateRangePicker Trigger
 * -----------------------------------------------------------------------------------------------*/
interface DateRangePickerTriggerProps extends ComponentPropsWithRef<typeof ButtonPrimitive> {}

const DateRangePickerTrigger = memo(
  forwardRef<HTMLButtonElement, DateRangePickerTriggerProps>(function DateRangePickerTrigger(
    {children, className, ...props},
    ref,
  ) {
    const {triggerClassName, triggerRef} = useContext(DateRangePickerContext);
    const resolvedClassName = useMemo(
      () => composeTwRenderProps(className, triggerClassName),
      [className, triggerClassName],
    );

    const contextRefCallback = useCallback(
      (node: HTMLButtonElement | null) => {
        triggerRef.current = node;
      },
      [triggerRef],
    );
    const mergedRef = mergeRefs(contextRefCallback, ref);

    return (
      <ButtonPrimitive
        ref={mergedRef}
        className={resolvedClassName}
        data-slot="date-range-picker-trigger"
        {...props}
      >
        {typeof children === "function" ? (values) => children(values) : children}
      </ButtonPrimitive>
    );
  }),
);

DateRangePickerTrigger.displayName = "HeroUI.DateRangePicker.Trigger";

/* -------------------------------------------------------------------------------------------------
 * DateRangePicker Trigger Indicator
 * -----------------------------------------------------------------------------------------------*/
interface DateRangePickerTriggerIndicatorProps<
  E extends keyof React.JSX.IntrinsicElements = "span",
> extends DOMRenderProps<E, undefined> {
  children?: React.ReactNode;
  className?: string;
}

function DateRangePickerTriggerIndicatorInner<
  E extends keyof React.JSX.IntrinsicElements = "span",
>({
  children,
  className,
  ...props
}: DateRangePickerTriggerIndicatorProps<E> &
  Omit<React.JSX.IntrinsicElements[E], keyof DateRangePickerTriggerIndicatorProps<E>>) {
  const {triggerIndicatorClassName} = useContext(DateRangePickerContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, triggerIndicatorClassName) as string,
    [className, triggerIndicatorClassName],
  );

  return (
    <dom.span
      aria-hidden="true"
      className={resolvedClassName}
      data-slot="date-range-picker-trigger-indicator"
      {...(props as any)}
    >
      {children || <IconCalendar />}
    </dom.span>
  );
}

DateRangePickerTriggerIndicatorInner.displayName = "HeroUI.DateRangePicker.TriggerIndicator";

const DateRangePickerTriggerIndicator = memo(DateRangePickerTriggerIndicatorInner) as <
  E extends keyof React.JSX.IntrinsicElements = "span",
>(
  props: DateRangePickerTriggerIndicatorProps<E> &
    Omit<React.JSX.IntrinsicElements[E], keyof DateRangePickerTriggerIndicatorProps<E>>,
) => React.JSX.Element;

/* -------------------------------------------------------------------------------------------------
 * DateRangePicker Range Separator
 * -----------------------------------------------------------------------------------------------*/
interface DateRangePickerRangeSeparatorProps<
  E extends keyof React.JSX.IntrinsicElements = "span",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

function DateRangePickerRangeSeparatorInner<E extends keyof React.JSX.IntrinsicElements = "span">({
  children = " - ",
  className,
  ...props
}: DateRangePickerRangeSeparatorProps<E> &
  Omit<React.JSX.IntrinsicElements[E], keyof DateRangePickerRangeSeparatorProps<E>>) {
  const {rangeSeparatorClassName} = useContext(DateRangePickerContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, rangeSeparatorClassName) as string,
    [className, rangeSeparatorClassName],
  );

  return (
    <dom.span
      aria-hidden="true"
      className={resolvedClassName}
      data-slot="date-range-picker-range-separator"
      {...(props as any)}
    >
      {children}
    </dom.span>
  );
}

DateRangePickerRangeSeparatorInner.displayName = "HeroUI.DateRangePicker.RangeSeparator";

const DateRangePickerRangeSeparator = memo(DateRangePickerRangeSeparatorInner) as <
  E extends keyof React.JSX.IntrinsicElements = "span",
>(
  props: DateRangePickerRangeSeparatorProps<E> &
    Omit<React.JSX.IntrinsicElements[E], keyof DateRangePickerRangeSeparatorProps<E>>,
) => React.JSX.Element;

/* -------------------------------------------------------------------------------------------------
 * DateRangePicker Popover
 * -----------------------------------------------------------------------------------------------*/
interface DateRangePickerPopoverProps extends Omit<
  ComponentPropsWithRef<typeof PopoverPrimitive>,
  "children"
> {
  children: React.ReactNode;
}

const DateRangePickerPopover = memo(function DateRangePickerPopover({
  children,
  className,
  placement = "bottom",
  ...props
}: DateRangePickerPopoverProps) {
  const {popoverClassName} = useContext(DateRangePickerContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, popoverClassName),
    [className, popoverClassName],
  );

  return (
    <SurfaceContext
      value={{
        variant: "default" as SurfaceVariants["variant"],
      }}
    >
      <PopoverPrimitive
        {...props}
        className={resolvedClassName}
        data-slot="date-range-picker-popover"
        placement={placement}
      >
        {children}
      </PopoverPrimitive>
    </SurfaceContext>
  );
});

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
