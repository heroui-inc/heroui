"use client";

import type {DateValue} from "@internationalized/date";

import {Button, DateField, Description, Label} from "@heroui/react";
import {getLocalTimeZone, today} from "@internationalized/date";
import {useState} from "react";

export function Controlled() {
  const [value, setValue] = useState<DateValue | null>(null);

  return (
    <div className="flex flex-col gap-4">
      <DateField className="w-[256px]" name="date" value={value} onChange={setValue}>
        <Label>日期</Label>
        <DateField.Group>
          <DateField.Input>{(segment) => <DateField.Segment segment={segment} />}</DateField.Input>
        </DateField.Group>
        <Description>当前值：{value ? value.toString() : "（空）"}</Description>
      </DateField>
      <div className="flex gap-2">
        <Button variant="tertiary" onPress={() => setValue(today(getLocalTimeZone()))}>
          设为今天
        </Button>
        <Button variant="tertiary" onPress={() => setValue(null)}>
          清空
        </Button>
      </div>
    </div>
  );
}
