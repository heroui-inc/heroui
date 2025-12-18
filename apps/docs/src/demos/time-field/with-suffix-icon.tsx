"use client";

import {Clock} from "@gravity-ui/icons";
import {DateInputGroup, Label, TimeField} from "@heroui/react";

export function WithSuffixIcon() {
  return (
    <TimeField className="w-[256px]" name="time">
      <Label>Time</Label>
      <DateInputGroup>
        <DateInputGroup.Input>
          {(segment) => <DateInputGroup.Segment segment={segment} />}
        </DateInputGroup.Input>
        <DateInputGroup.Suffix>
          <Clock className="size-4 text-muted" />
        </DateInputGroup.Suffix>
      </DateInputGroup>
    </TimeField>
  );
}
