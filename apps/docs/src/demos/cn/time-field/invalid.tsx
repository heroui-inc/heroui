"use client";

import {FieldError, Label, TimeField} from "@heroui/react";

export function Invalid() {
  return (
    <div className="flex flex-col gap-4">
      <TimeField isInvalid isRequired className="w-[256px]" name="time">
        <Label>时间</Label>
        <TimeField.Group>
          <TimeField.Input>{(segment) => <TimeField.Segment segment={segment} />}</TimeField.Input>
        </TimeField.Group>
        <FieldError>请输入有效时间</FieldError>
      </TimeField>
      <TimeField isInvalid className="w-[256px]" name="invalid-time">
        <Label>时间</Label>
        <TimeField.Group>
          <TimeField.Input>{(segment) => <TimeField.Segment segment={segment} />}</TimeField.Input>
        </TimeField.Group>
        <FieldError>时间须在工作时间内</FieldError>
      </TimeField>
    </div>
  );
}
