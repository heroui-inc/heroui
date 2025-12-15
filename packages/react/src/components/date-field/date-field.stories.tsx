import type {DateValue} from "@internationalized/date";
import type {Meta, StoryObj} from "@storybook/react";

import {Icon} from "@iconify/react";
import {getLocalTimeZone, today} from "@internationalized/date";
import React, {useState} from "react";

import {Button} from "../button";
import {Description} from "../description";
import {FieldError} from "../field-error";
import {Form} from "../form";
import {Label} from "../label";
import {Surface} from "../surface";

import {DateField} from "./index";

const meta: Meta<typeof DateField> = {
  component: DateField,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  title: "Components/Forms/DateField",
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <DateField className="w-[256px]" name="date">
      <Label>Date</Label>
      <DateField.Group>
        <DateField.Input>{(segment) => <DateField.Segment segment={segment} />}</DateField.Input>
      </DateField.Group>
    </DateField>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <DateField className="w-[256px]" name="date">
        <Label>Birth date</Label>
        <DateField.Group>
          <DateField.Input>{(segment) => <DateField.Segment segment={segment} />}</DateField.Input>
        </DateField.Group>
        <Description>Enter your date of birth</Description>
      </DateField>
      <DateField className="w-[256px]" name="appointment-date">
        <Label>Appointment date</Label>
        <DateField.Group>
          <DateField.Input>{(segment) => <DateField.Segment segment={segment} />}</DateField.Input>
        </DateField.Group>
        <Description>Enter a date for your appointment</Description>
      </DateField>
    </div>
  ),
};

export const Required: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <DateField isRequired className="w-[256px]" name="date">
        <Label>Date</Label>
        <DateField.Group>
          <DateField.Input>{(segment) => <DateField.Segment segment={segment} />}</DateField.Input>
        </DateField.Group>
      </DateField>
      <DateField isRequired className="w-[256px]" name="start-date">
        <Label>Start date</Label>
        <DateField.Group>
          <DateField.Input>{(segment) => <DateField.Segment segment={segment} />}</DateField.Input>
        </DateField.Group>
        <Description>Required field</Description>
      </DateField>
    </div>
  ),
};

export const Invalid: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <DateField isInvalid isRequired className="w-[256px]" name="date">
        <Label>Date</Label>
        <DateField.Group>
          <DateField.Input>{(segment) => <DateField.Segment segment={segment} />}</DateField.Input>
        </DateField.Group>
        <FieldError>Please enter a valid date</FieldError>
      </DateField>
      <DateField isInvalid className="w-[256px]" name="invalid-date">
        <Label>Date</Label>
        <DateField.Group>
          <DateField.Input>{(segment) => <DateField.Segment segment={segment} />}</DateField.Input>
        </DateField.Group>
        <FieldError>Date must be in the future</FieldError>
      </DateField>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <DateField isDisabled className="w-[256px]" name="date" value={today(getLocalTimeZone())}>
        <Label>Date</Label>
        <DateField.Group>
          <DateField.Input>{(segment) => <DateField.Segment segment={segment} />}</DateField.Input>
        </DateField.Group>
        <Description>This date field is disabled</Description>
      </DateField>
      <DateField isDisabled className="w-[256px]" name="date-empty">
        <Label>Date</Label>
        <DateField.Group>
          <DateField.Input>{(segment) => <DateField.Segment segment={segment} />}</DateField.Input>
        </DateField.Group>
        <Description>This date field is disabled</Description>
      </DateField>
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState<DateValue | null>(null);

    return (
      <div className="flex flex-col gap-4">
        <DateField className="w-[256px]" name="date" value={value} onChange={setValue}>
          <Label>Date</Label>
          <DateField.Group>
            <DateField.Input>
              {(segment) => <DateField.Segment segment={segment} />}
            </DateField.Input>
          </DateField.Group>
          <Description>Current value: {value ? value.toString() : "(empty)"}</Description>
        </DateField>
        <div className="flex gap-2">
          <Button variant="tertiary" onPress={() => setValue(today(getLocalTimeZone()))}>
            Set today
          </Button>
          <Button variant="tertiary" onPress={() => setValue(null)}>
            Clear
          </Button>
        </div>
      </div>
    );
  },
};

export const WithValidation: Story = {
  render: () => {
    const [value, setValue] = useState<DateValue | null>(null);
    const todayDate = today(getLocalTimeZone());
    const isInvalid = value !== null && value.compare(todayDate) < 0;

    return (
      <div className="flex flex-col gap-4">
        <DateField
          isRequired
          className="w-[256px]"
          isInvalid={isInvalid}
          minValue={todayDate}
          name="date"
          value={value}
          onChange={setValue}
        >
          <Label>Date</Label>
          <DateField.Group>
            <DateField.Input>
              {(segment) => <DateField.Segment segment={segment} />}
            </DateField.Input>
          </DateField.Group>
          {isInvalid ? (
            <FieldError>Date must be today or in the future</FieldError>
          ) : (
            <Description>Enter a date from today onwards</Description>
          )}
        </DateField>
      </div>
    );
  },
};

