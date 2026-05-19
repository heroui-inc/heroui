"use client";

import {Calendar} from "@heroui/react";

export function CustomStyles() {
  return (
    <Calendar
      aria-label="Event date"
      className="rounded-xl border border-border bg-surface p-3 shadow-sm"
    >
      <Calendar.Header className="mb-2 gap-1">
        <Calendar.Heading className="font-semibold text-foreground" />
        <Calendar.NavButton className="rounded-lg text-muted hover:bg-muted/60" slot="previous" />
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
          {(date) => (
            <Calendar.Cell
              className="rounded-lg data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground"
              date={date}
            />
          )}
        </Calendar.GridBody>
      </Calendar.Grid>
    </Calendar>
  );
}
