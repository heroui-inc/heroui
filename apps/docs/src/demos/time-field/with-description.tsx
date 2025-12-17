"use client";

import {DateInputGroup, Description, Label, TimeField} from "@heroui/react";

export function WithDescription() {
  return (
    <div className="flex flex-col gap-4">
      <TimeField className="w-[256px]" name="time">
        <Label>Start time</Label>
        <DateInputGroup>
          <DateInputGroup.Input>
            {(segment) => <DateInputGroup.Segment segment={segment} />}
          </DateInputGroup.Input>
        </DateInputGroup>
        <Description>Enter the start time</Description>
      </TimeField>
      <TimeField className="w-[256px]" name="end-time">
        <Label>End time</Label>
        <DateInputGroup>
          <DateInputGroup.Input>
            {(segment) => <DateInputGroup.Segment segment={segment} />}
          </DateInputGroup.Input>
        </DateInputGroup>
        <Description>Enter the end time</Description>
      </TimeField>
    </div>
  );
}
