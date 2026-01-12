"use client";

import type {AutocompleteVariants} from "./autocomplete.styles";
import type {Booleanish} from "../../utils/assertion";
import type {SurfaceVariants} from "../surface";
import type {ComponentPropsWithRef, MutableRefObject} from "react";

import {mergeRefs} from "@react-aria/utils";
import React, {createContext, useContext, useRef} from "react";
import {
  Autocomplete as AutocompletePrimitive,
  Button as ButtonPrimitive,
  Popover as PopoverPrimitive,
  Select as SelectPrimitive,
  SelectStateContext,
  SelectValue as SelectValuePrimitive,
} from "react-aria-components";

import {dataAttr} from "../../utils/assertion";
import {composeSlotClassName, composeTwRenderProps} from "../../utils/compose";
import {IconChevronDown} from "../icons";
import {SurfaceContext} from "../surface";

import {autocompleteVariants} from "./autocomplete.styles";

/* -------------------------------------------------------------------------------------------------
 * Autocomplete Context
 * -----------------------------------------------------------------------------------------------*/
type AutocompleteContext = {
  slots?: ReturnType<typeof autocompleteVariants>;
  triggerRef: MutableRefObject<HTMLElement | null>;
};

const AutocompleteContext = createContext<AutocompleteContext>({
  triggerRef: {current: null} as MutableRefObject<HTMLElement | null>,
});

/* -------------------------------------------------------------------------------------------------
 * Autocomplete Root
 * -----------------------------------------------------------------------------------------------*/
interface AutocompleteRootProps<T extends object, M extends "single" | "multiple" = "single">
  extends ComponentPropsWithRef<typeof SelectPrimitive<T, M>>, AutocompleteVariants {
  items?: Iterable<T, M>;
}

const AutocompleteRoot = <T extends object = object, M extends "single" | "multiple" = "single">({
  children,
  className,
  fullWidth,
  variant,
  ...props
}: AutocompleteRootProps<T, M>) => {
  const slots = React.useMemo(
    () => autocompleteVariants({fullWidth, variant}),
    [fullWidth, variant],
  );
  const triggerRef = useRef<HTMLElement | null>(null);

  return (
    <AutocompleteContext value={{slots, triggerRef}}>
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
interface AutocompleteTriggerProps extends ComponentPropsWithRef<typeof ButtonPrimitive> {}

const AutocompleteTrigger = React.forwardRef<HTMLButtonElement, AutocompleteTriggerProps>(
  ({children, className, ...props}, ref) => {
    const {slots, triggerRef} = useContext(AutocompleteContext);

    // Callback ref to update context ref
    const contextRefCallback = React.useCallback(
      (node: HTMLButtonElement | null) => {
        triggerRef.current = node;
      },
      [triggerRef],
    );

    // Merge context ref callback with user-provided ref
    const mergedRef = mergeRefs(contextRefCallback, ref);

    return (
      <ButtonPrimitive
        ref={mergedRef}
        className={composeTwRenderProps(className, slots?.trigger())}
        data-slot="autocomplete-trigger"
        {...props}
      >
        {(values) => <>{typeof children === "function" ? children(values) : children}</>}
      </ButtonPrimitive>
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
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {
  AutocompleteRoot,
  AutocompleteTrigger,
  AutocompleteValue,
  AutocompleteIndicator,
  AutocompletePopover,
  AutocompleteFilter,
};

export type {
  AutocompleteRootProps,
  AutocompleteTriggerProps,
  AutocompleteValueProps,
  AutocompleteIndicatorProps,
  AutocompletePopoverProps,
  AutocompleteFilterProps,
};
