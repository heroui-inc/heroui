import type {ComponentProps} from "react";

import {
  DateFieldGroup,
  DateFieldInput,
  DateFieldPrefix,
  DateFieldRoot,
  DateFieldSegment,
  DateFieldSuffix,
} from "./date-field";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const DateField = Object.assign(DateFieldRoot, {
  Root: DateFieldRoot,
  Group: DateFieldGroup,
  Input: DateFieldInput,
  Segment: DateFieldSegment,
  Prefix: DateFieldPrefix,
  Suffix: DateFieldSuffix,
});

export type DateField = {
  Props: ComponentProps<typeof DateFieldRoot>;
  RootProps: ComponentProps<typeof DateFieldRoot>;
  GroupProps: ComponentProps<typeof DateFieldGroup>;
  InputProps: ComponentProps<typeof DateFieldInput>;
  SegmentProps: ComponentProps<typeof DateFieldSegment>;
  PrefixProps: ComponentProps<typeof DateFieldPrefix>;
  SuffixProps: ComponentProps<typeof DateFieldSuffix>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {
  DateFieldGroup,
  DateFieldInput,
  DateFieldPrefix,
  DateFieldRoot,
  DateFieldSegment,
  DateFieldSuffix,
};

export type {
  DateFieldRootProps,
  DateFieldRootProps as DateFieldProps,
  DateFieldGroupProps,
  DateFieldInputProps,
  DateFieldSegmentProps,
  DateFieldPrefixProps,
  DateFieldSuffixProps,
} from "./date-field";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {dateFieldVariants} from "./date-field.styles";

export type {DateFieldVariants} from "./date-field.styles";
