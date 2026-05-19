"use client";

import {Label, TimeField} from "@heroui/react";

const fieldGroup =
  "rounded-xl border border-border/80 bg-surface shadow-sm ring-1 ring-black/5 transition-[box-shadow,border-color] focus-within:ring-2 focus-within:ring-neutral-400/25 dark:ring-white/10 dark:focus-within:ring-neutral-500/30";

export function CustomStyles() {
  return (
    <TimeField className="w-full max-w-56 gap-1.5" name="time">
      <Label className="font-medium text-neutral-800 dark:text-neutral-100">Start time</Label>
      <TimeField.Group className={fieldGroup}>
        <TimeField.Input>{(segment) => <TimeField.Segment segment={segment} />}</TimeField.Input>
      </TimeField.Group>
    </TimeField>
  );
}
