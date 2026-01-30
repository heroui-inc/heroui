"use client";

import type {ColorSliderVariants} from "@heroui/styles";
import type {ComponentPropsWithRef} from "react";
import type {ColorSliderRenderProps, ColorSpace} from "react-aria-components";

import {colorSliderVariants} from "@heroui/styles";
import React, {createContext, useContext} from "react";
import {
  ColorSlider as ColorSliderPrimitive,
  ColorThumb as ColorThumbPrimitive,
  SliderOutput as SliderOutputPrimitive,
  SliderTrack as SliderTrackPrimitive,
} from "react-aria-components";

import {composeTwRenderProps} from "../../utils/compose";

/* -------------------------------------------------------------------------------------------------
 * ColorSlider Channel Types
 * -----------------------------------------------------------------------------------------------*/

/** Channels available in HSL color space */
type HSLChannel = "hue" | "saturation" | "lightness" | "alpha";

/** Channels available in HSB color space */
type HSBChannel = "hue" | "saturation" | "brightness" | "alpha";

/** Channels available in RGB color space */
type RGBChannel = "red" | "green" | "blue" | "alpha";

/** Channels that work across multiple color spaces */
type SharedChannel = "hue" | "saturation" | "alpha";

/**
 * Discriminated union type for valid channel/colorSpace combinations.
 * This ensures TypeScript will error on invalid combinations like
 * `channel="red"` with `colorSpace="hsl"`.
 */
type ColorSliderChannelProps =
  | {channel: HSLChannel; colorSpace?: "hsl"}
  | {channel: HSBChannel; colorSpace?: "hsb"}
  | {channel: RGBChannel; colorSpace?: "rgb"}
  | {channel: SharedChannel; colorSpace?: ColorSpace};

/* -------------------------------------------------------------------------------------------------
 * ColorSlider Validation Utilities
 * -----------------------------------------------------------------------------------------------*/

/** Maps channels to their required color space (for channels that are color-space specific) */
const CHANNEL_TO_COLORSPACE: Partial<Record<string, ColorSpace>> = {
  red: "rgb",
  green: "rgb",
  blue: "rgb",
  lightness: "hsl",
  brightness: "hsb",
};

/**
 * Validates and returns a valid colorSpace for the given channel.
 * If an invalid combination is detected, logs a warning and returns the correct colorSpace.
 */
function getValidColorSpace(channel: string, colorSpace?: ColorSpace): ColorSpace | undefined {
  const requiredSpace = CHANNEL_TO_COLORSPACE[channel];

  if (requiredSpace && colorSpace && colorSpace !== requiredSpace) {
    // eslint-disable-next-line no-console
    console.warn(
      `[HeroUI ColorSlider] Invalid combination: channel="${channel}" requires colorSpace="${requiredSpace}", ` +
        `but received colorSpace="${colorSpace}". Auto-correcting to "${requiredSpace}".`,
    );

    return requiredSpace;
  }

  return colorSpace;
}

/* -------------------------------------------------------------------------------------------------
 * ColorSlider Context
 * -----------------------------------------------------------------------------------------------*/
interface ColorSliderContext {
  channel?: string;
  slots?: ReturnType<typeof colorSliderVariants>;
  state?: ColorSliderRenderProps;
}

const ColorSliderContext = createContext<ColorSliderContext>({});

/* -------------------------------------------------------------------------------------------------
 * ColorSlider Root
 * -----------------------------------------------------------------------------------------------*/
interface ColorSliderRootBaseProps
  extends
    Omit<ComponentPropsWithRef<typeof ColorSliderPrimitive>, "channel" | "colorSpace">,
    ColorSliderVariants {}

type ColorSliderRootProps = ColorSliderRootBaseProps & ColorSliderChannelProps;

const ColorSliderRoot = ({
  channel,
  children,
  className,
  colorSpace,
  orientation = "horizontal",
  ...props
}: ColorSliderRootProps) => {
  const slots = React.useMemo(() => colorSliderVariants({}), []);

  // Validate and auto-correct invalid channel/colorSpace combinations
  const validColorSpace = getValidColorSpace(channel, colorSpace);

  return (
    <ColorSliderPrimitive
      channel={channel}
      colorSpace={validColorSpace}
      data-slot="color-slider"
      orientation={orientation}
      {...props}
      className={composeTwRenderProps(className, slots.base())}
    >
      {(values) => (
        <ColorSliderContext value={{channel, slots, state: values}}>
          {typeof children === "function" ? children(values) : children}
        </ColorSliderContext>
      )}
    </ColorSliderPrimitive>
  );
};

