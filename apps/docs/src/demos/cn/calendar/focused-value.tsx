"use client";

import type {DateValue} from "@internationalized/date";

import {Button, Calendar, Description} from "@heroui/react";
import {parseDate} from "@internationalized/date";
import {useState} from "react";

export function FocusedValue() {
  const [focusedDate, setFocusedDate] = useState<DateValue>(parseDate("2025-06-15"));

  return (
    <div className="flex flex-col items-center gap-4">
      <Calendar aria-label="活动日期" focusedValue={focusedDate} onFocusChange={setFocusedDate}>
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

      <Description className="text-center">聚焦：{focusedDate.toString()}</Description>

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
