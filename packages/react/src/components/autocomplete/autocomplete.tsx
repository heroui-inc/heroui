"use client";

import type {Booleanish} from "../../utils/assertion";
import type {SurfaceVariants} from "../surface";
import type {AutocompleteVariants} from "@heroui/styles";
import type {ComponentPropsWithRef, RefObject} from "react";

import {autocompleteVariants} from "@heroui/styles";
import {mergeRefs} from "@react-aria/utils";
import React, {createContext, useContext, useRef} from "react";
import {
  Autocomplete as AutocompletePrimitive,
  Button as ButtonPrimitive,
  Group as GroupPrimitive,
  Popover as PopoverPrimitive,
  Select as SelectPrimitive,
  SelectStateContext,
  SelectValue as SelectValuePrimitive,
} from "react-aria-components";

import {dataAttr} from "../../utils/assertion";
import {composeSlotClassName, composeTwRenderProps} from "../../utils/compose";
import {CloseIcon, IconChevronDown} from "../icons";
import {SurfaceContext} from "../surface";

/* -------------------------------------------------------------------------------------------------
 * Autocomplete Context
 * -----------------------------------------------------------------------------------------------*/
type AutocompleteContext = {
  slots?: ReturnType<typeof autocompleteVariants>;
  onClear?: () => void;
  triggerRef: RefObject<HTMLElement | null>;
  clearButtonRef: RefObject<HTMLButtonElement | null>;
};

