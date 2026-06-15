"use client";

import type {DOMRenderProps} from "../../utils/dom";
import type {RangeCalendarVariants} from "@heroui/styles";
import type {CalendarIdentifier} from "@internationalized/date";
import type {ComponentPropsWithRef, ReactNode} from "react";
import type {DateValue, RangeCalendarRenderProps} from "react-aria-components/RangeCalendar";

import {rangeCalendarVariants} from "@heroui/styles";
import {CalendarDate, DateFormatter, createCalendar} from "@internationalized/date";
import {useControlledState} from "@react-stately/utils";
import React, {createContext, memo, useContext, useMemo} from "react";
import {Button as ButtonPrimitive} from "react-aria-components/Button";
import {useLocale} from "react-aria-components/I18nProvider";
import {
  CalendarCell as CalendarCellPrimitive,
  CalendarGridBody as CalendarGridBodyPrimitive,
  CalendarGridHeader as CalendarGridHeaderPrimitive,
  CalendarGrid as CalendarGridPrimitive,
  CalendarHeaderCell as CalendarHeaderCellPrimitive,
  CalendarHeading as CalendarHeadingPrimitive,
  RangeCalendar as RangeCalendarPrimitive,
} from "react-aria-components/RangeCalendar";
import {cx} from "tailwind-variants";

import {dataAttr} from "../../utils/assertion";
import {getGregorianYearOffset} from "../../utils/calendar";
import {composeTwRenderProps} from "../../utils/compose";
import {dom} from "../../utils/dom";
import {CalendarDayViewGridBody} from "../calendar/calendar-day-view-grid-body";
import {CalendarDayViewGridHeader} from "../calendar/calendar-day-view-grid-header";
import {YearPickerContext} from "../calendar-year-picker/year-picker-context";
import {IconChevronLeft, IconChevronRight} from "../icons";

/* -------------------------------------------------------------------------------------------------
| * RangeCalendar Context
| * -----------------------------------------------------------------------------------------------*/
interface RangeCalendarDayViewContext {
  days: number;
  firstDayOfWeek?: RangeCalendarRootProps["firstDayOfWeek"];
  timeZone: string;
  visibleRange: {end: DateValue; start: DateValue};
  weekdayStyle?: "narrow" | "short" | "long";
}

interface RangeCalendarContext {
  cellClassName?: string;
  cellIndicatorClassName?: string;
  dayView?: RangeCalendarDayViewContext;
  gridBodyClassName?: string;
  gridClassName?: string;
  gridHeaderClassName?: string;
  headerCellClassName?: string;
  headerClassName?: string;
  headingClassName?: string;
  navButtonClassName?: string;
  navButtonIconClassName?: string;
}

const RangeCalendarContext = createContext<RangeCalendarContext>({});

/* -------------------------------------------------------------------------------------------------
| * RangeCalendar Root
| * -----------------------------------------------------------------------------------------------*/
interface RangeCalendarRootProps<T extends DateValue = DateValue>
  extends ComponentPropsWithRef<typeof RangeCalendarPrimitive<T>>, RangeCalendarVariants {
  isYearPickerOpen?: boolean;
  onYearPickerOpenChange?: (isYearPickerOpen: boolean) => void;
  defaultYearPickerOpen?: boolean;
}

interface RangeCalendarRootContentProps<T extends DateValue = DateValue> {
  children: RangeCalendarRootProps<T>["children"];
  dayView?: RangeCalendarDayViewContext;
  slotClassNames: Omit<RangeCalendarContext, "dayView">;
  values: RangeCalendarRenderProps & {defaultChildren: ReactNode};
}

const RangeCalendarRootContent = memo(function RangeCalendarRootContent<
  T extends DateValue = DateValue,
>({children, dayView, slotClassNames, values}: RangeCalendarRootContentProps<T>) {
  const contextValue = useMemo<RangeCalendarContext>(
    () => ({
      dayView,
      ...slotClassNames,
    }),
    [dayView, slotClassNames],
  );

  return (
    <RangeCalendarContext value={contextValue}>
      {typeof children === "function" ? children(values) : children}
    </RangeCalendarContext>
  );
}) as <T extends DateValue = DateValue>(
  props: RangeCalendarRootContentProps<T>,
) => React.JSX.Element;

