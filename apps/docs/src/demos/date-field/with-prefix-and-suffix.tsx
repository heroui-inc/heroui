"use client";

import {Calendar, ChevronDown} from "@gravity-ui/icons";
import {DateField, DateInputGroup, Description, Label} from "@heroui/react";

export function WithPrefixAndSuffix() {
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
        <DateInputGroup.Suffix>
          <ChevronDown className="size-4 text-muted" />
        </DateInputGroup.Suffix>
      </DateInputGroup>
      <Description>Enter a date</Description>
    </DateField>
  );
}
