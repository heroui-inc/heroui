"use client";

import {ChevronDown, Clock} from "@gravity-ui/icons";
import {DateInputGroup, Label, TimeField} from "@heroui/react";

export function FullWidth() {
  return (
    <div className="w-[400px] space-y-4">
      <TimeField fullWidth name="time">
        <Label>Time</Label>
        <DateInputGroup fullWidth>
          <DateInputGroup.Input>
            {(segment) => <DateInputGroup.Segment segment={segment} />}
          </DateInputGroup.Input>
        </DateInputGroup>
      </TimeField>
      <TimeField fullWidth name="time-icons">
        <Label>Time</Label>
        <DateInputGroup fullWidth>
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
      </TimeField>
    </div>
  );
}
