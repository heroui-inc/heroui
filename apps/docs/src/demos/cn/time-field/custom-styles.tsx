"use client";

import {Description, Label, TimeField} from "@heroui/react";

export function CustomStyles() {
  return (
    <TimeField className="w-full max-w-48 gap-1.5" name="reminder">
      <Label className="font-medium text-foreground">提醒时间</Label>
      <Description>每日签到通知。</Description>
      <TimeField.Group className="rounded-xl border border-border/80 bg-surface px-2 py-1 shadow-sm ring-1 ring-accent/5 focus-within:border-accent/25 focus-within:ring-2 focus-within:ring-accent/15">
        <TimeField.Input>
          {(segment) => <TimeField.Segment className="text-foreground" segment={segment} />}
        </TimeField.Input>
      </TimeField.Group>
    </TimeField>
  );
}
