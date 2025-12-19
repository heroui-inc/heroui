"use client";

import {DateField, DateInputGroup, Description, Label} from "@heroui/react";
import {getLocalTimeZone, today} from "@internationalized/date";

export function Disabled() {
  return (
    <div className="flex flex-col gap-4">
      <DateField isDisabled className="w-[256px]" name="date" value={today(getLocalTimeZone())}>
        <Label>Date</Label>
        <DateInputGroup>
          <DateInputGroup.Input>
            {(segment) => <DateInputGroup.Segment segment={segment} />}
          </DateInputGroup.Input>
        </DateInputGroup>
        <Description>This date field is disabled</Description>
      </DateField>
      <DateField isDisabled className="w-[256px]" name="date-empty">
        <Label>Date</Label>
        <DateInputGroup>
          <DateInputGroup.Input>
            {(segment) => <DateInputGroup.Segment segment={segment} />}
          </DateInputGroup.Input>
        </DateInputGroup>
        <Description>This date field is disabled</Description>
      </DateField>
    </div>
  );
}
