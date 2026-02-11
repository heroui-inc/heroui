"use client";

import {Calendar, Description} from "@heroui/react";
import {getLocalTimeZone, today} from "@internationalized/date";

export function ReadOnly() {
  return (
    <div className="flex flex-col items-center gap-4">
      <Calendar isReadOnly aria-label="Event date" defaultValue={today(getLocalTimeZone())}>
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
      <Description className="text-center">Calendar is read-only</Description>
    </div>
  );
}
