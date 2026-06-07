"use client";

import {Description, Label, TimeField} from "@heroui/react";

export function WithDescription() {
  return (
    <div className="flex flex-col gap-4">
      <TimeField className="w-[256px]" name="time">
        <Label>开始时间</Label>
        <TimeField.Group>
          <TimeField.Input>{(segment) => <TimeField.Segment segment={segment} />}</TimeField.Input>
        </TimeField.Group>
        <Description>输入开始时间</Description>
      </TimeField>
      <TimeField className="w-[256px]" name="end-time">
        <Label>结束时间</Label>
        <TimeField.Group>
          <TimeField.Input>{(segment) => <TimeField.Segment segment={segment} />}</TimeField.Input>
        </TimeField.Group>
        <Description>输入结束时间</Description>
      </TimeField>
    </div>
  );
}
