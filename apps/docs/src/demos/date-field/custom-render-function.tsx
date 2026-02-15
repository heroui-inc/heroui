"use client";

import {DateField, Label} from "@heroui/react";

export function Basic() {
  return (
    <DateField
      className="w-[256px]"
      name="date"
      render={(props) => <div {...props} data-custom="date-field" />}
    >
      <Label render={(props) => <span {...props} data-custom="date-field-label" />}>Date</Label>
      <DateField.Group render={(props) => <div {...props} data-custom="date-field-group" />}>
        <DateField.Input render={(props) => <div {...props} data-custom="date-field-input" />}>
          {(segment) => <DateField.Segment segment={segment} />}
        </DateField.Input>
      </DateField.Group>
    </DateField>
  );
}
