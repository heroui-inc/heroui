"use client";

import type {ComboBoxVariants} from "./combobox.styles";
import type {SurfaceVariants} from "../surface";
import type {ComponentProps, ReactNode} from "react";
import type {ButtonProps, ComboBoxProps as ComboBoxPrimitiveProps} from "react-aria-components";

import {Slot as SlotPrimitive} from "@radix-ui/react-slot";
import React, {createContext, useContext} from "react";
import {
  Button,
  ComboBox as ComboBoxPrimitive,
  ComboBoxStateContext,
  Popover as PopoverPrimitive,
} from "react-aria-components";

import {dataAttr} from "../../utils/assertion";
import {composeTwRenderProps} from "../../utils/compose";
import {isNotAsChild} from "../../utils/props";
import {IconChevronDown} from "../icons";
import {SurfaceContext} from "../surface";

import {comboboxVariants} from "./combobox.styles";

/* -------------------------------------------------------------------------------------------------
 * ComboBox Context
 * -----------------------------------------------------------------------------------------------*/
type ComboBoxContext = {
  slots?: ReturnType<typeof comboboxVariants>;
};

const ComboBoxContext = createContext<ComboBoxContext>({});

/* -------------------------------------------------------------------------------------------------
 * ComboBox Root
 * -----------------------------------------------------------------------------------------------*/
interface ComboBoxRootProps<T extends object> extends ComboBoxPrimitiveProps<T>, ComboBoxVariants {
  items?: Iterable<T>;
}

const ComboBoxRoot = <T extends object = object>({
  children,
  className,
  ...props
}: ComboBoxRootProps<T>) => {
  const slots = React.useMemo(() => comboboxVariants(), []);

  return (
    <ComboBoxContext.Provider value={{slots}}>
      <ComboBoxPrimitive
        data-slot="combobox"
        {...props}
        className={composeTwRenderProps(className, slots?.base())}
      >
        {(values) => <>{typeof children === "function" ? children(values) : children}</>}
      </ComboBoxPrimitive>
    </ComboBoxContext.Provider>
  );
};

/* -------------------------------------------------------------------------------------------------
 * ComboBox InputGroup
 * -----------------------------------------------------------------------------------------------*/
interface ComboBoxInputGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

const ComboBoxInputGroup = ({children, className, ...props}: ComboBoxInputGroupProps) => {
  const {slots} = useContext(ComboBoxContext);
  const inputGroupClassName = slots?.inputGroup({className});

  return (
    <div className={inputGroupClassName} data-slot="combobox-input-group" {...props}>
      {children}
    </div>
  );
};

/* -------------------------------------------------------------------------------------------------
 * ComboBox Trigger
 * -----------------------------------------------------------------------------------------------*/
interface ComboBoxTriggerProps {
  asChild?: boolean;
  className?: string;
  children?: ReactNode;
}

interface ComboBoxTrigger {
  (props: {asChild: true} & ComponentProps<"button">): React.JSX.Element;
  (props: {asChild?: false} & ButtonProps): React.JSX.Element;
}

const ComboBoxTrigger: ComboBoxTrigger = (props) => {
  const {slots} = useContext(ComboBoxContext);
  const state = useContext(ComboBoxStateContext);

  if (isNotAsChild(props)) {
    const {children, className, ...rest} = props;

    return (
      <Button
        className={composeTwRenderProps(className, slots?.trigger())}
        data-open={dataAttr(state?.isOpen)}
        data-slot="combobox-trigger"
        {...rest}
      >
        {children ?? <IconChevronDown data-slot="combobox-trigger-default-icon" />}
      </Button>
    );
  }

  const {asChild: _asChild, children, className, ...rest} = props;

  return (
    <SlotPrimitive data-open={dataAttr(state?.isOpen)} data-slot="combobox-trigger" {...rest}>
      {children ?? (
        <Button
          className={composeTwRenderProps(className, slots?.trigger())}
          data-open={dataAttr(state?.isOpen)}
          data-slot="combobox-trigger-button"
        >
          <IconChevronDown data-slot="combobox-trigger-default-icon" />
        </Button>
      )}
    </SlotPrimitive>
  );
};

/* -------------------------------------------------------------------------------------------------
 * ComboBox Popover
 * -----------------------------------------------------------------------------------------------*/
interface ComboBoxPopoverProps
  extends Omit<React.ComponentProps<typeof PopoverPrimitive>, "children"> {
  children: React.ReactNode;
}

const ComboBoxPopover = ({
  children,
  className,
  placement = "bottom",
  ...props
}: ComboBoxPopoverProps) => {
  const {slots} = useContext(ComboBoxContext);

  return (
    <SurfaceContext.Provider
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
    </SurfaceContext.Provider>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {ComboBoxRoot, ComboBoxInputGroup, ComboBoxTrigger, ComboBoxPopover};

export type {
  ComboBoxRootProps,
  ComboBoxInputGroupProps,
  ComboBoxTriggerProps,
  ComboBoxPopoverProps,
};
