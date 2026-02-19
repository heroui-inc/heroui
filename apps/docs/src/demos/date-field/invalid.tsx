"use client";

import {DateField, FieldError, Label} from "@heroui/react";

export function Invalid() {
  return (
    <div className="flex flex-col gap-4">
      <DateField isInvalid isRequired className="w-[256px]" name="date">
        <Label>Date</Label>
        <DateField.Group>
          <DateField.Input>{(segment) => <DateField.Segment segment={segment} />}</DateField.Input>
        </DateField.Group>
        <FieldError>Please enter a valid date</FieldError>
      </DateField>
      <DateField isInvalid className="w-[256px]" name="invalid-date">
        <Label>Date</Label>
        <DateField.Group>
          <DateField.Input>{(segment) => <DateField.Segment segment={segment} />}</DateField.Input>
        </DateField.Group>
        <FieldError>Date must be in the future</FieldError>
      </DateField>
    </div>
  );
}
