"use client";

import type {DateValue} from "@internationalized/date";

import {DateField, Description, FieldError, Label} from "@heroui/react";
import {getLocalTimeZone, today} from "@internationalized/date";
import {useState} from "react";

export function WithValidation() {
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
          <DateField.Input>{(segment) => <DateField.Segment segment={segment} />}</DateField.Input>
        </DateField.Group>
        {isInvalid ? (
          <FieldError>Date must be today or in the future</FieldError>
        ) : (
          <Description>Enter a date from today onwards</Description>
        )}
      </DateField>
    </div>
  );
}
