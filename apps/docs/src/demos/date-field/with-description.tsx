"use client";

import {DateField, DateInputGroup, Description, Label} from "@heroui/react";

export function WithDescription() {
  return (
    <div className="flex flex-col gap-4">
      <DateField className="w-[256px]" name="date">
        <Label>Birth date</Label>
        <DateInputGroup>
          <DateInputGroup.Input>
            {(segment) => <DateInputGroup.Segment segment={segment} />}
          </DateInputGroup.Input>
        </DateInputGroup>
        <Description>Enter your date of birth</Description>
      </DateField>
      <DateField className="w-[256px]" name="appointment-date">
        <Label>Appointment date</Label>
        <DateInputGroup>
          <DateInputGroup.Input>
            {(segment) => <DateInputGroup.Segment segment={segment} />}
          </DateInputGroup.Input>
        </DateInputGroup>
        <Description>Enter a date for your appointment</Description>
      </DateField>
    </div>
  );
}
