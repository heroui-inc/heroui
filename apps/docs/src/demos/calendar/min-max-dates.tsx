"use client";

import {Calendar, Description} from "@heroui/react";
import {getLocalTimeZone, today} from "@internationalized/date";

export function MinMaxDates() {
  const now = today(getLocalTimeZone());
  const minDate = now;
  const maxDate = now.add({months: 3});

  return (
    <div className="flex flex-col items-center gap-4">
      <Calendar aria-label="Appointment date" maxValue={maxDate} minValue={minDate}>
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
        Select a date between today and {maxDate.toString()}
      </Description>
    </div>
  );
}
