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
        <Label>Date</Label>
        <DateField.Group>
          <DateField.Input>{(segment) => <DateField.Segment segment={segment} />}</DateField.Input>
        </DateField.Group>
        <Description>Current value: {value ? value.toString() : "(empty)"}</Description>
      </DateField>
      <div className="flex gap-2">
        <Button variant="tertiary" onPress={() => setValue(today(getLocalTimeZone()))}>
          Set today
        </Button>
        <Button variant="tertiary" onPress={() => setValue(null)}>
          Clear
        </Button>
      </div>
    </div>
  );
}
