"use client";

import type {CalendarDate} from "@internationalized/date";

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
  const [value, setValue] = useState<CalendarDate | null>(null);
  const [focusedDate, setFocusedDate] = useState<CalendarDate>(parseDate("2025-12-25"));
  const {locale} = useLocale();

  return (
    <div className="flex flex-col items-center gap-4">
      <ButtonGroup fullWidth size="sm" variant="tertiary">
        <Button
          onPress={() => {
            const todayDate = today(getLocalTimeZone());

            setValue(todayDate);
            setFocusedDate(todayDate);
          }}
        >
          今天
        </Button>
        <Button
          onPress={() => {
            const nextWeekStart = startOfWeek(today(getLocalTimeZone()), locale);

            setValue(nextWeekStart);
            setFocusedDate(nextWeekStart);
          }}
        >
          本周
        </Button>
        <Button
          onPress={() => {
            const nextMonthStart = startOfMonth(today(getLocalTimeZone()));

            setValue(nextMonthStart);
            setFocusedDate(nextMonthStart);
          }}
        >
          本月
        </Button>
      </ButtonGroup>

      <Calendar
        aria-label="活动日期"
        focusedValue={focusedDate}
        value={value}
        onChange={setValue}
        onFocusChange={setFocusedDate}
      >
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

      <Description className="text-center">
        已选日期：{value ? value.toString() : "（未选）"}
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
          设为今天
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
          设为圣诞节
        </Button>
        <Button size="sm" variant="tertiary" onPress={() => setValue(null)}>
          清空
        </Button>
      </div>
    </div>
  );
}
