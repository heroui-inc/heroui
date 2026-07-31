"use client";

import {Calendar, DateField, DatePicker, Label} from "@heroui/react";

export function CustomStyles() {
  return (
    <DatePicker className="w-72" name="event-date">
      <Label>Event date</Label>
      <DateField.Group
        fullWidth
        className="rounded-xl border border-border/80 bg-default shadow-sm"
        variant="secondary"
      >
        <DateField.Input>{(segment) => <DateField.Segment segment={segment} />}</DateField.Input>
        <DateField.Suffix>
          <DatePicker.Trigger className="text-muted">
            <DatePicker.TriggerIndicator />
          </DatePicker.Trigger>
        </DateField.Suffix>
      </DateField.Group>
      <DatePicker.Popover className="border border-border/80 shadow-sm">
        <Calendar aria-label="Event date" className="rounded-2xl bg-surface p-2">
          <Calendar.Header>
            <Calendar.Heading className="font-medium text-foreground" />
            <Calendar.NavButton className="text-muted hover:bg-default" slot="previous" />
            <Calendar.NavButton className="text-muted hover:bg-default" slot="next" />
          </Calendar.Header>
          <Calendar.Grid>
            <Calendar.GridHeader>
              {(day) => (
                <Calendar.HeaderCell className="text-xs text-muted">{day}</Calendar.HeaderCell>
              )}
            </Calendar.GridHeader>
            <Calendar.GridBody>
              {(date) => (
                <Calendar.Cell
                  className="rounded-lg data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground"
                  date={date}
                />
              )}
            </Calendar.GridBody>
          </Calendar.Grid>
        </Calendar>
      </DatePicker.Popover>
    </DatePicker>
  );
}
