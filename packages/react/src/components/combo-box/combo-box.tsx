"use client";

import type {SurfaceVariants} from "../surface";
import type {ComboBoxVariants} from "@heroui/styles";
import type {ComponentPropsWithRef, ReactNode} from "react";
import type {ButtonProps} from "react-aria-components/Button";

import {comboBoxVariants} from "@heroui/styles";
import React, {createContext, memo, useContext, useMemo} from "react";
import {Button} from "react-aria-components/Button";
import {
  ComboBox as ComboBoxPrimitive,
  ComboBoxStateContext,
  Popover as PopoverPrimitive,
} from "react-aria-components/ComboBox";

import {dataAttr} from "../../utils/assertion";
import {composeTwRenderProps} from "../../utils/compose";
import {IconChevronDown} from "../icons";
import {SurfaceContext} from "../surface";

/* -------------------------------------------------------------------------------------------------
 * ComboBox Context
 * -----------------------------------------------------------------------------------------------*/
type ComboBoxContext = {
  inputGroupClassName?: string;
  popoverClassName?: string;
  triggerClassName?: string;
  variant?: "primary" | "secondary";
};

const ComboBoxContext = createContext<ComboBoxContext>({});

/* -------------------------------------------------------------------------------------------------
 * ComboBox Root
 * -----------------------------------------------------------------------------------------------*/
interface ComboBoxRootProps<T extends object>
  extends ComponentPropsWithRef<typeof ComboBoxPrimitive<T>>, ComboBoxVariants {
  items?: Iterable<T>;
  /**
   * The variant of the combo box.
   * @default "primary"
   */
  variant?: "primary" | "secondary";
}

function ComboBoxRootInner<T extends object = object>({
  children,
  className,
  fullWidth,
  menuTrigger = "focus",
  variant,
  ...props
}: ComboBoxRootProps<T>) {
  const slots = useMemo(() => comboBoxVariants({fullWidth}), [fullWidth]);
  const contextValue = useMemo<ComboBoxContext>(
    () => ({
      inputGroupClassName: slots.inputGroup(),
      popoverClassName: slots.popover(),
      triggerClassName: slots.trigger(),
      variant,
    }),
    [slots, variant],
  );
  const baseClassName = useMemo(() => slots.base(), [slots]);

  return (
    <ComboBoxContext value={contextValue}>
      <ComboBoxPrimitive
        data-slot="combo-box"
        menuTrigger={menuTrigger}
        {...props}
        className={composeTwRenderProps(className, baseClassName)}
      >
        {typeof children === "function" ? (values) => children(values) : children}
      </ComboBoxPrimitive>
    </ComboBoxContext>
  );
}

ComboBoxRootInner.displayName = "HeroUI.ComboBox";

const ComboBoxRoot = memo(ComboBoxRootInner) as <T extends object = object>(
  props: ComboBoxRootProps<T>,
) => React.JSX.Element;

/* -------------------------------------------------------------------------------------------------
 * ComboBox InputGroup
 * -----------------------------------------------------------------------------------------------*/
interface ComboBoxInputGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

const ComboBoxInputGroup = memo(function ComboBoxInputGroup({
  children,
  className,
  ...props
}: ComboBoxInputGroupProps) {
  const {inputGroupClassName} = useContext(ComboBoxContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, inputGroupClassName) as string,
    [className, inputGroupClassName],
  );

  return (
    <div className={resolvedClassName} data-slot="combo-box-input-group" {...props}>
      {children}
    </div>
  );
});

ComboBoxInputGroup.displayName = "HeroUI.ComboBox.InputGroup";

/* -------------------------------------------------------------------------------------------------
 * ComboBox Trigger
 * -----------------------------------------------------------------------------------------------*/
interface ComboBoxTriggerProps extends ButtonProps {
  className?: string;
  children?: ReactNode;
}

const ComboBoxTrigger = ({children, className, ...rest}: ComboBoxTriggerProps) => {
  const {triggerClassName} = useContext(ComboBoxContext);
  const state = useContext(ComboBoxStateContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, triggerClassName),
    [className, triggerClassName],
  );

  return (
    <Button
      className={resolvedClassName}
      data-open={dataAttr(state?.isOpen)}
      data-slot="combo-box-trigger"
      {...rest}
    >
      {children ?? <IconChevronDown data-slot="combo-box-trigger-default-icon" />}
    </Button>
  );
};

/* -------------------------------------------------------------------------------------------------
 * ComboBox Popover
 * -----------------------------------------------------------------------------------------------*/
interface ComboBoxPopoverProps extends Omit<
  ComponentPropsWithRef<typeof PopoverPrimitive>,
  "children"
> {
  children: React.ReactNode;
}

const ComboBoxPopover = ({
  children,
  className,
  placement = "bottom",
  ...props
}: ComboBoxPopoverProps) => {
  const {popoverClassName} = useContext(ComboBoxContext);
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
        data-slot="combo-box-popover"
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
export {ComboBoxRoot, ComboBoxInputGroup, ComboBoxTrigger, ComboBoxPopover, ComboBoxContext};

export type {
  ComboBoxRootProps,
  ComboBoxInputGroupProps,
  ComboBoxTriggerProps,
  ComboBoxPopoverProps,
};
