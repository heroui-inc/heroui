"use client";

import type {Booleanish} from "../../utils/assertion";
import type {DOMRenderProps} from "../../utils/dom";
import type {SurfaceVariants} from "../surface";
import type {AutocompleteVariants} from "@heroui/styles";
import type {ComponentPropsWithRef, ReactNode, RefObject} from "react";

import {autocompleteVariants} from "@heroui/styles";
import {mergeRefs, useResizeObserver} from "@react-aria/utils";
import React, {
  createContext,
  memo,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import {Autocomplete as AutocompletePrimitive} from "react-aria-components/Autocomplete";
import {Button as ButtonPrimitive} from "react-aria-components/Button";
import {Group as GroupPrimitive} from "react-aria-components/Group";
import {Popover as PopoverPrimitive} from "react-aria-components/Popover";
import {
  Select as SelectPrimitive,
  SelectStateContext,
  SelectValue as SelectValuePrimitive,
} from "react-aria-components/Select";

import {dataAttr} from "../../utils/assertion";
import {composeTwRenderProps} from "../../utils/compose";
import {dom} from "../../utils/dom";
import {CloseIcon, IconChevronDown} from "../icons";
import {SurfaceContext} from "../surface";

/* -------------------------------------------------------------------------------------------------
 * Autocomplete Context
 * -----------------------------------------------------------------------------------------------*/
type AutocompleteContext = {
  baseClassName?: string;
  clearButtonClassName?: string;
  indicatorClassName?: string;
  onClear?: () => void;
  popoverClassName?: string;
  triggerClassName?: string;
  valueClassName?: string;
  triggerRef: RefObject<HTMLElement | null>;
  clearButtonRef: RefObject<HTMLButtonElement | null>;
  isDisabled?: boolean;
};

const AutocompleteContext = createContext<AutocompleteContext>({
  triggerRef: {current: null} as RefObject<HTMLElement | null>,
  clearButtonRef: {current: null} as RefObject<HTMLButtonElement | null>,
  isDisabled: false,
});

/* -------------------------------------------------------------------------------------------------
 * Autocomplete Root
 * -----------------------------------------------------------------------------------------------*/
interface AutocompleteRootProps<T extends object, M extends "single" | "multiple" = "single">
  extends ComponentPropsWithRef<typeof SelectPrimitive<T, M>>, AutocompleteVariants {
  items?: Iterable<T, M>;
  // Handler that is called when the clear button is pressed.
  onClear?: () => void;
}

function AutocompleteRootInner<
  T extends object = object,
  M extends "single" | "multiple" = "single",
>({
  children,
  className,
  fullWidth,
  isDisabled,
  onClear,
  variant,
  ...props
}: AutocompleteRootProps<T, M>) {
  const slots = useMemo(() => autocompleteVariants({fullWidth, variant}), [fullWidth, variant]);
  const triggerRef = useRef<HTMLElement | null>(null);
  const clearButtonRef = useRef<HTMLButtonElement | null>(null);
  const contextValue = useMemo<AutocompleteContext>(
    () => ({
      baseClassName: slots.base(),
      clearButtonClassName: slots.clearButton(),
      indicatorClassName: slots.indicator(),
      popoverClassName: slots.popover(),
      triggerClassName: slots.trigger(),
      valueClassName: slots.value(),
      triggerRef,
      clearButtonRef,
      onClear,
      isDisabled,
    }),
    [slots, onClear, isDisabled],
  );
  const baseClassName = useMemo(() => slots.base(), [slots]);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, baseClassName),
    [className, baseClassName],
  );

  return (
    <AutocompleteContext value={contextValue}>
      <SelectPrimitive
        data-slot="autocomplete"
        {...props}
        className={resolvedClassName}
        isDisabled={isDisabled}
      >
        {typeof children === "function" ? (values) => children(values) : children}
      </SelectPrimitive>
    </AutocompleteContext>
  );
}

const AutocompleteRoot = memo(AutocompleteRootInner) as typeof AutocompleteRootInner;

/* -------------------------------------------------------------------------------------------------
 * Autocomplete Trigger
 * -----------------------------------------------------------------------------------------------*/
