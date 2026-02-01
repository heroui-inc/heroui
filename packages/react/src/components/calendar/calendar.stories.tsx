import type {DateValue} from "@internationalized/date";
import type {Meta, StoryObj} from "@storybook/react";

import {getLocalTimeZone, isToday, isWeekend, parseDate, today} from "@internationalized/date";
import React, {useState} from "react";
import {useLocale} from "react-aria-components";

import {Button} from "../button";
import {Description} from "../description";

import {Calendar} from "./index";

const meta: Meta<typeof Calendar> = {
  argTypes: {
    isDisabled: {
      control: "boolean",
    },
    isReadOnly: {
      control: "boolean",
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
      <Calendar.NavButton slot="previous" />
      <Calendar.Heading />
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
 * Stories
 * -----------------------------------------------------------------------------------------------*/
export const Default: Story = {
  render: (args) => <CalendarTemplate {...args} aria-label="Event date" />,
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

    return (
      <div className="flex flex-col items-center gap-4">
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
        <CalendarTemplate
          {...args}
          aria-label="Appointment date"
          maxValue={maxDate}
          minValue={minDate}
        />
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
    <Calendar {...args} aria-label="Trip dates" visibleDuration={{months: 2}}>
      <Calendar.Header>
        <Calendar.NavButton slot="previous" />
        <Calendar.Heading />
        <Calendar.NavButton slot="next" />
      </Calendar.Header>
      <div className="flex gap-6">
        <Calendar.Grid>
          <Calendar.GridHeader>
            {(day) => <Calendar.HeaderCell>{day}</Calendar.HeaderCell>}
          </Calendar.GridHeader>
          <Calendar.GridBody>{(date) => <Calendar.Cell date={date} />}</Calendar.GridBody>
        </Calendar.Grid>
        <Calendar.Grid offset={{months: 1}}>
          <Calendar.GridHeader>
            {(day) => <Calendar.HeaderCell>{day}</Calendar.HeaderCell>}
          </Calendar.GridHeader>
          <Calendar.GridBody>{(date) => <Calendar.Cell date={date} />}</Calendar.GridBody>
        </Calendar.Grid>
      </div>
    </Calendar>
  ),
};

export const ThreeMonths: Story = {
  render: (args) => (
    <Calendar {...args} aria-label="Vacation planning" visibleDuration={{months: 3}}>
      <Calendar.Header>
        <Calendar.NavButton slot="previous" />
        <Calendar.Heading />
        <Calendar.NavButton slot="next" />
      </Calendar.Header>
      <div className="flex gap-6">
        <Calendar.Grid>
          <Calendar.GridHeader>
            {(day) => <Calendar.HeaderCell>{day}</Calendar.HeaderCell>}
          </Calendar.GridHeader>
          <Calendar.GridBody>{(date) => <Calendar.Cell date={date} />}</Calendar.GridBody>
        </Calendar.Grid>
        <Calendar.Grid offset={{months: 1}}>
          <Calendar.GridHeader>
            {(day) => <Calendar.HeaderCell>{day}</Calendar.HeaderCell>}
          </Calendar.GridHeader>
          <Calendar.GridBody>{(date) => <Calendar.Cell date={date} />}</Calendar.GridBody>
        </Calendar.Grid>
        <Calendar.Grid offset={{months: 2}}>
          <Calendar.GridHeader>
            {(day) => <Calendar.HeaderCell>{day}</Calendar.HeaderCell>}
          </Calendar.GridHeader>
          <Calendar.GridBody>{(date) => <Calendar.Cell date={date} />}</Calendar.GridBody>
        </Calendar.Grid>
      </div>
    </Calendar>
  ),
};

export const DateRangePicker: Story = {
  render: (args) => {
    const [startDate, setStartDate] = useState<DateValue | null>(null);
    const [endDate, setEndDate] = useState<DateValue | null>(null);
    const [isSelectingEnd, setIsSelectingEnd] = useState(false);

    const handleDateChange = (date: DateValue | null) => {
      if (!isSelectingEnd) {
        setStartDate(date);
        setEndDate(null);
        setIsSelectingEnd(true);
      } else {
        if (date && startDate && date.compare(startDate) < 0) {
          // If end date is before start date, swap them
          setEndDate(startDate);
          setStartDate(date);
        } else {
          setEndDate(date);
        }
        setIsSelectingEnd(false);
      }
    };

    const isInRange = (date: DateValue) => {
      if (!startDate || !endDate) return false;

      return date.compare(startDate) >= 0 && date.compare(endDate) <= 0;
    };

    return (
      <div className="flex flex-col items-center gap-4">
        <Calendar
          {...args}
          aria-label="Date range"
          value={isSelectingEnd ? endDate : startDate}
          onChange={handleDateChange}
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
                <Calendar.Cell
                  className={isInRange(date) ? "bg-accent-soft" : undefined}
                  date={date}
                />
              )}
            </Calendar.GridBody>
          </Calendar.Grid>
        </Calendar>
        <div className="flex flex-col gap-1 text-center">
          <Description>{isSelectingEnd ? "Select end date" : "Select start date"}</Description>
          <p className="text-sm">
            {startDate ? `Start: ${startDate.toString()}` : null}
            {startDate && endDate ? " → " : null}
            {endDate ? `End: ${endDate.toString()}` : null}
          </p>
        </div>
        <Button
          size="sm"
          variant="tertiary"
          onPress={() => {
            setStartDate(null);
            setEndDate(null);
            setIsSelectingEnd(false);
          }}
        >
          Reset
        </Button>
      </div>
    );
  },
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
