"use client";

import type {Time} from "@internationalized/date";

import {Clock} from "@gravity-ui/icons";
import {
  Button,
  DateInputGroup,
  Description,
  FieldError,
  Form,
  Label,
  TimeField,
} from "@heroui/react";
import {parseTime} from "@internationalized/date";
import {useState} from "react";

export function FormExample() {
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
            <Clock className="size-4 text-muted" />
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
}
