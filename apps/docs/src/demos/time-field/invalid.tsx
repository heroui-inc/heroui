"use client";

import {DateInputGroup, FieldError, Label, TimeField} from "@heroui/react";

export function Invalid() {
  return (
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
  );
}
