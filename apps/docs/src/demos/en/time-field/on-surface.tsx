"use client";

import {Clock} from "@gravity-ui/icons";
import {Description, Label, Surface, TimeField} from "@heroui/react";

export function OnSurface() {
  return (
    <Surface className="flex w-full max-w-sm flex-col gap-4 rounded-3xl p-6">
      <TimeField className="w-full" name="time">
        <Label>Time</Label>
        <TimeField.Group variant="secondary">
          <TimeField.Input>{(segment) => <TimeField.Segment segment={segment} />}</TimeField.Input>
        </TimeField.Group>
        <Description>Enter a time</Description>
      </TimeField>
      <TimeField className="w-full" name="time-2">
        <Label>Appointment time</Label>
        <TimeField.Group variant="secondary">
          <TimeField.Prefix>
            <Clock className="size-4 text-muted" />
          </TimeField.Prefix>
          <TimeField.Input>{(segment) => <TimeField.Segment segment={segment} />}</TimeField.Input>
        </TimeField.Group>
        <Description>Enter a time for your appointment</Description>
      </TimeField>
    </Surface>
  );
}
