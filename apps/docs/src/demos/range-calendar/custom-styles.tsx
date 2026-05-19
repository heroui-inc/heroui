"use client";

import {RangeCalendar} from "@heroui/react";

const cellClass =
  "rounded-lg text-neutral-700 data-[hovered=true]:bg-neutral-100 data-[selected=true]:bg-neutral-200/70 data-[selection-start=true]:rounded-lg data-[selection-start=true]:bg-neutral-900 data-[selection-start=true]:text-white data-[selection-end=true]:rounded-lg data-[selection-end=true]:bg-neutral-900 data-[selection-end=true]:text-white dark:text-neutral-300 dark:data-[hovered=true]:bg-neutral-800 dark:data-[selected=true]:bg-neutral-700/50 dark:data-[selection-start=true]:bg-neutral-100 dark:data-[selection-start=true]:text-neutral-900 dark:data-[selection-end=true]:bg-neutral-100 dark:data-[selection-end=true]:text-neutral-900";

export function CustomStyles() {
  return (
    <RangeCalendar
      aria-label="Stay dates"
      className="overflow-hidden rounded-xl border border-border/80 bg-surface p-3 shadow-sm ring-1 ring-black/5 dark:ring-white/10"
      firstDayOfWeek="mon"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none mb-2 h-px bg-linear-to-r from-transparent via-neutral-300/60 to-transparent dark:via-neutral-600/50"
      />
      <RangeCalendar.Header className="pb-3">
        <RangeCalendar.Heading className="font-medium text-neutral-800 dark:text-neutral-100" />
        <RangeCalendar.NavButton
          className="rounded-lg text-muted hover:bg-neutral-100 dark:hover:bg-neutral-800"
          slot="previous"
        />
        <RangeCalendar.NavButton
          className="rounded-lg text-muted hover:bg-neutral-100 dark:hover:bg-neutral-800"
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
          {(date) => <RangeCalendar.Cell className={cellClass} date={date} />}
        </RangeCalendar.GridBody>
      </RangeCalendar.Grid>
    </RangeCalendar>
  );
}
