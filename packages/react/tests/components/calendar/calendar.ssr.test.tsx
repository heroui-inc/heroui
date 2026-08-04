import type {ReactNode} from "react";

import {ssrSmoke} from "@heroui/testing/helpers";
import {CalendarDate} from "@internationalized/date";

import {Calendar} from "@/components/calendar";
import {I18nProvider} from "@/components/rac";

const MIN_VALUE = new CalendarDate(2020, 1, 1);
const MAX_VALUE = new CalendarDate(2030, 12, 31);

const wrapper = ({children}: {children: ReactNode}) => (
  <I18nProvider locale="en-US">{children}</I18nProvider>
);

const CalendarExample = ({defaultYearPickerOpen}: {defaultYearPickerOpen?: boolean}) => (
  <Calendar
    aria-label="Event date"
    defaultValue={new CalendarDate(2026, 8, 15)}
    defaultYearPickerOpen={defaultYearPickerOpen}
    maxValue={MAX_VALUE}
    minValue={MIN_VALUE}
  >
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
    <Calendar.YearPickerGrid>
      <Calendar.YearPickerGridBody>
        {({year}) => <Calendar.YearPickerCell year={year} />}
      </Calendar.YearPickerGridBody>
    </Calendar.YearPickerGrid>
  </Calendar>
);

describe("Calendar SSR", () => {
  beforeEach(() => {
    vi.setSystemTime(new Date("2026-08-15T12:00:00Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders and hydrates a controlled month view without mismatches", async () => {
    const {html} = await ssrSmoke(<CalendarExample />, {wrapper});

    expect(html).toContain('data-slot="calendar"');
    expect(html).toContain('role="grid"');
    expect(html).toContain('data-slot="calendar-cell"');
  });

  it("renders and hydrates with the year picker open (frozen system time)", async () => {
    const {html} = await ssrSmoke(<CalendarExample defaultYearPickerOpen />, {wrapper});

    expect(html).toContain('data-slot="calendar-year-picker-grid"');
    expect(html).toContain('data-open="true"');
    expect(html).toContain("2026");
  });
});
