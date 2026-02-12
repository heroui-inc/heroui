"use client";

import {Calendar} from "@gravity-ui/icons";
import {DateField, Label} from "@heroui/react";

export function WithSuffixIcon() {
  return (
    <DateField className="w-[256px]" name="date">
      <Label>Date</Label>
      <DateField.Group>
        <DateField.Input>{(segment) => <DateField.Segment segment={segment} />}</DateField.Input>
        <DateField.Suffix>
          <Calendar className="size-4 text-muted" />
        </DateField.Suffix>
      </DateField.Group>
    </DateField>
  );
}
