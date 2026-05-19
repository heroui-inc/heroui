"use client";

import {Calendar, DateField, DatePicker, Label} from "@heroui/react";

const fieldGroup =
  "rounded-xl border border-border/80 bg-surface shadow-sm ring-1 ring-black/5 focus-within:ring-2 focus-within:ring-neutral-400/30 dark:ring-white/10 dark:focus-within:ring-neutral-500/40";

const dayCell =
  "rounded-lg data-[selected=true]:bg-neutral-900 data-[selected=true]:text-white data-[focused=true]:ring-2 data-[focused=true]:ring-neutral-400/40 dark:data-[selected=true]:bg-neutral-100 dark:data-[selected=true]:text-neutral-900";

export function CustomStyles() {
  return (
    <DatePicker className="w-64" name="event-date">
      <Label className="text-sm font-medium tracking-tight text-foreground">Event date</Label>
      <DateField.Group fullWidth className={fieldGroup} variant="secondary">
        <DateField.Input>{(segment) => <DateField.Segment segment={segment} />}</DateField.Input>
        <DateField.Suffix>
          <DatePicker.Trigger className="text-muted">
            <DatePicker.TriggerIndicator />
          </DatePicker.Trigger>
        </DateField.Suffix>
      </DateField.Group>
      <DatePicker.Popover className="rounded-xl border border-border/80 bg-surface p-2 shadow-xl ring-1 ring-black/5 dark:ring-white/10">
        <Calendar aria-label="Event date">
          <Calendar.Header className="mb-2">
            <Calendar.YearPickerTrigger>
              <Calendar.YearPickerTriggerHeading className="font-semibold text-foreground" />
              <Calendar.YearPickerTriggerIndicator className="text-muted" />
            </Calendar.YearPickerTrigger>
            <Calendar.NavButton
              className="rounded-lg text-muted hover:bg-muted/60"
              slot="previous"
            />
            <Calendar.NavButton className="rounded-lg text-muted hover:bg-muted/60" slot="next" />
          </Calendar.Header>
          <Calendar.Grid>
            <Calendar.GridHeader>
              {(day) => (
                <Calendar.HeaderCell className="text-xs font-medium text-muted">
                  {day}
                </Calendar.HeaderCell>
              )}
            </Calendar.GridHeader>
            <Calendar.GridBody>
              {(date) => <Calendar.Cell className={dayCell} date={date} />}
            </Calendar.GridBody>
          </Calendar.Grid>
          <Calendar.YearPickerGrid>
            <Calendar.YearPickerGridBody>
              {({year}) => <Calendar.YearPickerCell year={year} />}
            </Calendar.YearPickerGridBody>
          </Calendar.YearPickerGrid>
        </Calendar>
      </DatePicker.Popover>
    </DatePicker>
  );
}
