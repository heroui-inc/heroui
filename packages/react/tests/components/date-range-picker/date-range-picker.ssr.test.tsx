import type {ReactNode} from "react";

import {ssrSmoke} from "@heroui/testing/helpers";
import {CalendarDate} from "@internationalized/date";

import {DateField} from "@/components/date-field";
import {DateRangePicker} from "@/components/date-range-picker";
import {Label} from "@/components/label";
import {I18nProvider} from "@/components/rac";
import {RangeCalendar} from "@/components/range-calendar";

const wrapper = ({children}: {children: ReactNode}) => (
  <I18nProvider locale="en-US">{children}</I18nProvider>
);

const DateRangePickerExample = () => (
  <DateRangePicker
    data-testid="date-range-picker"
    endName="endDate"
    startName="startDate"
    value={{start: new CalendarDate(2026, 8, 1), end: new CalendarDate(2026, 8, 5)}}
  >
    <Label>Trip dates</Label>
    <DateField.Group>
      <DateField.Input slot="start">
        {(segment) => <DateField.Segment segment={segment} />}
      </DateField.Input>
      <DateRangePicker.RangeSeparator />
      <DateField.Input slot="end">
        {(segment) => <DateField.Segment segment={segment} />}
      </DateField.Input>
      <DateField.Suffix>
        <DateRangePicker.Trigger aria-label="Open calendar">
          <DateRangePicker.TriggerIndicator />
        </DateRangePicker.Trigger>
      </DateField.Suffix>
    </DateField.Group>
    <DateRangePicker.Popover>
      <RangeCalendar aria-label="Selected range">
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
      </RangeCalendar>
    </DateRangePicker.Popover>
  </DateRangePicker>
);

describe("DateRangePicker SSR", () => {
  beforeEach(() => {
    vi.setSystemTime(new Date("2026-08-15T12:00:00Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders and hydrates the closed trigger without mismatches", async () => {
    const {html} = await ssrSmoke(<DateRangePickerExample />, {wrapper});

    expect(html).toContain('data-slot="date-range-picker"');
    expect(html).toContain('data-slot="date-range-picker-trigger"');
    expect(html).toContain('data-slot="date-range-picker-range-separator"');
    expect(html).toContain('role="spinbutton"');
  });
});
