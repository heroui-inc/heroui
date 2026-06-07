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
import {I18nProvider, useLocale} from "react-aria-components/I18nProvider";

import {Button} from "../button";
import {ButtonGroup} from "../button-group";
import {Description} from "../description";
import {Label} from "../label";
import {ListBox} from "../list-box";
import {Select} from "../select";

import {Calendar} from "./index";

const meta: Meta<typeof Calendar> = {
  argTypes: {
    isDisabled: {
      control: "boolean",
    },
    isReadOnly: {
      control: "boolean",
    },
    selectionMode: {
      control: "select",
      options: ["single", "multiple"],
    },
    weeksInMonth: {
      control: {type: "number", min: 4, max: 6, step: 1},
    },
  },
  component: Calendar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  title: "Components/Date and Time/Calendar",
};

export default meta;
type Story = StoryObj<typeof Calendar>;

/* -------------------------------------------------------------------------------------------------
 * Helper component to render a basic calendar structure
 * -----------------------------------------------------------------------------------------------*/
const CalendarTemplate = (props: Omit<React.ComponentProps<typeof Calendar>, "children">) => (
  <Calendar {...props}>
    <Calendar.Header>
      <Calendar.Heading />
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
);

/* -------------------------------------------------------------------------------------------------
 * Helper component to render a calendar with year picker
 * -----------------------------------------------------------------------------------------------*/
const CalendarTemplateWithYearPicker = (
  props: Omit<React.ComponentProps<typeof Calendar>, "children">,
) => (
  <Calendar {...props}>
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

/* -------------------------------------------------------------------------------------------------
 * Stories
 * -----------------------------------------------------------------------------------------------*/
export const Default: Story = {
  render: (args) => <CalendarTemplate {...args} aria-label="Event date" />,
};

export const WithYearPicker: Story = {
  render: (args) => <CalendarTemplateWithYearPicker {...args} aria-label="Event date" />,
};

export const DefaultValue: Story = {
  render: (args) => (
    <CalendarTemplate {...args} aria-label="Event date" defaultValue={parseDate("2025-02-14")} />
  ),
};

export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = useState<DateValue | null>(null);
    const [focusedDate, setFocusedDate] = useState<DateValue>(parseDate("2025-12-25"));
    const {locale} = useLocale();

    return (
      <div className="flex flex-col items-center gap-4">
        <ButtonGroup variant="tertiary">
          <Button
            onPress={() => {
              setValue(today(getLocalTimeZone()));
              setFocusedDate(today(getLocalTimeZone()));
            }}
          >
            Today
          </Button>
          <Button
            onPress={() => {
              const nextWeekStart = startOfWeek(today(getLocalTimeZone()).add({weeks: 1}), locale);

              setValue(nextWeekStart);
              setFocusedDate(nextWeekStart);
            }}
          >
            Next week
          </Button>
          <Button
            onPress={() => {
              const nextMonthStart = startOfMonth(today(getLocalTimeZone()).add({months: 1}));

              setValue(nextMonthStart);
              setFocusedDate(nextMonthStart);
            }}
          >
            Next month
          </Button>
        </ButtonGroup>
        <CalendarTemplate
          {...args}
          aria-label="Event date"
          focusedValue={focusedDate}
          value={value}
          onChange={setValue}
          onFocusChange={setFocusedDate}
        />
        <Description className="text-center">
          Selected date: {value ? value.toString() : "(none)"}
        </Description>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="secondary"
            onPress={() => {
              const todayDate = today(getLocalTimeZone());

              setValue(todayDate);
              setFocusedDate(todayDate);
            }}
          >
            Set Today
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onPress={() => {
              const christmasDate = parseDate("2025-12-25");

              setValue(christmasDate);
              setFocusedDate(christmasDate);
            }}
          >
            Set Christmas
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
        <Calendar {...args} aria-label="Appointment date" maxValue={maxDate} minValue={minDate}>
          <Calendar.Header>
            <Calendar.NavButton slot="previous" />
            <Calendar.YearPickerTrigger>
              <Calendar.YearPickerTriggerHeading />
              <Calendar.YearPickerTriggerIndicator />
            </Calendar.YearPickerTrigger>
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
        <Description className="text-center">
          Select a date between today and {maxDate.toString()}
        </Description>
      </div>
    );
  },
};

