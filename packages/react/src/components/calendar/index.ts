import type {ComponentProps} from "react";

import {
  CalendarCell,
  CalendarGrid,
  CalendarGridHeader,
  CalendarHeader,
  CalendarHeaderCell,
  CalendarHeading,
  CalendarNavButton,
  CalendarRoot,
} from "./calendar";

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const Calendar = Object.assign(CalendarRoot, {
  Root: CalendarRoot,
  Header: CalendarHeader,
  Heading: CalendarHeading,
  NavButton: CalendarNavButton,
  Grid: CalendarGrid,
  GridHeader: CalendarGridHeader,
  HeaderCell: CalendarHeaderCell,
  Cell: CalendarCell,
});

export type Calendar = {
  Props: ComponentProps<typeof CalendarRoot>;
  RootProps: ComponentProps<typeof CalendarRoot>;
  HeaderProps: ComponentProps<typeof CalendarHeader>;
  HeadingProps: ComponentProps<typeof CalendarHeading>;
  NavButtonProps: ComponentProps<typeof CalendarNavButton>;
  GridProps: ComponentProps<typeof CalendarGrid>;
  GridHeaderProps: ComponentProps<typeof CalendarGridHeader>;
  HeaderCellProps: ComponentProps<typeof CalendarHeaderCell>;
  CellProps: ComponentProps<typeof CalendarCell>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export {
  CalendarRoot,
  CalendarHeader,
  CalendarHeading,
  CalendarNavButton,
  CalendarGrid,
  CalendarGridHeader,
  CalendarHeaderCell,
  CalendarCell,
};

export type {
  CalendarRootProps,
  CalendarRootProps as CalendarProps,
  CalendarHeaderProps,
  CalendarHeadingProps,
  CalendarNavButtonProps,
  CalendarGridProps,
  CalendarGridHeaderProps,
  CalendarHeaderCellProps,
  CalendarCellProps,
} from "./calendar";

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export {calendarVariants} from "./calendar.styles";

export type {CalendarVariants} from "./calendar.styles";
