import type {DateValue} from "@internationalized/date";
import type {Meta, StoryObj} from "@storybook/react";

import {Icon} from "@iconify/react";
import {getLocalTimeZone, parseDate, parseZonedDateTime, today} from "@internationalized/date";
import React, {useState} from "react";

import {Button} from "../button";
import {Description} from "../description";
import {FieldError} from "../field-error";
import {Form} from "../form";
import {Label} from "../label";
import {ListBox} from "../list-box";
import {Select} from "../select";
import {Tooltip} from "../tooltip";

import {DateField} from "./index";

const meta: Meta<typeof DateField> = {
  component: DateField,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  title: "Components/Date and Time/DateField",
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

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <DateField className="w-[256px]" name="primary-date">
        <Label>Primary variant</Label>
        <DateField.Group variant="primary">
          <DateField.Input>{(segment) => <DateField.Segment segment={segment} />}</DateField.Input>
        </DateField.Group>
      </DateField>
      <DateField className="w-[256px]" name="secondary-date">
        <Label>Secondary variant</Label>
        <DateField.Group variant="secondary">
          <DateField.Input>{(segment) => <DateField.Segment segment={segment} />}</DateField.Input>
        </DateField.Group>
      </DateField>
    </div>
  ),
};

export const FullWidth: Story = {
  render: () => (
    <div className="w-[400px] space-y-4">
      <DateField fullWidth name="date">
        <Label>Date</Label>
        <DateField.Group>
          <DateField.Input>{(segment) => <DateField.Segment segment={segment} />}</DateField.Input>
        </DateField.Group>
      </DateField>
      <DateField fullWidth name="date-icons">
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
      </DateField>
    </div>
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
          className="w-full"
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

export const Granularity: Story = {
  render: () => {
    const granularityOptions = [
      {id: "day", label: "Day"},
      {id: "hour", label: "Hour"},
      {id: "minute", label: "Minute"},
      {id: "second", label: "Second"},
    ] as const;

    const [granularity, setGranularity] = useState<"day" | "hour" | "minute" | "second">("day");

    // Determine appropriate default value based on granularity
    let defaultValue: DateValue;

    if (granularity === "day") {
      defaultValue = parseDate("2025-02-03");
    } else {
      // hour, minute, second
      defaultValue = parseZonedDateTime("2025-02-03T08:45:00[America/Los_Angeles]");
    }

    return (
      <div className="flex gap-4">
        <DateField
          className="w-[256px]"
          defaultValue={defaultValue}
          granularity={granularity}
          name="granularity-date"
        >
          <Label>Appointment Date</Label>
          <DateField.Group>
            <DateField.Input>
              {(segment) => <DateField.Segment segment={segment} />}
            </DateField.Input>
          </DateField.Group>
        </DateField>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <Label>Granularity</Label>
            <Tooltip delay={0}>
              <Tooltip.Trigger aria-label="Granularity information">
                <Icon className="size-4 text-muted" icon="gravity-ui:circle-question" />
              </Tooltip.Trigger>
              <Tooltip.Content placement="bottom start">
                <p>
                  Determines the smallest unit displayed in the date picker. By default, this is
                  "day" for dates, and "minute" for times.
                </p>
              </Tooltip.Content>
            </Tooltip>
          </div>
          <Select
            className="w-[110px]"
            placeholder="Select granularity"
            value={granularity}
            variant="secondary"
            onChange={(value) => setGranularity(value as typeof granularity)}
          >
            <Select.Trigger>
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <ListBox>
                {granularityOptions.map((option) => (
                  <ListBox.Item key={option.id} id={option.id} textValue={option.label}>
                    {option.label}
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>
        </div>
      </div>
    );
  },
};

export const AllVariations: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <DateField isRequired className="w-[256px]" name="date1">
          <Label>Date</Label>
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

        <DateField isRequired className="w-[256px]" name="date2">
          <Label>Date</Label>
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

        <DateField isRequired className="w-[256px]" name="date3">
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
