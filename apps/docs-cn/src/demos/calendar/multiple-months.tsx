"use client";

import {Calendar} from "@heroui/react";
import {getLocalTimeZone} from "@internationalized/date";
import React from "react";
import {CalendarStateContext, useLocale} from "react-aria-components";

function CalendarMonthHeading({offset = 0}: {offset?: number}) {
  const state = React.useContext(CalendarStateContext)!;
  const {locale} = useLocale();

  const startDate = state.visibleRange.start;
  const monthDate = startDate.add({months: offset});
  const dateObj = monthDate.toDate(getLocalTimeZone());
  const monthYear = new Intl.DateTimeFormat(locale, {month: "long", year: "numeric"}).format(
    dateObj,
  );

  return <span className="text-sm font-medium">{monthYear}</span>;
}

export function MultipleMonths() {
  return (
    <Calendar
      aria-label="Trip dates"
      className="@container-normal w-auto overflow-x-auto"
      visibleDuration={{months: 2}}
    >
      <Calendar.Heading className="sr-only" />
      <div className="flex w-max gap-8">
        <div className="w-64">
          <Calendar.Header>
            <Calendar.NavButton slot="previous" />
            <CalendarMonthHeading offset={0} />
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
            <CalendarMonthHeading offset={1} />
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
