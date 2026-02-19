import type {ComponentProps} from "react";

import {
  DateRangePickerPopover,
  DateRangePickerRangeSeparator,
  DateRangePickerRoot,
  DateRangePickerTrigger,
  DateRangePickerTriggerIndicator,
} from "./date-range-picker";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const DateRangePicker = Object.assign(DateRangePickerRoot, {
  Root: DateRangePickerRoot,
  Trigger: DateRangePickerTrigger,
  TriggerIndicator: DateRangePickerTriggerIndicator,
  RangeSeparator: DateRangePickerRangeSeparator,
  Popover: DateRangePickerPopover,
});

export type DateRangePicker = {
  Props: ComponentProps<typeof DateRangePickerRoot>;
  RootProps: ComponentProps<typeof DateRangePickerRoot>;
  TriggerProps: ComponentProps<typeof DateRangePickerTrigger>;
  TriggerIndicatorProps: ComponentProps<typeof DateRangePickerTriggerIndicator>;
  RangeSeparatorProps: ComponentProps<typeof DateRangePickerRangeSeparator>;
  PopoverProps: ComponentProps<typeof DateRangePickerPopover>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {
  DateRangePickerRoot,
  DateRangePickerTrigger,
  DateRangePickerTriggerIndicator,
  DateRangePickerRangeSeparator,
  DateRangePickerPopover,
};

export type {
  DateRangePickerRootProps,
  DateRangePickerRootProps as DateRangePickerProps,
  DateRangePickerTriggerProps,
  DateRangePickerTriggerIndicatorProps,
  DateRangePickerRangeSeparatorProps,
  DateRangePickerPopoverProps,
} from "./date-range-picker";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {dateRangePickerVariants} from "@heroui/styles";

export type {DateRangePickerVariants} from "@heroui/styles";
