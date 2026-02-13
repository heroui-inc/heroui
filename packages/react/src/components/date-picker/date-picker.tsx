"use client";

import type {SurfaceVariants} from "../surface";
import type {DatePickerVariants} from "@heroui/styles";
import type {ComponentPropsWithRef} from "react";
import type {DateValue} from "react-aria-components";

import {datePickerVariants} from "@heroui/styles";
import {mergeRefs} from "@react-aria/utils";
import React, {createContext, useContext, useEffect, useRef} from "react";
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

const DatePickerRoot = <T extends DateValue>({
  children,
  className,
  onOpenChange,
  ...props
}: DatePickerRootProps<T>) => {
  const slots = React.useMemo(() => datePickerVariants(), []);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const isOpenRef = useRef(false);
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

  const handleOpenChange = (isOpen: boolean) => {
    setIsOpen(isOpen);
    isOpenRef.current = isOpen;

    if (!isOpen && shouldRestoreFocusToTriggerRef.current) {
      window.requestAnimationFrame(() => {
        triggerRef.current?.focus();
      });
    }

    shouldRestoreFocusToTriggerRef.current = false;
    onOpenChange?.(isOpen);
  };

  return (
    <DatePickerContext value={{slots, triggerRef}}>
      <DatePickerPrimitive
        data-slot="date-picker"
        {...props}
        className={composeTwRenderProps(className, slots?.base())}
        onOpenChange={handleOpenChange}
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

const DatePickerTrigger = React.forwardRef<HTMLButtonElement, DatePickerTriggerProps>(
  ({children, className, ...props}, ref) => {
    const {slots, triggerRef} = useContext(DatePickerContext);

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
        data-slot="date-picker-trigger"
        {...props}
      >
        {(values) => <>{typeof children === "function" ? children(values) : children}</>}
      </ButtonPrimitive>
    );
  },
);

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
  placement = "bottom",
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
