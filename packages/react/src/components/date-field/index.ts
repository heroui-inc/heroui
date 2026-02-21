import type {ComponentProps} from "react";

import {
  DateInputGroupInput,
  DateInputGroupInputContainer,
  DateInputGroupPrefix,
  DateInputGroupRoot,
  DateInputGroupSegment,
  DateInputGroupSuffix,
} from "../date-input-group";

import {DateFieldRoot} from "./date-field";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const DateField = Object.assign(DateFieldRoot, {
  Root: DateFieldRoot,
  Group: DateInputGroupRoot,
  Input: DateInputGroupInput,
  InputContainer: DateInputGroupInputContainer,
  Segment: DateInputGroupSegment,
  Prefix: DateInputGroupPrefix,
  Suffix: DateInputGroupSuffix,
});

export type DateField = {
  Props: ComponentProps<typeof DateFieldRoot>;
  RootProps: ComponentProps<typeof DateFieldRoot>;
  GroupProps: ComponentProps<typeof DateInputGroupRoot>;
  InputProps: ComponentProps<typeof DateInputGroupInput>;
  InputContainerProps: ComponentProps<typeof DateInputGroupInputContainer>;
  SegmentProps: ComponentProps<typeof DateInputGroupSegment>;
  PrefixProps: ComponentProps<typeof DateInputGroupPrefix>;
  SuffixProps: ComponentProps<typeof DateInputGroupSuffix>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {DateFieldRoot};

export type {DateFieldRootProps, DateFieldRootProps as DateFieldProps} from "./date-field";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {dateFieldVariants} from "@heroui/styles";

export type {DateFieldVariants} from "@heroui/styles";
