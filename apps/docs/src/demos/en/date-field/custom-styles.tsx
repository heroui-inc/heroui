"use client";

import {DateField, Label} from "@heroui/react";

export function CustomStyles() {
  return (
    <DateField className="w-64" name="due-date">
      <Label>Due date</Label>
      <DateField.Group
        className="rounded-xl border border-border/80 bg-default shadow-sm"
        variant="secondary"
      >
        <DateField.Input>{(segment) => <DateField.Segment segment={segment} />}</DateField.Input>
      </DateField.Group>
    </DateField>
  );
}
