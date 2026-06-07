"use client";

import {Calendar} from "@heroui/react";

export function MultipleMonths() {
  return (
    <Calendar
      aria-label="行程日期"
      className="@container-normal w-full max-w-none overflow-x-auto"
      visibleDuration={{months: 2}}
    >
      <div className="mx-auto flex w-max gap-8">
        <div className="w-64">
          <Calendar.Header>
            <Calendar.NavButton slot="previous" />
            <Calendar.Heading className="flex-none" />
            <div className="size-6" />
          </Calendar.Header>
          <Calendar.Grid>
            <Calendar.GridHeader>
              {(day) => <Calendar.HeaderCell>{day}</Calendar.HeaderCell>}
            </Calendar.GridHeader>
            <Calendar.GridBody>{(date) => <Calendar.Cell date={date} />}</Calendar.GridBody>
          </Calendar.Grid>
        </div>
        <div className="w-64">
          <Calendar.Header>
            <div className="size-6" />
            <Calendar.Heading className="flex-none" offset={{months: 1}} />
            <Calendar.NavButton slot="next" />
          </Calendar.Header>
          <Calendar.Grid offset={{months: 1}}>
            <Calendar.GridHeader>
              {(day) => <Calendar.HeaderCell>{day}</Calendar.HeaderCell>}
            </Calendar.GridHeader>
            <Calendar.GridBody>{(date) => <Calendar.Cell date={date} />}</Calendar.GridBody>
          </Calendar.Grid>
        </div>
      </div>
    </Calendar>
  );
}
