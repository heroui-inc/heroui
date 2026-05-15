"use client";

import type {TimeValue} from "@heroui/react";

import {Button, Description, Label, TimeField} from "@heroui/react";
import {Time, getLocalTimeZone, now} from "@internationalized/date";
import {useState} from "react";

export function Controlled() {
  const [value, setValue] = useState<TimeValue | null>(null);

  return (
    <div className="flex flex-col gap-4">
      <TimeField className="w-[256px]" name="time" value={value} onChange={setValue}>
        <Label>时间</Label>
        <TimeField.Group>
          <TimeField.Input>{(segment) => <TimeField.Segment segment={segment} />}</TimeField.Input>
        </TimeField.Group>
        <Description>当前值：{value ? value.toString() : "（空）"}</Description>
      </TimeField>
      <div className="flex gap-2">
        <Button
          variant="tertiary"
          onPress={() => {
            const currentTime = now(getLocalTimeZone());

            setValue(new Time(currentTime.hour, currentTime.minute, currentTime.second));
          }}
        >
          设为当前时间
        </Button>
        <Button variant="tertiary" onPress={() => setValue(null)}>
          清空
        </Button>
      </div>
    </div>
  );
}
