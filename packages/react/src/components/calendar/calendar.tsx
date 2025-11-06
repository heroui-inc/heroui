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
 * Calendar Root
 * -----------------------------------------------------------------------------------------------*/
interface CalendarRootProps<T extends DateValue = DateValue>
  extends CalendarPrimitiveProps<T>,
    CalendarVariants {}

function CalendarRoot<T extends DateValue = DateValue>({
  children,
  className,
  isDisabled,
  ...rest
}: CalendarRootProps<T>) {
  const slots = React.useMemo(() => calendarVariants({isDisabled}), [isDisabled]);

  return (
    <CalendarContext value={{slots}}>
      <CalendarPrimitive
        data-slot="calendar"
        isDisabled={isDisabled}
        {...rest}
        className={composeTwRenderProps(className, slots.base())}
      >
        {children}
      </CalendarPrimitive>
    </CalendarContext>
  );
}

/* -------------------------------------------------------------------------------------------------
 * Calendar Header
 * -----------------------------------------------------------------------------------------------*/
interface CalendarHeaderProps extends React.ComponentProps<"header"> {
  className?: string;
}

const CalendarHeader = ({children, className, ...props}: CalendarHeaderProps) => {
  const {slots} = useContext(CalendarContext);

  return (
    <header className={slots?.header({className})} data-slot="calendar-header" {...props}>
      {children}
    </header>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Calendar Heading
 * -----------------------------------------------------------------------------------------------*/
interface CalendarHeadingProps extends HeadingPrimitiveProps {}

const CalendarHeading = ({className, ...props}: CalendarHeadingProps) => {
  const {slots} = useContext(CalendarContext);

  return (
    <HeadingPrimitive
      data-slot="calendar-heading"
      {...props}
      className={slots?.heading({className})}
    />
  );
};

/* -------------------------------------------------------------------------------------------------
 * Calendar Nav Button
 * -----------------------------------------------------------------------------------------------*/
interface CalendarNavButtonProps extends ButtonPrimitiveProps {
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
      {children || (slot === "previous" ? "‹" : "›")}
    </ButtonPrimitive>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Calendar Grid
 * -----------------------------------------------------------------------------------------------*/
interface CalendarGridProps extends CalendarGridPrimitiveProps {}

const CalendarGrid = ({className, ...props}: CalendarGridProps) => {
  const {slots} = useContext(CalendarContext);

  return (
    <CalendarGridPrimitive
      data-slot="calendar-grid"
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
};

/* -------------------------------------------------------------------------------------------------
 * Calendar Grid Header
 * -----------------------------------------------------------------------------------------------*/
interface CalendarGridHeaderProps extends CalendarGridHeaderPrimitiveProps {}

const CalendarGridHeader = ({className, ...props}: CalendarGridHeaderProps) => {
  const {slots} = useContext(CalendarContext);

  return (
    <CalendarGridHeaderPrimitive
      data-slot="calendar-grid-header"
      {...props}
      className={slots?.gridHeader({className})}
    />
  );
};

/* -------------------------------------------------------------------------------------------------
 * Calendar Header Cell
 * -----------------------------------------------------------------------------------------------*/
interface CalendarHeaderCellProps extends CalendarHeaderCellPrimitiveProps {}

const CalendarHeaderCell = ({className, ...props}: CalendarHeaderCellProps) => {
  const {slots} = useContext(CalendarContext);

  return (
    <CalendarHeaderCellPrimitive
      data-slot="calendar-header-cell"
      {...props}
      className={slots?.headerCell({className})}
    />
  );
};

/* -------------------------------------------------------------------------------------------------
 * Calendar Cell
 * -----------------------------------------------------------------------------------------------*/
interface CalendarCellProps extends CalendarCellPrimitiveProps {}

const CalendarCell = ({children, className, ...props}: CalendarCellProps) => {
  const {slots} = useContext(CalendarContext);

  return (
    <CalendarCellPrimitive
      data-slot="calendar-cell"
      {...props}
      className={composeTwRenderProps(className, slots?.cell())}
    >
      {(values) => {
        const {formattedDate, isDisabled, isHovered, isOutsideMonth, isSelected, isUnavailable} =
          values;

        return (
          <div
            className={slots?.cellButton({
              isDisabled,
              isHovered,
              isOutsideMonth,
              isSelected,
              isUnavailable,
            })}
          >
            {typeof children === "function" ? children(values) : children || formattedDate}
          </div>
        );
      }}
    </CalendarCellPrimitive>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Exports
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
  CalendarHeaderProps,
  CalendarHeadingProps,
  CalendarNavButtonProps,
  CalendarGridProps,
  CalendarGridHeaderProps,
  CalendarHeaderCellProps,
  CalendarCellProps,
};
