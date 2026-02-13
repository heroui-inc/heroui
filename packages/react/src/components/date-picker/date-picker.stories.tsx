import type {DateValue} from "@internationalized/date";
import type {Meta, StoryObj} from "@storybook/react";

import {Icon} from "@iconify/react";
import {getLocalTimeZone, today} from "@internationalized/date";
import React, {useState} from "react";

import {Button} from "../button";
import {Calendar} from "../calendar";
import {DateField} from "../date-field";
import {Description} from "../description";
import {FieldError} from "../field-error";
import {Form} from "../form";
import {Label} from "../label";

import {DatePicker} from "./index";

const meta: Meta<typeof DatePicker> = {
  component: DatePicker,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  title: "Components/Date and Time/DatePicker",
};

export default meta;
type Story = StoryObj<typeof meta>;

const CalendarContent = () => (
  <Calendar aria-label="Selected date">
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
);

const DatePickerField = ({showDescription = false}: {showDescription?: boolean}) => (
  <>
    <Label>Date</Label>
    <DateField.Group fullWidth>
      <DateField.Input>{(segment) => <DateField.Segment segment={segment} />}</DateField.Input>
      <DateField.Suffix>
        <DatePicker.Trigger>
          <DatePicker.TriggerIndicator />
        </DatePicker.Trigger>
      </DateField.Suffix>
    </DateField.Group>
    {showDescription ? <Description>Select a date from the calendar.</Description> : null}
    <DatePicker.Popover>
      <CalendarContent />
    </DatePicker.Popover>
  </>
);

export const Default: Story = {
  render: () => (
    <DatePicker className="w-[280px]" name="date">
      <DatePickerField />
    </DatePicker>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState<DateValue | null>(today(getLocalTimeZone()));

    return (
      <div className="flex w-[280px] flex-col gap-2">
        <DatePicker name="date" value={value} onChange={setValue}>
          <DatePickerField showDescription />
        </DatePicker>
        <Description>Current value: {value ? value.toString() : "(empty)"}</Description>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <DatePicker isDisabled className="w-[280px]" name="date" value={today(getLocalTimeZone())}>
      <DatePickerField />
    </DatePicker>
  ),
};

export const WithValidation: Story = {
  render: () => {
    const [value, setValue] = useState<DateValue | null>(null);
    const currentDate = today(getLocalTimeZone());
    const isInvalid = value != null && value.compare(currentDate) < 0;

    return (
      <DatePicker
        isRequired
        className="w-[280px]"
        isInvalid={isInvalid}
        minValue={currentDate}
        name="date"
        value={value}
        onChange={setValue}
      >
        <Label>Appointment date</Label>
        <DateField.Group fullWidth>
          <DateField.Input>{(segment) => <DateField.Segment segment={segment} />}</DateField.Input>
          <DateField.Suffix>
            <DatePicker.Trigger>
              <DatePicker.TriggerIndicator />
            </DatePicker.Trigger>
          </DateField.Suffix>
        </DateField.Group>
        {isInvalid ? (
          <FieldError>Date must be today or in the future.</FieldError>
        ) : (
          <Description>Select a date from today onward.</Description>
        )}
        <DatePicker.Popover>
          <CalendarContent />
        </DatePicker.Popover>
      </DatePicker>
    );
  },
};

export const WithCustomIndicator: Story = {
  render: () => (
    <DatePicker className="w-[280px]" name="date">
      <Label>Date</Label>
      <DateField.Group fullWidth>
        <DateField.Input>{(segment) => <DateField.Segment segment={segment} />}</DateField.Input>
        <DateField.Suffix>
          <DatePicker.Trigger>
            <DatePicker.TriggerIndicator>
              <Icon className="size-4" icon="gravity-ui:chevron-down" />
            </DatePicker.TriggerIndicator>
          </DatePicker.Trigger>
        </DateField.Suffix>
      </DateField.Group>
      <Description>Use a custom trigger icon while keeping DatePicker behavior.</Description>
      <DatePicker.Popover>
        <CalendarContent />
      </DatePicker.Popover>
    </DatePicker>
  ),
};

export const FormExample: Story = {
  render: () => {
    const [value, setValue] = useState<DateValue | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const currentDate = today(getLocalTimeZone());
    const isInvalid = value != null && value.compare(currentDate) < 0;

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!value || isInvalid) return;

      setIsSubmitting(true);

      setTimeout(() => {
        setValue(null);
        setIsSubmitting(false);
      }, 1200);
    };

    return (
      <Form className="flex w-[280px] flex-col gap-3" onSubmit={handleSubmit}>
        <DatePicker
          isRequired
          isInvalid={isInvalid}
          minValue={currentDate}
          name="appointmentDate"
          value={value}
          onChange={setValue}
        >
          <Label>Appointment date</Label>
          <DateField.Group fullWidth variant="secondary">
            <DateField.Input>
              {(segment) => <DateField.Segment segment={segment} />}
            </DateField.Input>
            <DateField.Suffix>
              <DatePicker.Trigger>
                <DatePicker.TriggerIndicator />
              </DatePicker.Trigger>
            </DateField.Suffix>
          </DateField.Group>
          {isInvalid ? (
            <FieldError>Date must be today or in the future.</FieldError>
          ) : (
            <Description>Choose a valid appointment date.</Description>
          )}
          <DatePicker.Popover>
            <CalendarContent />
          </DatePicker.Popover>
        </DatePicker>
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
