import type {ComponentProps} from "react";

import {
  DateInputGroupInput,
  DateInputGroupPrefix,
  DateInputGroupRoot,
  DateInputGroupSegment,
  DateInputGroupSuffix,
} from "../date-input-group";

import {TimeFieldRoot} from "./time-field";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const TimeField = Object.assign(TimeFieldRoot, {
  Root: TimeFieldRoot,
  Group: DateInputGroupRoot,
  Input: DateInputGroupInput,
  Segment: DateInputGroupSegment,
  Prefix: DateInputGroupPrefix,
  Suffix: DateInputGroupSuffix,
});

export type TimeField = {
  Props: ComponentProps<typeof TimeFieldRoot>;
  RootProps: ComponentProps<typeof TimeFieldRoot>;
  GroupProps: ComponentProps<typeof DateInputGroupRoot>;
  InputProps: ComponentProps<typeof DateInputGroupInput>;
  SegmentProps: ComponentProps<typeof DateInputGroupSegment>;
  PrefixProps: ComponentProps<typeof DateInputGroupPrefix>;
  SuffixProps: ComponentProps<typeof DateInputGroupSuffix>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {TimeFieldRoot};

export type {TimeFieldRootProps, TimeFieldRootProps as TimeFieldProps} from "./time-field";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {timeFieldVariants} from "@heroui/styles";

export type {TimeFieldVariants} from "@heroui/styles";
