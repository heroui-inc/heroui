"use client";

import type {DOMRenderProps} from "../../utils/dom";
import type {SurfaceVariants} from "../surface";
import type {DatePickerVariants} from "@heroui/styles";
import type {ComponentPropsWithRef} from "react";
import type {DateValue} from "react-aria-components/Calendar";

import {datePickerVariants} from "@heroui/styles";
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
  DatePicker as DatePickerPrimitive,
  Popover as PopoverPrimitive,
} from "react-aria-components/DatePicker";

import {dataAttr} from "../../utils/assertion";
import {composeTwRenderProps} from "../../utils/compose";
import {dom} from "../../utils/dom";
import {IconCalendar} from "../icons";
import {SurfaceContext} from "../surface";

/* -------------------------------------------------------------------------------------------------
 * DatePicker Context
 * -----------------------------------------------------------------------------------------------*/
type DatePickerContext = {
  popoverClassName?: string;
  triggerClassName?: string;
  triggerIndicatorClassName?: string;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
};

const DatePickerContext = createContext<DatePickerContext>({
  triggerRef: {current: null},
});

/* -------------------------------------------------------------------------------------------------
 * DatePicker Root
 * -----------------------------------------------------------------------------------------------*/
interface DatePickerRootProps<T extends DateValue>
  extends ComponentPropsWithRef<typeof DatePickerPrimitive<T>>, DatePickerVariants {}

function DatePickerRootInner<T extends DateValue>({
  children,
  className,
  onOpenChange,
  ...props
}: DatePickerRootProps<T>) {
  const slots = useMemo(() => datePickerVariants(), []);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const shouldRestoreFocusToTriggerRef = useRef(false);
  const contextValue = useMemo<DatePickerContext>(
    () => ({
      popoverClassName: slots.popover(),
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
    <DatePickerContext value={contextValue}>
      <DatePickerPrimitive
        data-required={dataAttr(props.isRequired)}
        data-slot="date-picker"
        {...props}
        className={composeTwRenderProps(className, baseClassName)}
        onOpenChange={handleOpenChange}
      >
        {typeof children === "function" ? (values) => children(values) : children}
      </DatePickerPrimitive>
    </DatePickerContext>
  );
}

DatePickerRootInner.displayName = "HeroUI.DatePicker";

const DatePickerRoot = memo(DatePickerRootInner) as <T extends DateValue>(
  props: DatePickerRootProps<T>,
) => React.JSX.Element;

/* -------------------------------------------------------------------------------------------------
 * DatePicker Trigger
 * -----------------------------------------------------------------------------------------------*/
interface DatePickerTriggerProps extends ComponentPropsWithRef<typeof ButtonPrimitive> {}

const DatePickerTrigger = memo(
  forwardRef<HTMLButtonElement, DatePickerTriggerProps>(function DatePickerTrigger(
    {children, className, ...props},
    ref,
  ) {
    const {triggerClassName, triggerRef} = useContext(DatePickerContext);
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
        data-slot="date-picker-trigger"
        {...props}
      >
        {typeof children === "function" ? (values) => children(values) : children}
      </ButtonPrimitive>
    );
  }),
);

DatePickerTrigger.displayName = "HeroUI.DatePicker.Trigger";

/* -------------------------------------------------------------------------------------------------
 * DatePicker Trigger Indicator
 * -----------------------------------------------------------------------------------------------*/
interface DatePickerTriggerIndicatorProps<
  E extends keyof React.JSX.IntrinsicElements = "span",
> extends DOMRenderProps<E, undefined> {
  children?: React.ReactNode;
  className?: string;
}

function DatePickerTriggerIndicatorInner<E extends keyof React.JSX.IntrinsicElements = "span">({
  children,
  className,
  ...props
}: DatePickerTriggerIndicatorProps<E> &
  Omit<React.JSX.IntrinsicElements[E], keyof DatePickerTriggerIndicatorProps<E>>) {
  const {triggerIndicatorClassName} = useContext(DatePickerContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, triggerIndicatorClassName) as string,
    [className, triggerIndicatorClassName],
  );

  return (
    <dom.span
      aria-hidden="true"
      className={resolvedClassName}
      data-slot="date-picker-trigger-indicator"
      {...(props as any)}
    >
      {children || <IconCalendar />}
    </dom.span>
  );
}

DatePickerTriggerIndicatorInner.displayName = "HeroUI.DatePicker.TriggerIndicator";

const DatePickerTriggerIndicator = memo(DatePickerTriggerIndicatorInner) as <
  E extends keyof React.JSX.IntrinsicElements = "span",
>(
  props: DatePickerTriggerIndicatorProps<E> &
    Omit<React.JSX.IntrinsicElements[E], keyof DatePickerTriggerIndicatorProps<E>>,
) => React.JSX.Element;

/* -------------------------------------------------------------------------------------------------
 * DatePicker Popover
 * -----------------------------------------------------------------------------------------------*/
interface DatePickerPopoverProps extends Omit<
  ComponentPropsWithRef<typeof PopoverPrimitive>,
  "children"
> {
  children: React.ReactNode;
}

const DatePickerPopover = memo(function DatePickerPopover({
  children,
  className,
  placement = "bottom",
  ...props
}: DatePickerPopoverProps) {
  const {popoverClassName} = useContext(DatePickerContext);
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
        data-slot="date-picker-popover"
        placement={placement}
      >
        {children}
      </PopoverPrimitive>
    </SurfaceContext>
  );
});

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
