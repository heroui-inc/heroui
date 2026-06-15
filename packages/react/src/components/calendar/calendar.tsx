"use client";

import type {DOMRenderProps} from "../../utils/dom";
import type {CalendarVariants} from "@heroui/styles";
import type {CalendarIdentifier} from "@internationalized/date";
import type {ComponentPropsWithRef, ReactNode} from "react";
import type {
  CalendarRenderProps,
  CalendarSelectionMode,
  DateValue,
  CalendarProps as RACCalendarProps,
} from "react-aria-components/Calendar";

import {calendarVariants} from "@heroui/styles";
import {CalendarDate, DateFormatter, createCalendar} from "@internationalized/date";
import {useControlledState} from "@react-stately/utils";
import React, {createContext, memo, useContext, useMemo} from "react";
import {Button as ButtonPrimitive} from "react-aria-components/Button";
import {
  CalendarCell as CalendarCellPrimitive,
  CalendarGridBody as CalendarGridBodyPrimitive,
  CalendarGridHeader as CalendarGridHeaderPrimitive,
  CalendarGrid as CalendarGridPrimitive,
  CalendarHeaderCell as CalendarHeaderCellPrimitive,
  CalendarHeading as CalendarHeadingPrimitive,
  Calendar as CalendarPrimitive,
} from "react-aria-components/Calendar";
import {useLocale} from "react-aria-components/I18nProvider";
import {cx} from "tailwind-variants";

import {getGregorianYearOffset} from "../../utils/calendar";
import {composeTwRenderProps} from "../../utils/compose";
import {dom} from "../../utils/dom";
import {YearPickerContext} from "../calendar-year-picker/year-picker-context";
import {IconChevronLeft, IconChevronRight} from "../icons";

import {CalendarDayViewGridBody} from "./calendar-day-view-grid-body";
import {CalendarDayViewGridHeader} from "./calendar-day-view-grid-header";

/* -------------------------------------------------------------------------------------------------
| * Calendar Context
| * -----------------------------------------------------------------------------------------------*/
interface CalendarDayViewContext {
  days: number;
  firstDayOfWeek?: CalendarRootProps["firstDayOfWeek"];
  timeZone: string;
  visibleRange: {end: DateValue; start: DateValue};
  weekdayStyle?: "narrow" | "short" | "long";
}

interface CalendarContext {
  cellClassName?: string;
  cellIndicatorClassName?: string;
  dayView?: CalendarDayViewContext;
  gridBodyClassName?: string;
  gridClassName?: string;
  gridHeaderClassName?: string;
  headerCellClassName?: string;
  headerClassName?: string;
  headingClassName?: string;
  navButtonClassName?: string;
  navButtonIconClassName?: string;
}

const CalendarContext = createContext<CalendarContext>({});

/* -------------------------------------------------------------------------------------------------
| * Calendar Root
| * -----------------------------------------------------------------------------------------------*/
interface CalendarRootProps<
  T extends DateValue = DateValue,
  M extends CalendarSelectionMode = "single",
>
  extends RACCalendarProps<T, M>, CalendarVariants {
  isYearPickerOpen?: boolean;
  onYearPickerOpenChange?: (isYearPickerOpen: boolean) => void;
  defaultYearPickerOpen?: boolean;
}

interface CalendarRootContentProps<
  T extends DateValue = DateValue,
  M extends CalendarSelectionMode = "single",
> {
  children: CalendarRootProps<T, M>["children"];
  dayView?: CalendarDayViewContext;
  slotClassNames: Omit<CalendarContext, "dayView">;
  values: CalendarRenderProps<M> & {defaultChildren: ReactNode};
}

const CalendarRootContent = memo(function CalendarRootContent<
  T extends DateValue = DateValue,
  M extends CalendarSelectionMode = "single",
>({children, dayView, slotClassNames, values}: CalendarRootContentProps<T, M>) {
  const contextValue = useMemo<CalendarContext>(
    () => ({
      dayView,
      ...slotClassNames,
    }),
    [dayView, slotClassNames],
  );

  return (
    <CalendarContext value={contextValue}>
      {typeof children === "function" ? children(values) : children}
    </CalendarContext>
  );
}) as <T extends DateValue = DateValue, M extends CalendarSelectionMode = "single">(
  props: CalendarRootContentProps<T, M>,
) => React.JSX.Element;

function CalendarRootInner<
  T extends DateValue = DateValue,
  M extends CalendarSelectionMode = "single",
