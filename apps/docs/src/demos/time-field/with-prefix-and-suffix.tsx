"use client";

import {ChevronDown, Clock} from "@gravity-ui/icons";
import {DateInputGroup, Description, Label, TimeField} from "@heroui/react";

export function WithPrefixAndSuffix() {
  return (
    <TimeField className="w-[256px]" name="time">
      <Label>Time</Label>
      <DateInputGroup>
        <DateInputGroup.Prefix>
          <Clock className="size-4 text-muted" />
        </DateInputGroup.Prefix>
        <DateInputGroup.Input>
          {(segment) => <DateInputGroup.Segment segment={segment} />}
        </DateInputGroup.Input>
        <DateInputGroup.Suffix>
          <ChevronDown className="size-4 text-muted" />
        </DateInputGroup.Suffix>
      </DateInputGroup>
      <Description>Enter a time</Description>
    </TimeField>
  );
}
