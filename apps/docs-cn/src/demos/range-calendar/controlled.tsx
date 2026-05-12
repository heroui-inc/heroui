"use client";

import type {DateValue} from "@internationalized/date";

import {Button, ButtonGroup, Description, RangeCalendar} from "@heroui/react";
import {
  getLocalTimeZone,
  parseDate,
  startOfMonth,
  startOfWeek,
  today,
} from "@internationalized/date";
import {useState} from "react";
import {useLocale} from "react-aria-components";

type DateRange = {
  start: DateValue;
  end: DateValue;
};

export function Controlled() {
  const [value, setValue] = useState<DateRange | null>(null);
  const [focusedDate, setFocusedDate] = useState<DateValue>(parseDate("2025-12-25"));
  const {locale} = useLocale();

  return (
    <div className="flex flex-col items-center gap-4">
      <ButtonGroup variant="tertiary">
        <Button
          onPress={() => {
            const start = today(getLocalTimeZone());

            setFocusedDate(start);
          }}
        >
          This week
        </Button>
        <Button
          onPress={() => {
            const nextWeekStart = startOfWeek(today(getLocalTimeZone()).add({weeks: 1}), locale);

            setFocusedDate(nextWeekStart);
          }}
        >
          Next week
        </Button>
        <Button
          onPress={() => {
            const nextMonthStart = startOfMonth(today(getLocalTimeZone()).add({months: 1}));

            setFocusedDate(nextMonthStart);
          }}
        >
          Next month
        </Button>
      </ButtonGroup>

      <RangeCalendar
        aria-label="Trip dates"
        firstDayOfWeek="mon"
        focusedValue={focusedDate}
        value={value}
        onChange={setValue}
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

      <Description className="text-center">
        Selected range: {value ? `${value.start.toString()} -> ${value.end.toString()}` : "(none)"}
      </Description>

      <div className="flex gap-2">
        <Button
          size="sm"
          variant="secondary"
          onPress={() => {
            const start = today(getLocalTimeZone());

            setValue({end: start.add({days: 6}), start});
            setFocusedDate(start);
          }}
        >
          Set 1 week
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onPress={() => {
            const start = parseDate("2025-12-20");

            setValue({end: parseDate("2025-12-31"), start});
            setFocusedDate(start);
          }}
        >
          Set Holidays
        </Button>
        <Button size="sm" variant="tertiary" onPress={() => setValue(null)}>
          Clear
        </Button>
      </div>
    </div>
  );
}