export const WithPrefixIcon: Story = {
  render: () => (
    <DateField className="w-[256px]" name="date">
      <Label>Date</Label>
      <DateField.Group>
        <DateField.Prefix>
          <Icon className="size-4 text-muted" icon="gravity-ui:calendar" />
        </DateField.Prefix>
        <DateField.Input>{(segment) => <DateField.Segment segment={segment} />}</DateField.Input>
      </DateField.Group>
    </DateField>
  ),
};

export const WithSuffixIcon: Story = {
  render: () => (
    <DateField className="w-[256px]" name="date">
      <Label>Date</Label>
      <DateField.Group>
        <DateField.Input>{(segment) => <DateField.Segment segment={segment} />}</DateField.Input>
        <DateField.Suffix>
          <Icon className="size-4 text-muted" icon="gravity-ui:calendar" />
        </DateField.Suffix>
      </DateField.Group>
    </DateField>
  ),
};

export const WithPrefixAndSuffix: Story = {
  render: () => (
    <DateField className="w-[256px]" name="date">
      <Label>Date</Label>
      <DateField.Group>
        <DateField.Prefix>
          <Icon className="size-4 text-muted" icon="gravity-ui:calendar" />
        </DateField.Prefix>
        <DateField.Input>{(segment) => <DateField.Segment segment={segment} />}</DateField.Input>
        <DateField.Suffix>
          <Icon className="size-4 text-muted" icon="gravity-ui:chevron-down" />
        </DateField.Suffix>
      </DateField.Group>
      <Description>Enter a date</Description>
    </DateField>
  ),
};

export const OnSurface: Story = {
  render: () => (
    <Surface className="flex w-full min-w-[340px] flex-col gap-4 rounded-3xl p-6">
      <DateField className="w-full" name="date">
        <Label>Date</Label>
        <DateField.Group>
          <DateField.Input>{(segment) => <DateField.Segment segment={segment} />}</DateField.Input>
        </DateField.Group>
        <Description>Enter a date</Description>
      </DateField>
      <DateField className="w-full" name="date-2">
        <Label>Appointment date</Label>
        <DateField.Group>
          <DateField.Prefix>
            <Icon className="size-4 text-muted" icon="gravity-ui:calendar" />
          </DateField.Prefix>
          <DateField.Input>{(segment) => <DateField.Segment segment={segment} />}</DateField.Input>
        </DateField.Group>
        <Description>Enter a date for your appointment</Description>
      </DateField>
    </Surface>
  ),
};

export const FormExample: Story = {
  render: () => {
    const [value, setValue] = useState<DateValue | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const todayDate = today(getLocalTimeZone());
    const isInvalid = value !== null && value.compare(todayDate) < 0;

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      if (!value || isInvalid) {
        return;
      }

      setIsSubmitting(true);

      // Simulate API call
      setTimeout(() => {
        // eslint-disable-next-line no-console
        console.log("Date submitted:", {date: value});
        setValue(null);
        setIsSubmitting(false);
      }, 1500);
    };

    return (
      <Form className="flex w-[280px] flex-col gap-4" onSubmit={handleSubmit}>
        <DateField
          isRequired
          className="w-[256px]"
          isInvalid={isInvalid}
          minValue={todayDate}
          name="date"
          value={value}
          onChange={setValue}
        >
          <Label>Appointment date</Label>
          <DateField.Group>
            <DateField.Prefix>
              <Icon className="size-4 text-muted" icon="gravity-ui:calendar" />
            </DateField.Prefix>
            <DateField.Input>
              {(segment) => <DateField.Segment segment={segment} />}
            </DateField.Input>
          </DateField.Group>
          {isInvalid ? (
            <FieldError>Date must be today or in the future</FieldError>
          ) : (
            <Description>Enter a date from today onwards</Description>
          )}
        </DateField>
        <Button
          className="w-full"
          isDisabled={!value || isInvalid}
          isPending={isSubmitting}
          type="submit"
          variant="primary"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </Form>
    );
  },
};

export const AllVariations: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <DateField className="w-[256px]" name="date1">
          <Label>Date *</Label>
          <DateField.Group>
            <DateField.Prefix>
              <Icon className="size-4 text-muted" icon="gravity-ui:calendar" />
            </DateField.Prefix>
            <DateField.Input>
              {(segment) => <DateField.Segment segment={segment} />}
            </DateField.Input>
          </DateField.Group>
          <Description>Enter a date</Description>
        </DateField>

        <DateField className="w-[256px]" name="date2">
          <Label>Date *</Label>
          <DateField.Group>
            <DateField.Input>
              {(segment) => <DateField.Segment segment={segment} />}
            </DateField.Input>
            <DateField.Suffix>
              <Icon className="size-4 text-muted" icon="gravity-ui:calendar" />
            </DateField.Suffix>
          </DateField.Group>
          <Description>Enter a date</Description>
        </DateField>

        <DateField className="w-[256px]" name="date3">
          <Label>Date</Label>
          <DateField.Group>
            <DateField.Prefix>
              <Icon className="size-4 text-muted" icon="gravity-ui:calendar" />
            </DateField.Prefix>
            <DateField.Input>
              {(segment) => <DateField.Segment segment={segment} />}
            </DateField.Input>
            <DateField.Suffix>
              <Icon className="size-4 text-muted" icon="gravity-ui:chevron-down" />
            </DateField.Suffix>
          </DateField.Group>
          <Description>Enter a date</Description>
        </DateField>
      </div>
    </div>
  ),
};
