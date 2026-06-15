"use client";

import type {SurfaceVariants} from "../surface";
import type {ColorPickerVariants} from "@heroui/styles";
import type {ComponentPropsWithRef} from "react";
import type {ColorPickerProps as ColorPickerPrimitiveProps} from "react-aria-components/ColorPicker";

import {colorPickerVariants} from "@heroui/styles";
import React, {createContext, memo, useContext, useMemo} from "react";
import {Button as ButtonPrimitive} from "react-aria-components/Button";
import {ColorPicker as ColorPickerPrimitive} from "react-aria-components/ColorPicker";
import {
  DialogTrigger as DialogTriggerPrimitive,
  Popover as PopoverPrimitive,
} from "react-aria-components/Popover";

import {composeTwRenderProps} from "../../utils/compose";
import {SurfaceContext} from "../surface";

/* -------------------------------------------------------------------------------------------------
 * ColorPicker Context
 * -----------------------------------------------------------------------------------------------*/
type ColorPickerContext = {
  popoverClassName?: string;
  triggerClassName?: string;
};

const ColorPickerContext = createContext<ColorPickerContext>({});

/* -------------------------------------------------------------------------------------------------
 * ColorPicker Root
 * -----------------------------------------------------------------------------------------------*/
interface ColorPickerRootProps
  extends Omit<ColorPickerPrimitiveProps, "children">, ColorPickerVariants {
  /** Additional class name for the wrapper element */
  className?: string;
  /** Content of the color picker (Trigger, Popover, etc.) */
  children: React.ReactNode;
}

const ColorPickerRoot = memo(function ColorPickerRoot({
  children,
  className,
  ...props
}: ColorPickerRootProps) {
  const slots = useMemo(() => colorPickerVariants(), []);
  const contextValue = useMemo<ColorPickerContext>(
    () => ({
      popoverClassName: slots.popover(),
      triggerClassName: slots.trigger(),
    }),
    [slots],
  );
  const baseClassName = useMemo(() => slots.base(), [slots]);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, baseClassName) as string,
    [className, baseClassName],
  );

  return (
    <ColorPickerContext value={contextValue}>
      <ColorPickerPrimitive {...props}>
        <DialogTriggerPrimitive>
          <div className={resolvedClassName} data-slot="color-picker">
            {children}
          </div>
        </DialogTriggerPrimitive>
      </ColorPickerPrimitive>
    </ColorPickerContext>
  );
});

/* -------------------------------------------------------------------------------------------------
 * ColorPicker Trigger
 * -----------------------------------------------------------------------------------------------*/
interface ColorPickerTriggerProps extends ComponentPropsWithRef<typeof ButtonPrimitive> {}

const ColorPickerTrigger = memo(function ColorPickerTrigger({
  children,
  className,
  ...props
}: ColorPickerTriggerProps) {
  const {triggerClassName} = useContext(ColorPickerContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, triggerClassName),
    [className, triggerClassName],
  );

  return (
    <ButtonPrimitive className={resolvedClassName} data-slot="color-picker-trigger" {...props}>
      {typeof children === "function" ? (values) => children(values) : children}
    </ButtonPrimitive>
  );
});

/* -------------------------------------------------------------------------------------------------
 * ColorPicker Popover
 * -----------------------------------------------------------------------------------------------*/
interface ColorPickerPopoverProps extends Omit<
  ComponentPropsWithRef<typeof PopoverPrimitive>,
  "children"
> {
  children: React.ReactNode;
}

const ColorPickerPopover = memo(function ColorPickerPopover({
  children,
  className,
  placement = "bottom left",
  ...props
}: ColorPickerPopoverProps) {
  const {popoverClassName} = useContext(ColorPickerContext);
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
        data-slot="color-picker-popover"
        placement={placement}
      >
        {children}
      </PopoverPrimitive>
    </SurfaceContext>
  );
});

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {ColorPickerRoot, ColorPickerTrigger, ColorPickerPopover};

export type {ColorPickerRootProps, ColorPickerTriggerProps, ColorPickerPopoverProps};
