"use client";

import type {ProgressCircleVariants} from "@heroui/styles";
import type {ComponentPropsWithRef} from "react";
import type {ProgressBarRenderProps} from "react-aria-components";

import {progressCircleVariants} from "@heroui/styles";
import React, {createContext, useContext} from "react";
import {ProgressBar as ProgressBarPrimitive} from "react-aria-components";

import {composeSlotClassName, composeTwRenderProps} from "../../utils/compose";

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
  slots?: ReturnType<typeof progressCircleVariants>;
  state?: ProgressBarRenderProps;
}

const ProgressCircleContext = createContext<ProgressCircleContext>({});

/* -------------------------------------------------------------------------------------------------
 * ProgressCircle Root
 * -----------------------------------------------------------------------------------------------*/
interface ProgressCircleRootProps
  extends ComponentPropsWithRef<typeof ProgressBarPrimitive>, ProgressCircleVariants {}

const ProgressCircleRoot = ({
  children,
  className,
  color,
  size,
  ...props
}: ProgressCircleRootProps) => {
  const slots = React.useMemo(() => progressCircleVariants({color, size}), [color, size]);

  return (
    <ProgressBarPrimitive
      data-slot="progress-circle"
      {...props}
      className={composeTwRenderProps(className, slots.base())}
    >
      {(values) => (
        <ProgressCircleContext value={{slots, state: values}}>
          {typeof children === "function" ? children(values) : children}
        </ProgressCircleContext>
      )}
    </ProgressBarPrimitive>
  );
};

ProgressCircleRoot.displayName = "HeroUI.ProgressCircle";

/* -------------------------------------------------------------------------------------------------
 * ProgressCircle Track
 * -----------------------------------------------------------------------------------------------*/
interface ProgressCircleTrackProps extends ComponentPropsWithRef<"svg"> {}

const ProgressCircleTrack = ({children, className, ...props}: ProgressCircleTrackProps) => {
  const {slots} = useContext(ProgressCircleContext);

  return (
    <svg
      className={composeSlotClassName(slots?.track, className)}
      data-slot="progress-circle-track"
      fill="none"
      viewBox={`0 0 ${CENTER * 2} ${CENTER * 2}`}
      {...props}
    >
      {children}
    </svg>
  );
};

ProgressCircleTrack.displayName = "HeroUI.ProgressCircle.Track";

/* -------------------------------------------------------------------------------------------------
 * ProgressCircle TrackCircle
 * -----------------------------------------------------------------------------------------------*/
interface ProgressCircleTrackCircleProps extends ComponentPropsWithRef<"circle"> {}

const ProgressCircleTrackCircle = ({className, ...props}: ProgressCircleTrackCircleProps) => {
  const {slots} = useContext(ProgressCircleContext);

  return (
    <circle
      className={composeSlotClassName(slots?.trackCircle, className)}
      cx={CENTER}
      cy={CENTER}
      data-slot="progress-circle-track-circle"
      r={RADIUS}
      strokeWidth={STROKE_WIDTH}
      {...props}
    />
  );
};

ProgressCircleTrackCircle.displayName = "HeroUI.ProgressCircle.TrackCircle";

/* -------------------------------------------------------------------------------------------------
 * ProgressCircle FillCircle
 * -----------------------------------------------------------------------------------------------*/
interface ProgressCircleFillCircleProps extends ComponentPropsWithRef<"circle"> {}

const ProgressCircleFillCircle = ({className, ...props}: ProgressCircleFillCircleProps) => {
  const {slots, state} = useContext(ProgressCircleContext);
  const percentage = state?.percentage ?? 0;
  const isIndeterminate = state?.isIndeterminate ?? false;
  const strokeDashoffset = CIRCUMFERENCE - (percentage / 100) * CIRCUMFERENCE;

  return (
    <circle
      className={composeSlotClassName(slots?.fillCircle, className)}
      cx={CENTER}
      cy={CENTER}
      data-slot="progress-circle-fill-circle"
      r={RADIUS}
      strokeDasharray={CIRCUMFERENCE}
      strokeDashoffset={isIndeterminate ? CIRCUMFERENCE * 0.75 : strokeDashoffset}
      strokeLinecap="round"
      strokeWidth={STROKE_WIDTH}
      transform={`rotate(-90 ${CENTER} ${CENTER})`}
      {...props}
    />
  );
};

ProgressCircleFillCircle.displayName = "HeroUI.ProgressCircle.FillCircle";

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
