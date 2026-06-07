"use client";

import {Clock} from "@gravity-ui/icons";
import {Label, TimeField} from "@heroui/react";

export function WithSuffixIcon() {
  return (
    <TimeField className="w-[256px]" name="time">
      <Label>Time</Label>
      <TimeField.Group>
        <TimeField.Input>{(segment) => <TimeField.Segment segment={segment} />}</TimeField.Input>
        <TimeField.Suffix>
          <Clock className="size-4 text-muted" />
        </TimeField.Suffix>
      </TimeField.Group>
    </TimeField>
  );
}