>({
  children,
  className,
  defaultYearPickerOpen: defaultYearPickerOpenProp = false,
  firstDayOfWeek,
  isYearPickerOpen: isYearPickerOpenProp,
  maxValue: maxValueProp,
  minValue: minValueProp,
  onYearPickerOpenChange: onYearPickerOpenChangeProp,
  visibleDuration,
  ...rest
}: CalendarRootProps<T, M>) {
  const isWeekView = visibleDuration?.weeks != null;
  const isDayView = visibleDuration?.days != null;
  const visibleDays = visibleDuration?.days;
  const {locale} = useLocale();
  const slots = useMemo(() => calendarVariants(), []);
  const slotClassNames = useMemo<Omit<CalendarContext, "dayView">>(
    () => ({
      cellClassName: slots.cell(),
      cellIndicatorClassName: slots.cellIndicator(),
      gridBodyClassName: slots.gridBody(),
      gridClassName: slots.grid(),
      gridHeaderClassName: slots.gridHeader(),
      headerCellClassName: slots.headerCell(),
      headerClassName: slots.header(),
      headingClassName: slots.heading(),
      navButtonClassName: slots.navButton(),
      navButtonIconClassName: slots.navButtonIcon(),
    }),
    [slots],
  );
  const baseClassName = useMemo(
    () => cx(slots.base(), isWeekView && "calendar--week-view", isDayView && "calendar--day-view"),
    [isDayView, isWeekView, slots],
  );
  const calendarRef = React.useRef<HTMLDivElement>(null);
  const [isYearPickerOpen, setIsYearPickerOpen] = useControlledState(
    isYearPickerOpenProp,
    defaultYearPickerOpenProp,
    onYearPickerOpenChangeProp,
  );
  const calendarProp = useMemo(() => {
    const calendarIdentifier = new DateFormatter(locale).resolvedOptions()
      .calendar as CalendarIdentifier;

    return createCalendar(calendarIdentifier);
  }, [locale]);
  const gregorianYearOffset = useMemo(
    () => getGregorianYearOffset(calendarProp.identifier),
    [calendarProp.identifier],
  );
  const minValue =
    minValueProp ??
    (new CalendarDate(calendarProp, 1900 + gregorianYearOffset, 1, 1) as unknown as T);
  const maxValue =
    maxValueProp ??
    (new CalendarDate(calendarProp, 2099 + gregorianYearOffset, 12, 31) as unknown as T);

  return (
    <YearPickerContext
      value={{
        calendarGridSlot: "calendar-grid",
        isYearPickerOpen,
        setIsYearPickerOpen,
        calendarRef,
      }}
    >
      <CalendarPrimitive
        ref={calendarRef}
        data-slot="calendar"
        firstDayOfWeek={firstDayOfWeek}
        maxValue={maxValue}
        minValue={minValue}
        visibleDuration={visibleDuration}
        {...rest}
        className={composeTwRenderProps(className, baseClassName)}
      >
        {(values) => (
          <CalendarRootContent
            slotClassNames={slotClassNames}
            values={values}
            dayView={
              isDayView && visibleDays != null
                ? {
                    days: visibleDays,
                    firstDayOfWeek,
                    timeZone: values.state.timeZone,
                    visibleRange: values.state.visibleRange,
                  }
                : undefined
            }
          >
            {children}
          </CalendarRootContent>
        )}
      </CalendarPrimitive>
    </YearPickerContext>
  );
}

CalendarRootInner.displayName = "HeroUI.Calendar";

const CalendarRoot = memo(CalendarRootInner) as <
  T extends DateValue = DateValue,
  M extends CalendarSelectionMode = "single",
>(
  props: CalendarRootProps<T, M>,
) => React.JSX.Element;

/* -------------------------------------------------------------------------------------------------
| * Calendar Header
| * -----------------------------------------------------------------------------------------------*/
interface CalendarHeaderProps<
  E extends keyof React.JSX.IntrinsicElements = "header",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

function CalendarHeaderInner<E extends keyof React.JSX.IntrinsicElements = "header">({
  children,
  className,
  ...props
}: CalendarHeaderProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof CalendarHeaderProps<E>>) {
  const {headerClassName} = useContext(CalendarContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, headerClassName) as string,
    [className, headerClassName],
  );

  return (
    <dom.header className={resolvedClassName} data-slot="calendar-header" {...(props as any)}>
      {children}
    </dom.header>
  );
}

