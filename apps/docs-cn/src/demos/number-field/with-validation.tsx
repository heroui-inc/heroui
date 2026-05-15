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
        <Label>百分比</Label>
        <NumberField.Group>
          <NumberField.DecrementButton />
          <NumberField.Input className="w-[120px]" />
          <NumberField.IncrementButton />
        </NumberField.Group>
        {isInvalid ? (
          <FieldError>百分比必须在 0 到 100 之间</FieldError>
        ) : (
          <Description>请输入 0 到 100 之间的值</Description>
        )}
      </NumberField>
    </div>
  );
}
