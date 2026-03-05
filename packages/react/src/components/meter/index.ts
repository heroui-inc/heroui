import type {ComponentProps} from "react";

import {MeterFill, MeterOutput, MeterRoot, MeterTrack} from "./meter";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const Meter = Object.assign(MeterRoot, {
  Root: MeterRoot,
  Output: MeterOutput,
  Track: MeterTrack,
  Fill: MeterFill,
});

export type Meter = {
  Props: ComponentProps<typeof MeterRoot>;
  RootProps: ComponentProps<typeof MeterRoot>;
  OutputProps: ComponentProps<typeof MeterOutput>;
  TrackProps: ComponentProps<typeof MeterTrack>;
  FillProps: ComponentProps<typeof MeterFill>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {MeterRoot, MeterOutput, MeterTrack, MeterFill};

export type {
  MeterRootProps,
  MeterRootProps as MeterProps,
  MeterOutputProps,
  MeterTrackProps,
  MeterFillProps,
} from "./meter";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {meterVariants} from "@heroui/styles";

export type {MeterVariants} from "@heroui/styles";
