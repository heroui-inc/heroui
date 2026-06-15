"use client";

import type {Booleanish} from "../../utils/assertion";
import type {DOMRenderProps} from "../../utils/dom";
import type {SelectVariants} from "@heroui/styles";
import type {ComponentPropsWithRef} from "react";

import {selectVariants} from "@heroui/styles";
import React, {createContext, memo, useContext, useMemo} from "react";
import {Button as ButtonPrimitive} from "react-aria-components/Button";
import {Popover as PopoverPrimitive} from "react-aria-components/Popover";
import {
  Select as SelectPrimitive,
  SelectStateContext,
  SelectValue as SelectValuePrimitive,
} from "react-aria-components/Select";

import {dataAttr} from "../../utils/assertion";
import {composeSlotClassName, composeTwRenderProps} from "../../utils/compose";
import {IconChevronDown} from "../icons";
import {SurfaceContext, defaultSurfaceContextValue} from "../surface";

/* -------------------------------------------------------------------------------------------------
 * Select Context
 * -----------------------------------------------------------------------------------------------*/
type SelectContext = {
  slots?: ReturnType<typeof selectVariants>;
  triggerClassName?: string;
  valueClassName?: string;
};

const SelectContext = createContext<SelectContext>({});

/* -------------------------------------------------------------------------------------------------
 * Select Root
 * -----------------------------------------------------------------------------------------------*/
interface SelectRootProps<T extends object, M extends "single" | "multiple" = "single">
  extends ComponentPropsWithRef<typeof SelectPrimitive<T, M>>, SelectVariants {
  items?: Iterable<T, M>;
}

function SelectRootInner<T extends object = object, M extends "single" | "multiple" = "single">({
  children,
  className,
  fullWidth,
  variant,
  ...props
}: SelectRootProps<T, M>) {
  const slots = React.useMemo(() => selectVariants({fullWidth, variant}), [fullWidth, variant]);
  const contextValue = React.useMemo<SelectContext>(
    () => ({
      slots,
      triggerClassName: slots.trigger(),
      valueClassName: slots.value(),
    }),
    [slots],
  );
  const baseClassName = React.useMemo(() => slots.base(), [slots]);

  return (
    <SelectContext value={contextValue}>
      <SelectPrimitive
        data-slot="select"
        {...props}
        className={composeTwRenderProps(className, baseClassName)}
      >
        {typeof children === "function" ? (values) => children(values) : children}
      </SelectPrimitive>
    </SelectContext>
  );
}

SelectRootInner.displayName = "HeroUI.Select";

const SelectRoot = memo(SelectRootInner) as <
  T extends object = object,
  M extends "single" | "multiple" = "single",
>(
  props: SelectRootProps<T, M>,
) => React.JSX.Element;

/* -------------------------------------------------------------------------------------------------
 * Select Trigger
 * -----------------------------------------------------------------------------------------------*/
interface SelectTriggerProps extends ComponentPropsWithRef<typeof ButtonPrimitive> {}

const SelectTrigger = memo(function SelectTrigger({
  children,
  className,
  ...props
}: SelectTriggerProps) {
  const {triggerClassName} = useContext(SelectContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, triggerClassName),
    [className, triggerClassName],
  );

  return (
    <ButtonPrimitive className={resolvedClassName} data-slot="select-trigger" {...props}>
      {typeof children === "function" ? (values) => children(values) : children}
    </ButtonPrimitive>
  );
});

SelectTrigger.displayName = "HeroUI.Select.Trigger";

/* -------------------------------------------------------------------------------------------------
 * Select Value
 * -----------------------------------------------------------------------------------------------*/
interface SelectValueProps extends ComponentPropsWithRef<typeof SelectValuePrimitive> {}

const SelectValue = memo(function SelectValue({children, className, ...props}: SelectValueProps) {
  const {valueClassName} = useContext(SelectContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, valueClassName),
    [className, valueClassName],
  );

  return (
    <SelectValuePrimitive className={resolvedClassName} data-slot="select-value" {...props}>
      {children}
    </SelectValuePrimitive>
  );
});

SelectValue.displayName = "HeroUI.Select.Value";

/* -------------------------------------------------------------------------------------------------
 * Select Indicator
 * -----------------------------------------------------------------------------------------------*/
interface SelectIndicatorProps<
  E extends keyof React.JSX.IntrinsicElements = "svg",
> extends DOMRenderProps<E, undefined> {
  children?: React.ReactNode;
  className?: string;
}

const SelectIndicator = <E extends keyof React.JSX.IntrinsicElements = "svg">({
  children,
  className,
  ...props
}: SelectIndicatorProps<E> &
  Omit<React.JSX.IntrinsicElements[E], keyof SelectIndicatorProps<E>>) => {
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
        ...(props as any),
        className: composeSlotClassName(slots?.indicator, className),
        "data-slot": "select-indicator",
        "data-open": dataAttr(state?.isOpen),
      },
    );
  }

  return (
    <IconChevronDown
      className={composeSlotClassName(slots?.indicator, className)}
      data-open={dataAttr(state?.isOpen)}
      data-slot="select-default-indicator"
      {...(props as any)}
    />
  );
};

/* -------------------------------------------------------------------------------------------------
 * Select Popover
 * -----------------------------------------------------------------------------------------------*/
interface SelectPopoverProps extends Omit<
  ComponentPropsWithRef<typeof PopoverPrimitive>,
  "children"
> {
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
    <SurfaceContext value={defaultSurfaceContextValue}>
      <PopoverPrimitive
        {...props}
        className={composeTwRenderProps(className, slots?.popover())}
        data-slot="select-popover"
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
