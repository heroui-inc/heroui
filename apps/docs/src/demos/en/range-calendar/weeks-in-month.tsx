"use client";

import {Description, RangeCalendar} from "@heroui/react";

export function WeeksInMonth() {
  return (
    <div className="flex flex-col items-center gap-4">
      <RangeCalendar aria-label="Trip dates" weeksInMonth={6}>
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
      <Description className="text-center">
        Always shows 6 weeks per month to avoid layout shift when navigating
      </Description>
    </div>
  );
}
