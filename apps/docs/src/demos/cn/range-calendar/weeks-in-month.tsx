"use client";

import {Description, RangeCalendar} from "@heroui/react";

export function WeeksInMonth() {
  return (
    <div className="flex flex-col items-center gap-4">
      <RangeCalendar aria-label="行程日期" weeksInMonth={6}>
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
      <Description className="text-center">每月固定显示 6 周，切换月份时避免布局跳动</Description>
    </div>
  );
}
