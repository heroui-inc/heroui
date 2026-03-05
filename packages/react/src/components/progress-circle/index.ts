import type {ComponentProps} from "react";

import {ProgressCircleOutput, ProgressCircleRoot, ProgressCircleTrack} from "./progress-circle";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const ProgressCircle = Object.assign(ProgressCircleRoot, {
  Root: ProgressCircleRoot,
  Track: ProgressCircleTrack,
  Output: ProgressCircleOutput,
});

export type ProgressCircle = {
  Props: ComponentProps<typeof ProgressCircleRoot>;
  RootProps: ComponentProps<typeof ProgressCircleRoot>;
  TrackProps: ComponentProps<typeof ProgressCircleTrack>;
  OutputProps: ComponentProps<typeof ProgressCircleOutput>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {ProgressCircleRoot, ProgressCircleTrack, ProgressCircleOutput};

export type {
  ProgressCircleRootProps,
  ProgressCircleRootProps as ProgressCircleProps,
  ProgressCircleTrackProps,
  ProgressCircleOutputProps,
} from "./progress-circle";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {progressCircleVariants} from "@heroui/styles";

export type {ProgressCircleVariants} from "@heroui/styles";