const AutocompleteContext = createContext<AutocompleteContext>({
  triggerRef: {current: null} as RefObject<HTMLElement | null>,
  clearButtonRef: {current: null} as RefObject<HTMLButtonElement | null>,
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

const AutocompleteRoot = <T extends object = object, M extends "single" | "multiple" = "single">({
  children,
  className,
  fullWidth,
  onClear,
  variant,
  ...props
}: AutocompleteRootProps<T, M>) => {
  const slots = React.useMemo(
    () => autocompleteVariants({fullWidth, variant}),
    [fullWidth, variant],
  );
  const triggerRef = useRef<HTMLElement | null>(null);
  const clearButtonRef = useRef<HTMLButtonElement | null>(null);

  return (
    <AutocompleteContext value={{slots, triggerRef, clearButtonRef, onClear}}>
      <SelectPrimitive
        data-slot="autocomplete"
        {...props}
        className={composeTwRenderProps(className, slots?.base())}
      >
        {(values) => <>{typeof children === "function" ? children(values) : children}</>}
      </SelectPrimitive>
    </AutocompleteContext>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Autocomplete Trigger
 * -----------------------------------------------------------------------------------------------*/
interface AutocompleteTriggerProps extends ComponentPropsWithRef<typeof GroupPrimitive> {}

const AutocompleteTrigger = React.forwardRef<HTMLDivElement, AutocompleteTriggerProps>(
  ({children, className, onClick, ...props}, ref) => {
    const {clearButtonRef, slots, triggerRef} = useContext(AutocompleteContext);
    const state = useContext(SelectStateContext);

    // Callback ref to update context ref
    const contextRefCallback = React.useCallback(
      (node: HTMLDivElement | null) => {
        triggerRef.current = node;
      },
      [triggerRef],
    );

    // Merge context ref callback with user-provided ref
    const mergedRef = mergeRefs(contextRefCallback, ref);

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      // Don't toggle if clicking the clear button
      if (clearButtonRef.current?.contains(e.target as Node)) {
        return;
      }
      onClick?.(e);
      state?.toggle();
    };

    return (
      <GroupPrimitive
        ref={mergedRef}
        className={composeTwRenderProps(className, slots?.trigger())}
        data-slot="autocomplete-trigger"
        onClick={handleClick}
        {...props}
      >
        {(values) => <>{typeof children === "function" ? children(values) : children}</>}
      </GroupPrimitive>
    );
  },
);

AutocompleteTrigger.displayName = "AutocompleteTrigger";

/* -------------------------------------------------------------------------------------------------
 * Autocomplete Value
 * -----------------------------------------------------------------------------------------------*/
interface AutocompleteValueProps extends ComponentPropsWithRef<typeof SelectValuePrimitive> {}

const AutocompleteValue = ({children, className, ...props}: AutocompleteValueProps) => {
  const {slots} = useContext(AutocompleteContext);

  return (
    <SelectValuePrimitive
      className={composeTwRenderProps(className, slots?.value())}
      data-slot="autocomplete-value"
      {...props}
    >
      {children}
    </SelectValuePrimitive>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Autocomplete Indicator
 * -----------------------------------------------------------------------------------------------*/
interface AutocompleteIndicatorProps extends ComponentPropsWithRef<"svg"> {
  className?: string;
}

const AutocompleteIndicator = ({children, className, ...props}: AutocompleteIndicatorProps) => {
  const {slots} = useContext(AutocompleteContext);
  const state = useContext(SelectStateContext);

  if (children && React.isValidElement(children)) {
    return React.cloneElement(
      children as React.ReactElement<{
        className?: string;
        "data-slot"?: "autocomplete-indicator";
        "data-open"?: Booleanish;
      }>,
      {
        ...props,
        className: composeSlotClassName(slots?.indicator, className),
        "data-slot": "autocomplete-indicator",
        "data-open": dataAttr(state?.isOpen),
      },
    );
  }

  return (
    <ButtonPrimitive>
      <IconChevronDown
        className={composeSlotClassName(slots?.indicator, className)}
        data-open={dataAttr(state?.isOpen)}
        data-slot="autocomplete-default-indicator"
        {...props}
      />
    </ButtonPrimitive>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Autocomplete Popover
 * -----------------------------------------------------------------------------------------------*/
interface AutocompletePopoverProps extends Omit<
  ComponentPropsWithRef<typeof PopoverPrimitive>,
  "children"
> {
  children: React.ReactNode;
}

const AutocompletePopover = ({
  children,
  className,
  placement = "bottom",
  ...props
}: AutocompletePopoverProps) => {
  const {slots, triggerRef} = useContext(AutocompleteContext);

  return (
    <SurfaceContext
      value={{
        variant: "default" as SurfaceVariants["variant"],
      }}
    >
      <PopoverPrimitive
        {...props}
        className={composeTwRenderProps(className, slots?.popover())}
        data-slot="autocomplete-popover"
        placement={placement}
        triggerRef={triggerRef}
      >
        {children}
      </PopoverPrimitive>
    </SurfaceContext>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Autocomplete Filter
 * -----------------------------------------------------------------------------------------------*/
interface AutocompleteFilterProps extends ComponentPropsWithRef<typeof AutocompletePrimitive> {}

const AutocompleteFilter = ({children, ...props}: AutocompleteFilterProps) => {
  return (
    <AutocompletePrimitive data-slot="autocomplete-filter" {...props}>
      {children}
    </AutocompletePrimitive>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Autocomplete Clear Button
 * -----------------------------------------------------------------------------------------------*/
interface AutocompleteClearButtonProps extends ComponentPropsWithRef<"button"> {}

const AutocompleteClearButton = ({
  className,
  onClick,
  ref,
  ...props
}: AutocompleteClearButtonProps) => {
  const {slots} = useContext(AutocompleteContext);
  const state = useContext(SelectStateContext);
  const {clearButtonRef, onClear} = useContext(AutocompleteContext);

  const clearButtonRefCallback = React.useCallback(
    (node: HTMLButtonElement | null) => {
      clearButtonRef.current = node;
    },
    [clearButtonRef],
  );

  // Merge context ref callback with user-provided ref
  const mergedRef = mergeRefs(clearButtonRefCallback, ref);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    state?.selectionManager.setSelectedKeys(new Set());
    onClear?.();
    onClick?.(e);
  };

  return (
    <button
      ref={mergedRef}
      className={slots?.clearButton({className})}
      data-empty={dataAttr(state?.selectionManager.selectedKeys.size === 0)}
      data-slot="autocomplete-clear-button"
      onClick={handleClick}
      type="button"
      {...props}
    >
      <CloseIcon data-slot="autocomplete-clear-button-icon" />
    </button>
  );
};

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
