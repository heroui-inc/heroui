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
  CalendarCell,
  CalendarCellIndicator,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader,
  CalendarHeader,
  CalendarHeaderCell,
  CalendarHeading,
  CalendarNavButton,
  CalendarRoot,
} from "./calendar";

/* -------------------------------------------------------------------------------------------------
| * Compound Component
| * -----------------------------------------------------------------------------------------------*/
export const Calendar = Object.assign(CalendarRoot, {
  Root: CalendarRoot,
  Header: CalendarHeader,
  Heading: CalendarHeading,
  NavButton: CalendarNavButton,
  Grid: CalendarGrid,
  GridHeader: CalendarGridHeader,
  GridBody: CalendarGridBody,
  HeaderCell: CalendarHeaderCell,
  Cell: CalendarCell,
  CellIndicator: CalendarCellIndicator,
  YearPickerTrigger: CalendarYearPickerTrigger,
  YearPickerTriggerHeading: CalendarYearPickerTriggerHeading,
  YearPickerTriggerIndicator: CalendarYearPickerTriggerIndicator,
  YearPickerGrid: CalendarYearPickerGrid,
  YearPickerGridBody: CalendarYearPickerGridBody,
  YearPickerCell: CalendarYearPickerCell,
});

export type Calendar = {
  Props: ComponentProps<typeof CalendarRoot>;
  RootProps: ComponentProps<typeof CalendarRoot>;
  HeaderProps: ComponentProps<typeof CalendarHeader>;
  HeadingProps: ComponentProps<typeof CalendarHeading>;
  NavButtonProps: ComponentProps<typeof CalendarNavButton>;
  GridProps: ComponentProps<typeof CalendarGrid>;
  GridHeaderProps: ComponentProps<typeof CalendarGridHeader>;
  GridBodyProps: ComponentProps<typeof CalendarGridBody>;
  HeaderCellProps: ComponentProps<typeof CalendarHeaderCell>;
  CellProps: ComponentProps<typeof CalendarCell>;
  CellIndicatorProps: ComponentProps<typeof CalendarCellIndicator>;
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
  CalendarRoot,
  CalendarHeader,
  CalendarHeading,
  CalendarNavButton,
  CalendarGrid,
  CalendarGridHeader,
  CalendarGridBody,
  CalendarHeaderCell,
  CalendarCell,
  CalendarCellIndicator,
};

export type {
  CalendarRootProps,
  CalendarRootProps as CalendarProps,
  CalendarHeaderProps,
  CalendarHeadingProps,
  CalendarNavButtonProps,
  CalendarGridProps,
  CalendarGridHeaderProps,
  CalendarGridBodyProps,
  CalendarHeaderCellProps,
  CalendarCellProps,
  CalendarCellIndicatorProps,
} from "./calendar";

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
export {calendarVariants} from "@heroui/styles";

export type {CalendarVariants} from "@heroui/styles";
