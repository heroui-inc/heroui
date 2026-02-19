"use client";

import type {DateValue} from "@internationalized/date";

import {Description, RangeCalendar} from "@heroui/react";
import {getLocalTimeZone, today} from "@internationalized/date";

export function UnavailableDates() {
  const now = today(getLocalTimeZone());
  const blockedRanges = [
    [now.add({days: 2}), now.add({days: 5})],
    [now.add({days: 12}), now.add({days: 13})],
  ] as const;

  const isDateUnavailable = (date: DateValue) => {
    return blockedRanges.some(([start, end]) => date.compare(start) >= 0 && date.compare(end) <= 0);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <RangeCalendar
        aria-label="Trip dates"
        defaultValue={{end: now.add({days: 9}), start: now.add({days: 6})}}
        firstDayOfWeek="mon"
        isDateUnavailable={isDateUnavailable}
      >
        <RangeCalendar.Header>
          <RangeCalendar.Heading />
          <RangeCalendar.NavButton slot="previous" />
          <RangeCalendar.NavButton slot="next" />
        </RangeCalendar.Header>
        <RangeCalendar.Grid>
          <RangeCalendar.GridHeader>
            {(day) => <RangeCalendar.HeaderCell>{day}</RangeCalendar.HeaderCell>}
          </RangeCalendar.GridHeader>
          <RangeCalendar.GridBody>
            {(date) => <RangeCalendar.Cell date={date} />}
          </RangeCalendar.GridBody>
        </RangeCalendar.Grid>
      </RangeCalendar>
      <Description className="text-center">Some days are unavailable</Description>
    </div>
  );
}
