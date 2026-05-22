"use client";

import {Calendar} from "@heroui/react";

export function CustomStyles() {
  return (
    <Calendar aria-label="自定义样式日历">
      <Calendar.Header>
        <Calendar.NavButton className="text-foreground" slot="previous" />
        <Calendar.YearPickerTrigger className="w-full justify-center">
          <Calendar.YearPickerTriggerHeading className="text-foreground" />
          <Calendar.YearPickerTriggerIndicator className="text-foreground" />
        </Calendar.YearPickerTrigger>
        <Calendar.NavButton className="text-foreground" slot="next" />
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
