"use client";

import {Description, Label, TimeField} from "@heroui/react";
import {Time, getLocalTimeZone, now} from "@internationalized/date";

export function Disabled() {
  const currentTime = now(getLocalTimeZone());
  const timeValue = new Time(currentTime.hour, currentTime.minute, currentTime.second);

  return (
    <div className="flex flex-col gap-4">
      <TimeField isDisabled className="w-[256px]" name="time" value={timeValue}>
        <Label>Time</Label>
        <TimeField.Group>
          <TimeField.Input>{(segment) => <TimeField.Segment segment={segment} />}</TimeField.Input>
        </TimeField.Group>
        <Description>This time field is disabled</Description>
      </TimeField>
      <TimeField isDisabled className="w-[256px]" name="time-empty">
        <Label>Time</Label>
        <TimeField.Group>
          <TimeField.Input>{(segment) => <TimeField.Segment segment={segment} />}</TimeField.Input>
        </TimeField.Group>
        <Description>This time field is disabled</Description>
      </TimeField>
    </div>
  );
}
