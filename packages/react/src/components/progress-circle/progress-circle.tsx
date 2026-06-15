"use client";

import type {DOMRenderProps} from "../../utils/dom";
import type {ProgressCircleVariants} from "@heroui/styles";
import type {ComponentPropsWithRef, ReactNode} from "react";
import type {ProgressBarRenderProps} from "react-aria-components/ProgressBar";

import {progressCircleVariants} from "@heroui/styles";
import React, {createContext, memo, useContext, useMemo} from "react";
import {ProgressBar as ProgressBarPrimitive} from "react-aria-components/ProgressBar";

import {composeTwRenderProps} from "../../utils/compose";
import {dom} from "../../utils/dom";

/* -------------------------------------------------------------------------------------------------
 * ProgressCircle Constants
 * -----------------------------------------------------------------------------------------------*/
const STROKE_WIDTH = 4;
const CENTER = 18;
const RADIUS = CENTER - STROKE_WIDTH / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/* -------------------------------------------------------------------------------------------------
 * ProgressCircle Context
 * -----------------------------------------------------------------------------------------------*/
interface ProgressCircleContext {
  fillCircleClassName?: string;
  state?: ProgressBarRenderProps;
  trackCircleClassName?: string;
  trackClassName?: string;
}

const ProgressCircleContext = createContext<ProgressCircleContext>({});

/* -------------------------------------------------------------------------------------------------
 * ProgressCircle Root
 * -----------------------------------------------------------------------------------------------*/
interface ProgressCircleRootProps
  extends ComponentPropsWithRef<typeof ProgressBarPrimitive>, ProgressCircleVariants {}

const ProgressCircleRoot = memo(function ProgressCircleRoot({
  children,
  className,
  color,
  size,
  ...props
}: ProgressCircleRootProps) {
  const slots = useMemo(() => progressCircleVariants({color, size}), [color, size]);
  const baseClassName = useMemo(() => slots.base(), [slots]);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, baseClassName),
    [className, baseClassName],
  );
  const slotClassNames = useMemo(
    () => ({
      fillCircleClassName: slots.fillCircle(),
      trackCircleClassName: slots.trackCircle(),
      trackClassName: slots.track(),
    }),
    [slots],
  );

  return (
    <ProgressBarPrimitive data-slot="progress-circle" {...props} className={resolvedClassName}>
      {(values) => (
        <ProgressCircleContext value={{...slotClassNames, state: values}}>
          {typeof children === "function" ? children(values) : children}
        </ProgressCircleContext>
      )}
    </ProgressBarPrimitive>
  );
});

ProgressCircleRoot.displayName = "HeroUI.ProgressCircle";

/* -------------------------------------------------------------------------------------------------
 * ProgressCircle Track
 * -----------------------------------------------------------------------------------------------*/
interface ProgressCircleTrackProps<
  E extends keyof React.JSX.IntrinsicElements = "svg",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

function ProgressCircleTrackInner<E extends keyof React.JSX.IntrinsicElements = "svg">({
  children,
  className,
  ...props
}: ProgressCircleTrackProps<E> &
  Omit<React.JSX.IntrinsicElements[E], keyof ProgressCircleTrackProps<E>>) {
  const {trackClassName} = useContext(ProgressCircleContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, trackClassName) as string,
    [className, trackClassName],
  );

  return (
    <dom.svg
      className={resolvedClassName}
      data-slot="progress-circle-track"
      fill="none"
      viewBox={`0 0 ${CENTER * 2} ${CENTER * 2}`}
      {...(props as any)}
    >
      {children}
    </dom.svg>
  );
}

ProgressCircleTrackInner.displayName = "HeroUI.ProgressCircle.Track";

const ProgressCircleTrack = memo(ProgressCircleTrackInner) as <
  E extends keyof React.JSX.IntrinsicElements = "svg",
