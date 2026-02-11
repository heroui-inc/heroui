"use client";

import type {CalendarVariants} from "@heroui/styles";
import type {ComponentPropsWithRef} from "react";
import type {DateValue} from "react-aria-components";

import {calendarVariants} from "@heroui/styles";
import {useControlledState} from "@react-stately/utils";
import React, {createContext, useContext} from "react";
import {
  Button as ButtonPrimitive,
  CalendarCell as CalendarCellPrimitive,
  CalendarGridBody as CalendarGridBodyPrimitive,
  CalendarGridHeader as CalendarGridHeaderPrimitive,
  CalendarGrid as CalendarGridPrimitive,
  CalendarHeaderCell as CalendarHeaderCellPrimitive,
  Calendar as CalendarPrimitive,
  Heading as HeadingPrimitive,
} from "react-aria-components";

import {composeSlotClassName, composeTwRenderProps} from "../../utils/compose";
import {YearPickerContext} from "../calendar-year-picker/year-picker-context";
import {IconChevronLeft, IconChevronRight} from "../icons";

/* -------------------------------------------------------------------------------------------------
| * Calendar Context
| * -----------------------------------------------------------------------------------------------*/
interface CalendarContext {
  slots?: ReturnType<typeof calendarVariants>;
}

const CalendarContext = createContext<CalendarContext>({});

/* -------------------------------------------------------------------------------------------------
| * Calendar Root
| * -----------------------------------------------------------------------------------------------*/
interface CalendarRootProps<T extends DateValue = DateValue>
  extends ComponentPropsWithRef<typeof CalendarPrimitive<T>>, CalendarVariants {
  isYearPickerOpen?: boolean;
  onYearPickerOpenChange?: (isYearPickerOpen: boolean) => void;
  defaultYearPickerOpen?: boolean;
}

function CalendarRoot<T extends DateValue = DateValue>({
  children,
  className,
  defaultYearPickerOpen: defaultYearPickerOpenProp = false,
  isYearPickerOpen: isYearPickerOpenProp,
  onYearPickerOpenChange: onYearPickerOpenChangeProp,
  ...rest
}: CalendarRootProps<T>) {
  const slots = React.useMemo(() => calendarVariants(), []);
  const [isYearPickerOpen, setIsYearPickerOpen] = useControlledState(
    isYearPickerOpenProp,
    defaultYearPickerOpenProp,
    onYearPickerOpenChangeProp,
  );

  return (
    <YearPickerContext value={{isYearPickerOpen, setIsYearPickerOpen}}>
      <CalendarContext value={{slots}}>
        <CalendarPrimitive
          data-slot="calendar"
          {...rest}
          className={composeTwRenderProps(className, slots.base())}
        >
          {children}
        </CalendarPrimitive>
      </CalendarContext>
    </YearPickerContext>
  );
}

CalendarRoot.displayName = "HeroUI.Calendar";

/* -------------------------------------------------------------------------------------------------
| * Calendar Header
| * -----------------------------------------------------------------------------------------------*/
interface CalendarHeaderProps extends ComponentPropsWithRef<"header"> {
  className?: string;
}

const CalendarHeader = ({children, className, ...props}: CalendarHeaderProps) => {
  const {slots} = useContext(CalendarContext);

  return (
    <header
      className={composeSlotClassName(slots?.header, className)}
      data-slot="calendar-header"
      {...props}
    >
      {children}
    </header>
  );
};

CalendarHeader.displayName = "HeroUI.Calendar.Header";

/* -------------------------------------------------------------------------------------------------
| * Calendar Heading
| * -----------------------------------------------------------------------------------------------*/
interface CalendarHeadingProps extends ComponentPropsWithRef<typeof HeadingPrimitive> {}

const CalendarHeading = ({className, ...props}: CalendarHeadingProps) => {
  const {slots} = useContext(CalendarContext);

  return (
    <HeadingPrimitive
      data-slot="calendar-heading"
      {...props}
      className={composeSlotClassName(slots?.heading, className)}
    />
  );
};

CalendarHeading.displayName = "HeroUI.Calendar.Heading";

/* -------------------------------------------------------------------------------------------------
| * Calendar Nav Button
| * -----------------------------------------------------------------------------------------------*/
interface CalendarNavButtonProps extends ComponentPropsWithRef<typeof ButtonPrimitive> {
  slot?: "previous" | "next";
}

const CalendarNavButton = ({children, className, slot, ...props}: CalendarNavButtonProps) => {
  const {slots} = useContext(CalendarContext);

  return (
    <ButtonPrimitive
      data-slot="calendar-nav-button"
      slot={slot}
      {...props}
      className={composeTwRenderProps(className, slots?.navButton())}
    >
      {children ||
        (slot === "previous" ? (
          <IconChevronLeft
            className={slots?.navButtonIcon()}
            data-slot="calendar-nav-button-icon"
          />
        ) : (
          <IconChevronRight
            className={slots?.navButtonIcon()}
            data-slot="calendar-nav-button-icon"
          />
        ))}
    </ButtonPrimitive>
  );
};

