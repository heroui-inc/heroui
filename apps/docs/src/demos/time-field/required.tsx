"use client";

import {DateInputGroup, Description, Label, TimeField} from "@heroui/react";

export function Required() {
  return (
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
  );
}
