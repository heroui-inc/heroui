import type {ComponentProps} from "react";

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
| * Variants
| * -----------------------------------------------------------------------------------------------*/
export {calendarVariants} from "@heroui/styles";

export type {CalendarVariants} from "@heroui/styles";
