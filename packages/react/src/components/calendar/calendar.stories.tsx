import type {Meta, StoryObj} from "@storybook/react";

import {getLocalTimeZone, parseDate, today} from "@internationalized/date";
import React from "react";

import {
  Calendar,
  CalendarGrid,
  CalendarGridHeader,
  CalendarHeader,
  CalendarHeaderCell,
  CalendarHeading,
  CalendarNavButton,
} from "./index";

const meta: Meta<typeof Calendar> = {
  argTypes: {
    isDisabled: {
      control: "boolean",
    },
  },
  component: Calendar,
  parameters: {
    layout: "centered",
  },
  title: "📝 ToDo/Calendar",
};

export default meta;
type Story = StoryObj<typeof Calendar>;

export const Default: Story = {
  render: (args) => (
    <Calendar {...args} aria-label="Event date">
      <CalendarHeader>
        <CalendarNavButton slot="previous" />
        <CalendarHeading />
        <CalendarNavButton slot="next" />
      </CalendarHeader>
      <CalendarGrid />
    </Calendar>
  ),
};

export const ControlledValue: Story = {
  render: (args) => {
    const [value, setValue] = React.useState(today(getLocalTimeZone()));

    return (
      <div className="flex flex-col gap-4">
        <Calendar
          {...args}
          aria-label="Event date"
          value={value}
          // @ts-expect-error TODO: fix the type inference for events
          onChange={(newValue) => setValue(newValue)}
        >
          <CalendarHeader>
            <CalendarNavButton slot="previous" />
            <CalendarHeading />
            <CalendarNavButton slot="next" />
          </CalendarHeader>
          <CalendarGrid />
        </Calendar>
        <p className="text-sm text-muted">Selected date: {value.toString()}</p>
      </div>
    );
  },
};

export const MinMaxDates: Story = {
  render: (args) => (
    <Calendar
      {...args}
      aria-label="Event date"
      maxValue={today(getLocalTimeZone()).add({months: 1})}
      minValue={today(getLocalTimeZone())}
    >
      <CalendarHeader>
        <CalendarNavButton slot="previous" />
        <CalendarHeading />
        <CalendarNavButton slot="next" />
      </CalendarHeader>
      <CalendarGrid />
    </Calendar>
  ),
};

export const UnavailableDates: Story = {
  render: (args) => {
    const now = today(getLocalTimeZone());
    const isWeekend = (date: any) => {
      const dayOfWeek = date.toDate(getLocalTimeZone()).getDay();

      return dayOfWeek === 0 || dayOfWeek === 6;
    };

    return (
      <Calendar {...args} aria-label="Event date" isDateUnavailable={isWeekend} minValue={now}>
        <CalendarHeader>
          <CalendarNavButton slot="previous" />
          <CalendarHeading />
          <CalendarNavButton slot="next" />
        </CalendarHeader>
        <CalendarGrid />
      </Calendar>
    );
  },
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
  },
  render: (args) => (
    <Calendar {...args} aria-label="Event date" defaultValue={today(getLocalTimeZone())}>
      <CalendarHeader>
        <CalendarNavButton slot="previous" />
        <CalendarHeading />
        <CalendarNavButton slot="next" />
      </CalendarHeader>
      <CalendarGrid />
    </Calendar>
  ),
};

export const MultipleMonths: Story = {
  render: (args) => (
    <div className="flex gap-4">
      <Calendar {...args} aria-label="Event date" visibleDuration={{months: 2}}>
        <CalendarHeader>
          <CalendarNavButton slot="previous" />
          <CalendarHeading />
          <CalendarNavButton slot="next" />
        </CalendarHeader>
        <div className="flex gap-4">
          <CalendarGrid />
          <CalendarGrid offset={{months: 1}} />
        </div>
      </Calendar>
    </div>
  ),
};

export const CustomDayNames: Story = {
  render: (args) => (
    <Calendar {...args} aria-label="Event date">
      <CalendarHeader>
        <CalendarNavButton slot="previous" />
        <CalendarHeading />
        <CalendarNavButton slot="next" />
      </CalendarHeader>
      <CalendarGrid>
        <CalendarGridHeader>
          {(day) => <CalendarHeaderCell>{day.slice(0, 1)}</CalendarHeaderCell>}
        </CalendarGridHeader>
      </CalendarGrid>
    </Calendar>
  ),
};

export const InitialFocus: Story = {
  render: (args) => (
    <Calendar {...args} autoFocus aria-label="Event date" defaultValue={parseDate("2025-02-15")}>
      <CalendarHeader>
        <CalendarNavButton slot="previous" />
        <CalendarHeading />
        <CalendarNavButton slot="next" />
      </CalendarHeader>
      <CalendarGrid />
    </Calendar>
  ),
};
