import type {TimeValue} from "../rac";
import type {Meta, StoryObj} from "@storybook/react";

import {Icon} from "@iconify/react";
import {Time, getLocalTimeZone, now, parseTime} from "@internationalized/date";
import React, {useState} from "react";

import {Button} from "../button";
import {DateInputGroup} from "../date-input-group";
import {Description} from "../description";
import {FieldError} from "../field-error";
import {Form} from "../form";
import {Label} from "../label";
import {Surface} from "../surface";

import {TimeField} from "./index";

const meta: Meta<typeof TimeField> = {
  component: TimeField,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  title: "Components/Forms/TimeField",
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <TimeField className="w-[256px]" name="time">
      <Label>Time</Label>
      <DateInputGroup>
        <DateInputGroup.Input>
          {(segment) => <DateInputGroup.Segment segment={segment} />}
        </DateInputGroup.Input>
      </DateInputGroup>
    </TimeField>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <TimeField className="w-[256px]" name="time">
        <Label>Start time</Label>
        <DateInputGroup>
          <DateInputGroup.Input>
            {(segment) => <DateInputGroup.Segment segment={segment} />}
          </DateInputGroup.Input>
        </DateInputGroup>
        <Description>Enter the start time</Description>
      </TimeField>
      <TimeField className="w-[256px]" name="end-time">
        <Label>End time</Label>
        <DateInputGroup>
          <DateInputGroup.Input>
            {(segment) => <DateInputGroup.Segment segment={segment} />}
          </DateInputGroup.Input>
        </DateInputGroup>
        <Description>Enter the end time</Description>
      </TimeField>
    </div>
  ),
};

export const Required: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <TimeField isRequired className="w-[256px]" name="time">
        <Label>Time</Label>
        <DateInputGroup>
          <DateInputGroup.Input>
            {(segment) => <DateInputGroup.Segment segment={segment} />}
          </DateInputGroup.Input>
        </DateInputGroup>
      </TimeField>
      <TimeField isRequired className="w-[256px]" name="appointment-time">
        <Label>Appointment time</Label>
        <DateInputGroup>
          <DateInputGroup.Input>
            {(segment) => <DateInputGroup.Segment segment={segment} />}
          </DateInputGroup.Input>
        </DateInputGroup>
        <Description>Required field</Description>
      </TimeField>
    </div>
  ),
};

