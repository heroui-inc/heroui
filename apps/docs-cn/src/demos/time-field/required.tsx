"use client";

import {Description, Label, TimeField} from "@heroui/react";

export function Required() {
  return (
    <div className="flex flex-col gap-4">
      <TimeField isRequired className="w-[256px]" name="time">
        <Label>Time</Label>
        <TimeField.Group>
          <TimeField.Input>{(segment) => <TimeField.Segment segment={segment} />}</TimeField.Input>
        </TimeField.Group>
      </TimeField>
      <TimeField isRequired className="w-[256px]" name="appointment-time">
        <Label>Appointment time</Label>
        <TimeField.Group>
          <TimeField.Input>{(segment) => <TimeField.Segment segment={segment} />}</TimeField.Input>
        </TimeField.Group>
        <Description>Required field</Description>
      </TimeField>
    </div>
  );
}
