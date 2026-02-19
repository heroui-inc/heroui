import type {DateValue} from "@internationalized/date";
import type {Meta, StoryObj} from "@storybook/react";

import {Icon} from "@iconify/react";
import {getLocalTimeZone, today} from "@internationalized/date";
import React, {useState} from "react";

import {Button} from "../button";
import {DateField} from "../date-field";
import {Description} from "../description";
import {FieldError} from "../field-error";
import {Form} from "../form";
import {Label} from "../label";
import {RangeCalendar} from "../range-calendar";

import {DateRangePicker} from "./index";

const meta: Meta<typeof DateRangePicker> = {
  component: DateRangePicker,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  title: "Components/Date and Time/DateRangePicker",
};

export default meta;
type Story = StoryObj<typeof meta>;

type DateRange = {
  start: DateValue;
  end: DateValue;
};

const RangeCalendarContent = () => (
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
    <RangeCalendar.YearPickerGrid>
      <RangeCalendar.YearPickerGridBody>
        {({year}) => <RangeCalendar.YearPickerCell year={year} />}
      </RangeCalendar.YearPickerGridBody>
    </RangeCalendar.YearPickerGrid>
  </RangeCalendar>
);

const DateRangePickerField = ({showDescription = false}: {showDescription?: boolean}) => (
  <>
    <Label>Trip dates</Label>
    <DateField.Group fullWidth>
      <DateField.Input slot="start">
        {(segment) => <DateField.Segment segment={segment} />}
      </DateField.Input>
      <DateRangePicker.RangeSeparator />
      <DateField.Input slot="end">
        {(segment) => <DateField.Segment segment={segment} />}
      </DateField.Input>
      <DateField.Suffix>
        <DateRangePicker.Trigger>
          <DateRangePicker.TriggerIndicator />
        </DateRangePicker.Trigger>
      </DateField.Suffix>
    </DateField.Group>
    {showDescription ? <Description>Select your check-in and check-out dates.</Description> : null}
    <DateRangePicker.Popover>
      <RangeCalendarContent />
    </DateRangePicker.Popover>
  </>
);

export const Default: Story = {
  render: () => (
    <DateRangePicker className="w-[320px]" endName="endDate" startName="startDate">
      <DateRangePickerField />
    </DateRangePicker>
  ),
};

