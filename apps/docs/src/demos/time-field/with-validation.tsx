"use client";

import type {TimeValue} from "@internationalized/date";

import {DateInputGroup, Description, FieldError, Label, TimeField} from "@heroui/react";
import {parseTime} from "@internationalized/date";
import {useState} from "react";

export function WithValidation() {
  const [value, setValue] = useState<TimeValue | null>(null);
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
}
