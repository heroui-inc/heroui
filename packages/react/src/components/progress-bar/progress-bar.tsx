"use client";

import type {ProgressBarVariants} from "@heroui/styles";
import type {ComponentPropsWithRef} from "react";
import type {ProgressBarRenderProps} from "react-aria-components";

import {progressBarVariants} from "@heroui/styles";
import React, {createContext, useContext} from "react";
import {ProgressBar as ProgressBarPrimitive} from "react-aria-components";

import {composeSlotClassName, composeTwRenderProps} from "../../utils/compose";

/* -------------------------------------------------------------------------------------------------
 * ProgressBar Context
 * -----------------------------------------------------------------------------------------------*/
interface ProgressBarContext {
  slots?: ReturnType<typeof progressBarVariants>;
  state?: ProgressBarRenderProps;
}

const ProgressBarContext = createContext<ProgressBarContext>({});

/* -------------------------------------------------------------------------------------------------
 * ProgressBar Root
 * -----------------------------------------------------------------------------------------------*/
interface ProgressBarRootProps
  extends ComponentPropsWithRef<typeof ProgressBarPrimitive>, ProgressBarVariants {}

const ProgressBarRoot = ({children, className, color, size, ...props}: ProgressBarRootProps) => {
  const slots = React.useMemo(() => progressBarVariants({color, size}), [color, size]);

  return (
    <ProgressBarPrimitive
      data-slot="progress-bar"
      {...props}
      className={composeTwRenderProps(className, slots.base())}
    >
      {(values) => (
        <ProgressBarContext value={{slots, state: values}}>
          {typeof children === "function" ? children(values) : children}
        </ProgressBarContext>
      )}
    </ProgressBarPrimitive>
  );
};

ProgressBarRoot.displayName = "HeroUI.ProgressBar";

/* -------------------------------------------------------------------------------------------------
 * ProgressBar Output
 * -----------------------------------------------------------------------------------------------*/
interface ProgressBarOutputProps extends ComponentPropsWithRef<"span"> {}

const ProgressBarOutput = ({children, className, ...props}: ProgressBarOutputProps) => {
  const {slots, state} = useContext(ProgressBarContext);

  return (
    <span
      className={composeSlotClassName(slots?.output, className)}
      data-slot="progress-bar-output"
      {...props}
    >
      {children ?? state?.valueText}
    </span>
  );
};

ProgressBarOutput.displayName = "HeroUI.ProgressBar.Output";

/* -------------------------------------------------------------------------------------------------
 * ProgressBar Track
 * -----------------------------------------------------------------------------------------------*/
interface ProgressBarTrackProps extends ComponentPropsWithRef<"div"> {}

const ProgressBarTrack = ({children, className, ...props}: ProgressBarTrackProps) => {
  const {slots} = useContext(ProgressBarContext);

  return (
    <div
      className={composeSlotClassName(slots?.track, className)}
      data-slot="progress-bar-track"
      {...props}
    >
      {children}
    </div>
  );
};

ProgressBarTrack.displayName = "HeroUI.ProgressBar.Track";

/* -------------------------------------------------------------------------------------------------
 * ProgressBar Fill
 * -----------------------------------------------------------------------------------------------*/
interface ProgressBarFillProps extends ComponentPropsWithRef<"div"> {}

const ProgressBarFill = ({className, style, ...props}: ProgressBarFillProps) => {
  const {slots, state} = useContext(ProgressBarContext);

  return (
    <div
      className={composeSlotClassName(slots?.fill, className)}
      data-slot="progress-bar-fill"
      style={{
        ...style,
        width: state?.isIndeterminate ? undefined : `${state?.percentage ?? 0}%`,
      }}
      {...props}
    />
  );
};

ProgressBarFill.displayName = "HeroUI.ProgressBar.Fill";

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {ProgressBarRoot, ProgressBarOutput, ProgressBarTrack, ProgressBarFill};

export type {
  ProgressBarRootProps,
  ProgressBarOutputProps,
  ProgressBarTrackProps,
  ProgressBarFillProps,
};
