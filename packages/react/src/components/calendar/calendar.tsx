"use client";

import type {CalendarVariants} from "./calendar.styles";
import type {
  ButtonProps as ButtonPrimitiveProps,
  CalendarCellProps as CalendarCellPrimitiveProps,
  CalendarGridHeaderProps as CalendarGridHeaderPrimitiveProps,
  CalendarGridProps as CalendarGridPrimitiveProps,
  CalendarHeaderCellProps as CalendarHeaderCellPrimitiveProps,
  CalendarProps as CalendarPrimitiveProps,
  DateValue,
  HeadingProps as HeadingPrimitiveProps,
} from "react-aria-components";

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

import {composeTwRenderProps} from "../../utils/compose";

import {calendarVariants} from "./calendar.styles";

/* -------------------------------------------------------------------------------------------------
 * Calendar Context
 * -----------------------------------------------------------------------------------------------*/

interface CalendarContext {
  slots?: ReturnType<typeof calendarVariants>;
}

const CalendarContext = createContext<CalendarContext>({});

/* -------------------------------------------------------------------------------------------------
 * Calendar
 * -----------------------------------------------------------------------------------------------*/

interface CalendarRootProps<T extends DateValue = DateValue>
  extends CalendarPrimitiveProps<T>,
    CalendarVariants {}

function CalendarRootInner<T extends DateValue = DateValue>(
  props: CalendarRootProps<T> & React.RefAttributes<HTMLDivElement>,
) {
  const {children, className, isDisabled, ...rest} = props;
  const slots = React.useMemo(() => calendarVariants({isDisabled}), [isDisabled]);

  return (
    <CalendarContext.Provider value={{slots}}>
      <CalendarPrimitive
        data-calendar
        isDisabled={isDisabled}
        {...rest}
        className={composeTwRenderProps(className, slots.base())}
      >
        {children}
      </CalendarPrimitive>
    </CalendarContext.Provider>
  );
}

const CalendarRoot = React.forwardRef(CalendarRootInner) as <T extends DateValue = DateValue>(
  props: CalendarRootProps<T> & React.RefAttributes<HTMLDivElement>,
) => React.ReactElement;

// @ts-expect-error - displayName on generic component
CalendarRoot.displayName = "HeroUI.Calendar.Root";

/* -----------------------------------------------------------------------------------------------*/

interface CalendarHeaderProps {
  children?: React.ReactNode;
  className?: string;
}

const CalendarHeader = React.forwardRef<HTMLDivElement, CalendarHeaderProps>(
  ({children, className, ...props}, ref) => {
    const {slots} = useContext(CalendarContext);

    return (
      <header ref={ref} data-calendar-header className={slots?.header({className})} {...props}>
        {children}
      </header>
    );
  },
);

CalendarHeader.displayName = "HeroUI.Calendar.Header";

/* -----------------------------------------------------------------------------------------------*/

interface CalendarHeadingProps extends HeadingPrimitiveProps {}

const CalendarHeading = React.forwardRef<HTMLHeadingElement, CalendarHeadingProps>(
  ({className, ...props}, ref) => {
    const {slots} = useContext(CalendarContext);

    return (
      <HeadingPrimitive
        ref={ref}
        data-calendar-heading
        {...props}
        className={slots?.heading({className})}
      />
    );
  },
);

CalendarHeading.displayName = "HeroUI.Calendar.Heading";

/* -----------------------------------------------------------------------------------------------*/

interface CalendarNavButtonProps extends ButtonPrimitiveProps {
  slot?: "previous" | "next";
}

const CalendarNavButton = React.forwardRef<HTMLButtonElement, CalendarNavButtonProps>(
  ({children, className, slot, ...props}, ref) => {
    const {slots} = useContext(CalendarContext);

    return (
      <ButtonPrimitive
        ref={ref}
        data-calendar-nav-button
        slot={slot}
        {...props}
        className={composeTwRenderProps(className, slots?.navButton())}
      >
        {children || (slot === "previous" ? "‹" : "›")}
      </ButtonPrimitive>
    );
  },
);

