import type {ComponentProps} from "react";

import {
  DateInputGroupInput,
  DateInputGroupInputContainer,
  DateInputGroupPrefix,
  DateInputGroupRoot,
  DateInputGroupSegment,
  DateInputGroupSuffix,
} from "./date-input-group";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const DateInputGroup = Object.assign(DateInputGroupRoot, {
  Root: DateInputGroupRoot,
  Input: DateInputGroupInput,
  InputContainer: DateInputGroupInputContainer,
  Segment: DateInputGroupSegment,
  Prefix: DateInputGroupPrefix,
  Suffix: DateInputGroupSuffix,
});

export type DateInputGroup = {
  Props: ComponentProps<typeof DateInputGroupRoot>;
  RootProps: ComponentProps<typeof DateInputGroupRoot>;
  InputProps: ComponentProps<typeof DateInputGroupInput>;
  InputContainerProps: ComponentProps<typeof DateInputGroupInputContainer>;
  SegmentProps: ComponentProps<typeof DateInputGroupSegment>;
  PrefixProps: ComponentProps<typeof DateInputGroupPrefix>;
  SuffixProps: ComponentProps<typeof DateInputGroupSuffix>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {
  DateInputGroupInput,
  DateInputGroupInputContainer,
  DateInputGroupPrefix,
  DateInputGroupRoot,
  DateInputGroupSegment,
  DateInputGroupSuffix,
};

export type {
  DateInputGroupRootProps,
  DateInputGroupRootProps as DateInputGroupProps,
  DateInputGroupInputProps,
  DateInputGroupInputContainerProps,
  DateInputGroupSegmentProps,
  DateInputGroupPrefixProps,
  DateInputGroupSuffixProps,
} from "./date-input-group";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {dateInputGroupVariants} from "@heroui/styles";

export type {DateInputGroupVariants} from "@heroui/styles";
