"use client";

import type {DateValue} from "@internationalized/date";
import type {ReactElement} from "react";

import React from "react";
import {useLocale} from "react-aria-components/I18nProvider";

import {getDayViewWeekDayLabels} from "../../utils/calendar";
import {dom} from "../../utils/dom";

interface CalendarDayViewGridHeaderProps {
  children: (day: string) => ReactElement;
  className?: string;
  "data-slot"?: string;
  firstDayOfWeek?: "sun" | "mon" | "tue" | "wed" | "thu" | "fri" | "sat";
  timeZone?: string;
  visibleRange: {end: DateValue; start: DateValue};
  weekdayStyle?: "narrow" | "short" | "long";
}

export function CalendarDayViewGridHeader({
  children,
  className,
  "data-slot": dataSlot = "calendar-grid-header",
  firstDayOfWeek,
  timeZone = "UTC",
  visibleRange,
  weekdayStyle = "short",
}: CalendarDayViewGridHeaderProps) {
  const {locale} = useLocale();
  const weekDays = React.useMemo(
    () =>
      getDayViewWeekDayLabels(visibleRange.start, locale, firstDayOfWeek, weekdayStyle, timeZone),
    [firstDayOfWeek, locale, timeZone, visibleRange.start, weekdayStyle],
  );

  return (
    <dom.thead aria-hidden className={className} data-slot={dataSlot}>
      <tr>{weekDays.map((day, index) => React.cloneElement(children(day), {key: index}))}</tr>
    </dom.thead>
  );
}
