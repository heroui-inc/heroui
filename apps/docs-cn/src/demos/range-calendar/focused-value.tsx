"use client";

import type {DateValue} from "@internationalized/date";

import {Button, Description, RangeCalendar} from "@heroui/react";
import {parseDate} from "@internationalized/date";
import {useState} from "react";

export function FocusedValue() {
  const [focusedDate, setFocusedDate] = useState<DateValue>(parseDate("2025-06-15"));

  return (
    <div className="flex flex-col items-center gap-4">
      <RangeCalendar
        aria-label="行程日期"
        firstDayOfWeek="mon"
        focusedValue={focusedDate}
        onFocusChange={setFocusedDate}
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
      <Description className="text-center">聚焦： {focusedDate.toString()}</Description>
      <div className="flex flex-wrap justify-center gap-2">
        <Button
          size="sm"
          variant="secondary"
          onPress={() => setFocusedDate(parseDate("2025-01-01"))}
        >
          跳转到一月
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onPress={() => setFocusedDate(parseDate("2025-06-15"))}
        >
          跳转到六月
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onPress={() => setFocusedDate(parseDate("2025-12-25"))}
        >
          跳转到圣诞节
        </Button>
      </div>
    </div>
  );
}
