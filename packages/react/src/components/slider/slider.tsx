"use client";

import type {SliderVariants} from "./slider.styles";

import React, {createContext, useContext} from "react";
import {
  Label as LabelPrimitive,
  SliderOutput as SliderOutputPrimitive,
  Slider as SliderPrimitive,
  SliderThumb as SliderThumbPrimitive,
  SliderTrack as SliderTrackPrimitive,
} from "react-aria-components";

import {composeTwRenderProps} from "../../utils/compose";

import {sliderVariants} from "./slider.styles";
/* -------------------------------------------------------------------------------------------------
 * Slider Context
 * -----------------------------------------------------------------------------------------------*/
interface SliderContext {
  slots?: ReturnType<typeof sliderVariants>;
  orientation?: "horizontal" | "vertical";
  isDisabled?: boolean;
}
const SliderContext = createContext<SliderContext>({});

/* -------------------------------------------------------------------------------------------------
 * Slider
 * -----------------------------------------------------------------------------------------------*/
interface SliderProps extends React.ComponentProps<typeof SliderPrimitive>, SliderVariants {}
const Slider = ({children, className, orientation = "horizontal", ...props}: SliderProps) => {
  const slots = React.useMemo(
    () =>
      sliderVariants({
        orientation,
        isDisabled: props.isDisabled,
      }),
    [orientation, props.isDisabled],
  );

  return (
    <SliderContext.Provider value={{slots, orientation, isDisabled: props.isDisabled}}>
      <SliderPrimitive
        data-slot="slider"
        orientation={orientation}
        {...props}
        className={composeTwRenderProps(className, slots.base())}
      >
        {(values) => <>{typeof children === "function" ? children(values) : children}</>}
      </SliderPrimitive>
    </SliderContext.Provider>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Slider Header
 * -----------------------------------------------------------------------------------------------*/
interface SliderHeaderProps extends React.ComponentProps<"div"> {}
const SliderHeader = ({className, ...props}: SliderHeaderProps) => {
  const {slots} = useContext(SliderContext);

  return <div className={slots?.header({className})} data-slot="slider-header" {...props} />;
};

/* -------------------------------------------------------------------------------------------------
 * Slider Label
 * -----------------------------------------------------------------------------------------------*/
interface SliderLabelProps extends React.ComponentProps<"label"> {}
const SliderLabel = ({className, ...props}: SliderLabelProps) => {
  const {slots} = useContext(SliderContext);

  return (
    <LabelPrimitive className={slots?.label({className})} data-slot="slider-label" {...props} />
  );
};

/* -------------------------------------------------------------------------------------------------
 * Slider Output
 * -----------------------------------------------------------------------------------------------*/
interface SliderOutputProps extends React.ComponentProps<typeof SliderOutputPrimitive> {}
const SliderOutput = ({className, ...props}: SliderOutputProps) => {
  const {slots} = useContext(SliderContext);

  return (
    <SliderOutputPrimitive
      className={composeTwRenderProps(className, slots?.output())}
      data-slot="slider-output"
      {...props}
    />
  );
};

/* -------------------------------------------------------------------------------------------------
 * Slider Track
 * -----------------------------------------------------------------------------------------------*/
interface SliderTrackProps extends React.ComponentProps<typeof SliderTrackPrimitive> {}

const SliderTrack = ({children, className, ...props}: SliderTrackProps) => {
  const {isDisabled, slots} = useContext(SliderContext);

  return (
    <SliderTrackPrimitive
      className={composeTwRenderProps(className, slots?.track())}
      data-disabled={isDisabled || undefined}
      data-slot="slider-track"
      {...props}
    >
      {(values) => <>{typeof children === "function" ? children(values) : children}</>}
    </SliderTrackPrimitive>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Slider Fill
 * -----------------------------------------------------------------------------------------------*/
interface SliderFillProps extends React.ComponentProps<"div"> {
  percentage?: number;
}

const SliderFill = ({className, percentage, style, ...props}: SliderFillProps) => {
  const {isDisabled, orientation, slots} = useContext(SliderContext);
  const fillStyle = React.useMemo(() => {
    if (percentage === undefined) return style;

    return {
      ...style,
      ...(orientation === "horizontal" ? {width: `${percentage}%`} : {height: `${percentage}%`}),
    };
  }, [percentage, orientation, style]);

  return (
    <div
      className={slots?.fill({className})}
      data-disabled={isDisabled || undefined}
      data-slot="slider-fill"
      style={fillStyle}
      {...props}
    />
  );
};

/* -------------------------------------------------------------------------------------------------
 * Slider Thumb
 * -----------------------------------------------------------------------------------------------*/
interface SliderThumbProps extends React.ComponentProps<typeof SliderThumbPrimitive> {}
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
 * Slider Marks
 * -----------------------------------------------------------------------------------------------*/
interface SliderMarksProps extends React.ComponentProps<"div"> {}
const SliderMarks = ({className, ...props}: SliderMarksProps) => {
  const {slots} = useContext(SliderContext);

  return <div className={slots?.marks({className})} data-slot="slider-marks" {...props} />;
};

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {
  Slider,
  SliderHeader,
  SliderLabel,
  SliderOutput,
  SliderTrack,
  SliderFill,
  SliderThumb,
  SliderMarks,
};

export type {
  SliderProps,
  SliderHeaderProps,
  SliderLabelProps,
  SliderOutputProps,
  SliderTrackProps,
  SliderFillProps,
  SliderThumbProps,
  SliderMarksProps,
};
