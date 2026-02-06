"use client";

import type {ColorSwatchPickerVariants} from "@heroui/styles";
import type {CSSProperties, ComponentPropsWithRef} from "react";
import type {ColorSwatchPickerItemRenderProps} from "react-aria-components";

import {colorSwatchPickerVariants} from "@heroui/styles";
import React, {createContext, useContext} from "react";
import {
  ColorSwatchPickerItem as ColorSwatchPickerItemPrimitive,
  ColorSwatchPicker as ColorSwatchPickerPrimitive,
  ColorSwatch as ColorSwatchPrimitive,
} from "react-aria-components";

import {composeSlotClassName, composeTwRenderProps} from "../../utils/compose";

/* -------------------------------------------------------------------------------------------------
| * ColorSwatchPicker Context
| * -----------------------------------------------------------------------------------------------*/
interface ColorSwatchPickerContext {
  slots?: ReturnType<typeof colorSwatchPickerVariants>;
}

const ColorSwatchPickerContext = createContext<ColorSwatchPickerContext>({});

/* -------------------------------------------------------------------------------------------------
| * ColorSwatchPickerItem Context
| * -----------------------------------------------------------------------------------------------*/
interface ColorSwatchPickerItemContext {
  state?: ColorSwatchPickerItemRenderProps;
}

const ColorSwatchPickerItemContext = createContext<ColorSwatchPickerItemContext>({});

/* -------------------------------------------------------------------------------------------------
| * ColorSwatchPicker Root
| * -----------------------------------------------------------------------------------------------*/
interface ColorSwatchPickerRootProps
  extends ComponentPropsWithRef<typeof ColorSwatchPickerPrimitive>, ColorSwatchPickerVariants {}

const ColorSwatchPickerRoot = ({
  children,
  className,
  layout,
  size,
  variant,
  ...props
}: ColorSwatchPickerRootProps) => {
  const slots = React.useMemo(
    () => colorSwatchPickerVariants({layout, size, variant}),
    [layout, size, variant],
  );

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
| * ColorSwatchPicker Item
| * -----------------------------------------------------------------------------------------------*/
interface ColorSwatchPickerItemProps extends ComponentPropsWithRef<
  typeof ColorSwatchPickerItemPrimitive
> {}

const ColorSwatchPickerItem = ({children, className, ...props}: ColorSwatchPickerItemProps) => {
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
      {(renderProps) => (
        <ColorSwatchPickerItemContext value={{state: renderProps}}>
          {typeof children === "function" ? children(renderProps) : children}
        </ColorSwatchPickerItemContext>
      )}
    </ColorSwatchPickerItemPrimitive>
  );
};

/* -------------------------------------------------------------------------------------------------
| * ColorSwatchPicker Swatch
| * -----------------------------------------------------------------------------------------------*/
interface ColorSwatchPickerSwatchProps extends ComponentPropsWithRef<typeof ColorSwatchPrimitive> {}

const ColorSwatchPickerSwatch = ({className, ...props}: ColorSwatchPickerSwatchProps) => {
  const {slots} = useContext(ColorSwatchPickerContext);

  return (
    <ColorSwatchPrimitive
      className={composeTwRenderProps(className, slots?.swatch())}
      data-slot="color-swatch-picker-swatch"
      {...props}
    />
  );
};

/* -------------------------------------------------------------------------------------------------
| * ColorSwatchPicker Indicator
| * -----------------------------------------------------------------------------------------------*/
interface ColorSwatchPickerIndicatorProps extends Omit<ComponentPropsWithRef<"span">, "children"> {
  children?: React.ReactNode | ((props: ColorSwatchPickerItemRenderProps) => React.ReactNode);
}

/**
 * Calculate relative luminance of a color
 * Uses the formula: L = 0.2126 * R + 0.7152 * G + 0.0722 * B
 * Returns a value between 0 (black) and 1 (white)
 */
function getColorLuminance(color: ColorSwatchPickerItemRenderProps["color"]): number {
  // Get RGB values (0-255 range)
  const r = color.getChannelValue("red");
  const g = color.getChannelValue("green");
  const b = color.getChannelValue("blue");

  // Normalize to 0-1 and calculate luminance
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
}

const ColorSwatchPickerIndicator = ({
  children,
  className,
  ...props
}: ColorSwatchPickerIndicatorProps) => {
  const {slots} = useContext(ColorSwatchPickerContext);
  const {state} = useContext(ColorSwatchPickerItemContext);

  // Determine if the background color is light (luminance > 0.5)
  // Use white checkmark on dark backgrounds, black on light backgrounds
  const isLightColor = state?.color ? getColorLuminance(state.color) > 0.5 : false;

  const content =
    typeof children === "function" ? (
      children(state ?? ({} as ColorSwatchPickerItemRenderProps))
    ) : children ? (
      children
    ) : (
      <svg
        aria-hidden="true"
        data-slot="color-swatch-picker-checkmark"
        fill="none"
        role="presentation"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        viewBox="0 0 12 12"
      >
        <polyline points="2.5 6 5 8.5 9.5 3" />
      </svg>
    );

  return (
    <span
      aria-hidden="true"
      className={composeSlotClassName(slots?.indicator, className)}
      data-light-color={isLightColor ? "true" : undefined}
      data-slot="color-swatch-picker-indicator"
      {...props}
    >
      {content}
    </span>
  );
};

/* -------------------------------------------------------------------------------------------------
| * Exports
| * -----------------------------------------------------------------------------------------------*/
export {
  ColorSwatchPickerRoot,
  ColorSwatchPickerItem,
  ColorSwatchPickerSwatch,
  ColorSwatchPickerIndicator,
};

export type {
  ColorSwatchPickerRootProps,
  ColorSwatchPickerItemProps,
  ColorSwatchPickerSwatchProps,
  ColorSwatchPickerIndicatorProps,
};