>(
  props: ProgressCircleTrackProps<E> &
    Omit<React.JSX.IntrinsicElements[E], keyof ProgressCircleTrackProps<E>>,
) => React.JSX.Element;

/* -------------------------------------------------------------------------------------------------
 * ProgressCircle TrackCircle
 * -----------------------------------------------------------------------------------------------*/
interface ProgressCircleTrackCircleProps<
  E extends keyof React.JSX.IntrinsicElements = "circle",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

function ProgressCircleTrackCircleInner<E extends keyof React.JSX.IntrinsicElements = "circle">({
  className,
  ...props
}: ProgressCircleTrackCircleProps<E> &
  Omit<React.JSX.IntrinsicElements[E], keyof ProgressCircleTrackCircleProps<E>>) {
  const {trackCircleClassName} = useContext(ProgressCircleContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, trackCircleClassName) as string,
    [className, trackCircleClassName],
  );

  return (
    <dom.circle
      className={resolvedClassName}
      cx={CENTER}
      cy={CENTER}
      data-slot="progress-circle-track-circle"
      r={RADIUS}
      strokeWidth={STROKE_WIDTH}
      {...(props as any)}
    />
  );
}

ProgressCircleTrackCircleInner.displayName = "HeroUI.ProgressCircle.TrackCircle";

const ProgressCircleTrackCircle = memo(ProgressCircleTrackCircleInner) as <
  E extends keyof React.JSX.IntrinsicElements = "circle",
>(
  props: ProgressCircleTrackCircleProps<E> &
    Omit<React.JSX.IntrinsicElements[E], keyof ProgressCircleTrackCircleProps<E>>,
) => React.JSX.Element;

/* -------------------------------------------------------------------------------------------------
 * ProgressCircle FillCircle
 * -----------------------------------------------------------------------------------------------*/
interface ProgressCircleFillCircleProps<
  E extends keyof React.JSX.IntrinsicElements = "circle",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

function ProgressCircleFillCircleInner<E extends keyof React.JSX.IntrinsicElements = "circle">({
  className,
  ...props
}: ProgressCircleFillCircleProps<E> &
  Omit<React.JSX.IntrinsicElements[E], keyof ProgressCircleFillCircleProps<E>>) {
  const {fillCircleClassName, state} = useContext(ProgressCircleContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, fillCircleClassName) as string,
    [className, fillCircleClassName],
  );
  const percentage = state?.percentage ?? 0;
  const isIndeterminate = state?.isIndeterminate ?? false;
  const strokeDashoffset = CIRCUMFERENCE - (percentage / 100) * CIRCUMFERENCE;

  return (
    <dom.circle
      className={resolvedClassName}
      cx={CENTER}
      cy={CENTER}
      data-slot="progress-circle-fill-circle"
      r={RADIUS}
      strokeDasharray={CIRCUMFERENCE}
      strokeDashoffset={isIndeterminate ? CIRCUMFERENCE * 0.75 : strokeDashoffset}
      strokeLinecap="round"
      strokeWidth={STROKE_WIDTH}
      transform={`rotate(-90 ${CENTER} ${CENTER})`}
      {...(props as any)}
    />
  );
}

ProgressCircleFillCircleInner.displayName = "HeroUI.ProgressCircle.FillCircle";

const ProgressCircleFillCircle = memo(ProgressCircleFillCircleInner) as <
  E extends keyof React.JSX.IntrinsicElements = "circle",
>(
  props: ProgressCircleFillCircleProps<E> &
    Omit<React.JSX.IntrinsicElements[E], keyof ProgressCircleFillCircleProps<E>>,
) => React.JSX.Element;

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {
  ProgressCircleRoot,
  ProgressCircleTrack,
  ProgressCircleTrackCircle,
  ProgressCircleFillCircle,
};

export type {
  ProgressCircleRootProps,
  ProgressCircleTrackProps,
  ProgressCircleTrackCircleProps,
  ProgressCircleFillCircleProps,
};
