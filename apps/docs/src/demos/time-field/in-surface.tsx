"use client";

import {Clock} from "@gravity-ui/icons";
import {DateInputGroup, Description, Label, Surface, TimeField} from "@heroui/react";

export function InSurface() {
  return (
    <Surface className="flex w-full max-w-sm flex-col gap-4 rounded-3xl p-6">
      <TimeField className="w-full" name="time">
        <Label>Time</Label>
        <DateInputGroup inSurface="default">
          <DateInputGroup.Input>
            {(segment) => <DateInputGroup.Segment segment={segment} />}
          </DateInputGroup.Input>
        </DateInputGroup>
        <Description>Enter a time</Description>
      </TimeField>
      <TimeField className="w-full" name="time-2">
        <Label>Appointment time</Label>
        <DateInputGroup inSurface="default">
          <DateInputGroup.Prefix>
            <Clock className="size-4 text-muted" />
          </DateInputGroup.Prefix>
          <DateInputGroup.Input>
            {(segment) => <DateInputGroup.Segment segment={segment} />}
          </DateInputGroup.Input>
        </DateInputGroup>
        <Description>Enter a time for your appointment</Description>
      </TimeField>
    </Surface>
  );
}