interface AutocompleteTriggerProps extends ComponentPropsWithRef<typeof GroupPrimitive> {}

const AutocompleteTrigger = memo(
  React.forwardRef<HTMLDivElement, AutocompleteTriggerProps>(
    ({children, className, isDisabled: isDisabledProp, onClick, ...props}, ref) => {
      const {
        clearButtonRef,
        isDisabled: rootDisabled,
        triggerClassName,
        triggerRef,
      } = useContext(AutocompleteContext);
      const state = useContext(SelectStateContext);
      const isDisabled = isDisabledProp ?? rootDisabled ?? false;

      const contextRefCallback = useCallback(
        (node: HTMLDivElement | null) => {
          triggerRef.current = node;
        },
        [triggerRef],
      );

      const mergedRef = mergeRefs(contextRefCallback, ref);

      const handleClick = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
          // Don't toggle if clicking the clear button
          if (clearButtonRef.current?.contains(e.target as Node)) {
            return;
          }
          onClick?.(e);
          state?.toggle();
        },
        [clearButtonRef, onClick, state],
      );

      const resolvedClassName = useMemo(
        () => composeTwRenderProps(className, triggerClassName),
        [className, triggerClassName],
      );

      return (
        <GroupPrimitive
          ref={mergedRef}
          className={resolvedClassName}
          data-slot="autocomplete-trigger"
          isDisabled={isDisabled}
          onClick={handleClick}
          {...props}
        >
          {typeof children === "function" ? (values) => children(values) : children}
        </GroupPrimitive>
      );
    },
  ),
);

AutocompleteTrigger.displayName = "AutocompleteTrigger";

/* -------------------------------------------------------------------------------------------------
 * Autocomplete Value
 * -----------------------------------------------------------------------------------------------*/
interface AutocompleteValueProps extends ComponentPropsWithRef<typeof SelectValuePrimitive> {}

const AutocompleteValue = memo(function AutocompleteValue({
  children,
  className,
  ...props
}: AutocompleteValueProps) {
  const {valueClassName} = useContext(AutocompleteContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, valueClassName),
    [className, valueClassName],
  );

  return (
    <SelectValuePrimitive className={resolvedClassName} data-slot="autocomplete-value" {...props}>
      {children}
    </SelectValuePrimitive>
  );
});

/* -------------------------------------------------------------------------------------------------
 * Autocomplete Indicator
 * -----------------------------------------------------------------------------------------------*/
interface AutocompleteIndicatorProps<
  E extends keyof React.JSX.IntrinsicElements = "svg",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

function AutocompleteIndicatorInner<E extends keyof React.JSX.IntrinsicElements = "svg">({
  children,
  className,
  ...props
}: AutocompleteIndicatorProps<E> &
  Omit<React.JSX.IntrinsicElements[E], keyof AutocompleteIndicatorProps<E>>) {
  const {indicatorClassName} = useContext(AutocompleteContext);
  const state = useContext(SelectStateContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, indicatorClassName) as string,
    [className, indicatorClassName],
  );

  if (children && React.isValidElement(children)) {
    return React.cloneElement(
      children as React.ReactElement<{
        className?: string;
        "data-slot"?: "autocomplete-indicator";
        "data-open"?: Booleanish;
      }>,
      {
        ...(props as any),
        className: resolvedClassName,
        "data-slot": "autocomplete-indicator",
        "data-open": dataAttr(state?.isOpen),
      },
    );
  }

  return (
    <ButtonPrimitive>
      <IconChevronDown
        className={resolvedClassName}
        data-open={dataAttr(state?.isOpen)}
        data-slot="autocomplete-default-indicator"
        {...(props as any)}
      />
    </ButtonPrimitive>
  );
}

const AutocompleteIndicator = memo(AutocompleteIndicatorInner) as typeof AutocompleteIndicatorInner;

/* -------------------------------------------------------------------------------------------------
 * Autocomplete Popover
 * -----------------------------------------------------------------------------------------------*/
