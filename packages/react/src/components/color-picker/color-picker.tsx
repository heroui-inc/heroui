"use client";

import type {SurfaceVariants} from "../surface";
import type {ColorPickerVariants} from "@heroui/styles";
import type {ComponentPropsWithRef} from "react";
import type {ColorPickerProps as ColorPickerPrimitiveProps} from "react-aria-components";

import {colorPickerVariants} from "@heroui/styles";
import React, {createContext, useContext} from "react";
import {
  Button as ButtonPrimitive,
  ColorPicker as ColorPickerPrimitive,
  DialogTrigger as DialogTriggerPrimitive,
  Popover as PopoverPrimitive,
} from "react-aria-components";

import {composeSlotClassName, composeTwRenderProps} from "../../utils/compose";
import {SurfaceContext} from "../surface";

/* -------------------------------------------------------------------------------------------------
 * ColorPicker Context
 * -----------------------------------------------------------------------------------------------*/
type ColorPickerContext = {
  slots?: ReturnType<typeof colorPickerVariants>;
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

const ColorPickerRoot = ({children, className, ...props}: ColorPickerRootProps) => {
  const slots = React.useMemo(() => colorPickerVariants(), []);

  return (
    <ColorPickerContext value={{slots}}>
      <ColorPickerPrimitive {...props}>
        <DialogTriggerPrimitive>
          <div className={composeSlotClassName(slots?.base, className)} data-slot="color-picker">
            {children}
          </div>
        </DialogTriggerPrimitive>
      </ColorPickerPrimitive>
    </ColorPickerContext>
  );
};

/* -------------------------------------------------------------------------------------------------
 * ColorPicker Trigger
 * -----------------------------------------------------------------------------------------------*/
interface ColorPickerTriggerProps extends ComponentPropsWithRef<typeof ButtonPrimitive> {}

const ColorPickerTrigger = ({children, className, ...props}: ColorPickerTriggerProps) => {
  const {slots} = useContext(ColorPickerContext);

  return (
    <ButtonPrimitive
      className={composeTwRenderProps(className, slots?.trigger())}
      data-slot="color-picker-trigger"
      {...props}
    >
      {(values) => <>{typeof children === "function" ? children(values) : children}</>}
    </ButtonPrimitive>
  );
};

/* -------------------------------------------------------------------------------------------------
 * ColorPicker Popover
 * -----------------------------------------------------------------------------------------------*/
interface ColorPickerPopoverProps extends Omit<
  ComponentPropsWithRef<typeof PopoverPrimitive>,
  "children"
> {
  children: React.ReactNode;
}

const ColorPickerPopover = ({
  children,
  className,
  placement = "bottom left",
  ...props
}: ColorPickerPopoverProps) => {
  const {slots} = useContext(ColorPickerContext);

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
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {ColorPickerRoot, ColorPickerTrigger, ColorPickerPopover};

export type {ColorPickerRootProps, ColorPickerTriggerProps, ColorPickerPopoverProps};
