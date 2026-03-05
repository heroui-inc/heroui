import type {ComponentProps} from "react";

import {ProgressCircleRoot, ProgressCircleTrack} from "./progress-circle";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const ProgressCircle = Object.assign(ProgressCircleRoot, {
  Root: ProgressCircleRoot,
  Track: ProgressCircleTrack,
});

export type ProgressCircle = {
  Props: ComponentProps<typeof ProgressCircleRoot>;
  RootProps: ComponentProps<typeof ProgressCircleRoot>;
  TrackProps: ComponentProps<typeof ProgressCircleTrack>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {ProgressCircleRoot, ProgressCircleTrack};

export type {
  ProgressCircleRootProps,
  ProgressCircleRootProps as ProgressCircleProps,
  ProgressCircleTrackProps,
} from "./progress-circle";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {progressCircleVariants} from "@heroui/styles";

export type {ProgressCircleVariants} from "@heroui/styles";
