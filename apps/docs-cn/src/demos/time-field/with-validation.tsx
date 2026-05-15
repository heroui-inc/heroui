"use client";

import type {Time} from "@internationalized/date";

import {Description, FieldError, Label, TimeField} from "@heroui/react";
import {parseTime} from "@internationalized/date";
import {useState} from "react";

export function WithValidation() {
  const [value, setValue] = useState<Time | null>(null);
  const minTime = parseTime("09:00");
  const maxTime = parseTime("17:00");
  const isInvalid = value !== null && (value.compare(minTime) < 0 || value.compare(maxTime) > 0);

  return (
    <div className="flex flex-col gap-4">
      <TimeField
        isRequired
        className="w-[256px]"
        isInvalid={isInvalid}
        maxValue={maxTime}
        minValue={minTime}
        name="time"
        value={value}
        onChange={setValue}
      >
        <Label>时间</Label>
        <TimeField.Group>
          <TimeField.Input>{(segment) => <TimeField.Segment segment={segment} />}</TimeField.Input>
        </TimeField.Group>
        {isInvalid ? (
          <FieldError>时间须在上午 9:00 至下午 5:00 之间</FieldError>
        ) : (
          <Description>输入上午 9:00 至下午 5:00 之间的时间</Description>
        )}
      </TimeField>
    </div>
  );
}
