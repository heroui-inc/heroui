"use client";

import {Button, Description, Label, NumberField} from "@heroui/react";
import React from "react";

export function Controlled() {
  const [value, setValue] = React.useState(1024);

  return (
    <div className="flex w-full max-w-64 flex-col gap-4">
      <NumberField minValue={0} name="width" value={value} onChange={setValue}>
        <Label>宽度</Label>
        <NumberField.Group>
          <NumberField.DecrementButton />
          <NumberField.Input className="w-[120px]" />
          <NumberField.IncrementButton />
        </NumberField.Group>
        <Description>当前值：{value}</Description>
      </NumberField>
      <div className="flex gap-2">
        <Button variant="tertiary" onPress={() => setValue(0)}>
          重置为 0
        </Button>
        <Button variant="tertiary" onPress={() => setValue(2048)}>
          设为 2048
        </Button>
      </div>
    </div>
  );
}
