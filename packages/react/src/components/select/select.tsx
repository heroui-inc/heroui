"use client";

import type {Booleanish} from "../../utils/assertion";
import type {SurfaceVariants} from "../surface";
import type {SelectVariants} from "@heroui/styles";
import type {ComponentPropsWithRef, RefObject} from "react";

import {selectVariants} from "@heroui/styles";
import {mergeRefs} from "@react-aria/utils";
import React, {createContext, useContext, useMemo, useRef} from "react";
import {
  Button as ButtonPrimitive,
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
 * Select Context
 * -----------------------------------------------------------------------------------------------*/
type SelectContext = {
  slots?: ReturnType<typeof selectVariants>;
  onClear?: () => void;
  clearButtonRef: RefObject<HTMLButtonElement | null>;
};

const SelectContext = createContext<SelectContext>({
  clearButtonRef: {current: null} as RefObject<HTMLButtonElement | null>,
});

/* -------------------------------------------------------------------------------------------------
 * Select Root
 * -----------------------------------------------------------------------------------------------*/
interface SelectRootProps<T extends object, M extends "single" | "multiple" = "single">
  extends ComponentPropsWithRef<typeof SelectPrimitive<T, M>>, SelectVariants {
  items?: Iterable<T, M>;
  // Handler that is called when the clear button is pressed.
  onClear?: () => void;
}

const SelectRoot = <T extends object = object, M extends "single" | "multiple" = "single">({
  children,
  className,
  fullWidth,
  onClear,
  variant,
  ...props
}: SelectRootProps<T, M>) => {
  const slots = useMemo(() => selectVariants({fullWidth, variant}), [fullWidth, variant]);

  const clearButtonRef = useRef<HTMLButtonElement | null>(null);

  return (
    <SelectContext value={{slots, clearButtonRef, onClear}}>
      <SelectPrimitive
        data-slot="select"
        {...props}
        className={composeTwRenderProps(className, slots?.base())}
      >
        {(values) => <>{typeof children === "function" ? children(values) : children}</>}
      </SelectPrimitive>
    </SelectContext>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Select Trigger
 * -----------------------------------------------------------------------------------------------*/
interface SelectTriggerProps extends ComponentPropsWithRef<typeof ButtonPrimitive> {}

const SelectTrigger = ({children, className, ...props}: SelectTriggerProps) => {
  const {slots} = useContext(SelectContext);

  return (
    <ButtonPrimitive
      className={composeTwRenderProps(className, slots?.trigger())}
      data-slot="select-trigger"
      {...props}
    >
      {(values) => <>{typeof children === "function" ? children(values) : children}</>}
    </ButtonPrimitive>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Select Value
 * -----------------------------------------------------------------------------------------------*/
interface SelectValueProps extends ComponentPropsWithRef<typeof SelectValuePrimitive> {}

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
interface SelectIndicatorProps extends ComponentPropsWithRef<"svg"> {
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
      {...props}
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

/* -------------------------------------------------------------------------------------------------
 * Select Clear Button
 * -----------------------------------------------------------------------------------------------*/
interface SelectClearButtonProps extends ComponentPropsWithRef<"button"> {}

const SelectClearButton = ({
  className,
  onClick,
  onPointerDown,
  ref,
  ...props
}: SelectClearButtonProps) => {
  const {clearButtonRef, onClear, slots} = useContext(SelectContext);
  const state = useContext(SelectStateContext);

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

  const handlePointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onPointerDown?.(e);
  };

  return (
    <button
      ref={mergedRef}
      className={slots?.clearButton({className})}
      data-empty={dataAttr(state?.selectionManager.selectedKeys.size === 0)}
      data-slot="select-clear-button"
      type="button"
      onClick={handleClick}
      onPointerDown={handlePointerDown}
      {...props}
    >
      <CloseIcon data-slot="select-clear-button-icon" />
    </button>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {SelectRoot, SelectTrigger, SelectValue, SelectIndicator, SelectPopover, SelectClearButton};

export type {
  SelectRootProps,
  SelectTriggerProps,
  SelectValueProps,
  SelectIndicatorProps,
  SelectPopoverProps,
  SelectClearButtonProps,
};
