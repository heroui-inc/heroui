import type {ComponentProps} from "react";

import {
  ProgressCircleFillCircle,
  ProgressCircleRoot,
  ProgressCircleTrack,
  ProgressCircleTrackCircle,
} from "./progress-circle";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const ProgressCircle = Object.assign(ProgressCircleRoot, {
  Root: ProgressCircleRoot,
  Track: ProgressCircleTrack,
  TrackCircle: ProgressCircleTrackCircle,
  FillCircle: ProgressCircleFillCircle,
});

export type ProgressCircle = {
  Props: ComponentProps<typeof ProgressCircleRoot>;
  RootProps: ComponentProps<typeof ProgressCircleRoot>;
  TrackProps: ComponentProps<typeof ProgressCircleTrack>;
  TrackCircleProps: ComponentProps<typeof ProgressCircleTrackCircle>;
  FillCircleProps: ComponentProps<typeof ProgressCircleFillCircle>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {
  ProgressCircleRoot,
  ProgressCircleTrack,
  ProgressCircleTrackCircle,
  ProgressCircleFillCircle,
};

export type {
  ProgressCircleRootProps,
  ProgressCircleRootProps as ProgressCircleProps,
  ProgressCircleTrackProps,
  ProgressCircleTrackCircleProps,
  ProgressCircleFillCircleProps,
} from "./progress-circle";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {progressCircleVariants} from "@heroui/styles";

export type {ProgressCircleVariants} from "@heroui/styles";