export const UnavailableDates: Story = {
  render: (args) => {
    const {locale} = useLocale();

    // Make weekends unavailable
    const isDateUnavailable = (date: DateValue) => isWeekend(date, locale);

    return (
      <div className="flex flex-col items-center gap-4">
        <CalendarTemplate
          {...args}
          aria-label="Appointment date"
          isDateUnavailable={isDateUnavailable}
        />
        <Description className="text-center">Weekends are unavailable</Description>
      </div>
    );
  },
};

export const WeeksInMonth: Story = {
  render: (args) => (
    <div className="flex flex-col items-center gap-4">
      <CalendarTemplate {...args} aria-label="Event date" weeksInMonth={6} />
      <Description className="text-center">
        Fixed to 6 weeks per month to avoid layout shift
      </Description>
    </div>
  ),
};

export const MultipleSelection: Story = {
  render: (args) => {
    const [value, setValue] = useState<readonly DateValue[]>([]);

    return (
      <div className="flex flex-col items-center gap-4">
        <CalendarTemplate
          {...args}
          aria-label="Event dates"
          selectionMode="multiple"
          value={value}
          onChange={setValue}
        />
        <Description className="text-center">
          {value?.length ? `${value.length} date(s) selected` : "Select multiple dates"}
        </Description>
      </div>
    );
  },
};

