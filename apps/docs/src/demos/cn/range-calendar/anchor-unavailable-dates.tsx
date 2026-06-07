"use client";

import type {CalendarDate, DateValue} from "@internationalized/date";

import {Description, RangeCalendar} from "@heroui/react";
import {getLocalTimeZone, today} from "@internationalized/date";

export function AnchorUnavailableDates() {
  const now = today(getLocalTimeZone());

  const isDateUnavailable = (date: DateValue, anchorDate: CalendarDate | null) => {
    return anchorDate != null && Math.abs(date.compare(anchorDate)) > 7;
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <RangeCalendar aria-label="行程日期" isDateUnavailable={isDateUnavailable} minValue={now}>
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
      <Description className="text-center">选择开始日期后，仅前后 7 天内的日期可选</Description>
    </div>
  );
}
