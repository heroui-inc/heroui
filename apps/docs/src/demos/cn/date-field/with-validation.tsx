"use client";

import type {DateValue} from "@internationalized/date";

import {DateField, Description, FieldError, Label} from "@heroui/react";
import {getLocalTimeZone, today} from "@internationalized/date";
import {useState} from "react";

export function WithValidation() {
  const [value, setValue] = useState<DateValue | null>(null);
  const todayDate = today(getLocalTimeZone());
  const isInvalid = value !== null && value.compare(todayDate) < 0;

  return (
    <div className="flex flex-col gap-4">
      <DateField
        isRequired
        className="w-[256px]"
        isInvalid={isInvalid}
        minValue={todayDate}
        name="date"
        value={value}
        onChange={setValue}
      >
        <Label>日期</Label>
        <DateField.Group>
          <DateField.Input>{(segment) => <DateField.Segment segment={segment} />}</DateField.Input>
        </DateField.Group>
        {isInvalid ? (
          <FieldError>日期须为今天或将来</FieldError>
        ) : (
          <Description>输入日期 from today onwards</Description>
        )}
      </DateField>
    </div>
  );
}