/* -------------------------------------------------------------------------------------------------
 * ColorSlider Output
 * -----------------------------------------------------------------------------------------------*/
interface ColorSliderOutputProps extends ComponentPropsWithRef<typeof SliderOutputPrimitive> {}

const ColorSliderOutput = ({children, className, ...props}: ColorSliderOutputProps) => {
  const {slots} = useContext(ColorSliderContext);

  return (
    <SliderOutputPrimitive
      className={composeTwRenderProps(className, slots?.output())}
      data-slot="color-slider-output"
      {...props}
    >
      {children
        ? (values) => <>{typeof children === "function" ? children(values) : children}</>
        : ({state}) => state.getThumbValueLabel(0)}
    </SliderOutputPrimitive>
  );
};

/* -------------------------------------------------------------------------------------------------
 * ColorSlider Track
 * -----------------------------------------------------------------------------------------------*/
interface ColorSliderTrackProps extends ComponentPropsWithRef<typeof SliderTrackPrimitive> {}

const ColorSliderTrack = ({children, className, style, ...props}: ColorSliderTrackProps) => {
  const {channel, slots, state} = useContext(ColorSliderContext);
  // Calculate start and end colors for the gradient edge caps
  const displayColor = state?.state?.getDisplayColor();

  const edgeColors = React.useMemo(() => {
    // Access color through state.state.value (ColorSliderState.value)
    if (!displayColor || !channel) {
      return {end: "transparent", start: "transparent"};
    }

    const range = displayColor.getChannelRange(
      channel as Parameters<typeof displayColor.getChannelRange>[0],
    );

    // Get colors at min and max values of the channel
    const startColor = displayColor.withChannelValue(
      channel as Parameters<typeof displayColor.withChannelValue>[0],
      range.minValue,
    );
    const endColor = displayColor.withChannelValue(
      channel as Parameters<typeof displayColor.withChannelValue>[0],
      range.maxValue,
    );

    return {
      end: endColor.toString("css"),
      start: startColor.toString("css"),
    };
  }, [channel, displayColor]);

  return (
    <SliderTrackPrimitive
      className={composeTwRenderProps(className, slots?.track())}
      data-slot="color-slider-track"
      style={({defaultStyle, ...rest}) => ({
        // Add transparency checkerboard pattern for alpha channel
        background: `${defaultStyle.background}, repeating-conic-gradient(#efefef 0% 25%, #f7f7f7 0% 50%) 50% / 16px 16px`,
        // Pass edge colors as CSS custom properties for ::before and ::after
        "--track-end-color": edgeColors.end,
        "--track-start-color": edgeColors.start,
        ...(typeof style === "function" ? style({defaultStyle, ...rest}) : style),
      })}
      {...props}
    >
      {(values) => <>{typeof children === "function" ? children(values) : children}</>}
    </SliderTrackPrimitive>
  );
};

/* -------------------------------------------------------------------------------------------------
 * ColorSlider Thumb
 * -----------------------------------------------------------------------------------------------*/
interface ColorSliderThumbProps extends ComponentPropsWithRef<typeof ColorThumbPrimitive> {}

const ColorSliderThumb = ({children, className, style, ...props}: ColorSliderThumbProps) => {
  const {slots} = useContext(ColorSliderContext);

  return (
    <ColorThumbPrimitive
      className={composeTwRenderProps(className, slots?.thumb())}
      data-slot="color-slider-thumb"
      style={({defaultStyle, isDisabled, ...rest}) => ({
        ...defaultStyle,
        backgroundColor: isDisabled ? undefined : defaultStyle.backgroundColor,
        ...(typeof style === "function" ? style({defaultStyle, isDisabled, ...rest}) : style),
      })}
      {...props}
    >
      {(values) => <>{typeof children === "function" ? children(values) : children}</>}
    </ColorThumbPrimitive>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {ColorSliderRoot, ColorSliderOutput, ColorSliderTrack, ColorSliderThumb};

export type {
  ColorSliderRootProps,
  ColorSliderOutputProps,
  ColorSliderTrackProps,
  ColorSliderThumbProps,
  // Channel types for type-safe usage
  HSLChannel,
  HSBChannel,
  RGBChannel,
  SharedChannel,
  ColorSliderChannelProps,
};
