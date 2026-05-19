"use client";

import {DateField, Label} from "@heroui/react";

const fieldGroup =
  "rounded-xl border border-border/80 bg-surface shadow-sm ring-1 ring-black/5 transition-[box-shadow] focus-within:ring-2 focus-within:ring-neutral-400/30 dark:ring-white/10 dark:focus-within:ring-neutral-500/40";

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
