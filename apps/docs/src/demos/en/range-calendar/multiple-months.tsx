"use client";

import {RangeCalendar} from "@heroui/react";

export function MultipleMonths() {
  return (
    <RangeCalendar
      aria-label="Trip dates"
      className="@container-normal w-full max-w-none overflow-x-auto"
      visibleDuration={{months: 2}}
    >
      <div className="mx-auto flex w-max gap-8">
        <div className="w-64">
          <RangeCalendar.Header>
            <RangeCalendar.NavButton slot="previous" />
            <RangeCalendar.Heading className="flex-none" />
            <div className="size-6" />
          </RangeCalendar.Header>
          <RangeCalendar.Grid>
            <RangeCalendar.GridHeader>
              {(day) => <RangeCalendar.HeaderCell>{day}</RangeCalendar.HeaderCell>}
            </RangeCalendar.GridHeader>
            <RangeCalendar.GridBody>
              {(date) => <RangeCalendar.Cell date={date} />}
            </RangeCalendar.GridBody>
          </RangeCalendar.Grid>
        </div>
        <div className="w-64">
          <RangeCalendar.Header>
            <div className="size-6" />
            <RangeCalendar.Heading className="flex-none" offset={{months: 1}} />
            <RangeCalendar.NavButton slot="next" />
          </RangeCalendar.Header>
          <RangeCalendar.Grid offset={{months: 1}}>
            <RangeCalendar.GridHeader>
              {(day) => <RangeCalendar.HeaderCell>{day}</RangeCalendar.HeaderCell>}
            </RangeCalendar.GridHeader>
            <RangeCalendar.GridBody>
              {(date) => <RangeCalendar.Cell date={date} />}
            </RangeCalendar.GridBody>
          </RangeCalendar.Grid>
        </div>
      </div>
    </RangeCalendar>
  );
}
