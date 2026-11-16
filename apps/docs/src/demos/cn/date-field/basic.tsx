"use client";

import type {DateFieldProps, DateValue} from "@heroui/react";

import {DateField, Label} from "@heroui/react";

export function Basic(props: DateFieldProps<DateValue>) {
  return (
    <DateField {...props} className="w-[256px]" name="date">
      <Label>日期</Label>
      <DateField.Group>
        <DateField.Input>{(segment) => <DateField.Segment segment={segment} />}</DateField.Input>
      </DateField.Group>
    </DateField>
  );
}