export const Controlled: Story = {
  render: () => {
    const start = today(getLocalTimeZone());
    const [value, setValue] = useState<DateRange | null>({end: start.add({days: 4}), start});

    return (
      <div className="flex w-[320px] flex-col gap-2">
        <DateRangePicker
          endName="endDate"
          startName="startDate"
          value={value}
          onChange={(nextValue) => setValue(nextValue as DateRange | null)}
        >
          <DateRangePickerField showDescription />
        </DateRangePicker>
        <Description>
          Current value:{" "}
          {value ? `${value.start.toString()} -> ${value.end.toString()}` : "(empty)"}
        </Description>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    const start = today(getLocalTimeZone());

    return (
      <DateRangePicker
        isDisabled
        className="w-[320px]"
        endName="endDate"
        startName="startDate"
        value={{end: start.add({days: 4}), start}}
      >
        <DateRangePickerField />
      </DateRangePicker>
    );
  },
};

export const WithValidation: Story = {
  render: () => {
    const [value, setValue] = useState<DateRange | null>(null);
    const currentDate = today(getLocalTimeZone());
    const isInvalid =
      value != null && (value.start.compare(currentDate) < 0 || value.end.compare(value.start) < 0);

    return (
      <DateRangePicker
        isRequired
        className="w-[320px]"
        endName="endDate"
        isInvalid={isInvalid}
        minValue={currentDate}
        startName="startDate"
        value={value}
        onChange={(nextValue) => setValue(nextValue as DateRange | null)}
      >
        <Label>Booking period</Label>
        <DateField.Group fullWidth>
          <DateField.Input slot="start">
            {(segment) => <DateField.Segment segment={segment} />}
          </DateField.Input>
          <DateRangePicker.RangeSeparator />
          <DateField.Input slot="end">
            {(segment) => <DateField.Segment segment={segment} />}
          </DateField.Input>
          <DateField.Suffix>
            <DateRangePicker.Trigger>
              <DateRangePicker.TriggerIndicator />
            </DateRangePicker.Trigger>
          </DateField.Suffix>
        </DateField.Group>
        {isInvalid ? (
          <FieldError>Select a valid range starting today or later.</FieldError>
        ) : (
          <Description>Choose a check-in and check-out date.</Description>
        )}
        <DateRangePicker.Popover>
          <RangeCalendarContent />
        </DateRangePicker.Popover>
      </DateRangePicker>
    );
  },
};

export const WithCustomIndicator: Story = {
  render: () => (
    <DateRangePicker className="w-[320px]" endName="endDate" startName="startDate">
      <Label>Trip dates</Label>
      <DateField.Group fullWidth>
        <DateField.Input slot="start">
          {(segment) => <DateField.Segment segment={segment} />}
        </DateField.Input>
        <DateRangePicker.RangeSeparator />
        <DateField.Input slot="end">
          {(segment) => <DateField.Segment segment={segment} />}
        </DateField.Input>
        <DateField.Suffix>
          <DateRangePicker.Trigger>
            <DateRangePicker.TriggerIndicator>
              <Icon className="size-4" icon="gravity-ui:chevron-down" />
            </DateRangePicker.TriggerIndicator>
          </DateRangePicker.Trigger>
        </DateField.Suffix>
      </DateField.Group>
      <Description>
        Use a custom trigger icon while preserving DateRangePicker behavior.
      </Description>
      <DateRangePicker.Popover>
        <RangeCalendarContent />
      </DateRangePicker.Popover>
    </DateRangePicker>
  ),
};

export const FormExample: Story = {
  render: () => {
    const [value, setValue] = useState<DateRange | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const currentDate = today(getLocalTimeZone());
    const isInvalid =
      value != null && (value.start.compare(currentDate) < 0 || value.end.compare(value.start) < 0);

    const handleSubmit = (event: React.FormEvent) => {
      event.preventDefault();
      if (!value || isInvalid) return;

      setIsSubmitting(true);

      setTimeout(() => {
        setValue(null);
        setIsSubmitting(false);
      }, 1200);
    };

    return (
      <Form className="flex w-[320px] flex-col gap-3" onSubmit={handleSubmit}>
        <DateRangePicker
          isRequired
          endName="tripEndDate"
          isInvalid={isInvalid}
          minValue={currentDate}
          startName="tripStartDate"
          value={value}
          onChange={(nextValue) => setValue(nextValue as DateRange | null)}
        >
          <Label>Trip dates</Label>
          <DateField.Group fullWidth>
            <DateField.Input slot="start">
              {(segment) => <DateField.Segment segment={segment} />}
            </DateField.Input>
            <DateRangePicker.RangeSeparator />
            <DateField.Input slot="end">
              {(segment) => <DateField.Segment segment={segment} />}
            </DateField.Input>
            <DateField.Suffix>
              <DateRangePicker.Trigger>
                <DateRangePicker.TriggerIndicator />
              </DateRangePicker.Trigger>
            </DateField.Suffix>
          </DateField.Group>
          {isInvalid ? (
            <FieldError>Please choose a valid range in the future.</FieldError>
          ) : (
            <Description>Select your check-in and check-out dates.</Description>
          )}
          <DateRangePicker.Popover>
            <RangeCalendarContent />
          </DateRangePicker.Popover>
        </DateRangePicker>
        <Button
          className="w-full"
          isDisabled={!value || isInvalid}
          isPending={isSubmitting}
          type="submit"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </Form>
    );
  },
};