CalendarNavButton.displayName = "HeroUI.Calendar.NavButton";

/* -------------------------------------------------------------------------------------------------
| * Calendar Grid
| * -----------------------------------------------------------------------------------------------*/
interface CalendarGridProps extends ComponentPropsWithRef<typeof CalendarGridPrimitive> {}

const CalendarGrid = ({
  children,
  className,
  weekdayStyle = "short",
  ...props
}: CalendarGridProps) => {
  const {slots} = useContext(CalendarContext);

  return (
    <CalendarGridPrimitive
      data-slot="calendar-grid"
      weekdayStyle={weekdayStyle}
      {...props}
      className={composeSlotClassName(slots?.grid, className)}
    >
      {children}
    </CalendarGridPrimitive>
  );
};

CalendarGrid.displayName = "HeroUI.Calendar.Grid";

/* -------------------------------------------------------------------------------------------------
| * Calendar Grid Header
| * -----------------------------------------------------------------------------------------------*/
interface CalendarGridHeaderProps extends ComponentPropsWithRef<
  typeof CalendarGridHeaderPrimitive
> {}

const CalendarGridHeader = ({className, ...props}: CalendarGridHeaderProps) => {
  const {slots} = useContext(CalendarContext);

  return (
    <CalendarGridHeaderPrimitive
      data-slot="calendar-grid-header"
      {...props}
      className={composeSlotClassName(slots?.gridHeader, className)}
    />
  );
};

CalendarGridHeader.displayName = "HeroUI.Calendar.GridHeader";

/* -------------------------------------------------------------------------------------------------
| * Calendar Grid Body
| * -----------------------------------------------------------------------------------------------*/
interface CalendarGridBodyProps extends ComponentPropsWithRef<typeof CalendarGridBodyPrimitive> {}

const CalendarGridBody = ({className, ...props}: CalendarGridBodyProps) => {
  const {slots} = useContext(CalendarContext);

  return (
    <CalendarGridBodyPrimitive
      data-slot="calendar-grid-body"
      {...props}
      className={composeSlotClassName(slots?.gridBody, className)}
    />
  );
};

CalendarGridBody.displayName = "HeroUI.Calendar.GridBody";

/* -------------------------------------------------------------------------------------------------
| * Calendar Header Cell
| * -----------------------------------------------------------------------------------------------*/
interface CalendarHeaderCellProps extends ComponentPropsWithRef<
  typeof CalendarHeaderCellPrimitive
> {}

const CalendarHeaderCell = ({className, ...props}: CalendarHeaderCellProps) => {
  const {slots} = useContext(CalendarContext);

  return (
    <CalendarHeaderCellPrimitive
      data-slot="calendar-header-cell"
      {...props}
      className={composeSlotClassName(slots?.headerCell, className)}
    />
  );
};

CalendarHeaderCell.displayName = "HeroUI.Calendar.HeaderCell";

/* -------------------------------------------------------------------------------------------------
| * Calendar Cell
| * -----------------------------------------------------------------------------------------------*/
interface CalendarCellProps extends ComponentPropsWithRef<typeof CalendarCellPrimitive> {}

const CalendarCell = ({children, className, ...props}: CalendarCellProps) => {
  const {slots} = useContext(CalendarContext);

  return (
    <CalendarCellPrimitive
      data-slot="calendar-cell"
      {...props}
      className={composeTwRenderProps(className, slots?.cell())}
    >
      {(values) => {
        const {formattedDate} = values;

        return typeof children === "function" ? children(values) : children || formattedDate;
      }}
    </CalendarCellPrimitive>
  );
};

CalendarCell.displayName = "HeroUI.Calendar.Cell";

/* -------------------------------------------------------------------------------------------------
| * Calendar Cell Indicator
| * -----------------------------------------------------------------------------------------------*/
interface CalendarCellIndicatorProps extends ComponentPropsWithRef<"span"> {}

const CalendarCellIndicator = ({className, ...props}: CalendarCellIndicatorProps) => {
  const {slots} = useContext(CalendarContext);

  return (
    <span
      aria-hidden="true"
      className={composeSlotClassName(slots?.cellIndicator, className)}
      data-slot="calendar-cell-indicator"
      {...props}
    />
  );
};

CalendarCellIndicator.displayName = "HeroUI.Calendar.CellIndicator";

/* -------------------------------------------------------------------------------------------------
| * Exports
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
  CalendarHeaderProps,
  CalendarHeadingProps,
  CalendarNavButtonProps,
  CalendarGridProps,
  CalendarGridHeaderProps,
  CalendarGridBodyProps,
  CalendarHeaderCellProps,
  CalendarCellProps,
  CalendarCellIndicatorProps,
};
