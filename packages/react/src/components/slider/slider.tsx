"use client";

import type {SliderVariants} from "./slider.styles";
import type {ComponentPropsWithRef} from "react";
import type {SliderRenderProps} from "react-aria-components";

import React, {createContext, useContext} from "react";
import {
  SliderOutput as SliderOutputPrimitive,
  Slider as SliderPrimitive,
  SliderThumb as SliderThumbPrimitive,
  SliderTrack as SliderTrackPrimitive,
} from "react-aria-components";

import {dataAttr} from "../../utils/assertion";
import {composeSlotClassName, composeTwRenderProps} from "../../utils/compose";

import {sliderVariants} from "./slider.styles";

/* -------------------------------------------------------------------------------------------------
 * Component Status: Preview
 * -----------------------------------------------------------------------------------------------*/

// TODO: steps support
// TODO: marks support
// TODO: rtl support

/* -------------------------------------------------------------------------------------------------
 * Slider Context
 * -----------------------------------------------------------------------------------------------*/
interface SliderContext {
  slots?: ReturnType<typeof sliderVariants>;
  state?: SliderRenderProps;
}

const SliderContext = createContext<SliderContext>({});

/* -------------------------------------------------------------------------------------------------
 * Slider Root
 * -----------------------------------------------------------------------------------------------*/
interface SliderRootProps extends ComponentPropsWithRef<typeof SliderPrimitive>, SliderVariants {}

const SliderRoot = ({
  children,
  className,
  orientation = "horizontal",
  ...props
}: SliderRootProps) => {
  const slots = React.useMemo(() => sliderVariants({}), []);

  return (
    <SliderPrimitive
      data-slot="slider"
      orientation={orientation}
      {...props}
      className={composeTwRenderProps(className, slots.base())}
    >
      {(values) => (
        <SliderContext value={{slots, state: values}}>
          {typeof children === "function" ? children(values) : children}
        </SliderContext>
      )}
    </SliderPrimitive>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Slider Output
 * -----------------------------------------------------------------------------------------------*/
interface SliderOutputProps extends ComponentPropsWithRef<typeof SliderOutputPrimitive> {}

const SliderOutput = ({children, className, ...props}: SliderOutputProps) => {
  const {slots} = useContext(SliderContext);

  return (
    <SliderOutputPrimitive
      className={composeTwRenderProps(className, slots?.output())}
      data-slot="slider-output"
      {...props}
    >
      {children
        ? (values) => <>{typeof children === "function" ? children(values) : children}</>
        : ({state}) => state.values.map((_, i) => state.getThumbValueLabel(i)).join(" – ")}
    </SliderOutputPrimitive>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Slider Track
 * -----------------------------------------------------------------------------------------------*/
interface SliderTrackProps extends ComponentPropsWithRef<typeof SliderTrackPrimitive> {}

const SliderTrack = ({children, className, ...props}: SliderTrackProps) => {
  const {slots, state} = useContext(SliderContext);

  const {getThumbPercent, values} = state?.state || {};

  const singleThumb = values?.length && values.length === 1;

  const [startOffset, endOffset] = [
    values?.length && values.length > 1 ? getThumbPercent?.(0) : 0,
    getThumbPercent?.(values?.length ? values.length - 1 : 0),
  ].sort();

  const fillWidth = (endOffset! - startOffset!) * 100;

  return (
    <SliderTrackPrimitive
      className={composeTwRenderProps(className, slots?.track())}
      data-disabled={dataAttr(state?.isDisabled)}
      data-slot="slider-track"
      {...(singleThumb
        ? {
            "data-fill-start": dataAttr(fillWidth > 0),
            "data-fill-end": dataAttr(fillWidth == 100),
          }
        : {
            "data-fill-start": dataAttr(startOffset == 0),
            "data-fill-end": dataAttr(startOffset! * 100 + fillWidth == 100),
          })}
      {...props}
    >
      {(values) => <>{typeof children === "function" ? children(values) : children}</>}
    </SliderTrackPrimitive>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Slider Fill
 * -----------------------------------------------------------------------------------------------*/
interface SliderFillProps extends ComponentPropsWithRef<"div"> {}

const SliderFill = ({className, style, ...props}: SliderFillProps) => {
  const {slots, state} = useContext(SliderContext);

  const {getThumbPercent, orientation, values} = state?.state || {};

  const [startOffset, endOffset] = [
    values?.length && values.length > 1 ? getThumbPercent?.(0) : 0,
    getThumbPercent?.(values?.length ? values.length - 1 : 0),
  ].sort();

  const isVertical = orientation === "vertical";

  return (
    <div
      className={composeSlotClassName(slots?.fill, className)}
      data-disabled={dataAttr(state?.isDisabled)}
      data-slot="slider-fill"
      style={{
        ...style,
        // TODO: rtl support
        [isVertical ? "bottom" : "left"]: `${startOffset! * 100}%`,
        ...(isVertical
          ? {
              height: `${(endOffset! - startOffset!) * 100}%`,
            }
          : {
              width: `${(endOffset! - startOffset!) * 100}%`,
            }),
      }}
      {...props}
    />
  );
};

/* -------------------------------------------------------------------------------------------------
 * Slider Thumb
 * -----------------------------------------------------------------------------------------------*/
interface SliderThumbProps extends ComponentPropsWithRef<typeof SliderThumbPrimitive> {}

const SliderThumb = ({children, className, ...props}: SliderThumbProps) => {
  const {slots} = useContext(SliderContext);

  return (
    <SliderThumbPrimitive
      className={composeTwRenderProps(className, slots?.thumb())}
      data-slot="slider-thumb"
      {...props}
    >
      {(values) => <>{typeof children === "function" ? children(values) : children}</>}
    </SliderThumbPrimitive>
  );
};

/* -------------------------------------------------------------------------------------------------
 * TODO: Slider Marks
 * -----------------------------------------------------------------------------------------------*/
interface SliderMarksProps extends ComponentPropsWithRef<"div"> {}

const SliderMarks = ({className, ...props}: SliderMarksProps) => {
  const {slots} = useContext(SliderContext);

  return (
    <div
      className={composeSlotClassName(slots?.marks, className)}
      data-slot="slider-marks"
      {...props}
    />
  );
};

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {SliderRoot, SliderOutput, SliderTrack, SliderFill, SliderThumb, SliderMarks};

export type {
  SliderRootProps,
  SliderOutputProps,
  SliderTrackProps,
  SliderFillProps,
  SliderThumbProps,
  SliderMarksProps,
};
