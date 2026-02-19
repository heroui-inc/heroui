"use client";

import {Description, RangeCalendar} from "@heroui/react";
import {getLocalTimeZone, today} from "@internationalized/date";

export function ReadOnly() {
  return (
    <div className="flex flex-col items-center gap-4">
      <RangeCalendar
        isReadOnly
        aria-label="Trip dates"
        defaultValue={{
          end: today(getLocalTimeZone()).add({days: 4}),
          start: today(getLocalTimeZone()),
        }}
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
      <Description className="text-center">Range calendar is read-only</Description>
    </div>
  );
}
