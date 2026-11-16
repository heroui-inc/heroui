"use client";

import type {TimeFieldProps, TimeValue} from "@heroui/react";

import {Label, TimeField} from "@heroui/react";

export function Basic(props: TimeFieldProps<TimeValue>) {
  return (
    <TimeField {...props} className="w-[256px]" name="time">
      <Label>Time</Label>
      <TimeField.Group>
        <TimeField.Input>{(segment) => <TimeField.Segment segment={segment} />}</TimeField.Input>
      </TimeField.Group>
    </TimeField>
  );
}
