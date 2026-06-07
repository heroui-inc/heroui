"use client";

import type {CalendarDate, DateValue} from "@internationalized/date";
import type {ReactElement} from "react";

import React from "react";
import {useLocale} from "react-aria-components/I18nProvider";

import {getDayViewGridRows} from "../../utils/calendar";
import {dom} from "../../utils/dom";

interface CalendarDayViewGridBodyProps {
  children: (date: CalendarDate) => ReactElement;
  className?: string;
  "data-slot"?: string;
  firstDayOfWeek?: "sun" | "mon" | "tue" | "wed" | "thu" | "fri" | "sat";
  visibleRange: {end: DateValue; start: DateValue};
}

export function CalendarDayViewGridBody({
  children,
  className,
  "data-slot": dataSlot = "calendar-grid-body",
  firstDayOfWeek,
  visibleRange,
}: CalendarDayViewGridBodyProps) {
  const {locale} = useLocale();
  const rows = React.useMemo(
    () => getDayViewGridRows(visibleRange.start, visibleRange.end, locale, firstDayOfWeek),
    [firstDayOfWeek, locale, visibleRange.end, visibleRange.start],
  );

  return (
    <dom.tbody className={className} data-slot={dataSlot}>
      {rows.map((row, weekIndex) => (
        <tr key={weekIndex}>
          {row.map((date, dayIndex) =>
            date ? (
              React.cloneElement(children(date as CalendarDate), {key: dayIndex})
            ) : (
              <td key={dayIndex} />
            ),
          )}
        </tr>
      ))}
    </dom.tbody>
  );
}
