"use client";

import {RangeCalendar} from "@heroui/react";

export function ThreeMonths() {
  return (
    <RangeCalendar
      aria-label="假期规划"
      className="@container-normal w-auto overflow-x-auto"
      visibleDuration={{months: 3}}
    >
      <div className="flex w-max gap-7">
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
            <div className="size-6" />
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
        <div className="w-64">
          <RangeCalendar.Header>
            <div className="size-6" />
            <RangeCalendar.Heading className="flex-none" offset={{months: 2}} />
            <RangeCalendar.NavButton slot="next" />
          </RangeCalendar.Header>
          <RangeCalendar.Grid offset={{months: 2}}>
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
