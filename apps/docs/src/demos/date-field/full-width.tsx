"use client";

import {Calendar, ChevronDown} from "@gravity-ui/icons";
import {DateField, DateInputGroup, Label} from "@heroui/react";

export function FullWidth() {
  return (
    <div className="w-[400px] space-y-4">
      <DateField fullWidth name="date">
        <Label>Date</Label>
        <DateInputGroup>
          <DateInputGroup.Input>
            {(segment) => <DateInputGroup.Segment segment={segment} />}
          </DateInputGroup.Input>
        </DateInputGroup>
      </DateField>
      <DateField fullWidth name="date-icons">
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
      </DateField>
    </div>
  );
}
