"use client";

import {Description, RangeCalendar} from "@heroui/react";
import {getLocalTimeZone, today} from "@internationalized/date";

export function ReadOnly() {
  return (
    <div className="flex flex-col items-center gap-4">
      <RangeCalendar
        isReadOnly
        aria-label="行程日期"
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
      <Description className="text-center">区间日历为只读</Description>
    </div>
  );
}
