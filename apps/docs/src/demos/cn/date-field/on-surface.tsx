"use client";

import {Calendar} from "@gravity-ui/icons";
import {DateField, Description, Label, Surface} from "@heroui/react";

export function OnSurface() {
  return (
    <Surface className="flex w-full max-w-sm flex-col gap-4 rounded-3xl p-6">
      <DateField className="w-full" name="date">
        <Label>日期</Label>
        <DateField.Group variant="secondary">
          <DateField.Input>{(segment) => <DateField.Segment segment={segment} />}</DateField.Input>
        </DateField.Group>
        <Description>输入日期</Description>
      </DateField>
      <DateField className="w-full" name="date-2">
        <Label>预约日期</Label>
        <DateField.Group variant="secondary">
          <DateField.Prefix>
            <Calendar className="size-4 text-muted" />
          </DateField.Prefix>
          <DateField.Input>{(segment) => <DateField.Segment segment={segment} />}</DateField.Input>
        </DateField.Group>
        <Description>输入预约日期</Description>
      </DateField>
    </Surface>
  );
}
