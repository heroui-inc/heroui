"use client";

import {DateField, DateRangePicker, Label, RangeCalendar} from "@heroui/react";

export function CustomStyles() {
  return (
    <DateRangePicker className="w-80" endName="checkout" startName="checkin">
      <Label>Stay dates</Label>
      <DateField.Group
        fullWidth
        className="rounded-xl border border-border/80 bg-default shadow-sm"
        variant="secondary"
      >
        <DateField.Input slot="start">
          {(segment) => <DateField.Segment segment={segment} />}
        </DateField.Input>
        <DateRangePicker.RangeSeparator className="text-muted" />
        <DateField.Input slot="end">
          {(segment) => <DateField.Segment segment={segment} />}
        </DateField.Input>
        <DateField.Suffix>
          <DateRangePicker.Trigger className="text-muted">
            <DateRangePicker.TriggerIndicator />
          </DateRangePicker.Trigger>
        </DateField.Suffix>
      </DateField.Group>
      <DateRangePicker.Popover className="border border-border/80 shadow-sm">
        <RangeCalendar aria-label="Stay dates" className="rounded-2xl bg-surface p-2">
          <RangeCalendar.Header>
            <RangeCalendar.Heading className="font-medium text-foreground" />
            <RangeCalendar.NavButton className="text-muted hover:bg-default" slot="previous" />
            <RangeCalendar.NavButton className="text-muted hover:bg-default" slot="next" />
          </RangeCalendar.Header>
          <RangeCalendar.Grid>
            <RangeCalendar.GridHeader>
              {(day) => (
                <RangeCalendar.HeaderCell className="text-xs text-muted">
                  {day}
                </RangeCalendar.HeaderCell>
              )}
            </RangeCalendar.GridHeader>
            <RangeCalendar.GridBody>
              {(date) => <RangeCalendar.Cell date={date} />}
            </RangeCalendar.GridBody>
          </RangeCalendar.Grid>
        </RangeCalendar>
      </DateRangePicker.Popover>
    </DateRangePicker>
  );
}
