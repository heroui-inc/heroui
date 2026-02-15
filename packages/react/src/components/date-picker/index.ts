import type {ComponentProps} from "react";

import {
  DatePickerPopover,
  DatePickerRoot,
  DatePickerTrigger,
  DatePickerTriggerIndicator,
} from "./date-picker";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const DatePicker = Object.assign(DatePickerRoot, {
  Root: DatePickerRoot,
  Trigger: DatePickerTrigger,
  TriggerIndicator: DatePickerTriggerIndicator,
  Popover: DatePickerPopover,
});

export type DatePicker = {
  Props: ComponentProps<typeof DatePickerRoot>;
  RootProps: ComponentProps<typeof DatePickerRoot>;
  TriggerProps: ComponentProps<typeof DatePickerTrigger>;
  TriggerIndicatorProps: ComponentProps<typeof DatePickerTriggerIndicator>;
  PopoverProps: ComponentProps<typeof DatePickerPopover>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {DatePickerRoot, DatePickerTrigger, DatePickerTriggerIndicator, DatePickerPopover};

export type {
  DatePickerRootProps,
  DatePickerRootProps as DatePickerProps,
  DatePickerTriggerProps,
  DatePickerTriggerIndicatorProps,
  DatePickerPopoverProps,
} from "./date-picker";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {datePickerVariants} from "@heroui/styles";

export type {DatePickerVariants} from "@heroui/styles";
