"use client";

import {DateField, Label} from "@heroui/react";

export function Variants() {
  return (
    <div className="flex flex-col gap-4">
      <DateField className="w-[256px]" name="primary-date">
        <Label>主要变体</Label>
        <DateField.Group variant="primary">
          <DateField.Input>{(segment) => <DateField.Segment segment={segment} />}</DateField.Input>
        </DateField.Group>
      </DateField>
      <DateField className="w-[256px]" name="secondary-date">
        <Label>次要变体</Label>
        <DateField.Group variant="secondary">
          <DateField.Input>{(segment) => <DateField.Segment segment={segment} />}</DateField.Input>
        </DateField.Group>
      </DateField>
    </div>
  );
}
