import type {ComponentProps} from "react";

import {CalendarYearPickerGrid, CalendarYearPickerTrigger} from "./calendar-year-picker";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const CalendarYearPicker = {
  Trigger: CalendarYearPickerTrigger,
  Grid: CalendarYearPickerGrid,
};

export type CalendarYearPicker = {
  TriggerProps: ComponentProps<typeof CalendarYearPickerTrigger>;
  GridProps: ComponentProps<typeof CalendarYearPickerGrid>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {CalendarYearPickerTrigger, CalendarYearPickerGrid};

export type {
  CalendarYearPickerTriggerProps,
  CalendarYearPickerGridProps,
} from "./calendar-year-picker";

/* -------------------------------------------------------------------------------------------------
 * YearPickerContext
 * -----------------------------------------------------------------------------------------------*/
export {YearPickerContext, useYearPicker} from "./year-picker-context";
export type {YearPickerContextValue} from "./year-picker-context";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {calendarYearPickerVariants} from "@heroui/styles";

export type {CalendarYearPickerVariants} from "@heroui/styles";
