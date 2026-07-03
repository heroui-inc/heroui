"use client";

import {DateField, Label} from "@heroui/react";

const fieldGroup =
  "rounded-xl border border-border bg-surface shadow-sm ring-1 ring-black/5 transition-[box-shadow] focus-within:ring-2 focus-within:ring-foreground/15 dark:ring-white/10";

export function CustomStyles() {
  return (
    <DateField className="w-64" name="due-date">
      <Label className="text-sm font-medium tracking-tight text-foreground">Due date</Label>
      <DateField.Group className={fieldGroup} variant="secondary">
        <DateField.Input>{(segment) => <DateField.Segment segment={segment} />}</DateField.Input>
      </DateField.Group>
    </DateField>
  );
}
