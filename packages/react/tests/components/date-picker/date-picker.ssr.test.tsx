import type {ReactNode} from "react";

import {ssrSmoke} from "@heroui/testing/helpers";
import {CalendarDate} from "@internationalized/date";

import {Calendar} from "@/components/calendar";
import {DateField} from "@/components/date-field";
import {DatePicker} from "@/components/date-picker";
import {Label} from "@/components/label";
import {I18nProvider} from "@/components/rac";

const wrapper = ({children}: {children: ReactNode}) => (
  <I18nProvider locale="en-US">{children}</I18nProvider>
);

const DatePickerExample = () => (
  <DatePicker data-testid="date-picker" name="date" value={new CalendarDate(2026, 8, 15)}>
    <Label>Date</Label>
    <DateField.Group>
      <DateField.Input>{(segment) => <DateField.Segment segment={segment} />}</DateField.Input>
      <DateField.Suffix>
        <DatePicker.Trigger aria-label="Open calendar">
          <DatePicker.TriggerIndicator />
        </DatePicker.Trigger>
      </DateField.Suffix>
    </DateField.Group>
    <DatePicker.Popover>
      <Calendar aria-label="Selected date">
        <Calendar.Header>
          <Calendar.YearPickerTrigger>
            <Calendar.YearPickerTriggerHeading />
            <Calendar.YearPickerTriggerIndicator />
          </Calendar.YearPickerTrigger>
          <Calendar.NavButton slot="previous" />
          <Calendar.NavButton slot="next" />
        </Calendar.Header>
        <Calendar.Grid>
          <Calendar.GridHeader>
            {(day) => <Calendar.HeaderCell>{day}</Calendar.HeaderCell>}
          </Calendar.GridHeader>
          <Calendar.GridBody>{(date) => <Calendar.Cell date={date} />}</Calendar.GridBody>
        </Calendar.Grid>
      </Calendar>
    </DatePicker.Popover>
  </DatePicker>
);

describe("DatePicker SSR", () => {
  beforeEach(() => {
    vi.setSystemTime(new Date("2026-08-15T12:00:00Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders and hydrates the closed trigger without mismatches", async () => {
    const {html} = await ssrSmoke(<DatePickerExample />, {wrapper});

    expect(html).toContain('data-slot="date-picker"');
    expect(html).toContain('data-slot="date-picker-trigger"');
    expect(html).toContain('role="spinbutton"');
    expect(html).toContain("2026");
  });
});
