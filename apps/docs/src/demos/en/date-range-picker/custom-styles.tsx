"use client";

import {DateField, DateRangePicker, Label, RangeCalendar} from "@heroui/react";

/**
 * Range selection is styled in two layers: the outer `.range-calendar__cell` draws the
 * in-range track, and the inner `.range-calendar__cell-button` styles the start/end caps.
 * Add `range-calendar--custom-demo` to your global CSS (e.g. `src/app/globals.css`), then
 * pass `className="range-calendar--custom-demo"` on `<RangeCalendar />`. Days marked as today
 * inside the in-range middle segment keep the default `text-accent-soft-foreground` styling.
 *
 * ```css
 * @layer components {
 *   .range-calendar--custom-demo .range-calendar__cell {
 *     @apply rounded-none;
 *   }
 *
 *   .range-calendar--custom-demo .range-calendar__cell .range-calendar__cell-button {
 *     @apply rounded-none;
 *   }
 *
 *   .range-calendar--custom-demo .range-calendar__cell[data-selected="true"]:not([data-outside-month="true"]) {
 *     @apply rounded-none bg-muted/50;
 *   }
 *
 *   .dark .range-calendar--custom-demo .range-calendar__cell[data-selected="true"]:not([data-outside-month="true"]) {
 *     @apply bg-muted/35;
 *   }
 *
 *   .range-calendar--custom-demo .range-calendar__cell[data-selected="true"]:is(td:first-child > *) {
 *     @apply rounded-ss-none rounded-es-none;
 *
 *     &[data-selection-start="true"] {
 *       @apply rounded-ss-none rounded-es-none;
 *     }
 *   }
 *
 *   .range-calendar--custom-demo .range-calendar__cell[data-selected="true"]:is(td:last-child > *) {
 *     @apply rounded-se-none rounded-ee-none;
 *
 *     &[data-selection-end="true"] {
 *       @apply rounded-se-none rounded-ee-none;
 *     }
 *   }
 *
 *   .range-calendar--custom-demo
 *     .range-calendar__grid-body
 *     td:has(> .range-calendar__cell[data-outside-month="true"])
 *     + td
 *     > .range-calendar__cell[data-selected="true"] {
 *     @apply rounded-ss-none rounded-es-none;
 *
 *     &[data-selection-start="true"] {
 *       @apply rounded-ss-none rounded-es-none;
 *     }
 *   }
 *
 *   .range-calendar--custom-demo
 *     .range-calendar__grid-body
 *     td:has(> .range-calendar__cell[data-selected="true"]):has(
 *       + td > .range-calendar__cell[data-outside-month="true"]
 *     )
 *     > .range-calendar__cell[data-selected="true"] {
 *     @apply rounded-se-none rounded-ee-none;
 *
 *     &[data-selection-end="true"] {
 *       @apply rounded-se-none rounded-ee-none;
 *     }
 *   }
 *
 *   .range-calendar--custom-demo
 *     .range-calendar__cell[data-selection-start="true"]:not([data-outside-month="true"]) {
 *     @apply rounded-none;
 *   }
 *
 *   .range-calendar--custom-demo .range-calendar__cell[data-selection-end="true"]:not([data-outside-month="true"]) {
 *     @apply rounded-none;
 *   }
 *
 *   .range-calendar--custom-demo .range-calendar__cell[data-selected="true"] .range-calendar__cell-button {
 *     @apply rounded-none;
 *   }
 *
 *   .range-calendar--custom-demo
 *     .range-calendar__cell[data-selection-start="true"]:not([data-outside-month="true"])
 *     .range-calendar__cell-button,
 *   .range-calendar--custom-demo
 *     .range-calendar__cell[data-selection-end="true"]:not([data-outside-month="true"])
 *     .range-calendar__cell-button {
 *     @apply bg-foreground text-background;
 *   }
 *
 *   .range-calendar--custom-demo
 *     .range-calendar__cell[data-selection-start="true"][data-pressed="true"]:not([data-outside-month="true"])
 *     .range-calendar__cell-button,
 *   .range-calendar--custom-demo
 *     .range-calendar__cell[data-selection-end="true"][data-pressed="true"]:not([data-outside-month="true"])
 *     .range-calendar__cell-button {
 *     @apply bg-foreground/90;
 *   }
 *
 *   @media (hover: hover) {
 *     .range-calendar--custom-demo .range-calendar__cell[data-hovered="true"]:not([data-selected="true"])
 *       .range-calendar__cell-button,
 *     .range-calendar--custom-demo .range-calendar__cell:hover:not([data-selected="true"])
 *       .range-calendar__cell-button {
 *       @apply rounded-none bg-muted/70;
 *     }
 *   }
 * }
 * ```
 */

const fieldGroup =
  "rounded-xl border border-border bg-surface shadow-sm ring-1 ring-black/5 focus-within:ring-2 focus-within:ring-foreground/15 dark:ring-white/10";

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
      <DateRangePicker.Popover className="rounded-xl border border-border bg-surface p-2 shadow-lg ring-1 ring-black/5 dark:ring-white/10">
        <RangeCalendar aria-label="Stay dates" className="range-calendar--custom-demo">
          <RangeCalendar.Header className="mb-2">
            <RangeCalendar.YearPickerTrigger>
              <RangeCalendar.YearPickerTriggerHeading className="font-semibold text-foreground" />
              <RangeCalendar.YearPickerTriggerIndicator className="text-muted" />
            </RangeCalendar.YearPickerTrigger>
            <RangeCalendar.NavButton
              className="rounded-lg text-muted hover:bg-muted/70"
              slot="previous"
            />
            <RangeCalendar.NavButton
              className="rounded-lg text-muted hover:bg-muted/70"
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
  );
}
