"use client";

import {Calendar} from "@heroui/react";

export function CustomStyles() {
  return (
    <Calendar aria-label="Custom styled calendar">
      <Calendar.Header className="pb-3">
        <Calendar.YearPickerTrigger className="group justify-start">
          <Calendar.YearPickerTriggerHeading />
          <Calendar.YearPickerTriggerIndicator className="-rotate-90 text-accent group-data-[open=true]:-rotate-180" />
        </Calendar.YearPickerTrigger>
        <Calendar.NavButton className="text-accent" slot="previous" />
        <Calendar.NavButton className="text-accent" slot="next" />
      </Calendar.Header>
      <Calendar.Grid>
        <Calendar.GridHeader>
          {(day) => <Calendar.HeaderCell>{day}</Calendar.HeaderCell>}
        </Calendar.GridHeader>
        <Calendar.GridBody>{(date) => <Calendar.Cell date={date} />}</Calendar.GridBody>
      </Calendar.Grid>
      <Calendar.YearPickerGrid>
        <Calendar.YearPickerGridBody>
          {({year}) => <Calendar.YearPickerCell year={year} />}
        </Calendar.YearPickerGridBody>
      </Calendar.YearPickerGrid>
    </Calendar>
  );
}
