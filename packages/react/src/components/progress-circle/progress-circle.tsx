"use client";

import type {ProgressCircleVariants} from "@heroui/styles";
import type {ComponentPropsWithRef} from "react";
import type {ProgressBarRenderProps} from "react-aria-components";

import {progressCircleVariants} from "@heroui/styles";
import React, {createContext, useContext} from "react";
import {ProgressBar as ProgressBarPrimitive} from "react-aria-components";

import {composeSlotClassName, composeTwRenderProps} from "../../utils/compose";

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
  const {slots, state} = useContext(ProgressCircleContext);
  const percentage = state?.percentage ?? 0;
  const isIndeterminate = state?.isIndeterminate ?? false;

  const strokeWidth = 4;
  const center = 18;
  const radius = center - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <svg
      className={composeSlotClassName(slots?.track, className)}
      data-slot="progress-circle-track"
      fill="none"
      viewBox={`0 0 ${center * 2} ${center * 2}`}
      {...props}
    >
      <circle
        className={composeSlotClassName(slots?.trackCircle)}
        cx={center}
        cy={center}
        data-slot="progress-circle-track-circle"
        r={radius}
        strokeWidth={strokeWidth}
      />
      <circle
        className={composeSlotClassName(slots?.fillCircle)}
        cx={center}
        cy={center}
        data-slot="progress-circle-fill-circle"
        r={radius}
        strokeDasharray={circumference}
        strokeDashoffset={isIndeterminate ? circumference * 0.75 : strokeDashoffset}
        strokeLinecap="round"
        strokeWidth={strokeWidth}
        transform={`rotate(-90 ${center} ${center})`}
      />
      {children}
    </svg>
  );
};

ProgressCircleTrack.displayName = "HeroUI.ProgressCircle.Track";

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {ProgressCircleRoot, ProgressCircleTrack};

export type {ProgressCircleRootProps, ProgressCircleTrackProps};
