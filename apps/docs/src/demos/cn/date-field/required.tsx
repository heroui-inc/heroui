"use client";

import {DateField, Description, Label} from "@heroui/react";

export function Required() {
  return (
    <div className="flex flex-col gap-4">
      <DateField isRequired className="w-[256px]" name="date">
        <Label>日期</Label>
        <DateField.Group>
          <DateField.Input>{(segment) => <DateField.Segment segment={segment} />}</DateField.Input>
        </DateField.Group>
      </DateField>
      <DateField isRequired className="w-[256px]" name="start-date">
        <Label>开始日期</Label>
        <DateField.Group>
          <DateField.Input>{(segment) => <DateField.Segment segment={segment} />}</DateField.Input>
        </DateField.Group>
        <Description>必填项</Description>
      </DateField>
    </div>
  );
}
