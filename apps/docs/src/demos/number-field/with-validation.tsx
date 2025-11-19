"use client";

import {Description, FieldError, Label, NumberField} from "@heroui/react";
import React from "react";

export function WithValidation() {
  const [value, setValue] = React.useState<number | undefined>(undefined);
  const isInvalid = value !== undefined && (value < 0 || value > 100);

  return (
    <div className="flex w-full max-w-64 flex-col gap-4">
      <NumberField
        isRequired
        formatOptions={{style: "percent"}}
        isInvalid={isInvalid}
        maxValue={1}
        minValue={0}
        name="percentage"
        step={0.1}
        value={value}
        onChange={setValue}
      >
        <Label>Percentage</Label>
        <NumberField.Group>
          <NumberField.DecrementButton />
          <NumberField.Input className="w-[120px]" />
          <NumberField.IncrementButton />
        </NumberField.Group>
        {isInvalid ? (
          <FieldError>Percentage must be between 0 and 100</FieldError>
        ) : (
          <Description>Enter a value between 0 and 100</Description>
        )}
      </NumberField>
    </div>
  );
}
