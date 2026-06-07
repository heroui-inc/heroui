"use client";

import type {DateValue} from "@internationalized/date";

import {Description, RangeCalendar} from "@heroui/react";
import {getLocalTimeZone, today} from "@internationalized/date";
import {useState} from "react";

type DateRange = {
  start: DateValue;
  end: DateValue;
};

export function Invalid() {
  const now = today(getLocalTimeZone());
  const [value, setValue] = useState<DateRange>({
    end: now.add({days: 14}),
    start: now.add({days: 6}),
  });
  const isInvalid = value.end.compare(value.start) > 7;

  return (
    <div className="flex flex-col items-center gap-4">
      <RangeCalendar
        aria-label="Trip dates"
        firstDayOfWeek="mon"
        isInvalid={isInvalid}
        value={value}
        onChange={setValue}
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
      {isInvalid ? (
        <p className="text-sm text-danger">Maximum stay duration is 1 week</p>
      ) : (
        <Description className="text-center">Select a stay of up to 7 days</Description>
      )}
    </div>
  );
}
