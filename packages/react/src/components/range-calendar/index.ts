import type {ComponentProps} from "react";

import {
  CalendarYearPickerCell,
  CalendarYearPickerGrid,
  CalendarYearPickerGridBody,
  CalendarYearPickerTrigger,
  CalendarYearPickerTriggerHeading,
  CalendarYearPickerTriggerIndicator,
} from "../calendar-year-picker";

import {
  RangeCalendarCell,
  RangeCalendarCellIndicator,
  RangeCalendarGrid,
  RangeCalendarGridBody,
  RangeCalendarGridHeader,
  RangeCalendarHeader,
  RangeCalendarHeaderCell,
  RangeCalendarHeading,
  RangeCalendarNavButton,
  RangeCalendarRoot,
} from "./range-calendar";

/* -------------------------------------------------------------------------------------------------
| * Compound Component
| * -----------------------------------------------------------------------------------------------*/
export const RangeCalendar = Object.assign(RangeCalendarRoot, {
  Root: RangeCalendarRoot,
  Header: RangeCalendarHeader,
  Heading: RangeCalendarHeading,
  NavButton: RangeCalendarNavButton,
  Grid: RangeCalendarGrid,
  GridHeader: RangeCalendarGridHeader,
  GridBody: RangeCalendarGridBody,
  HeaderCell: RangeCalendarHeaderCell,
  Cell: RangeCalendarCell,
  CellIndicator: RangeCalendarCellIndicator,
  YearPickerTrigger: CalendarYearPickerTrigger,
  YearPickerTriggerHeading: CalendarYearPickerTriggerHeading,
  YearPickerTriggerIndicator: CalendarYearPickerTriggerIndicator,
  YearPickerGrid: CalendarYearPickerGrid,
  YearPickerGridBody: CalendarYearPickerGridBody,
  YearPickerCell: CalendarYearPickerCell,
});

export type RangeCalendar = {
  Props: ComponentProps<typeof RangeCalendarRoot>;
  RootProps: ComponentProps<typeof RangeCalendarRoot>;
  HeaderProps: ComponentProps<typeof RangeCalendarHeader>;
  HeadingProps: ComponentProps<typeof RangeCalendarHeading>;
  NavButtonProps: ComponentProps<typeof RangeCalendarNavButton>;
  GridProps: ComponentProps<typeof RangeCalendarGrid>;
  GridHeaderProps: ComponentProps<typeof RangeCalendarGridHeader>;
  GridBodyProps: ComponentProps<typeof RangeCalendarGridBody>;
  HeaderCellProps: ComponentProps<typeof RangeCalendarHeaderCell>;
  CellProps: ComponentProps<typeof RangeCalendarCell>;
  CellIndicatorProps: ComponentProps<typeof RangeCalendarCellIndicator>;
  YearPickerTriggerProps: ComponentProps<typeof CalendarYearPickerTrigger>;
  YearPickerTriggerHeadingProps: ComponentProps<typeof CalendarYearPickerTriggerHeading>;
  YearPickerTriggerIndicatorProps: ComponentProps<typeof CalendarYearPickerTriggerIndicator>;
  YearPickerGridProps: ComponentProps<typeof CalendarYearPickerGrid>;
  YearPickerGridBodyProps: ComponentProps<typeof CalendarYearPickerGridBody>;
  YearPickerCellProps: ComponentProps<typeof CalendarYearPickerCell>;
};

/* -------------------------------------------------------------------------------------------------
| * Named Component
| * -----------------------------------------------------------------------------------------------*/
export {
  RangeCalendarRoot,
  RangeCalendarHeader,
  RangeCalendarHeading,
  RangeCalendarNavButton,
  RangeCalendarGrid,
  RangeCalendarGridHeader,
  RangeCalendarGridBody,
  RangeCalendarHeaderCell,
  RangeCalendarCell,
  RangeCalendarCellIndicator,
};

export type {
  RangeCalendarRootProps,
  RangeCalendarRootProps as RangeCalendarProps,
  RangeCalendarHeaderProps,
  RangeCalendarHeadingProps,
  RangeCalendarNavButtonProps,
  RangeCalendarGridProps,
  RangeCalendarGridHeaderProps,
  RangeCalendarGridBodyProps,
  RangeCalendarHeaderCellProps,
  RangeCalendarCellProps,
  RangeCalendarCellIndicatorProps,
} from "./range-calendar";

/* -------------------------------------------------------------------------------------------------
| * YearPickerContext (re-exported from calendar-year-picker for convenience)
| * -----------------------------------------------------------------------------------------------*/
export {
  YearPickerContext,
  YearPickerStateContext,
  useYearPicker,
  useYearPickerState,
} from "../calendar-year-picker";
export type {YearPickerContextValue, YearPickerStateContextValue} from "../calendar-year-picker";

/* -------------------------------------------------------------------------------------------------
| * Variants
| * -----------------------------------------------------------------------------------------------*/
export {rangeCalendarVariants} from "@heroui/styles";

export type {RangeCalendarVariants} from "@heroui/styles";
