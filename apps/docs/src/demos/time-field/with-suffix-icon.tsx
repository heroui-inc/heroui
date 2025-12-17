"use client";

import {DateInputGroup, Label, TimeField} from "@heroui/react";
import {Icon} from "@iconify/react";

export function WithSuffixIcon() {
  return (
    <TimeField className="w-[256px]" name="time">
      <Label>Time</Label>
      <DateInputGroup>
        <DateInputGroup.Input>
          {(segment) => <DateInputGroup.Segment segment={segment} />}
        </DateInputGroup.Input>
        <DateInputGroup.Suffix>
          <Icon className="size-4 text-muted" icon="gravity-ui:clock" />
        </DateInputGroup.Suffix>
      </DateInputGroup>
    </TimeField>
  );
}