export const CustomUnavailableDates: Story = {
  render: (args) => {
    // Block specific dates (holidays, booked dates, etc.)
    const blockedDates = [
      parseDate("2025-02-14"), // Valentine's Day
      parseDate("2025-02-17"), // President's Day
      parseDate("2025-03-17"), // St. Patrick's Day
    ];

    const isDateUnavailable = (date: DateValue) => {
      return blockedDates.some(
        (blockedDate) =>
          blockedDate.year === date.year &&
          blockedDate.month === date.month &&
          blockedDate.day === date.day,
      );
    };

    return (
      <div className="flex flex-col items-center gap-4">
        <CalendarTemplate {...args} aria-label="Event date" isDateUnavailable={isDateUnavailable} />
        <Description className="text-center">
          Feb 14, Feb 17, and Mar 17 are unavailable
        </Description>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: (args) => (
    <div className="flex flex-col items-center gap-4">
      <CalendarTemplate
        {...args}
        isDisabled
        aria-label="Event date"
        defaultValue={today(getLocalTimeZone())}
      />
      <Description className="text-center">Calendar is disabled</Description>
    </div>
  ),
};

export const ReadOnly: Story = {
  render: (args) => (
    <div className="flex flex-col items-center gap-4">
      <CalendarTemplate
        {...args}
        isReadOnly
        aria-label="Event date"
        defaultValue={today(getLocalTimeZone())}
      />
      <Description className="text-center">Calendar is read-only</Description>
    </div>
  ),
};

export const Invalid: Story = {
  render: (args) => {
    const [value, setValue] = useState<DateValue | null>(parseDate("2025-01-15"));
    const minDate = today(getLocalTimeZone());
    const isInvalid = value !== null && value.compare(minDate) < 0;

    return (
      <div className="flex flex-col items-center gap-4">
        <CalendarTemplate
          {...args}
          aria-label="Event date"
          isInvalid={isInvalid}
          value={value}
          onChange={setValue}
        />
        {isInvalid ? (
          <p className="text-sm text-danger">Date must be today or in the future</p>
        ) : (
          <Description className="text-center">Select a future date</Description>
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
        <CalendarTemplate
          {...args}
          aria-label="Event date"
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
    <Calendar {...args} aria-label="Event date">
      <Calendar.Header>
        <Calendar.NavButton slot="previous" />
        <Calendar.Heading />
        <Calendar.NavButton slot="next" />
      </Calendar.Header>
      <Calendar.Grid>
        <Calendar.GridHeader>
          {(day) => <Calendar.HeaderCell>{day}</Calendar.HeaderCell>}
        </Calendar.GridHeader>
        <Calendar.GridBody>
          {(date) => (
            <Calendar.Cell date={date}>
              {({formattedDate}) => (
                <>
                  {formattedDate}
                  {(isToday(date, getLocalTimeZone()) || datesWithEvents.includes(date.day)) && (
                    <Calendar.CellIndicator />
                  )}
                </>
              )}
            </Calendar.Cell>
          )}
        </Calendar.GridBody>
      </Calendar.Grid>
    </Calendar>
  ),
};

export const TodayIndicator: Story = {
  render: (args) => (
    <Calendar {...args} aria-label="Event date" defaultValue={today(getLocalTimeZone())}>
      <Calendar.Header>
        <Calendar.NavButton slot="previous" />
        <Calendar.Heading />
        <Calendar.NavButton slot="next" />
      </Calendar.Header>
      <Calendar.Grid>
        <Calendar.GridHeader>
          {(day) => <Calendar.HeaderCell>{day}</Calendar.HeaderCell>}
        </Calendar.GridHeader>
        <Calendar.GridBody>
          {(date) => (
            <Calendar.Cell date={date}>
              {({formattedDate}) => (
                <>
                  {formattedDate}
                  {isToday(date, getLocalTimeZone()) && <Calendar.CellIndicator />}
                </>
              )}
            </Calendar.Cell>
          )}
        </Calendar.GridBody>
      </Calendar.Grid>
    </Calendar>
  ),
};

export const MultipleMonths: Story = {
  render: (args) => (
    <Calendar
      {...args}
      aria-label="Trip dates"
      className="@container-normal w-full max-w-none overflow-x-auto"
      visibleDuration={{months: 2}}
    >
      <div className="mx-auto flex w-max gap-8">
        <div className="w-64">
          <Calendar.Header>
            <Calendar.NavButton slot="previous" />
            <Calendar.Heading className="flex-none" />
            <div className="size-6" />
          </Calendar.Header>
          <Calendar.Grid>
            <Calendar.GridHeader>
              {(day) => <Calendar.HeaderCell>{day}</Calendar.HeaderCell>}
            </Calendar.GridHeader>
            <Calendar.GridBody>{(date) => <Calendar.Cell date={date} />}</Calendar.GridBody>
          </Calendar.Grid>
        </div>
        <div className="w-64">
          <Calendar.Header>
            <div className="size-6" />
            <Calendar.Heading className="flex-none" offset={{months: 1}} />
            <Calendar.NavButton slot="next" />
          </Calendar.Header>
          <Calendar.Grid offset={{months: 1}}>
            <Calendar.GridHeader>
              {(day) => <Calendar.HeaderCell>{day}</Calendar.HeaderCell>}
            </Calendar.GridHeader>
            <Calendar.GridBody>{(date) => <Calendar.Cell date={date} />}</Calendar.GridBody>
          </Calendar.Grid>
        </div>
      </div>
    </Calendar>
  ),
};

const dayViewOptions = [
  {id: "1", name: "1 day"},
  {id: "5", name: "5 days"},
  {id: "7", name: "7 days"},
  {id: "8", name: "8 days"},
  {id: "10", name: "10 days"},
  {id: "14", name: "14 days"},
  {id: "21", name: "21 days"},
] as const;

export const DayView: Story = {
  render: (args) => {
    const [days, setDays] = useState(5);

    return (
      <div className="flex flex-col items-center gap-6">
        <Select
          className="w-40"
          value={String(days)}
          onChange={(value) => value && setDays(Number(value))}
        >
          <Label>Visible days</Label>
          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              {dayViewOptions.map((option) => (
                <ListBox.Item key={option.id} id={option.id} textValue={option.name}>
                  {option.name}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>

        <Calendar {...args} aria-label="Day view" visibleDuration={{days}}>
          <Calendar.Header>
            <Calendar.Heading />
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
      </div>
    );
  },
};

const weekViewOptions = [
  {id: "1", name: "1 week"},
  {id: "2", name: "2 weeks"},
  {id: "3", name: "3 weeks"},
  {id: "4", name: "4 weeks"},
  {id: "5", name: "5 weeks"},
  {id: "6", name: "6 weeks"},
  {id: "8", name: "8 weeks"},
] as const;

export const WeekView: Story = {
  render: (args) => {
    const [weeks, setWeeks] = useState(1);

    return (
      <div className="flex flex-col items-center gap-6">
        <Select
          className="w-40"
          value={String(weeks)}
          onChange={(value) => value && setWeeks(Number(value))}
        >
          <Label>Visible weeks</Label>
          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              {weekViewOptions.map((option) => (
                <ListBox.Item key={option.id} id={option.id} textValue={option.name}>
                  {option.name}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>

        <Calendar {...args} aria-label="Week view" visibleDuration={{weeks}}>
          <Calendar.Header>
            <Calendar.Heading />
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
      </div>
    );
  },
};

export const InternationalCalendar: Story = {
  render: (args) => (
    <I18nProvider locale="hi-IN-u-ca-indian">
      <CalendarTemplateWithYearPicker
        {...args}
        aria-label="Event date"
        defaultValue={today(getLocalTimeZone())}
      />
    </I18nProvider>
  ),
};

export const ThreeMonths: Story = {
  render: (args) => (
    <Calendar
      {...args}
      aria-label="Vacation planning"
      className="@container-normal w-auto overflow-x-auto"
      visibleDuration={{months: 3}}
    >
      <div className="flex w-max gap-7">
        <div className="w-64">
          <Calendar.Header>
            <Calendar.NavButton slot="previous" />
            <Calendar.Heading />
            <div className="size-6" />
          </Calendar.Header>
          <Calendar.Grid>
            <Calendar.GridHeader>
              {(day) => <Calendar.HeaderCell>{day}</Calendar.HeaderCell>}
            </Calendar.GridHeader>
            <Calendar.GridBody>{(date) => <Calendar.Cell date={date} />}</Calendar.GridBody>
          </Calendar.Grid>
        </div>
        <div className="w-64">
          <Calendar.Header>
            <div className="size-6" />
            <Calendar.Heading offset={{months: 1}} />
            <div className="size-6" />
          </Calendar.Header>
          <Calendar.Grid offset={{months: 1}}>
            <Calendar.GridHeader>
              {(day) => <Calendar.HeaderCell>{day}</Calendar.HeaderCell>}
            </Calendar.GridHeader>
            <Calendar.GridBody>{(date) => <Calendar.Cell date={date} />}</Calendar.GridBody>
          </Calendar.Grid>
        </div>
        <div className="w-64">
          <Calendar.Header>
            <div className="size-6" />
            <Calendar.Heading offset={{months: 2}} />
            <Calendar.NavButton slot="next" />
          </Calendar.Header>
          <Calendar.Grid offset={{months: 2}}>
            <Calendar.GridHeader>
              {(day) => <Calendar.HeaderCell>{day}</Calendar.HeaderCell>}
            </Calendar.GridHeader>
            <Calendar.GridBody>{(date) => <Calendar.Cell date={date} />}</Calendar.GridBody>
          </Calendar.Grid>
        </div>
      </div>
    </Calendar>
  ),
};

export const BookingCalendar: Story = {
  render: (args) => {
    const [selectedDate, setSelectedDate] = useState<DateValue | null>(null);
    const {locale} = useLocale();

    // Simulated booked dates
    const bookedDates = [5, 6, 12, 13, 14, 20];

    const isDateUnavailable = (date: DateValue) => {
      // Weekends and already booked dates are unavailable
      return isWeekend(date, locale) || bookedDates.includes(date.day);
    };

    return (
      <div className="flex flex-col items-center gap-4">
        <Calendar
          {...args}
          aria-label="Booking date"
          isDateUnavailable={isDateUnavailable}
          minValue={today(getLocalTimeZone())}
          value={selectedDate}
          onChange={setSelectedDate}
        >
          <Calendar.Header>
            <Calendar.NavButton slot="previous" />
            <Calendar.Heading />
            <Calendar.NavButton slot="next" />
          </Calendar.Header>
          <Calendar.Grid>
            <Calendar.GridHeader>
              {(day) => <Calendar.HeaderCell>{day}</Calendar.HeaderCell>}
            </Calendar.GridHeader>
            <Calendar.GridBody>
              {(date) => (
                <Calendar.Cell date={date}>
                  {({formattedDate, isUnavailable}) => (
                    <>
                      {formattedDate}
                      {!isUnavailable &&
                        !isWeekend(date, locale) &&
                        bookedDates.includes(date.day) && <Calendar.CellIndicator />}
                    </>
                  )}
                </Calendar.Cell>
              )}
            </Calendar.GridBody>
          </Calendar.Grid>
        </Calendar>
        <div className="flex flex-col gap-2 text-center">
          <div className="flex items-center justify-center gap-4 text-xs text-muted">
            <span className="flex items-center gap-1">
              <span className="size-2 rounded-full bg-muted" /> Has bookings
            </span>
            <span className="flex items-center gap-1">
              <span className="size-2 rounded-full bg-default" /> Weekend/Unavailable
            </span>
          </div>
          {selectedDate ? (
            <Button size="sm" variant="primary">
              Book {selectedDate.toString()}
            </Button>
          ) : null}
        </div>
      </div>
    );
  },
};

export const YearPicker: Story = {
  render: (args) => (
    <Calendar {...args} aria-label="Event date">
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
  ),
};

export const YearPickerStyledCells: Story = {
  render: (args) => (
    <Calendar {...args} aria-label="Event date with styled year cells">
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
          {({isCurrentYear, isSelected, year}) => (
            <Calendar.YearPickerCell
              year={year}
              className={
                isCurrentYear && !isSelected
                  ? "text-accent ring-1 ring-accent/60 ring-inset"
                  : undefined
              }
            />
          )}
        </Calendar.YearPickerGridBody>
      </Calendar.YearPickerGrid>
    </Calendar>
  ),
};

export const YearPickerCustomCells: Story = {
  render: (args) => (
    <Calendar {...args} aria-label="Event date with custom year cells">
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
          {({isCurrentYear, isSelected, year}) => (
            <Calendar.YearPickerCell year={year}>
              <span className="inline-flex items-center gap-1">
                <span>{year}</span>
                {isCurrentYear ? (
                  <span className={isSelected ? "text-accent-foreground" : "text-accent"}>Now</span>
                ) : null}
              </span>
            </Calendar.YearPickerCell>
          )}
        </Calendar.YearPickerGridBody>
      </Calendar.YearPickerGrid>
    </Calendar>
  ),
};

export const CustomNavIcons: Story = {
  render: (args) => (
    <Calendar {...args} aria-label="Event date">
      <Calendar.Header>
        <Calendar.NavButton slot="previous">
          <svg height={24} viewBox="0 0 24 24" width={24} xmlns="http://www.w3.org/2000/svg">
            <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6l6 6z" fill="currentColor" />
          </svg>
        </Calendar.NavButton>
        <Calendar.Heading />
        <Calendar.NavButton slot="next">
          <svg height={24} viewBox="0 0 24 24" width={24} xmlns="http://www.w3.org/2000/svg">
            <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6l6 6l-6 6z" fill="currentColor" />
          </svg>
        </Calendar.NavButton>
      </Calendar.Header>
      <Calendar.Grid>
        <Calendar.GridHeader>
          {(day) => <Calendar.HeaderCell>{day}</Calendar.HeaderCell>}
        </Calendar.GridHeader>
        <Calendar.GridBody>{(date) => <Calendar.Cell date={date} />}</Calendar.GridBody>
      </Calendar.Grid>
    </Calendar>
  ),
};

export const EventCalendar: Story = {
  render: (args) => {
    // Sample events data
    const events: Record<number, {title: string; color: string}[]> = {
      3: [{title: "Team Meeting", color: "bg-blue-500"}],
      7: [{title: "Project Deadline", color: "bg-red-500"}],
      12: [
        {title: "Lunch", color: "bg-green-500"},
        {title: "Review", color: "bg-purple-500"},
      ],
      15: [{title: "Conference", color: "bg-orange-500"}],
      21: [{title: "Workshop", color: "bg-pink-500"}],
      28: [{title: "Demo Day", color: "bg-cyan-500"}],
    };

    return (
      <div className="flex flex-col items-center gap-4">
        <Calendar {...args} aria-label="Event calendar">
          <Calendar.Header>
            <Calendar.Heading />
            <Calendar.NavButton slot="previous" />
            <Calendar.NavButton slot="next" />
          </Calendar.Header>
          <Calendar.Grid>
            <Calendar.GridHeader>
              {(day) => <Calendar.HeaderCell>{day}</Calendar.HeaderCell>}
            </Calendar.GridHeader>
            <Calendar.GridBody>
              {(date) => (
                <Calendar.Cell date={date}>
                  {({formattedDate}) => (
                    <>
                      {formattedDate}
                      {events[date.day] ? <Calendar.CellIndicator /> : null}
                    </>
                  )}
                </Calendar.Cell>
              )}
            </Calendar.GridBody>
          </Calendar.Grid>
        </Calendar>
        <div className="flex flex-col gap-1 text-xs text-muted">
          <p>Dates with indicators have scheduled events</p>
        </div>
      </div>
    );
  },
};
