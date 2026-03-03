import type {DateValue} from "@internationalized/date";
import type {Meta, StoryObj} from "@storybook/react";

import {
  getLocalTimeZone,
  isToday,
  isWeekend,
  parseDate,
  startOfMonth,
  startOfWeek,
  today,
} from "@internationalized/date";
import React, {useState} from "react";
import {I18nProvider, RangeCalendarStateContext, useLocale} from "react-aria-components";

import {Button} from "../button";
import {ButtonGroup} from "../button-group";
import {Description} from "../description";

import {RangeCalendar} from "./index";

const meta: Meta<typeof RangeCalendar> = {
  argTypes: {
    allowsNonContiguousRanges: {
      control: "boolean",
    },
    isDisabled: {
      control: "boolean",
    },
    isReadOnly: {
      control: "boolean",
    },
  },
  component: RangeCalendar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  title: "Components/Date and Time/RangeCalendar",
};

export default meta;
type Story = StoryObj<typeof RangeCalendar>;

type DateRange = {
  start: DateValue;
  end: DateValue;
};

/* -------------------------------------------------------------------------------------------------
 * Helper component to render a basic range calendar structure
 * -----------------------------------------------------------------------------------------------*/
const RangeCalendarTemplate = (
  props: Omit<React.ComponentProps<typeof RangeCalendar>, "children">,
) => (
  <RangeCalendar {...props}>
    <RangeCalendar.Header>
      <RangeCalendar.Heading />
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
);

/* -------------------------------------------------------------------------------------------------
 * Helper component to render a range calendar with year picker
 * -----------------------------------------------------------------------------------------------*/
const RangeCalendarTemplateWithYearPicker = (
  props: Omit<React.ComponentProps<typeof RangeCalendar>, "children">,
) => (
  <RangeCalendar {...props}>
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

/* -------------------------------------------------------------------------------------------------
 * Helper component to render individual month heading for multi-month calendars
 * -----------------------------------------------------------------------------------------------*/
const RangeCalendarMonthHeading = ({offset = 0}: {offset?: number}) => {
  const state = React.useContext(RangeCalendarStateContext)!;
  const {locale} = useLocale();

  const startDate = state.visibleRange.start;
  const monthDate = startDate.add({months: offset});
  const dateObj = monthDate.toDate(getLocalTimeZone());
  const monthYear = new Intl.DateTimeFormat(locale, {month: "long", year: "numeric"}).format(
    dateObj,
  );

  return <span className="text-sm font-medium">{monthYear}</span>;
};

/* -------------------------------------------------------------------------------------------------
 * Stories
 * -----------------------------------------------------------------------------------------------*/
export const Default: Story = {
  render: (args) => <RangeCalendarTemplate {...args} aria-label="Trip dates" />,
};

export const WithYearPicker: Story = {
  render: (args) => <RangeCalendarTemplateWithYearPicker {...args} aria-label="Trip dates" />,
};

export const DefaultValue: Story = {
  render: (args) => (
    <RangeCalendarTemplate
      {...args}
      aria-label="Trip dates"
      defaultValue={{end: parseDate("2025-02-12"), start: parseDate("2025-02-03")}}
    />
  ),
};

export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = useState<DateRange | null>(null);
    const [focusedDate, setFocusedDate] = useState<DateValue>(parseDate("2025-12-25"));
    const {locale} = useLocale();

    return (
      <div className="flex flex-col items-center gap-4">
        <ButtonGroup variant="tertiary">
          <Button
            onPress={() => {
              const start = today(getLocalTimeZone());

              setValue({end: start.add({days: 6}), start});
              setFocusedDate(start);
            }}
          >
            This week
          </Button>
          <Button
            onPress={() => {
              const nextWeekStart = startOfWeek(today(getLocalTimeZone()).add({weeks: 1}), locale);

              setValue({end: nextWeekStart.add({days: 6}), start: nextWeekStart});
              setFocusedDate(nextWeekStart);
            }}
          >
            Next week
          </Button>
          <Button
            onPress={() => {
              const nextMonthStart = startOfMonth(today(getLocalTimeZone()).add({months: 1}));

              setValue({end: nextMonthStart.add({days: 9}), start: nextMonthStart});
              setFocusedDate(nextMonthStart);
            }}
          >
            Next month
          </Button>
        </ButtonGroup>
        <RangeCalendarTemplate
          {...args}
          aria-label="Trip dates"
          focusedValue={focusedDate}
          value={value}
          onChange={setValue}
          onFocusChange={setFocusedDate}
        />
        <Description className="text-center">
          Selected range:{" "}
          {value ? `${value.start.toString()} -> ${value.end.toString()}` : "(none)"}
        </Description>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="secondary"
            onPress={() => {
              const start = today(getLocalTimeZone());

              setValue({end: start.add({days: 6}), start});
              setFocusedDate(start);
            }}
          >
            Set 1 week
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onPress={() => {
              const start = parseDate("2025-12-20");

              setValue({end: parseDate("2025-12-31"), start});
              setFocusedDate(start);
            }}
          >
            Set Holidays
          </Button>
          <Button size="sm" variant="tertiary" onPress={() => setValue(null)}>
            Clear
          </Button>
        </div>
      </div>
    );
  },
};

