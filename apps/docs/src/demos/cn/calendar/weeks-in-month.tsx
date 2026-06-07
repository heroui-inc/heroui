"use client";

import {Calendar, Description} from "@heroui/react";

export function WeeksInMonth() {
  return (
    <div className="flex flex-col items-center gap-4">
      <Calendar aria-label="活动日期" weeksInMonth={6}>
        <Calendar.Header>
          <Calendar.Heading />
          <Calendar.NavButton slot="previous" />
          <Calendar.NavButton slot="next" />
        </Calendar.Header>
        <Calendar.Grid>
          <Calendar.GridHeader>
            {(day) => <Calendar.HeaderCell>{day}</Calendar.HeaderCell>}
          </Calendar.GridHeader>
          <Calendar.GridBody>{(date) => <Calendar.Cell date={date} />}</Calendar.GridBody>
        </Calendar.Grid>
      </Calendar>
      <Description className="text-center">每月固定显示 6 周，切换月份时避免布局跳动</Description>
    </div>
  );
}
