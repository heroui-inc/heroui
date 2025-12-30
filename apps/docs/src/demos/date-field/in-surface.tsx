"use client";

import {Calendar} from "@gravity-ui/icons";
import {DateField, DateInputGroup, Description, Label, Surface} from "@heroui/react";

export function InSurface() {
  return (
    <Surface className="flex w-full max-w-sm flex-col gap-4 rounded-3xl p-6">
      <DateField className="w-full" name="date">
        <Label>Date</Label>
        <DateInputGroup inSurface="default">
          <DateInputGroup.Input>
            {(segment) => <DateInputGroup.Segment segment={segment} />}
          </DateInputGroup.Input>
        </DateInputGroup>
        <Description>Enter a date</Description>
      </DateField>
      <DateField className="w-full" name="date-2">
        <Label>Appointment date</Label>
        <DateInputGroup inSurface="default">
          <DateInputGroup.Prefix>
            <Calendar className="size-4 text-muted" />
          </DateInputGroup.Prefix>
          <DateInputGroup.Input>
            {(segment) => <DateInputGroup.Segment segment={segment} />}
          </DateInputGroup.Input>
        </DateInputGroup>
        <Description>Enter a date for your appointment</Description>
      </DateField>
    </Surface>
  );
}