function RangeCalendarRootInner<T extends DateValue = DateValue>({
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
}: RangeCalendarRootProps<T>) {
  const isWeekView = visibleDuration?.weeks != null;
  const isDayView = visibleDuration?.days != null;
  const visibleDays = visibleDuration?.days;
  const {locale} = useLocale();
  const slots = useMemo(() => rangeCalendarVariants(), []);
  const slotClassNames = useMemo<Omit<RangeCalendarContext, "dayView">>(
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
    () =>
      cx(
        slots.base(),
        isWeekView && "range-calendar--week-view",
        isDayView && "range-calendar--day-view",
      ),
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
        calendarGridSlot: "range-calendar-grid",
        isYearPickerOpen,
        setIsYearPickerOpen,
        calendarRef,
      }}
    >
      <RangeCalendarPrimitive
        ref={calendarRef}
        data-slot="range-calendar"
        firstDayOfWeek={firstDayOfWeek}
        maxValue={maxValue}
        minValue={minValue}
        visibleDuration={visibleDuration}
        {...rest}
        className={composeTwRenderProps(className, baseClassName)}
      >
        {(values) => (
          <RangeCalendarRootContent
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
          </RangeCalendarRootContent>
        )}
      </RangeCalendarPrimitive>
    </YearPickerContext>
  );
}

RangeCalendarRootInner.displayName = "HeroUI.RangeCalendar";

const RangeCalendarRoot = memo(RangeCalendarRootInner) as <T extends DateValue = DateValue>(
  props: RangeCalendarRootProps<T>,
) => React.JSX.Element;

/* -------------------------------------------------------------------------------------------------
| * RangeCalendar Header
| * -----------------------------------------------------------------------------------------------*/
interface RangeCalendarHeaderProps<
  E extends keyof React.JSX.IntrinsicElements = "header",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

function RangeCalendarHeaderInner<E extends keyof React.JSX.IntrinsicElements = "header">({
  children,
  className,
  ...props
}: RangeCalendarHeaderProps<E> &
  Omit<React.JSX.IntrinsicElements[E], keyof RangeCalendarHeaderProps<E>>) {
  const {headerClassName} = useContext(RangeCalendarContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, headerClassName) as string,
    [className, headerClassName],
  );

  return (
    <dom.header className={resolvedClassName} data-slot="range-calendar-header" {...(props as any)}>
      {children}
    </dom.header>
  );
}

RangeCalendarHeaderInner.displayName = "HeroUI.RangeCalendar.Header";

const RangeCalendarHeader = memo(RangeCalendarHeaderInner) as <
  E extends keyof React.JSX.IntrinsicElements = "header",
>(
  props: RangeCalendarHeaderProps<E> &
    Omit<React.JSX.IntrinsicElements[E], keyof RangeCalendarHeaderProps<E>>,
) => React.JSX.Element;

/* -------------------------------------------------------------------------------------------------
| * RangeCalendar Heading
| * -----------------------------------------------------------------------------------------------*/
interface RangeCalendarHeadingProps extends ComponentPropsWithRef<
  typeof CalendarHeadingPrimitive
> {}

const RangeCalendarHeading = memo(function RangeCalendarHeading({
  className,
  ...props
}: RangeCalendarHeadingProps) {
  const {headingClassName} = useContext(RangeCalendarContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, headingClassName) as string,
    [className, headingClassName],
  );

  return (
    <CalendarHeadingPrimitive
      data-slot="range-calendar-heading"
      {...props}
      className={resolvedClassName}
    />
  );
});

RangeCalendarHeading.displayName = "HeroUI.RangeCalendar.Heading";

/* -------------------------------------------------------------------------------------------------
| * RangeCalendar Nav Button
| * -----------------------------------------------------------------------------------------------*/
interface RangeCalendarNavButtonProps extends ComponentPropsWithRef<typeof ButtonPrimitive> {
  slot?: "previous" | "next";
}