export const MinMaxDates: Story = {
  render: (args) => {
    const now = today(getLocalTimeZone());
    const minDate = now;
    const maxDate = now.add({months: 3});

    return (
      <div className="flex flex-col items-center gap-4">
        <RangeCalendar
          {...args}
          aria-label="Trip dates"
          defaultValue={{end: now.add({days: 5}), start: now.add({days: 2})}}
          maxValue={maxDate}
          minValue={minDate}
        >
          <RangeCalendar.Header>
            <RangeCalendar.NavButton slot="previous" />
            <RangeCalendar.YearPickerTrigger>
              <RangeCalendar.YearPickerTriggerHeading />
              <RangeCalendar.YearPickerTriggerIndicator />
            </RangeCalendar.YearPickerTrigger>
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
        <Description className="text-center">
          Select dates between today and {maxDate.toString()}
        </Description>
      </div>
    );
  },
};

export const UnavailableDates: Story = {
  render: (args) => {
    const now = today(getLocalTimeZone());
    const blockedRanges = [
      [now.add({days: 2}), now.add({days: 5})],
      [now.add({days: 12}), now.add({days: 13})],
    ] as const;

    const isDateUnavailable = (date: DateValue) => {
      return blockedRanges.some(
        ([start, end]) => date.compare(start) >= 0 && date.compare(end) <= 0,
      );
    };

    return (
      <div className="flex flex-col items-center gap-4">
        <RangeCalendarTemplate
          {...args}
          aria-label="Trip dates"
          defaultValue={{end: now.add({days: 9}), start: now.add({days: 6})}}
          isDateUnavailable={isDateUnavailable}
        />
        <Description className="text-center">Some days are unavailable</Description>
      </div>
    );
  },
};

