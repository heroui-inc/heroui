"use client";

import type {MeterVariants} from "@heroui/styles";
import type {ComponentPropsWithRef} from "react";
import type {MeterRenderProps} from "react-aria-components";

import {meterVariants} from "@heroui/styles";
import React, {createContext, useContext} from "react";
import {Meter as MeterPrimitive} from "react-aria-components";

import {composeSlotClassName, composeTwRenderProps} from "../../utils/compose";

/* -------------------------------------------------------------------------------------------------
 * Meter Context
 * -----------------------------------------------------------------------------------------------*/
interface MeterContext {
  slots?: ReturnType<typeof meterVariants>;
  state?: MeterRenderProps;
}

const MeterContext = createContext<MeterContext>({});

/* -------------------------------------------------------------------------------------------------
 * Meter Root
 * -----------------------------------------------------------------------------------------------*/
interface MeterRootProps extends ComponentPropsWithRef<typeof MeterPrimitive>, MeterVariants {}

const MeterRoot = ({children, className, color, size, ...props}: MeterRootProps) => {
  const slots = React.useMemo(() => meterVariants({color, size}), [color, size]);

  return (
    <MeterPrimitive
      data-slot="meter"
      {...props}
      className={composeTwRenderProps(className, slots.base())}
    >
      {(values) => (
        <MeterContext value={{slots, state: values}}>
          {typeof children === "function" ? children(values) : children}
        </MeterContext>
      )}
    </MeterPrimitive>
  );
};

MeterRoot.displayName = "HeroUI.Meter";

/* -------------------------------------------------------------------------------------------------
 * Meter Output
 * -----------------------------------------------------------------------------------------------*/
interface MeterOutputProps extends ComponentPropsWithRef<"span"> {}

const MeterOutput = ({children, className, ...props}: MeterOutputProps) => {
  const {slots, state} = useContext(MeterContext);

  return (
    <span
      className={composeSlotClassName(slots?.output, className)}
      data-slot="meter-output"
      {...props}
    >
      {children ?? state?.valueText}
    </span>
  );
};

MeterOutput.displayName = "HeroUI.Meter.Output";

/* -------------------------------------------------------------------------------------------------
 * Meter Track
 * -----------------------------------------------------------------------------------------------*/
interface MeterTrackProps extends ComponentPropsWithRef<"div"> {}

const MeterTrack = ({children, className, ...props}: MeterTrackProps) => {
  const {slots} = useContext(MeterContext);

  return (
    <div
      className={composeSlotClassName(slots?.track, className)}
      data-slot="meter-track"
      {...props}
    >
      {children}
    </div>
  );
};

MeterTrack.displayName = "HeroUI.Meter.Track";

/* -------------------------------------------------------------------------------------------------
 * Meter Fill
 * -----------------------------------------------------------------------------------------------*/
interface MeterFillProps extends ComponentPropsWithRef<"div"> {}

const MeterFill = ({className, style, ...props}: MeterFillProps) => {
  const {slots, state} = useContext(MeterContext);

  return (
    <div
      className={composeSlotClassName(slots?.fill, className)}
      data-slot="meter-fill"
      style={{
        ...style,
        width: `${state?.percentage ?? 0}%`,
      }}
      {...props}
    />
  );
};

MeterFill.displayName = "HeroUI.Meter.Fill";

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {MeterRoot, MeterOutput, MeterTrack, MeterFill};

export type {MeterRootProps, MeterOutputProps, MeterTrackProps, MeterFillProps};
