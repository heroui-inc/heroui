"use client";

import type {SliderVariants} from "./slider.styles";
import type {
  SliderProps as SliderPrimitiveProps,
  SliderThumbProps as SliderThumbPrimitiveProps,
  SliderTrackProps as SliderTrackPrimitiveProps,
} from "react-aria-components";

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

interface SliderRootProps extends SliderPrimitiveProps, SliderVariants {}

const SliderRoot = React.forwardRef<React.ComponentRef<typeof SliderPrimitive>, SliderRootProps>(
  ({children, className, orientation = "horizontal", ...props}, ref) => {
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
          ref={ref}
          data-slot="slider"
          orientation={orientation}
          {...props}
          className={composeTwRenderProps(className, slots.base())}
        >
          {(values) => <>{typeof children === "function" ? children(values) : children}</>}
        </SliderPrimitive>
      </SliderContext.Provider>
    );
  },
);

SliderRoot.displayName = "HeroUI.Slider";

/* -------------------------------------------------------------------------------------------------
 * Slider Header
 * -----------------------------------------------------------------------------------------------*/

interface SliderHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const SliderHeader = React.forwardRef<HTMLDivElement, SliderHeaderProps>(
  ({className, ...props}, ref) => {
    const {slots} = useContext(SliderContext);

    return (
      <div ref={ref} className={slots?.header({className})} data-slot="slider-header" {...props} />
    );
  },
);

SliderHeader.displayName = "HeroUI.Slider.Header";

/* -------------------------------------------------------------------------------------------------
 * Slider Label
 * -----------------------------------------------------------------------------------------------*/

interface SliderLabelProps extends React.ComponentProps<typeof LabelPrimitive> {}

const SliderLabel = React.forwardRef<React.ComponentRef<typeof LabelPrimitive>, SliderLabelProps>(
  ({className, ...props}, ref) => {
    const {slots} = useContext(SliderContext);

    return (
      <LabelPrimitive
        ref={ref}
        className={slots?.label({className})}
        data-slot="slider-label"
        {...props}
      />
    );
  },
);

SliderLabel.displayName = "HeroUI.Slider.Label";

/* -------------------------------------------------------------------------------------------------
 * Slider Output
 * -----------------------------------------------------------------------------------------------*/

interface SliderOutputProps extends React.ComponentProps<typeof SliderOutputPrimitive> {}

const SliderOutput = React.forwardRef<
  React.ComponentRef<typeof SliderOutputPrimitive>,
  SliderOutputProps
>(({className, ...props}, ref) => {
  const {slots} = useContext(SliderContext);

  return (
    <SliderOutputPrimitive
      ref={ref}
      className={composeTwRenderProps(className, slots?.output())}
      data-slot="slider-output"
      {...props}
    />
  );
});

SliderOutput.displayName = "HeroUI.Slider.Output";

/* -------------------------------------------------------------------------------------------------
 * Slider Track
 * -----------------------------------------------------------------------------------------------*/

interface SliderTrackProps extends SliderTrackPrimitiveProps {}

const SliderTrack = React.forwardRef<
  React.ComponentRef<typeof SliderTrackPrimitive>,
  SliderTrackProps
>(({children, className, ...props}, ref) => {
  const {isDisabled, slots} = useContext(SliderContext);

  return (
    <SliderTrackPrimitive
      ref={ref}
      className={composeTwRenderProps(className, slots?.track())}
      data-disabled={isDisabled || undefined}
      data-slot="slider-track"
      {...props}
    >
      {(values) => <>{typeof children === "function" ? children(values) : children}</>}
    </SliderTrackPrimitive>
  );
});

SliderTrack.displayName = "HeroUI.Slider.Track";

/* -------------------------------------------------------------------------------------------------
 * Slider Fill
 * -----------------------------------------------------------------------------------------------*/

interface SliderFillProps extends React.HTMLAttributes<HTMLDivElement> {
  percentage?: number;
}

const SliderFill = React.forwardRef<HTMLDivElement, SliderFillProps>(
  ({className, percentage, style, ...props}, ref) => {
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
        ref={ref}
        className={slots?.fill({className})}
        data-disabled={isDisabled || undefined}
        data-slot="slider-fill"
        style={fillStyle}
        {...props}
      />
    );
  },
);

SliderFill.displayName = "HeroUI.Slider.Fill";

/* -------------------------------------------------------------------------------------------------
 * Slider Thumb
 * -----------------------------------------------------------------------------------------------*/

interface SliderThumbProps extends SliderThumbPrimitiveProps {}

const SliderThumb = React.forwardRef<
  React.ComponentRef<typeof SliderThumbPrimitive>,
  SliderThumbProps
>(({children, className, ...props}, ref) => {
  const {slots} = useContext(SliderContext);

  return (
    <SliderThumbPrimitive
      ref={ref}
      className={composeTwRenderProps(className, slots?.thumb())}
      data-slot="slider-thumb"
      {...props}
    >
      {(values) => <>{typeof children === "function" ? children(values) : children}</>}
    </SliderThumbPrimitive>
  );
});

SliderThumb.displayName = "HeroUI.Slider.Thumb";

/* -------------------------------------------------------------------------------------------------
 * Slider Marks
 * -----------------------------------------------------------------------------------------------*/

interface SliderMarksProps extends React.HTMLAttributes<HTMLDivElement> {}

const SliderMarks = React.forwardRef<HTMLDivElement, SliderMarksProps>(
  ({className, ...props}, ref) => {
    const {slots} = useContext(SliderContext);

    return (
      <div ref={ref} className={slots?.marks({className})} data-slot="slider-marks" {...props} />
    );
  },
);

SliderMarks.displayName = "HeroUI.Slider.Marks";

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/

const CompoundSlider = Object.assign(SliderRoot, {
  Header: SliderHeader,
  Label: SliderLabel,
  Output: SliderOutput,
  Track: SliderTrack,
  Fill: SliderFill,
  Thumb: SliderThumb,
  Marks: SliderMarks,
});

export type {
  SliderRootProps,
  SliderRootProps as SliderProps,
  SliderHeaderProps,
  SliderLabelProps,
  SliderOutputProps,
  SliderTrackProps,
  SliderFillProps,
  SliderThumbProps,
  SliderMarksProps,
};

export default CompoundSlider;
