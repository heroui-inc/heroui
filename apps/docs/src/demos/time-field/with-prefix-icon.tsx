"use client";

import {DateInputGroup, Label, TimeField} from "@heroui/react";
import {Icon} from "@iconify/react";

export function WithPrefixIcon() {
  return (
    <TimeField className="w-[256px]" name="time">
      <Label>Time</Label>
      <DateInputGroup>
        <DateInputGroup.Prefix>
          <Icon className="size-4 text-muted" icon="gravity-ui:clock" />
        </DateInputGroup.Prefix>
        <DateInputGroup.Input>
          {(segment) => <DateInputGroup.Segment segment={segment} />}
        </DateInputGroup.Input>
      </DateInputGroup>
    </TimeField>
  );
}
