import type {ComponentProps} from "react";

import {
  StackedMeterLegend,
  StackedMeterOutput,
  StackedMeterRoot,
  StackedMeterTrack,
} from "./stacked-meter";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const StackedMeter = Object.assign(StackedMeterRoot, {
  Root: StackedMeterRoot,
  Output: StackedMeterOutput,
  Track: StackedMeterTrack,
  Legend: StackedMeterLegend,
});

export type StackedMeter = {
  Props: ComponentProps<typeof StackedMeterRoot>;
  RootProps: ComponentProps<typeof StackedMeterRoot>;
  OutputProps: ComponentProps<typeof StackedMeterOutput>;
  TrackProps: ComponentProps<typeof StackedMeterTrack>;
  LegendProps: ComponentProps<typeof StackedMeterLegend>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {StackedMeterRoot, StackedMeterOutput, StackedMeterTrack, StackedMeterLegend};

export type {
  StackedMeterRootProps,
  StackedMeterRootProps as StackedMeterProps,
  StackedMeterOutputProps,
  StackedMeterTrackProps,
  StackedMeterLegendProps,
  StackedMeterSegment,
  StackedMeterColor,
  StackedMeterSize,
} from "./stacked-meter";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {stackedMeterVariants} from "@heroui/styles";

export type {StackedMeterVariants} from "@heroui/styles";
