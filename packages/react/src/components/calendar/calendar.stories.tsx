import type {Meta, StoryObj} from "@storybook/react";

import {getLocalTimeZone, parseDate, today} from "@internationalized/date";
import React from "react";

import {Calendar} from "./calendar";

const meta: Meta<typeof Calendar.Root> = {
  title: "Components/Calendar",
  component: Calendar.Root,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    isDisabled: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Calendar.Root>;

export const Default: Story = {
  render: (args) => (
    <Calendar.Root {...args} aria-label="Event date">
      <Calendar.Header>
        <Calendar.NavButton slot="previous" />
        <Calendar.Heading />
        <Calendar.NavButton slot="next" />
      </Calendar.Header>
      <Calendar.Grid />
    </Calendar.Root>
  ),
};

export const ControlledValue: Story = {
  render: (args) => {
    const [value, setValue] = React.useState(today(getLocalTimeZone()));

    return (
      <div className="flex flex-col gap-4">
        <Calendar.Root
          {...args}
          aria-label="Event date"
          value={value}
          onChange={(newValue) => setValue(newValue as any)}
        >
          <Calendar.Header>
            <Calendar.NavButton slot="previous" />
            <Calendar.Heading />
            <Calendar.NavButton slot="next" />
          </Calendar.Header>
          <Calendar.Grid />
        </Calendar.Root>
        <p className="text-muted-foreground text-sm">Selected date: {value.toString()}</p>
      </div>
    );
  },
};

export const MinMaxDates: Story = {
  render: (args) => (
    <Calendar.Root
      {...args}
      aria-label="Event date"
      maxValue={today(getLocalTimeZone()).add({months: 1})}
      minValue={today(getLocalTimeZone())}
    >
      <Calendar.Header>
        <Calendar.NavButton slot="previous" />
        <Calendar.Heading />
        <Calendar.NavButton slot="next" />
      </Calendar.Header>
      <Calendar.Grid />
    </Calendar.Root>
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
      <Calendar.Root {...args} aria-label="Event date" isDateUnavailable={isWeekend} minValue={now}>
        <Calendar.Header>
          <Calendar.NavButton slot="previous" />
          <Calendar.Heading />
          <Calendar.NavButton slot="next" />
        </Calendar.Header>
        <Calendar.Grid />
      </Calendar.Root>
    );
  },
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
  },
  render: (args) => (
    <Calendar.Root {...args} aria-label="Event date" defaultValue={today(getLocalTimeZone())}>
      <Calendar.Header>
        <Calendar.NavButton slot="previous" />
        <Calendar.Heading />
        <Calendar.NavButton slot="next" />
      </Calendar.Header>
      <Calendar.Grid />
    </Calendar.Root>
  ),
};

export const MultipleMonths: Story = {
  render: (args) => (
    <div className="flex gap-4">
      <Calendar.Root {...args} aria-label="Event date" visibleDuration={{months: 2}}>
        <Calendar.Header>
          <Calendar.NavButton slot="previous" />
          <Calendar.Heading />
          <Calendar.NavButton slot="next" />
        </Calendar.Header>
        <div className="flex gap-4">
          <Calendar.Grid />
          <Calendar.Grid offset={{months: 1}} />
        </div>
      </Calendar.Root>
    </div>
  ),
};

export const CustomDayNames: Story = {
  render: (args) => (
    <Calendar.Root {...args} aria-label="Event date">
      <Calendar.Header>
        <Calendar.NavButton slot="previous" />
        <Calendar.Heading />
        <Calendar.NavButton slot="next" />
      </Calendar.Header>
      <Calendar.Grid>
        <Calendar.GridHeader>
          {(day) => <Calendar.HeaderCell>{day.slice(0, 1)}</Calendar.HeaderCell>}
        </Calendar.GridHeader>
      </Calendar.Grid>
    </Calendar.Root>
  ),
};

export const InitialFocus: Story = {
  render: (args) => (
    <Calendar.Root
      {...args}
      autoFocus
      aria-label="Event date"
      defaultValue={parseDate("2025-02-15")}
    >
      <Calendar.Header>
        <Calendar.NavButton slot="previous" />
        <Calendar.Heading />
        <Calendar.NavButton slot="next" />
      </Calendar.Header>
      <Calendar.Grid />
    </Calendar.Root>
  ),
};