export const Invalid: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <TimeField isInvalid isRequired className="w-[256px]" name="time">
        <Label>Time</Label>
        <DateInputGroup>
          <DateInputGroup.Input>
            {(segment) => <DateInputGroup.Segment segment={segment} />}
          </DateInputGroup.Input>
        </DateInputGroup>
        <FieldError>Please enter a valid time</FieldError>
      </TimeField>
      <TimeField isInvalid className="w-[256px]" name="invalid-time">
        <Label>Time</Label>
        <DateInputGroup>
          <DateInputGroup.Input>
            {(segment) => <DateInputGroup.Segment segment={segment} />}
          </DateInputGroup.Input>
        </DateInputGroup>
        <FieldError>Time must be within business hours</FieldError>
      </TimeField>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => {
    const currentTime = now(getLocalTimeZone());
    const timeValue = new Time(currentTime.hour, currentTime.minute, currentTime.second);

    return (
      <div className="flex flex-col gap-4">
        <TimeField isDisabled className="w-[256px]" name="time" value={timeValue}>
          <Label>Time</Label>
          <DateInputGroup>
            <DateInputGroup.Input>
              {(segment) => <DateInputGroup.Segment segment={segment} />}
            </DateInputGroup.Input>
          </DateInputGroup>
          <Description>This time field is disabled</Description>
        </TimeField>
        <TimeField isDisabled className="w-[256px]" name="time-empty">
          <Label>Time</Label>
          <DateInputGroup>
            <DateInputGroup.Input>
              {(segment) => <DateInputGroup.Segment segment={segment} />}
            </DateInputGroup.Input>
          </DateInputGroup>
          <Description>This time field is disabled</Description>
        </TimeField>
      </div>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState<TimeValue | null>(null);

    return (
      <div className="flex flex-col gap-4">
        <TimeField className="w-[256px]" name="time" value={value} onChange={setValue}>
          <Label>Time</Label>
          <DateInputGroup>
            <DateInputGroup.Input>
              {(segment) => <DateInputGroup.Segment segment={segment} />}
            </DateInputGroup.Input>
          </DateInputGroup>
          <Description>Current value: {value ? value.toString() : "(empty)"}</Description>
        </TimeField>
        <div className="flex gap-2">
          <Button
            variant="tertiary"
            onPress={() => {
              const currentTime = now(getLocalTimeZone());

              setValue(new Time(currentTime.hour, currentTime.minute, currentTime.second));
            }}
          >
            Set now
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
    const [value, setValue] = useState<Time | null>(null);
    const minTime = parseTime("09:00");
    const maxTime = parseTime("17:00");
    const isInvalid = value !== null && (value.compare(minTime) < 0 || value.compare(maxTime) > 0);

    return (
      <div className="flex flex-col gap-4">
        <TimeField
          isRequired
          className="w-[256px]"
          isInvalid={isInvalid}
          maxValue={maxTime}
          minValue={minTime}
          name="time"
          value={value}
          onChange={setValue}
        >
          <Label>Time</Label>
          <DateInputGroup>
            <DateInputGroup.Input>
              {(segment) => <DateInputGroup.Segment segment={segment} />}
            </DateInputGroup.Input>
          </DateInputGroup>
          {isInvalid ? (
            <FieldError>Time must be between 9:00 AM and 5:00 PM</FieldError>
          ) : (
            <Description>Enter a time between 9:00 AM and 5:00 PM</Description>
          )}
        </TimeField>
      </div>
    );
  },
};

export const WithPrefixIcon: Story = {
  render: () => (
    <TimeField className="w-[256px]" name="time">
      <Label>Time</Label>
      <DateInputGroup>
        <DateInputGroup.Prefix>
          <Icon className="size-4 text-muted" icon="gravity-ui:clock" />
        </DateInputGroup.Prefix>
        <DateInputGroup.Input>
          {(segment) => <DateInputGroup.Segment segment={segment} />}
        </DateInputGroup.Input>
      </DateInputGroup>
    </TimeField>
  ),
};

export const WithSuffixIcon: Story = {
  render: () => (
    <TimeField className="w-[256px]" name="time">
      <Label>Time</Label>
      <DateInputGroup>
        <DateInputGroup.Input>
          {(segment) => <DateInputGroup.Segment segment={segment} />}
        </DateInputGroup.Input>
        <DateInputGroup.Suffix>
          <Icon className="size-4 text-muted" icon="gravity-ui:clock" />
        </DateInputGroup.Suffix>
      </DateInputGroup>
    </TimeField>
  ),
};

export const WithPrefixAndSuffix: Story = {
  render: () => (
    <TimeField className="w-[256px]" name="time">
      <Label>Time</Label>
      <DateInputGroup>
        <DateInputGroup.Prefix>
          <Icon className="size-4 text-muted" icon="gravity-ui:clock" />
        </DateInputGroup.Prefix>
        <DateInputGroup.Input>
          {(segment) => <DateInputGroup.Segment segment={segment} />}
        </DateInputGroup.Input>
        <DateInputGroup.Suffix>
          <Icon className="size-4 text-muted" icon="gravity-ui:chevron-down" />
        </DateInputGroup.Suffix>
      </DateInputGroup>
      <Description>Enter a time</Description>
    </TimeField>
  ),
};

export const OnSurface: Story = {
  render: () => (
    <Surface className="flex w-full min-w-[340px] flex-col gap-4 rounded-3xl p-6">
      <TimeField className="w-full" name="time">
        <Label>Time</Label>
        <DateInputGroup isOnSurface>
          <DateInputGroup.Input>
            {(segment) => <DateInputGroup.Segment segment={segment} />}
          </DateInputGroup.Input>
        </DateInputGroup>
        <Description>Enter a time</Description>
      </TimeField>
      <TimeField className="w-full" name="time-2">
        <Label>Appointment time</Label>
        <DateInputGroup isOnSurface>
          <DateInputGroup.Prefix>
            <Icon className="size-4 text-muted" icon="gravity-ui:clock" />
          </DateInputGroup.Prefix>
          <DateInputGroup.Input>
            {(segment) => <DateInputGroup.Segment segment={segment} />}
          </DateInputGroup.Input>
        </DateInputGroup>
        <Description>Enter a time for your appointment</Description>
      </TimeField>
    </Surface>
  ),
};

export const FormExample: Story = {
  render: () => {
    const [value, setValue] = useState<Time | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const minTime = parseTime("09:00");
    const maxTime = parseTime("17:00");
    const isInvalid = value !== null && (value.compare(minTime) < 0 || value.compare(maxTime) > 0);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      if (!value || isInvalid) {
        return;
      }

      setIsSubmitting(true);

      // Simulate API call
      setTimeout(() => {
        // eslint-disable-next-line no-console
        console.log("Time submitted:", {time: value});
        setValue(null);
        setIsSubmitting(false);
      }, 1500);
    };

    return (
      <Form className="flex w-[280px] flex-col gap-4" onSubmit={handleSubmit}>
        <TimeField
          isRequired
          className="w-full"
          isInvalid={isInvalid}
          maxValue={maxTime}
          minValue={minTime}
          name="time"
          value={value}
          onChange={setValue}
        >
          <Label>Appointment time</Label>
          <DateInputGroup>
            <DateInputGroup.Prefix>
              <Icon className="size-4 text-muted" icon="gravity-ui:clock" />
            </DateInputGroup.Prefix>
            <DateInputGroup.Input>
              {(segment) => <DateInputGroup.Segment segment={segment} />}
            </DateInputGroup.Input>
          </DateInputGroup>
          {isInvalid ? (
            <FieldError>Time must be between 9:00 AM and 5:00 PM</FieldError>
          ) : (
            <Description>Enter a time between 9:00 AM and 5:00 PM</Description>
          )}
        </TimeField>
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
        <TimeField isRequired className="w-[256px]" name="time1">
          <Label>Time</Label>
          <DateInputGroup>
            <DateInputGroup.Prefix>
              <Icon className="size-4 text-muted" icon="gravity-ui:clock" />
            </DateInputGroup.Prefix>
            <DateInputGroup.Input>
              {(segment) => <DateInputGroup.Segment segment={segment} />}
            </DateInputGroup.Input>
          </DateInputGroup>
          <Description>Enter a time</Description>
        </TimeField>

        <TimeField isRequired className="w-[256px]" name="time2">
          <Label>Time</Label>
          <DateInputGroup>
            <DateInputGroup.Input>
              {(segment) => <DateInputGroup.Segment segment={segment} />}
            </DateInputGroup.Input>
            <DateInputGroup.Suffix>
              <Icon className="size-4 text-muted" icon="gravity-ui:clock" />
            </DateInputGroup.Suffix>
          </DateInputGroup>
          <Description>Enter a time</Description>
        </TimeField>

        <TimeField isRequired className="w-[256px]" name="time3">
          <Label>Time</Label>
          <DateInputGroup>
            <DateInputGroup.Prefix>
              <Icon className="size-4 text-muted" icon="gravity-ui:clock" />
            </DateInputGroup.Prefix>
            <DateInputGroup.Input>
              {(segment) => <DateInputGroup.Segment segment={segment} />}
            </DateInputGroup.Input>
            <DateInputGroup.Suffix>
              <Icon className="size-4 text-muted" icon="gravity-ui:chevron-down" />
            </DateInputGroup.Suffix>
          </DateInputGroup>
          <Description>Enter a time</Description>
        </TimeField>
      </div>
    </div>
  ),
};