CalendarHeaderInner.displayName = "HeroUI.Calendar.Header";

const CalendarHeader = memo(CalendarHeaderInner) as <
  E extends keyof React.JSX.IntrinsicElements = "header",
>(
  props: CalendarHeaderProps<E> &
    Omit<React.JSX.IntrinsicElements[E], keyof CalendarHeaderProps<E>>,
) => React.JSX.Element;

/* -------------------------------------------------------------------------------------------------
| * Calendar Heading
| * -----------------------------------------------------------------------------------------------*/
interface CalendarHeadingProps extends ComponentPropsWithRef<typeof CalendarHeadingPrimitive> {}

const CalendarHeading = memo(function CalendarHeading({className, ...props}: CalendarHeadingProps) {
  const {headingClassName} = useContext(CalendarContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, headingClassName) as string,
    [className, headingClassName],
  );

  return (
    <CalendarHeadingPrimitive
      data-slot="calendar-heading"
      {...props}
      className={resolvedClassName}
    />
  );
});

CalendarHeading.displayName = "HeroUI.Calendar.Heading";

/* -------------------------------------------------------------------------------------------------
| * Calendar Nav Button
| * -----------------------------------------------------------------------------------------------*/
interface CalendarNavButtonProps extends ComponentPropsWithRef<typeof ButtonPrimitive> {
  slot?: "previous" | "next";
}

const CalendarNavButton = memo(function CalendarNavButton({
  children,
  className,
  slot,
  ...props
}: CalendarNavButtonProps) {
  const {navButtonClassName, navButtonIconClassName} = useContext(CalendarContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, navButtonClassName),
    [className, navButtonClassName],
  );

  return (
    <ButtonPrimitive
      data-slot="calendar-nav-button"
      slot={slot}
      {...props}
      className={resolvedClassName}
    >
      {children ||
        (slot === "previous" ? (
          <IconChevronLeft
            className={navButtonIconClassName}
            data-slot="calendar-nav-button-icon"
          />
        ) : (
          <IconChevronRight
            className={navButtonIconClassName}
            data-slot="calendar-nav-button-icon"
          />
        ))}
    </ButtonPrimitive>
  );
});

CalendarNavButton.displayName = "HeroUI.Calendar.NavButton";

/* -------------------------------------------------------------------------------------------------
| * Calendar Grid
| * -----------------------------------------------------------------------------------------------*/
interface CalendarGridProps extends ComponentPropsWithRef<typeof CalendarGridPrimitive> {}

const CalendarGrid = memo(function CalendarGrid({
  children,
  className,
  weekdayStyle = "short",
  ...props
}: CalendarGridProps) {
  const calendarContext = useContext(CalendarContext);
  const {dayView, gridClassName} = calendarContext;
  const contextValue = useMemo(
    () => ({
      ...calendarContext,
      dayView: dayView ? {...dayView, weekdayStyle} : undefined,
    }),
    [calendarContext, dayView, weekdayStyle],
  );
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, gridClassName) as string,
    [className, gridClassName],
  );

  return (
    <CalendarContext value={contextValue}>
      <CalendarGridPrimitive
        data-slot="calendar-grid"
        weekdayStyle={weekdayStyle}
        {...props}
        className={resolvedClassName}
      >
        {children}
      </CalendarGridPrimitive>
    </CalendarContext>
  );
});

CalendarGrid.displayName = "HeroUI.Calendar.Grid";

/* -------------------------------------------------------------------------------------------------
| * Calendar Grid Header
| * -----------------------------------------------------------------------------------------------*/
interface CalendarGridHeaderProps extends ComponentPropsWithRef<
  typeof CalendarGridHeaderPrimitive
> {}

const CalendarGridHeader = memo(function CalendarGridHeader({
  children,
  className,
  ...props
}: CalendarGridHeaderProps) {
  const {dayView, gridHeaderClassName} = useContext(CalendarContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, gridHeaderClassName) as string,
    [className, gridHeaderClassName],
  );

  if (dayView && dayView.days >= 7 && typeof children === "function") {
    return (
      <CalendarDayViewGridHeader
        className={resolvedClassName}
        data-slot="calendar-grid-header"
        firstDayOfWeek={dayView.firstDayOfWeek}
        timeZone={dayView.timeZone}
        visibleRange={dayView.visibleRange}
        weekdayStyle={dayView.weekdayStyle}
      >
        {children}
      </CalendarDayViewGridHeader>
    );
  }

  return (
    <CalendarGridHeaderPrimitive
      data-slot="calendar-grid-header"
      {...props}
      className={resolvedClassName}
    >
      {children}
    </CalendarGridHeaderPrimitive>
  );
});

