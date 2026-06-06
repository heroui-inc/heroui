"use client";

import type {DateValue} from "@internationalized/date";

import {Button, DateField, DateRangePicker, Description, Label, RangeCalendar} from "@heroui/react";
import {getLocalTimeZone, today} from "@internationalized/date";
import {useState} from "react";

type DateRange = {
  start: DateValue;
  end: DateValue;
};

export function Controlled() {
  const start = today(getLocalTimeZone());
  const [value, setValue] = useState<DateRange | null>({end: start.add({days: 4}), start});

  return (
    <div className="flex w-80 flex-col gap-4">
      <DateRangePicker endName="endDate" startName="startDate" value={value} onChange={setValue}>
        <Label>出行日期</Label>
        <DateField.Group fullWidth>
          <DateField.Input slot="start">
            {(segment) => <DateField.Segment segment={segment} />}
          </DateField.Input>
          <DateRangePicker.RangeSeparator />
          <DateField.Input slot="end">
            {(segment) => <DateField.Segment segment={segment} />}
          </DateField.Input>
          <DateField.Suffix>
            <DateRangePicker.Trigger>
              <DateRangePicker.TriggerIndicator />
            </DateRangePicker.Trigger>
          </DateField.Suffix>
        </DateField.Group>
        <DateRangePicker.Popover>
          <RangeCalendar aria-label="出行日期">
            <RangeCalendar.Header>
              <RangeCalendar.YearPickerTrigger>
                <RangeCalendar.YearPickerTriggerHeading />
                <RangeCalendar.YearPickerTriggerIndicator />
              </RangeCalendar.YearPickerTrigger>
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
            <RangeCalendar.YearPickerGrid>
              <RangeCalendar.YearPickerGridBody>
                {({year}) => <RangeCalendar.YearPickerCell year={year} />}
              </RangeCalendar.YearPickerGridBody>
            </RangeCalendar.YearPickerGrid>
          </RangeCalendar>
        </DateRangePicker.Popover>
      </DateRangePicker>
      <Description>
        当前值：{value ? `${value.start.toString()} 至 ${value.end.toString()}` : "（空）"}
      </Description>
      <div className="flex gap-2">
        <Button
          variant="tertiary"
          onPress={() => {
            const nextStart = today(getLocalTimeZone());

            setValue({end: nextStart.add({days: 6}), start: nextStart});
          }}
        >
          设为一周
        </Button>
        <Button variant="tertiary" onPress={() => setValue(null)}>
          清空
        </Button>
      </div>
    </div>
  );
}