CalendarNavButton.displayName = "HeroUI.Calendar.NavButton";

/* -----------------------------------------------------------------------------------------------*/

interface CalendarGridProps extends CalendarGridPrimitiveProps {}

const CalendarGrid = React.forwardRef<HTMLTableElement, CalendarGridProps>(
  ({className, ...props}, ref) => {
    const {slots} = useContext(CalendarContext);

    return (
      <CalendarGridPrimitive
        ref={ref}
        data-calendar-grid
        {...props}
        className={slots?.grid({className})}
      >
        <CalendarGridHeader>
          {(day) => <CalendarHeaderCell>{day}</CalendarHeaderCell>}
        </CalendarGridHeader>
        <CalendarGridBodyPrimitive>
          {(date) => <CalendarCell date={date}>{date.day}</CalendarCell>}
        </CalendarGridBodyPrimitive>
      </CalendarGridPrimitive>
    );
  },
);

CalendarGrid.displayName = "HeroUI.Calendar.Grid";

/* -----------------------------------------------------------------------------------------------*/

interface CalendarGridHeaderProps extends CalendarGridHeaderPrimitiveProps {}

const CalendarGridHeader = React.forwardRef<HTMLTableSectionElement, CalendarGridHeaderProps>(
  ({className, ...props}, ref) => {
    const {slots} = useContext(CalendarContext);

    return (
      <CalendarGridHeaderPrimitive
        ref={ref}
        data-calendar-grid-header
        {...props}
        className={slots?.gridHeader({className})}
      />
    );
  },
);

CalendarGridHeader.displayName = "HeroUI.Calendar.GridHeader";

/* -----------------------------------------------------------------------------------------------*/

interface CalendarHeaderCellProps extends CalendarHeaderCellPrimitiveProps {}

const CalendarHeaderCell = React.forwardRef<HTMLTableCellElement, CalendarHeaderCellProps>(
  ({className, ...props}, ref) => {
    const {slots} = useContext(CalendarContext);

    return (
      <CalendarHeaderCellPrimitive
        ref={ref}
        data-calendar-header-cell
        {...props}
        className={slots?.headerCell({className})}
      />
    );
  },
);

CalendarHeaderCell.displayName = "HeroUI.Calendar.HeaderCell";

/* -----------------------------------------------------------------------------------------------*/

interface CalendarCellProps extends CalendarCellPrimitiveProps {}

const CalendarCell = React.forwardRef<HTMLTableCellElement, CalendarCellProps>(
  ({children, className, ...props}, ref) => {
    const {slots} = useContext(CalendarContext);

    return (
      <CalendarCellPrimitive
        ref={ref}
        data-calendar-cell
        {...props}
        className={composeTwRenderProps(className, slots?.cell())}
      >
        {(values) => {
          const {formattedDate, isDisabled, isHovered, isOutsideMonth, isSelected, isUnavailable} =
            values;

          return (
            <div
              className={slots?.cellButton({
                isSelected,
                isHovered,
                isDisabled,
                isUnavailable,
                isOutsideMonth,
              })}
            >
              {typeof children === "function" ? children(values) : children || formattedDate}
            </div>
          );
        }}
      </CalendarCellPrimitive>
    );
  },
);

CalendarCell.displayName = "HeroUI.Calendar.Cell";

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/

export const Calendar = Object.assign(
  {},
  {
    Root: CalendarRoot,
    Header: CalendarHeader,
    Heading: CalendarHeading,
    NavButton: CalendarNavButton,
    Grid: CalendarGrid,
    GridHeader: CalendarGridHeader,
    HeaderCell: CalendarHeaderCell,
    Cell: CalendarCell,
  },
);

export type {
  CalendarRootProps,
  CalendarHeaderProps,
  CalendarHeadingProps,
  CalendarNavButtonProps,
  CalendarGridProps,
  CalendarGridHeaderProps,
  CalendarHeaderCellProps,
  CalendarCellProps,
};
