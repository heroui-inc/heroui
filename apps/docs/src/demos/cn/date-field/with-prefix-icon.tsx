"use client";

import {Calendar} from "@gravity-ui/icons";
import {DateField, Label} from "@heroui/react";

export function WithPrefixIcon() {
  return (
    <DateField className="w-[256px]" name="date">
      <Label>日期</Label>
      <DateField.Group>
        <DateField.Prefix>
          <Calendar className="size-4 text-muted" />
        </DateField.Prefix>
        <DateField.Input>{(segment) => <DateField.Segment segment={segment} />}</DateField.Input>
      </DateField.Group>
    </DateField>
  );
}