const RangeCalendarNavButton = memo(function RangeCalendarNavButton({
  children,
  className,
  slot,
  ...props
}: RangeCalendarNavButtonProps) {
  const {navButtonClassName, navButtonIconClassName} = useContext(RangeCalendarContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, navButtonClassName),
    [className, navButtonClassName],
  );

  return (
    <ButtonPrimitive
      data-slot="range-calendar-nav-button"
      slot={slot}
      {...props}
      className={resolvedClassName}
    >
      {children ||
        (slot === "previous" ? (
          <IconChevronLeft
            className={navButtonIconClassName}
            data-slot="range-calendar-nav-button-icon"
          />
        ) : (
          <IconChevronRight
            className={navButtonIconClassName}
            data-slot="range-calendar-nav-button-icon"
          />
        ))}
    </ButtonPrimitive>
  );
});

RangeCalendarNavButton.displayName = "HeroUI.RangeCalendar.NavButton";

/* -------------------------------------------------------------------------------------------------
| * RangeCalendar Grid
| * -----------------------------------------------------------------------------------------------*/
interface RangeCalendarGridProps extends ComponentPropsWithRef<typeof CalendarGridPrimitive> {}

const RangeCalendarGrid = memo(function RangeCalendarGrid({
  children,
  className,
  weekdayStyle = "short",
  ...props
}: RangeCalendarGridProps) {
  const rangeCalendarContext = useContext(RangeCalendarContext);
  const {dayView, gridClassName} = rangeCalendarContext;
  const contextValue = useMemo(
    () => ({
      ...rangeCalendarContext,
      dayView: dayView ? {...dayView, weekdayStyle} : undefined,
    }),
    [dayView, rangeCalendarContext, weekdayStyle],
  );
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, gridClassName) as string,
    [className, gridClassName],
  );

  return (
    <RangeCalendarContext value={contextValue}>
      <CalendarGridPrimitive
        data-slot="range-calendar-grid"
        weekdayStyle={weekdayStyle}
        {...props}
        className={resolvedClassName}
      >
        {children}
      </CalendarGridPrimitive>
    </RangeCalendarContext>
  );
});

RangeCalendarGrid.displayName = "HeroUI.RangeCalendar.Grid";

/* -------------------------------------------------------------------------------------------------
| * RangeCalendar Grid Header
| * -----------------------------------------------------------------------------------------------*/
interface RangeCalendarGridHeaderProps extends ComponentPropsWithRef<
  typeof CalendarGridHeaderPrimitive
> {}

const RangeCalendarGridHeader = memo(function RangeCalendarGridHeader({
  children,
  className,
  ...props
}: RangeCalendarGridHeaderProps) {
  const {dayView, gridHeaderClassName} = useContext(RangeCalendarContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, gridHeaderClassName) as string,
    [className, gridHeaderClassName],
  );

  if (dayView && dayView.days >= 7 && typeof children === "function") {
    return (
      <CalendarDayViewGridHeader
        className={resolvedClassName}
        data-slot="range-calendar-grid-header"
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
      data-slot="range-calendar-grid-header"
      {...props}
      className={resolvedClassName}
    >
      {children}
    </CalendarGridHeaderPrimitive>
  );
});

RangeCalendarGridHeader.displayName = "HeroUI.RangeCalendar.GridHeader";

/* -------------------------------------------------------------------------------------------------
| * RangeCalendar Grid Body
| * -----------------------------------------------------------------------------------------------*/
interface RangeCalendarGridBodyProps extends ComponentPropsWithRef<
  typeof CalendarGridBodyPrimitive
> {}

const RangeCalendarGridBody = memo(function RangeCalendarGridBody({
  children,
  className,
  ...props
}: RangeCalendarGridBodyProps) {
  const {dayView, gridBodyClassName} = useContext(RangeCalendarContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, gridBodyClassName) as string,
    [className, gridBodyClassName],
  );

  if (dayView && dayView.days >= 7 && typeof children === "function") {
    return (
      <CalendarDayViewGridBody
        className={resolvedClassName}
        data-slot="range-calendar-grid-body"
        firstDayOfWeek={dayView.firstDayOfWeek}
        visibleRange={dayView.visibleRange}
      >
        {children}
      </CalendarDayViewGridBody>
    );
  }

  return (
    <CalendarGridBodyPrimitive
      data-slot="range-calendar-grid-body"
      {...props}
      className={resolvedClassName}
    >
      {children}
    </CalendarGridBodyPrimitive>
  );
});

RangeCalendarGridBody.displayName = "HeroUI.RangeCalendar.GridBody";

