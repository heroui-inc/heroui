"use client";

import type {DOMRenderProps} from "../../utils/dom";
import type {RangeCalendarVariants} from "@heroui/styles";
import type {CalendarIdentifier} from "@internationalized/date";
import type {ComponentPropsWithRef, ReactNode} from "react";
import type {DateValue} from "react-aria-components/Calendar";

import {rangeCalendarVariants} from "@heroui/styles";
import {CalendarDate, DateFormatter, createCalendar} from "@internationalized/date";
import {useControlledState} from "@react-stately/utils";
import React, {createContext, useContext} from "react";
import {Button as ButtonPrimitive} from "react-aria-components/Button";
import {Heading as HeadingPrimitive} from "react-aria-components/Heading";
import {useLocale} from "react-aria-components/I18nProvider";
import {
  CalendarCell as CalendarCellPrimitive,
  CalendarGridBody as CalendarGridBodyPrimitive,
  CalendarGridHeader as CalendarGridHeaderPrimitive,
  CalendarGrid as CalendarGridPrimitive,
  CalendarHeaderCell as CalendarHeaderCellPrimitive,
  RangeCalendar as RangeCalendarPrimitive,
  RangeCalendarStateContext,
} from "react-aria-components/RangeCalendar";

import {dataAttr} from "../../utils/assertion";
import {getGregorianYearOffset} from "../../utils/calendar";
import {composeSlotClassName, composeTwRenderProps} from "../../utils/compose";
import {dom} from "../../utils/dom";
import {
  YearPickerContext,
  YearPickerStateContext,
} from "../calendar-year-picker/year-picker-context";
import {IconChevronLeft, IconChevronRight} from "../icons";

/* -------------------------------------------------------------------------------------------------
| * RangeCalendar Context
| * -----------------------------------------------------------------------------------------------*/
interface RangeCalendarContext {
  slots?: ReturnType<typeof rangeCalendarVariants>;
}

const RangeCalendarContext = createContext<RangeCalendarContext>({});

const RangeCalendarYearPickerStateBridge = ({children}: {children: React.ReactNode}) => {
  const state = React.useContext(RangeCalendarStateContext);

  if (!state) {
    throw new Error("RangeCalendar year picker state must be used within <RangeCalendar>.");
  }

  const yearPickerStateValue = {
    focusedDate: state.focusedDate,
    maxValue: state.maxValue,
    minValue: state.minValue,
    setFocusedDate: (value: DateValue) => state.setFocusedDate(value as typeof state.focusedDate),
    timeZone: state.timeZone,
  };

  return <YearPickerStateContext value={yearPickerStateValue}>{children}</YearPickerStateContext>;
};

/* -------------------------------------------------------------------------------------------------
| * RangeCalendar Root
| * -----------------------------------------------------------------------------------------------*/
interface RangeCalendarRootProps<T extends DateValue = DateValue>
  extends ComponentPropsWithRef<typeof RangeCalendarPrimitive<T>>, RangeCalendarVariants {
  isYearPickerOpen?: boolean;
  onYearPickerOpenChange?: (isYearPickerOpen: boolean) => void;
  defaultYearPickerOpen?: boolean;
}

function RangeCalendarRoot<T extends DateValue = DateValue>({
  children,
  className,
  defaultYearPickerOpen: defaultYearPickerOpenProp = false,
  isYearPickerOpen: isYearPickerOpenProp,
  maxValue: maxValueProp,
  minValue: minValueProp,
  onYearPickerOpenChange: onYearPickerOpenChangeProp,
  ...rest
}: RangeCalendarRootProps<T>) {
  const {locale} = useLocale();
  const slots = React.useMemo(() => rangeCalendarVariants(), []);
  const calendarRef = React.useRef<HTMLDivElement>(null);
  const [isYearPickerOpen, setIsYearPickerOpen] = useControlledState(
    isYearPickerOpenProp,
    defaultYearPickerOpenProp,
    onYearPickerOpenChangeProp,
  );
  const calendarProp = React.useMemo(() => {
    const calendarIdentifier = new DateFormatter(locale).resolvedOptions()
      .calendar as CalendarIdentifier;

    return createCalendar(calendarIdentifier);
  }, [locale]);
  const gregorianYearOffset = React.useMemo(
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
      <RangeCalendarContext value={{slots}}>
        <RangeCalendarPrimitive
          ref={calendarRef}
          data-slot="range-calendar"
          maxValue={maxValue}
          minValue={minValue}
          {...rest}
          className={composeTwRenderProps(className, slots.base())}
        >
          {(values) => (
            <RangeCalendarYearPickerStateBridge>
              {typeof children === "function" ? children(values) : children}
            </RangeCalendarYearPickerStateBridge>
          )}
        </RangeCalendarPrimitive>
      </RangeCalendarContext>
    </YearPickerContext>
  );
}

