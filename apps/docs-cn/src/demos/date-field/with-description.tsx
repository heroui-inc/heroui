"use client";

import {DateField, Description, Label} from "@heroui/react";

export function WithDescription() {
  return (
    <div className="flex flex-col gap-4">
      <DateField className="w-[256px]" name="date">
        <Label>出生日期</Label>
        <DateField.Group>
          <DateField.Input>{(segment) => <DateField.Segment segment={segment} />}</DateField.Input>
        </DateField.Group>
        <Description>输入出生日期</Description>
      </DateField>
      <DateField className="w-[256px]" name="appointment-date">
        <Label>预约日期</Label>
        <DateField.Group>
          <DateField.Input>{(segment) => <DateField.Segment segment={segment} />}</DateField.Input>
        </DateField.Group>
        <Description>输入预约日期</Description>
      </DateField>
    </div>
  );
}
