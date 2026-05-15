"use client";

import {Clock} from "@gravity-ui/icons";
import {Description, Label, Surface, TimeField} from "@heroui/react";

export function OnSurface() {
  return (
    <Surface className="flex w-full max-w-sm flex-col gap-4 rounded-3xl p-6">
      <TimeField className="w-full" name="time">
        <Label>时间</Label>
        <TimeField.Group variant="secondary">
          <TimeField.Input>{(segment) => <TimeField.Segment segment={segment} />}</TimeField.Input>
        </TimeField.Group>
        <Description>输入时间</Description>
      </TimeField>
      <TimeField className="w-full" name="time-2">
        <Label>预约时间</Label>
        <TimeField.Group variant="secondary">
          <TimeField.Prefix>
            <Clock className="size-4 text-muted" />
          </TimeField.Prefix>
          <TimeField.Input>{(segment) => <TimeField.Segment segment={segment} />}</TimeField.Input>
        </TimeField.Group>
        <Description>输入预约时间</Description>
      </TimeField>
    </Surface>
  );
}