/* -------------------------------------------------------------------------------------------------
| * RangeCalendar Header Cell
| * -----------------------------------------------------------------------------------------------*/
interface RangeCalendarHeaderCellProps extends ComponentPropsWithRef<
  typeof CalendarHeaderCellPrimitive
> {}

const RangeCalendarHeaderCell = memo(function RangeCalendarHeaderCell({
  className,
  ...props
}: RangeCalendarHeaderCellProps) {
  const {headerCellClassName} = useContext(RangeCalendarContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, headerCellClassName) as string,
    [className, headerCellClassName],
  );

  return (
    <CalendarHeaderCellPrimitive
      data-slot="range-calendar-header-cell"
      {...props}
      className={resolvedClassName}
    />
  );
});

RangeCalendarHeaderCell.displayName = "HeroUI.RangeCalendar.HeaderCell";

/* -------------------------------------------------------------------------------------------------
| * RangeCalendar Cell
| * -----------------------------------------------------------------------------------------------*/
interface RangeCalendarCellProps extends ComponentPropsWithRef<typeof CalendarCellPrimitive> {}

const RangeCalendarCell = memo(function RangeCalendarCell({
  children,
  className,
  ...props
}: RangeCalendarCellProps) {
  const {cellClassName} = useContext(RangeCalendarContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, cellClassName),
    [className, cellClassName],
  );

  return (
    <CalendarCellPrimitive data-slot="range-calendar-cell" {...props} className={resolvedClassName}>
      {(values) => {
        const {formattedDate, isDisabled, isHovered, isPressed, isSelectionEnd, isSelectionStart} =
          values;

        const content =
          typeof children === "function" ? children(values) : children || formattedDate;

        return (
          <span
            className="range-calendar__cell-button"
            data-disabled={dataAttr(isDisabled)}
            data-hovered={dataAttr(isHovered)}
            data-pressed={dataAttr(isPressed)}
            data-selected={dataAttr(isSelectionStart || isSelectionEnd)}
            data-slot="range-calendar-cell-button"
          >
            {content}
          </span>
        );
      }}
    </CalendarCellPrimitive>
  );
});

RangeCalendarCell.displayName = "HeroUI.RangeCalendar.Cell";

/* -------------------------------------------------------------------------------------------------
| * RangeCalendar Cell Indicator
| * -----------------------------------------------------------------------------------------------*/
interface RangeCalendarCellIndicatorProps<
  E extends keyof React.JSX.IntrinsicElements = "span",
> extends DOMRenderProps<E, undefined> {
  className?: string;
}

function RangeCalendarCellIndicatorInner<E extends keyof React.JSX.IntrinsicElements = "span">({
  className,
  ...props
}: RangeCalendarCellIndicatorProps<E> &
  Omit<React.JSX.IntrinsicElements[E], keyof RangeCalendarCellIndicatorProps<E>>) {
  const {cellIndicatorClassName} = useContext(RangeCalendarContext);
  const resolvedClassName = useMemo(
    () => composeTwRenderProps(className, cellIndicatorClassName) as string,
    [className, cellIndicatorClassName],
  );

  return (
    <dom.span
      aria-hidden="true"
      className={resolvedClassName}
      data-slot="range-calendar-cell-indicator"
      {...(props as any)}
    />
  );
}

RangeCalendarCellIndicatorInner.displayName = "HeroUI.RangeCalendar.CellIndicator";

const RangeCalendarCellIndicator = memo(RangeCalendarCellIndicatorInner) as <
  E extends keyof React.JSX.IntrinsicElements = "span",
>(
  props: RangeCalendarCellIndicatorProps<E> &
    Omit<React.JSX.IntrinsicElements[E], keyof RangeCalendarCellIndicatorProps<E>>,
) => React.JSX.Element;

/* -------------------------------------------------------------------------------------------------
| * Exports
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
  RangeCalendarHeaderProps,
  RangeCalendarHeadingProps,
  RangeCalendarNavButtonProps,
  RangeCalendarGridProps,
  RangeCalendarGridHeaderProps,
  RangeCalendarGridBodyProps,
  RangeCalendarHeaderCellProps,
  RangeCalendarCellProps,
  RangeCalendarCellIndicatorProps,
};