RangeCalendarRoot.displayName = "HeroUI.RangeCalendar";

/* -------------------------------------------------------------------------------------------------
| * RangeCalendar Header
| * -----------------------------------------------------------------------------------------------*/
interface RangeCalendarHeaderProps<
  E extends keyof React.JSX.IntrinsicElements = "header",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

const RangeCalendarHeader = <E extends keyof React.JSX.IntrinsicElements = "header">({
  children,
  className,
  ...props
}: RangeCalendarHeaderProps<E> &
  Omit<React.JSX.IntrinsicElements[E], keyof RangeCalendarHeaderProps<E>>) => {
  const {slots} = useContext(RangeCalendarContext);

  return (
    <dom.header
      className={composeSlotClassName(slots?.header, className)}
      data-slot="range-calendar-header"
      {...(props as any)}
    >
      {children}
    </dom.header>
  );
};

RangeCalendarHeader.displayName = "HeroUI.RangeCalendar.Header";

/* -------------------------------------------------------------------------------------------------
| * RangeCalendar Heading
| * -----------------------------------------------------------------------------------------------*/
interface RangeCalendarHeadingProps extends ComponentPropsWithRef<typeof HeadingPrimitive> {}

const RangeCalendarHeading = ({className, ...props}: RangeCalendarHeadingProps) => {
  const {slots} = useContext(RangeCalendarContext);

  return (
    <HeadingPrimitive
      data-slot="range-calendar-heading"
      {...props}
      className={composeSlotClassName(slots?.heading, className)}
    />
  );
};

RangeCalendarHeading.displayName = "HeroUI.RangeCalendar.Heading";

/* -------------------------------------------------------------------------------------------------
| * RangeCalendar Nav Button
| * -----------------------------------------------------------------------------------------------*/
interface RangeCalendarNavButtonProps extends ComponentPropsWithRef<typeof ButtonPrimitive> {
  slot?: "previous" | "next";
}

const RangeCalendarNavButton = ({
  children,
  className,
  slot,
  ...props
}: RangeCalendarNavButtonProps) => {
  const {slots} = useContext(RangeCalendarContext);

  return (
    <ButtonPrimitive
      data-slot="range-calendar-nav-button"
      slot={slot}
      {...props}
      className={composeTwRenderProps(className, slots?.navButton())}
    >
      {children ||
        (slot === "previous" ? (
          <IconChevronLeft
            className={slots?.navButtonIcon()}
            data-slot="range-calendar-nav-button-icon"
          />
        ) : (
          <IconChevronRight
            className={slots?.navButtonIcon()}
            data-slot="range-calendar-nav-button-icon"
          />
        ))}
    </ButtonPrimitive>
  );
};

RangeCalendarNavButton.displayName = "HeroUI.RangeCalendar.NavButton";

/* -------------------------------------------------------------------------------------------------
| * RangeCalendar Grid
| * -----------------------------------------------------------------------------------------------*/
interface RangeCalendarGridProps extends ComponentPropsWithRef<typeof CalendarGridPrimitive> {}

const RangeCalendarGrid = ({
  children,
  className,
  weekdayStyle = "short",
  ...props
}: RangeCalendarGridProps) => {
  const {slots} = useContext(RangeCalendarContext);

  return (
    <CalendarGridPrimitive
      data-slot="range-calendar-grid"
      weekdayStyle={weekdayStyle}
      {...props}
      className={composeSlotClassName(slots?.grid, className)}
    >
      {children}
    </CalendarGridPrimitive>
  );
};

