"use client";

import {RangeCalendar} from "@heroui/react";
import {getLocalTimeZone} from "@internationalized/date";
import React from "react";
import {RangeCalendarStateContext, useLocale} from "react-aria-components";

function RangeCalendarMonthHeading({offset = 0}: {offset?: number}) {
  const state = React.useContext(RangeCalendarStateContext)!;
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
    <RangeCalendar
      aria-label="Trip dates"
      className="@container-normal w-auto"
      visibleDuration={{months: 2}}
    >
      <RangeCalendar.Heading className="sr-only" />
      <div className="flex gap-8">
        <div className="w-64">
          <RangeCalendar.Header>
            <RangeCalendar.NavButton slot="previous" />
            <RangeCalendarMonthHeading offset={0} />
            <div className="size-6" />
          </RangeCalendar.Header>
          <RangeCalendar.Grid>
            <RangeCalendar.GridHeader>
              {(day) => <RangeCalendar.HeaderCell>{day}</RangeCalendar.HeaderCell>}
            </RangeCalendar.GridHeader>
            <RangeCalendar.GridBody>
              {(date) => <RangeCalendar.Cell date={date} />}
            </RangeCalendar.GridBody>
          </RangeCalendar.Grid>
        </div>
        <div className="w-64">
          <RangeCalendar.Header>
            <div className="size-6" />
            <RangeCalendarMonthHeading offset={1} />
            <RangeCalendar.NavButton slot="next" />
          </RangeCalendar.Header>
          <RangeCalendar.Grid offset={{months: 1}}>
            <RangeCalendar.GridHeader>
              {(day) => <RangeCalendar.HeaderCell>{day}</RangeCalendar.HeaderCell>}
            </RangeCalendar.GridHeader>
            <RangeCalendar.GridBody>
              {(date) => <RangeCalendar.Cell date={date} />}
            </RangeCalendar.GridBody>
          </RangeCalendar.Grid>
        </div>
      </div>
    </RangeCalendar>
  );
}
