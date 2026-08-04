import type {ReactNode} from "react";

import {ssrSmoke} from "@heroui/testing/helpers";
import {CalendarDate} from "@internationalized/date";

import {I18nProvider} from "@/components/rac";
import {RangeCalendar} from "@/components/range-calendar";

const MIN_VALUE = new CalendarDate(2020, 1, 1);
const MAX_VALUE = new CalendarDate(2030, 12, 31);

const wrapper = ({children}: {children: ReactNode}) => (
  <I18nProvider locale="en-US">{children}</I18nProvider>
);

const RangeCalendarExample = ({defaultYearPickerOpen}: {defaultYearPickerOpen?: boolean}) => (
  <RangeCalendar
    aria-label="Trip dates"
    defaultValue={{start: new CalendarDate(2026, 8, 1), end: new CalendarDate(2026, 8, 5)}}
    defaultYearPickerOpen={defaultYearPickerOpen}
    maxValue={MAX_VALUE}
    minValue={MIN_VALUE}
  >
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
    <RangeCalendar.YearPickerGrid>
      <RangeCalendar.YearPickerGridBody>
        {({year}) => <RangeCalendar.YearPickerCell year={year} />}
      </RangeCalendar.YearPickerGridBody>
    </RangeCalendar.YearPickerGrid>
  </RangeCalendar>
);

describe("RangeCalendar SSR", () => {
  beforeEach(() => {
    vi.setSystemTime(new Date("2026-08-15T12:00:00Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders and hydrates a controlled range view without mismatches", async () => {
    const {html} = await ssrSmoke(<RangeCalendarExample />, {wrapper});

    expect(html).toContain('data-slot="range-calendar"');
    expect(html).toContain('aria-multiselectable="true"');
    expect(html).toContain('data-selection-start="true"');
    expect(html).toContain('data-selection-end="true"');
  });

  it("renders and hydrates with the year picker open (frozen system time)", async () => {
    const {html} = await ssrSmoke(<RangeCalendarExample defaultYearPickerOpen />, {wrapper});

    expect(html).toContain('data-slot="calendar-year-picker-grid"');
    expect(html).toContain('data-open="true"');
    expect(html).toContain("2026");
  });
});