CalendarGridHeader.displayName = "HeroUI.Calendar.GridHeader";

/* -------------------------------------------------------------------------------------------------
| * Calendar Grid Body
| * -----------------------------------------------------------------------------------------------*/
interface CalendarGridBodyProps extends ComponentPropsWithRef<typeof CalendarGridBodyPrimitive> {}

const CalendarGridBody = memo(function CalendarGridBody({
  children,
  className,
  ...props
}: CalendarGridBodyProps) {
  const {dayView, gridBodyClassName} = useContext(CalendarContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, gridBodyClassName) as string,
    [className, gridBodyClassName],
  );

  if (dayView && dayView.days >= 7 && typeof children === "function") {
    return (
      <CalendarDayViewGridBody
        className={resolvedClassName}
        data-slot="calendar-grid-body"
        firstDayOfWeek={dayView.firstDayOfWeek}
        visibleRange={dayView.visibleRange}
      >
        {children}
      </CalendarDayViewGridBody>
    );
  }

  return (
    <CalendarGridBodyPrimitive
      data-slot="calendar-grid-body"
      {...props}
      className={resolvedClassName}
    >
      {children}
    </CalendarGridBodyPrimitive>
  );
});

CalendarGridBody.displayName = "HeroUI.Calendar.GridBody";

/* -------------------------------------------------------------------------------------------------
| * Calendar Header Cell
| * -----------------------------------------------------------------------------------------------*/
interface CalendarHeaderCellProps extends ComponentPropsWithRef<
  typeof CalendarHeaderCellPrimitive
> {}

const CalendarHeaderCell = memo(function CalendarHeaderCell({
  className,
  ...props
}: CalendarHeaderCellProps) {
  const {headerCellClassName} = useContext(CalendarContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, headerCellClassName) as string,
    [className, headerCellClassName],
  );

  return (
    <CalendarHeaderCellPrimitive
      data-slot="calendar-header-cell"
      {...props}
      className={resolvedClassName}
    />
  );
});

CalendarHeaderCell.displayName = "HeroUI.Calendar.HeaderCell";

/* -------------------------------------------------------------------------------------------------
| * Calendar Cell
| * -----------------------------------------------------------------------------------------------*/
interface CalendarCellProps extends ComponentPropsWithRef<typeof CalendarCellPrimitive> {}

const CalendarCell = memo(function CalendarCell({
  children,
  className,
  ...props
}: CalendarCellProps) {
  const {cellClassName} = useContext(CalendarContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, cellClassName),
    [className, cellClassName],
  );

  return (
    <CalendarCellPrimitive data-slot="calendar-cell" {...props} className={resolvedClassName}>
      {(values) => {
        const {formattedDate} = values;

        return typeof children === "function" ? children(values) : children || formattedDate;
      }}
    </CalendarCellPrimitive>
  );
});

CalendarCell.displayName = "HeroUI.Calendar.Cell";

/* -------------------------------------------------------------------------------------------------
| * Calendar Cell Indicator
| * -----------------------------------------------------------------------------------------------*/
interface CalendarCellIndicatorProps<
  E extends keyof React.JSX.IntrinsicElements = "span",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

function CalendarCellIndicatorInner<E extends keyof React.JSX.IntrinsicElements = "span">({
  className,
  ...props
}: CalendarCellIndicatorProps<E> &
  Omit<React.JSX.IntrinsicElements[E], keyof CalendarCellIndicatorProps<E>>) {
  const {cellIndicatorClassName} = useContext(CalendarContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, cellIndicatorClassName) as string,
    [className, cellIndicatorClassName],
  );

  return (
    <dom.span
      aria-hidden="true"
      className={resolvedClassName}
      data-slot="calendar-cell-indicator"
      {...(props as any)}
    />
  );
}

CalendarCellIndicatorInner.displayName = "HeroUI.Calendar.CellIndicator";

const CalendarCellIndicator = memo(CalendarCellIndicatorInner) as <
  E extends keyof React.JSX.IntrinsicElements = "span",
>(
  props: CalendarCellIndicatorProps<E> &
    Omit<React.JSX.IntrinsicElements[E], keyof CalendarCellIndicatorProps<E>>,
) => React.JSX.Element;

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
