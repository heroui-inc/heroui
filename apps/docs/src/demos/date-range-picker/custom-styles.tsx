"use client";

import {DateField, DateRangePicker, Label, RangeCalendar} from "@heroui/react";

const fieldGroup =
  "rounded-xl border border-border/80 bg-surface shadow-sm ring-1 ring-black/5 focus-within:ring-2 focus-within:ring-neutral-400/30 dark:ring-white/10 dark:focus-within:ring-neutral-500/40";

const dayCell =
  "rounded-lg data-[selected=true]:bg-neutral-900 data-[selected=true]:text-white data-[selection-start=true]:rounded-l-lg data-[selection-end=true]:rounded-r-lg data-[focused=true]:ring-2 data-[focused=true]:ring-neutral-400/40 dark:data-[selected=true]:bg-neutral-100 dark:data-[selected=true]:text-neutral-900";

export function CustomStyles() {
  return (
    <DateRangePicker className="w-72" endName="checkout" startName="checkin">
      <Label className="text-sm font-medium tracking-tight text-foreground">Stay</Label>
      <DateField.Group fullWidth className={fieldGroup} variant="secondary">
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
      <DateRangePicker.Popover className="rounded-xl border border-border/80 bg-surface p-2 shadow-xl ring-1 ring-black/5 dark:ring-white/10">
        <RangeCalendar aria-label="Stay dates">
          <RangeCalendar.Header className="mb-2">
            <RangeCalendar.YearPickerTrigger>
              <RangeCalendar.YearPickerTriggerHeading className="font-semibold text-foreground" />
              <RangeCalendar.YearPickerTriggerIndicator className="text-muted" />
            </RangeCalendar.YearPickerTrigger>
            <RangeCalendar.NavButton
              className="rounded-lg text-muted hover:bg-muted/60"
              slot="previous"
            />
            <RangeCalendar.NavButton
              className="rounded-lg text-muted hover:bg-muted/60"
              slot="next"
            />
          </RangeCalendar.Header>
          <RangeCalendar.Grid>
            <RangeCalendar.GridHeader>
              {(day) => (
                <RangeCalendar.HeaderCell className="text-xs font-medium text-muted">
                  {day}
                </RangeCalendar.HeaderCell>
              )}
            </RangeCalendar.GridHeader>
            <RangeCalendar.GridBody>
              {(date) => <RangeCalendar.Cell className={dayCell} date={date} />}
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
  );
}
