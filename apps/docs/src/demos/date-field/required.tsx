"use client";

import {DateField, DateInputGroup, Description, Label} from "@heroui/react";

export function Required() {
  return (
    <div className="flex flex-col gap-4">
      <DateField isRequired className="w-[256px]" name="date">
        <Label>Date</Label>
        <DateInputGroup>
          <DateInputGroup.Input>
            {(segment) => <DateInputGroup.Segment segment={segment} />}
          </DateInputGroup.Input>
        </DateInputGroup>
      </DateField>
      <DateField isRequired className="w-[256px]" name="start-date">
        <Label>Start date</Label>
        <DateInputGroup>
          <DateInputGroup.Input>
            {(segment) => <DateInputGroup.Segment segment={segment} />}
          </DateInputGroup.Input>
        </DateInputGroup>
        <Description>Required field</Description>
      </DateField>
    </div>
  );
}