export const AllowsNonContiguousRanges: Story = {
  render: (args) => {
    const now = today(getLocalTimeZone());
    const blockedRanges = [
      [now.add({days: 2}), now.add({days: 5})],
      [now.add({days: 12}), now.add({days: 13})],
    ] as const;

    const isDateUnavailable = (date: DateValue) => {
      return blockedRanges.some(
        ([start, end]) => date.compare(start) >= 0 && date.compare(end) <= 0,
      );
    };

    return (
      <div className="flex flex-col items-center gap-4">
        <RangeCalendarTemplate
          {...args}
          allowsNonContiguousRanges
          aria-label="Trip dates"
          defaultValue={{end: now.add({days: 9}), start: now.add({days: 1})}}
          isDateUnavailable={isDateUnavailable}
        />
        <Description className="text-center">
          Non-contiguous ranges are allowed across unavailable dates
        </Description>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: (args) => (
    <div className="flex flex-col items-center gap-4">
      <RangeCalendarTemplate
        {...args}
        isDisabled
        aria-label="Trip dates"
        defaultValue={{
          end: today(getLocalTimeZone()).add({days: 4}),
          start: today(getLocalTimeZone()),
        }}
      />
      <Description className="text-center">Range calendar is disabled</Description>
    </div>
  ),
};

export const ReadOnly: Story = {
  render: (args) => (
    <div className="flex flex-col items-center gap-4">
      <RangeCalendarTemplate
        {...args}
        isReadOnly
        aria-label="Trip dates"
        defaultValue={{
          end: today(getLocalTimeZone()).add({days: 4}),
          start: today(getLocalTimeZone()),
        }}
      />
      <Description className="text-center">Range calendar is read-only</Description>
    </div>
  ),
};

export const Invalid: Story = {
  render: (args) => {
    const now = today(getLocalTimeZone());
    const [value, setValue] = useState<DateRange>({
      end: now.add({days: 14}),
      start: now.add({days: 6}),
    });
    const isInvalid = value.end.compare(value.start) > 7;

    return (
      <div className="flex flex-col items-center gap-4">
        <RangeCalendarTemplate
          {...args}
          aria-label="Trip dates"
          isInvalid={isInvalid}
          value={value}
          onChange={setValue}
        />
        {isInvalid ? (
          <p className="text-sm text-danger">Maximum stay duration is 1 week</p>
        ) : (
          <Description className="text-center">Select a stay of up to 7 days</Description>
        )}
      </div>
    );
  },
};

export const FocusedValue: Story = {
  render: (args) => {
    const [focusedDate, setFocusedDate] = useState<DateValue>(parseDate("2025-06-15"));

    return (
      <div className="flex flex-col items-center gap-4">
        <RangeCalendarTemplate
          {...args}
          aria-label="Trip dates"
          focusedValue={focusedDate}
          onFocusChange={setFocusedDate}
        />
        <Description className="text-center">Focused: {focusedDate.toString()}</Description>
        <div className="flex flex-wrap justify-center gap-2">
          <Button
            size="sm"
            variant="secondary"
            onPress={() => setFocusedDate(parseDate("2025-01-01"))}
          >
            Go to Jan
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onPress={() => setFocusedDate(parseDate("2025-06-15"))}
          >
            Go to Jun
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onPress={() => setFocusedDate(parseDate("2025-12-25"))}
          >
            Go to Christmas
          </Button>
        </div>
      </div>
    );
  },
};

// Sample dates that have events (for demo purposes)
const datesWithEvents = [3, 7, 12, 15, 21, 28];

export const WithIndicators: Story = {
  render: (args) => (
    <RangeCalendar {...args} aria-label="Trip dates">
      <RangeCalendar.Header>
        <RangeCalendar.NavButton slot="previous" />
        <RangeCalendar.Heading />
        <RangeCalendar.NavButton slot="next" />
      </RangeCalendar.Header>
      <RangeCalendar.Grid>
        <RangeCalendar.GridHeader>
          {(day) => <RangeCalendar.HeaderCell>{day}</RangeCalendar.HeaderCell>}
        </RangeCalendar.GridHeader>
        <RangeCalendar.GridBody>
          {(date) => (
            <RangeCalendar.Cell date={date}>
              {({formattedDate}) => (
                <>
                  {formattedDate}
                  {(isToday(date, getLocalTimeZone()) || datesWithEvents.includes(date.day)) && (
                    <RangeCalendar.CellIndicator />
                  )}
                </>
              )}
            </RangeCalendar.Cell>
          )}
        </RangeCalendar.GridBody>
      </RangeCalendar.Grid>
    </RangeCalendar>
  ),
};

export const MultipleMonths: Story = {
  render: (args) => (
    <RangeCalendar
      {...args}
      aria-label="Trip dates"
      className="@container-normal w-auto overflow-x-auto"
      visibleDuration={{months: 2}}
    >
      <RangeCalendar.Heading className="sr-only" />
      <div className="flex w-max gap-8">
        <div className="w-64">
          <RangeCalendar.Header>
            <RangeCalendar.NavButton slot="previous" />
            <RangeCalendarMonthHeading offset={0} />
            <div className="size-6" />
          </RangeCalendar.Header>
          <RangeCalendar.Grid>
            <RangeCalendar.GridHeader>
              {(day) => <RangeCalendar.HeaderCell>{day}</RangeCalendar.HeaderCell>}
            </RangeCalendar.GridHeader>
            <RangeCalendar.GridBody>
              {(date) => <RangeCalendar.Cell date={date} />}
            </RangeCalendar.GridBody>
          </RangeCalendar.Grid>
        </div>
        <div className="w-64">
          <RangeCalendar.Header>
            <div className="size-6" />
            <RangeCalendarMonthHeading offset={1} />
            <RangeCalendar.NavButton slot="next" />
          </RangeCalendar.Header>
          <RangeCalendar.Grid offset={{months: 1}}>
            <RangeCalendar.GridHeader>
              {(day) => <RangeCalendar.HeaderCell>{day}</RangeCalendar.HeaderCell>}
            </RangeCalendar.GridHeader>
            <RangeCalendar.GridBody>
              {(date) => <RangeCalendar.Cell date={date} />}
            </RangeCalendar.GridBody>
          </RangeCalendar.Grid>
        </div>
      </div>
    </RangeCalendar>
  ),
};

export const ThreeMonths: Story = {
  render: (args) => (
    <RangeCalendar
      {...args}
      aria-label="Vacation planning"
      className="@container-normal w-auto overflow-x-auto"
      visibleDuration={{months: 3}}
    >
      <RangeCalendar.Heading className="sr-only" />
      <div className="flex w-max gap-7">
        <div className="w-64">
          <RangeCalendar.Header>
            <RangeCalendar.NavButton slot="previous" />
            <RangeCalendarMonthHeading offset={0} />
            <div className="size-6" />
          </RangeCalendar.Header>
          <RangeCalendar.Grid>
            <RangeCalendar.GridHeader>
              {(day) => <RangeCalendar.HeaderCell>{day}</RangeCalendar.HeaderCell>}
            </RangeCalendar.GridHeader>
            <RangeCalendar.GridBody>
              {(date) => <RangeCalendar.Cell date={date} />}
            </RangeCalendar.GridBody>
          </RangeCalendar.Grid>
        </div>
        <div className="w-64">
          <RangeCalendar.Header>
            <div className="size-6" />
            <RangeCalendarMonthHeading offset={1} />
            <div className="size-6" />
          </RangeCalendar.Header>
          <RangeCalendar.Grid offset={{months: 1}}>
            <RangeCalendar.GridHeader>
              {(day) => <RangeCalendar.HeaderCell>{day}</RangeCalendar.HeaderCell>}
            </RangeCalendar.GridHeader>
            <RangeCalendar.GridBody>
              {(date) => <RangeCalendar.Cell date={date} />}
            </RangeCalendar.GridBody>
          </RangeCalendar.Grid>
        </div>
        <div className="w-64">
          <RangeCalendar.Header>
            <div className="size-6" />
            <RangeCalendarMonthHeading offset={2} />
            <RangeCalendar.NavButton slot="next" />
          </RangeCalendar.Header>
          <RangeCalendar.Grid offset={{months: 2}}>
            <RangeCalendar.GridHeader>
              {(day) => <RangeCalendar.HeaderCell>{day}</RangeCalendar.HeaderCell>}
            </RangeCalendar.GridHeader>
            <RangeCalendar.GridBody>
              {(date) => <RangeCalendar.Cell date={date} />}
            </RangeCalendar.GridBody>
          </RangeCalendar.Grid>
        </div>
      </div>
    </RangeCalendar>
  ),
};

export const InternationalCalendar: Story = {
  render: (args) => (
    <I18nProvider locale="hi-IN-u-ca-indian">
      <RangeCalendarTemplateWithYearPicker
        {...args}
        aria-label="Trip dates"
        defaultValue={{
          end: today(getLocalTimeZone()).add({days: 7}),
          start: today(getLocalTimeZone()),
        }}
      />
    </I18nProvider>
  ),
};

export const BookingCalendar: Story = {
  render: (args) => {
    const [selectedRange, setSelectedRange] = useState<DateRange | null>(null);
    const {locale} = useLocale();

    // Simulated blocked dates
    const blockedDates = [5, 6, 12, 13, 14, 20];

    const isDateUnavailable = (date: DateValue) => {
      // Weekends and already blocked dates are unavailable
      return isWeekend(date, locale) || blockedDates.includes(date.day);
    };

    return (
      <div className="flex flex-col items-center gap-4">
        <RangeCalendar
          {...args}
          aria-label="Booking range"
          isDateUnavailable={isDateUnavailable}
          minValue={today(getLocalTimeZone())}
          value={selectedRange}
          onChange={setSelectedRange}
        >
          <RangeCalendar.Header>
            <RangeCalendar.NavButton slot="previous" />
            <RangeCalendar.Heading />
            <RangeCalendar.NavButton slot="next" />
          </RangeCalendar.Header>
          <RangeCalendar.Grid>
            <RangeCalendar.GridHeader>
              {(day) => <RangeCalendar.HeaderCell>{day}</RangeCalendar.HeaderCell>}
            </RangeCalendar.GridHeader>
            <RangeCalendar.GridBody>
              {(date) => (
                <RangeCalendar.Cell date={date}>
                  {({formattedDate, isUnavailable}) => (
                    <>
                      {formattedDate}
                      {!isUnavailable &&
                        !isWeekend(date, locale) &&
                        blockedDates.includes(date.day) && <RangeCalendar.CellIndicator />}
                    </>
                  )}
                </RangeCalendar.Cell>
              )}
            </RangeCalendar.GridBody>
          </RangeCalendar.Grid>
        </RangeCalendar>
        <div className="flex flex-col gap-2 text-center">
          <div className="flex items-center justify-center gap-4 text-xs text-muted">
            <span className="flex items-center gap-1">
              <span className="size-2 rounded-full bg-muted" /> Blocked dates
            </span>
            <span className="flex items-center gap-1">
              <span className="size-2 rounded-full bg-default" /> Weekend/Unavailable
            </span>
          </div>
          {selectedRange ? (
            <Button size="sm" variant="primary">
              Book {selectedRange.start.toString()} -&gt; {selectedRange.end.toString()}
            </Button>
          ) : null}
        </div>
      </div>
    );
  },
};
