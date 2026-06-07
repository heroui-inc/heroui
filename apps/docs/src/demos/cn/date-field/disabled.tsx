"use client";

import {DateField, Description, Label} from "@heroui/react";
import {getLocalTimeZone, today} from "@internationalized/date";

export function Disabled() {
  return (
    <div className="flex flex-col gap-4">
      <DateField isDisabled className="w-[256px]" name="date" value={today(getLocalTimeZone())}>
        <Label>日期</Label>
        <DateField.Group>
          <DateField.Input>{(segment) => <DateField.Segment segment={segment} />}</DateField.Input>
        </DateField.Group>
        <Description>该日期字段已禁用</Description>
      </DateField>
      <DateField isDisabled className="w-[256px]" name="date-empty">
        <Label>日期</Label>
        <DateField.Group>
          <DateField.Input>{(segment) => <DateField.Segment segment={segment} />}</DateField.Input>
        </DateField.Group>
        <Description>该日期字段已禁用</Description>
      </DateField>
    </div>
  );
}