RangeCalendarGrid.displayName = "HeroUI.RangeCalendar.Grid";

/* -------------------------------------------------------------------------------------------------
| * RangeCalendar Grid Header
| * -----------------------------------------------------------------------------------------------*/
interface RangeCalendarGridHeaderProps extends ComponentPropsWithRef<
  typeof CalendarGridHeaderPrimitive
> {}

const RangeCalendarGridHeader = ({className, ...props}: RangeCalendarGridHeaderProps) => {
  const {slots} = useContext(RangeCalendarContext);

  return (
    <CalendarGridHeaderPrimitive
      data-slot="range-calendar-grid-header"
      {...props}
      className={composeSlotClassName(slots?.gridHeader, className)}
    />
  );
};

RangeCalendarGridHeader.displayName = "HeroUI.RangeCalendar.GridHeader";

/* -------------------------------------------------------------------------------------------------
| * RangeCalendar Grid Body
| * -----------------------------------------------------------------------------------------------*/
interface RangeCalendarGridBodyProps extends ComponentPropsWithRef<
  typeof CalendarGridBodyPrimitive
> {}

const RangeCalendarGridBody = ({className, ...props}: RangeCalendarGridBodyProps) => {
  const {slots} = useContext(RangeCalendarContext);

  return (
    <CalendarGridBodyPrimitive
      data-slot="range-calendar-grid-body"
      {...props}
      className={composeSlotClassName(slots?.gridBody, className)}
    />
  );
};

RangeCalendarGridBody.displayName = "HeroUI.RangeCalendar.GridBody";

/* -------------------------------------------------------------------------------------------------
| * RangeCalendar Header Cell
| * -----------------------------------------------------------------------------------------------*/
interface RangeCalendarHeaderCellProps extends ComponentPropsWithRef<
  typeof CalendarHeaderCellPrimitive
> {}

const RangeCalendarHeaderCell = ({className, ...props}: RangeCalendarHeaderCellProps) => {
  const {slots} = useContext(RangeCalendarContext);

  return (
    <CalendarHeaderCellPrimitive
      data-slot="range-calendar-header-cell"
      {...props}
      className={composeSlotClassName(slots?.headerCell, className)}
    />
  );
};

RangeCalendarHeaderCell.displayName = "HeroUI.RangeCalendar.HeaderCell";

/* -------------------------------------------------------------------------------------------------
| * RangeCalendar Cell
| * -----------------------------------------------------------------------------------------------*/
interface RangeCalendarCellProps extends ComponentPropsWithRef<typeof CalendarCellPrimitive> {}

const RangeCalendarCell = ({children, className, ...props}: RangeCalendarCellProps) => {
  const {slots} = useContext(RangeCalendarContext);

  return (
    <CalendarCellPrimitive
      data-slot="range-calendar-cell"
      {...props}
      className={composeTwRenderProps(className, slots?.cell())}
    >
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
};

RangeCalendarCell.displayName = "HeroUI.RangeCalendar.Cell";

/* -------------------------------------------------------------------------------------------------
| * RangeCalendar Cell Indicator
| * -----------------------------------------------------------------------------------------------*/
interface RangeCalendarCellIndicatorProps<
  E extends keyof React.JSX.IntrinsicElements = "span",
> extends DOMRenderProps<E, undefined> {
  className?: string;
}

const RangeCalendarCellIndicator = <E extends keyof React.JSX.IntrinsicElements = "span">({
  className,
  ...props
}: RangeCalendarCellIndicatorProps<E> &
  Omit<React.JSX.IntrinsicElements[E], keyof RangeCalendarCellIndicatorProps<E>>) => {
  const {slots} = useContext(RangeCalendarContext);

  return (
    <dom.span
      aria-hidden="true"
      className={composeSlotClassName(slots?.cellIndicator, className)}
      data-slot="range-calendar-cell-indicator"
      {...(props as any)}
    />
  );
};

RangeCalendarCellIndicator.displayName = "HeroUI.RangeCalendar.CellIndicator";

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