interface AutocompletePopoverProps extends Omit<
  ComponentPropsWithRef<typeof PopoverPrimitive>,
  "children"
> {
  children: React.ReactNode;
}

const AutocompletePopover = memo(function AutocompletePopover({
  children,
  className,
  placement = "bottom",
  style,
  ...props
}: AutocompletePopoverProps) {
  const {popoverClassName, triggerRef} = useContext(AutocompleteContext);
  const [triggerWidth, setTriggerWidth] = useState<string | null>(null);

  const onResize = useCallback(() => {
    if (triggerRef.current) {
      setTriggerWidth(triggerRef.current.offsetWidth + "px");
    }
  }, [triggerRef]);

  useResizeObserver({ref: triggerRef, onResize});

  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, popoverClassName),
    [className, popoverClassName],
  );

  const popoverStyle = useMemo(
    () =>
      ({
        "--trigger-width": triggerWidth,
        ...(typeof style === "object" && style !== null ? style : {}),
      }) as React.CSSProperties,
    [triggerWidth, style],
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
        data-slot="autocomplete-popover"
        placement={placement}
        style={popoverStyle}
        triggerRef={triggerRef}
      >
        {children}
      </PopoverPrimitive>
    </SurfaceContext>
  );
});

/* -------------------------------------------------------------------------------------------------
 * Autocomplete Filter
 * -----------------------------------------------------------------------------------------------*/
interface AutocompleteFilterProps extends ComponentPropsWithRef<typeof AutocompletePrimitive> {}

const AutocompleteFilter = memo(function AutocompleteFilter({
  children,
  ...props
}: AutocompleteFilterProps) {
  return (
    <AutocompletePrimitive data-slot="autocomplete-filter" {...props}>
      {children}
    </AutocompletePrimitive>
  );
});

/* -------------------------------------------------------------------------------------------------
 * Autocomplete Clear Button
 * -----------------------------------------------------------------------------------------------*/
interface AutocompleteClearButtonProps<
  E extends keyof React.JSX.IntrinsicElements = "button",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

function AutocompleteClearButtonInner<E extends keyof React.JSX.IntrinsicElements = "button">({
  className,
  onClick,
  ref,
  ...props
}: AutocompleteClearButtonProps<E> &
  Omit<React.JSX.IntrinsicElements[E], keyof AutocompleteClearButtonProps<E>>) {
  const {clearButtonClassName, clearButtonRef, isDisabled, onClear} =
    useContext(AutocompleteContext);
  const state = useContext(SelectStateContext);

  const clearButtonRefCallback = useCallback(
    (node: HTMLButtonElement | null) => {
      clearButtonRef.current = node;
    },
    [clearButtonRef],
  );

  const mergedRef = mergeRefs(clearButtonRefCallback, ref as any);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      state?.selectionManager.setSelectedKeys(new Set());
      onClear?.();
      onClick?.(e as any);
    },
    [onClear, onClick, state?.selectionManager],
  );

  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, clearButtonClassName) as string,
    [className, clearButtonClassName],
  );

  return (
    <dom.button
      ref={mergedRef}
      aria-label="Clear selection"
      className={resolvedClassName}
      data-empty={dataAttr(state?.selectionManager.selectedKeys.size === 0)}
      data-slot="autocomplete-clear-button"
      disabled={isDisabled ?? false}
      onClick={handleClick}
      {...(props as any)}
    >
      <CloseIcon data-slot="autocomplete-clear-button-icon" />
    </dom.button>
  );
}

const AutocompleteClearButton = memo(
  AutocompleteClearButtonInner,
) as typeof AutocompleteClearButtonInner;

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {
  AutocompleteRoot,
  AutocompleteTrigger,
  AutocompleteValue,
  AutocompleteIndicator,
  AutocompletePopover,
  AutocompleteFilter,
  AutocompleteClearButton,
};

export type {
  AutocompleteRootProps,
  AutocompleteTriggerProps,
  AutocompleteValueProps,
  AutocompleteIndicatorProps,
  AutocompletePopoverProps,
  AutocompleteFilterProps,
  AutocompleteClearButtonProps,
};
