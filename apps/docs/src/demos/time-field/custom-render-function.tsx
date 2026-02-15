"use client";

import {Label, TimeField} from "@heroui/react";

export function Basic() {
  return (
    <TimeField
      className="w-[256px]"
      name="time"
      render={(props) => <div {...props} data-custom="foo" />}
    >
      <Label>Time</Label>
      <TimeField.Group>
        <TimeField.Input>{(segment) => <TimeField.Segment segment={segment} />}</TimeField.Input>
      </TimeField.Group>
    </TimeField>
  );
}
