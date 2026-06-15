"use client";

import type {DOMRenderProps} from "../../utils/dom";
import type {SliderVariants} from "@heroui/styles";
import type {ComponentPropsWithRef} from "react";
import type {SliderRenderProps} from "react-aria-components/Slider";

import {sliderVariants} from "@heroui/styles";
import React, {createContext, memo, useContext, useMemo} from "react";
import {
  SliderOutput as SliderOutputPrimitive,
  Slider as SliderPrimitive,
  SliderThumb as SliderThumbPrimitive,
  SliderTrack as SliderTrackPrimitive,
} from "react-aria-components/Slider";

import {dataAttr} from "../../utils/assertion";
import {composeTwRenderProps} from "../../utils/compose";
import {dom} from "../../utils/dom";

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
  fillClassName?: string;
  marksClassName?: string;
  outputClassName?: string;
  state?: SliderRenderProps;
  thumbClassName?: string;
  trackClassName?: string;
}

const SliderContext = createContext<SliderContext>({});

/* -------------------------------------------------------------------------------------------------
 * Slider Root
 * -----------------------------------------------------------------------------------------------*/
interface SliderRootProps extends ComponentPropsWithRef<typeof SliderPrimitive>, SliderVariants {}

const SliderRoot = memo(function SliderRoot({
  children,
  className,
  orientation = "horizontal",
  ...props
}: SliderRootProps) {
  const slots = useMemo(() => sliderVariants({}), []);
  const baseClassName = useMemo(() => slots.base(), [slots]);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, baseClassName),
    [className, baseClassName],
  );
  const slotClassNames = useMemo(
    () => ({
      fillClassName: slots.fill(),
      marksClassName: slots.marks(),
      outputClassName: slots.output(),
      thumbClassName: slots.thumb(),
      trackClassName: slots.track(),
    }),
    [slots],
  );

  return (
    <SliderPrimitive
      data-slot="slider"
      orientation={orientation}
      {...props}
      className={resolvedClassName}
    >
      {(values) => (
        <SliderContext value={{...slotClassNames, state: values}}>
          {typeof children === "function" ? children(values) : children}
        </SliderContext>
      )}
    </SliderPrimitive>
  );
});

/* -------------------------------------------------------------------------------------------------
 * Slider Output
 * -----------------------------------------------------------------------------------------------*/
interface SliderOutputProps extends ComponentPropsWithRef<typeof SliderOutputPrimitive> {}

const SliderOutput = memo(function SliderOutput({
  children,
  className,
  ...props
}: SliderOutputProps) {
  const {outputClassName} = useContext(SliderContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, outputClassName),
    [className, outputClassName],
  );

  return (
    <SliderOutputPrimitive className={resolvedClassName} data-slot="slider-output" {...props}>
      {children
        ? typeof children === "function"
          ? (values) => children(values)
          : children
        : ({state}) => state.values.map((_, i) => state.getThumbValueLabel(i)).join(" – ")}
    </SliderOutputPrimitive>
  );
});

/* -------------------------------------------------------------------------------------------------
 * Slider Track
 * -----------------------------------------------------------------------------------------------*/
interface SliderTrackProps extends ComponentPropsWithRef<typeof SliderTrackPrimitive> {}

const SliderTrack = memo(function SliderTrack({children, className, ...props}: SliderTrackProps) {
  const {state, trackClassName} = useContext(SliderContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, trackClassName),
    [className, trackClassName],
  );

  const {getThumbPercent, values} = state?.state || {};

  const singleThumb = values?.length && values.length === 1;

  const [startOffset, endOffset] = [
    values?.length && values.length > 1 ? getThumbPercent?.(0) : 0,
    getThumbPercent?.(values?.length ? values.length - 1 : 0),
  ].sort();

  const fillWidth = (endOffset! - startOffset!) * 100;

  return (
    <SliderTrackPrimitive
      className={resolvedClassName}
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
      {typeof children === "function" ? (values) => children(values) : children}
    </SliderTrackPrimitive>
  );
});

/* -------------------------------------------------------------------------------------------------
 * Slider Fill
 * -----------------------------------------------------------------------------------------------*/
interface SliderFillProps<
  E extends keyof React.JSX.IntrinsicElements = "div",
> extends DOMRenderProps<E, undefined> {
  className?: string;
}

function SliderFillInner<E extends keyof React.JSX.IntrinsicElements = "div">({
  className,
  style,
  ...props
}: SliderFillProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof SliderFillProps<E>>) {
  const {fillClassName, state} = useContext(SliderContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, fillClassName) as string,
    [className, fillClassName],
  );

  const {getThumbPercent, orientation, values} = state?.state || {};

  const [startOffset, endOffset] = [
    values?.length && values.length > 1 ? getThumbPercent?.(0) : 0,
    getThumbPercent?.(values?.length ? values.length - 1 : 0),
  ].sort();

  const isVertical = orientation === "vertical";

  return (
    <dom.div
      className={resolvedClassName}
      data-disabled={dataAttr(state?.isDisabled)}
      data-slot="slider-fill"
      style={{
        ...style,
        [isVertical ? "bottom" : "left"]: `${startOffset! * 100}%`,
        ...(isVertical
          ? {
              height: `${(endOffset! - startOffset!) * 100}%`,
            }
          : {
              width: `${(endOffset! - startOffset!) * 100}%`,
            }),
      }}
      {...(props as any)}
    />
  );
}

const SliderFill = memo(SliderFillInner) as <E extends keyof React.JSX.IntrinsicElements = "div">(
  props: SliderFillProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof SliderFillProps<E>>,
) => React.JSX.Element;

/* -------------------------------------------------------------------------------------------------
 * Slider Thumb
 * -----------------------------------------------------------------------------------------------*/
interface SliderThumbProps extends ComponentPropsWithRef<typeof SliderThumbPrimitive> {}

const SliderThumb = memo(function SliderThumb({children, className, ...props}: SliderThumbProps) {
  const {thumbClassName} = useContext(SliderContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, thumbClassName),
    [className, thumbClassName],
  );

  return (
    <SliderThumbPrimitive className={resolvedClassName} data-slot="slider-thumb" {...props}>
      {typeof children === "function" ? (values) => children(values) : children}
    </SliderThumbPrimitive>
  );
});

/* -------------------------------------------------------------------------------------------------
 * TODO: Slider Marks
 * -----------------------------------------------------------------------------------------------*/
interface SliderMarksProps<
  E extends keyof React.JSX.IntrinsicElements = "div",
> extends DOMRenderProps<E, undefined> {
  className?: string;
}

function SliderMarksInner<E extends keyof React.JSX.IntrinsicElements = "div">({
  className,
  ...props
}: SliderMarksProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof SliderMarksProps<E>>) {
  const {marksClassName} = useContext(SliderContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, marksClassName) as string,
    [className, marksClassName],
  );

  return <dom.div className={resolvedClassName} data-slot="slider-marks" {...(props as any)} />;
}

const SliderMarks = memo(SliderMarksInner) as <E extends keyof React.JSX.IntrinsicElements = "div">(
  props: SliderMarksProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof SliderMarksProps<E>>,
) => React.JSX.Element;

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
