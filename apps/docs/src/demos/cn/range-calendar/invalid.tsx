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
        aria-label="行程日期"
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
        <p className="text-sm text-danger">最长入住时间为 1 周</p>
      ) : (
        <Description className="text-center">请选择最多 7 天的入住区间</Description>
      )}
    </div>
  );
}
