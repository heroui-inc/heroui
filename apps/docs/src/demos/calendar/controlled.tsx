"use client";

import type {DateValue} from "@internationalized/date";

import {Button, ButtonGroup, Calendar, Description} from "@heroui/react";
import {
  getLocalTimeZone,
  parseDate,
  startOfMonth,
  startOfWeek,
  today,
} from "@internationalized/date";
import {useState} from "react";
import {useLocale} from "react-aria-components";

export function Controlled() {
  const [value, setValue] = useState<DateValue | null>(null);
  const [focusedDate, setFocusedDate] = useState<DateValue>(parseDate("2025-12-25"));
  const {locale} = useLocale();

  return (
    <div className="flex flex-col items-center gap-4">
      <ButtonGroup variant="tertiary">
        <Button
          onPress={() => {
            const todayDate = today(getLocalTimeZone());

            setValue(todayDate);
            setFocusedDate(todayDate);
          }}
        >
          Today
        </Button>
        <Button
          onPress={() => {
            const nextWeekStart = startOfWeek(today(getLocalTimeZone()).add({weeks: 1}), locale);

            setValue(nextWeekStart);
            setFocusedDate(nextWeekStart);
          }}
        >
          Next week
        </Button>
        <Button
          onPress={() => {
            const nextMonthStart = startOfMonth(today(getLocalTimeZone()).add({months: 1}));

            setValue(nextMonthStart);
            setFocusedDate(nextMonthStart);
          }}
        >
          Next month
        </Button>
      </ButtonGroup>

      <Calendar
        aria-label="Event date"
        focusedValue={focusedDate}
        value={value}
        onChange={setValue}
        onFocusChange={setFocusedDate}
      >
        <Calendar.Header>
          <Calendar.NavButton slot="previous" />
          <Calendar.Heading />
          <Calendar.NavButton slot="next" />
        </Calendar.Header>
        <Calendar.Grid>
          <Calendar.GridHeader>
            {(day) => <Calendar.HeaderCell>{day}</Calendar.HeaderCell>}
          </Calendar.GridHeader>
          <Calendar.GridBody>{(date) => <Calendar.Cell date={date} />}</Calendar.GridBody>
        </Calendar.Grid>
      </Calendar>

      <Description className="text-center">
        Selected date: {value ? value.toString() : "(none)"}
      </Description>

      <div className="flex gap-2">
        <Button
          size="sm"
          variant="secondary"
          onPress={() => {
            const todayDate = today(getLocalTimeZone());

            setValue(todayDate);
            setFocusedDate(todayDate);
          }}
        >
          Set Today
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onPress={() => {
            const christmasDate = parseDate("2025-12-25");

            setValue(christmasDate);
            setFocusedDate(christmasDate);
          }}
        >
          Set Christmas
        </Button>
        <Button size="sm" variant="tertiary" onPress={() => setValue(null)}>
          Clear
        </Button>
      </div>
    </div>
  );
}
