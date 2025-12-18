"use client";

import {Calendar} from "@gravity-ui/icons";
import {DateField, DateInputGroup, Label} from "@heroui/react";

export function WithPrefixIcon() {
  return (
    <DateField className="w-[256px]" name="date">
      <Label>Date</Label>
      <DateInputGroup>
        <DateInputGroup.Prefix>
          <Calendar className="size-4 text-muted" />
        </DateInputGroup.Prefix>
        <DateInputGroup.Input>
          {(segment) => <DateInputGroup.Segment segment={segment} />}
        </DateInputGroup.Input>
      </DateInputGroup>
    </DateField>
  );
}
