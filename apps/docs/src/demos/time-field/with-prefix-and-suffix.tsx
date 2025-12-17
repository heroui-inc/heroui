"use client";

import {DateInputGroup, Description, Label, TimeField} from "@heroui/react";
import {Icon} from "@iconify/react";

export function WithPrefixAndSuffix() {
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
        <DateInputGroup.Suffix>
          <Icon className="size-4 text-muted" icon="gravity-ui:chevron-down" />
        </DateInputGroup.Suffix>
      </DateInputGroup>
      <Description>Enter a time</Description>
    </TimeField>
  );
}
