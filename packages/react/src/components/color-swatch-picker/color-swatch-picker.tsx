"use client";

import type {ColorSwatchPickerVariants} from "@heroui/styles";
import type {CSSProperties, ComponentPropsWithRef} from "react";

import {colorSwatchPickerVariants} from "@heroui/styles";
import React, {createContext, useContext} from "react";
import {
  ColorSwatchPickerItem as ColorSwatchPickerItemPrimitive,
  ColorSwatchPicker as ColorSwatchPickerPrimitive,
  ColorSwatch as ColorSwatchPrimitive,
} from "react-aria-components";

import {composeTwRenderProps} from "../../utils/compose";

/* -------------------------------------------------------------------------------------------------
 * ColorSwatchPicker Context
 * -----------------------------------------------------------------------------------------------*/
interface ColorSwatchPickerContext {
  slots?: ReturnType<typeof colorSwatchPickerVariants>;
}

const ColorSwatchPickerContext = createContext<ColorSwatchPickerContext>({});

/* -------------------------------------------------------------------------------------------------
 * ColorSwatchPicker Root
 * -----------------------------------------------------------------------------------------------*/
interface ColorSwatchPickerRootProps
  extends ComponentPropsWithRef<typeof ColorSwatchPickerPrimitive>, ColorSwatchPickerVariants {}

const ColorSwatchPickerRoot = ({
  children,
  className,
  size,
  variant,
  ...props
}: ColorSwatchPickerRootProps) => {
  const slots = React.useMemo(() => colorSwatchPickerVariants({size, variant}), [size, variant]);

  return (
    <ColorSwatchPickerContext value={{slots}}>
      <ColorSwatchPickerPrimitive
        data-slot="color-swatch-picker"
        {...props}
        className={composeTwRenderProps(className, slots.base())}
      >
        {children}
      </ColorSwatchPickerPrimitive>
    </ColorSwatchPickerContext>
  );
};

/* -------------------------------------------------------------------------------------------------
 * ColorSwatchPicker Item
 * -----------------------------------------------------------------------------------------------*/
interface ColorSwatchPickerItemProps extends Omit<
  ComponentPropsWithRef<typeof ColorSwatchPickerItemPrimitive>,
  "children"
> {}

const ColorSwatchPickerItem = ({className, ...props}: ColorSwatchPickerItemProps) => {
  const {slots} = useContext(ColorSwatchPickerContext);

  return (
    <ColorSwatchPickerItemPrimitive
      data-slot="color-swatch-picker-item"
      {...props}
      className={composeTwRenderProps(className, slots?.item())}
      style={(renderProps) =>
        ({
          "--color-swatch-current": renderProps.color.toString("css"),
        }) as CSSProperties
      }
    >
      <ColorSwatchPrimitive className={slots?.swatch()} data-slot="color-swatch-picker-swatch" />
    </ColorSwatchPickerItemPrimitive>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {ColorSwatchPickerRoot, ColorSwatchPickerItem};

export type {ColorSwatchPickerRootProps, ColorSwatchPickerItemProps};
