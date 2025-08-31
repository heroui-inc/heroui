"use client";

import {CheckboxGroup, Checkbox, Label} from "@heroui/react";

export function Group() {
  return (
    <CheckboxGroup defaultValue={["option1", "option3"]}>
      <Label>Select your preferences</Label>
      <CheckboxGroup.Items>
        <div className="flex items-center gap-3">
          <Checkbox value="option1" id="group-1">
            <Checkbox.Indicator />
          </Checkbox>
          <Label htmlFor="group-1">Option 1</Label>
        </div>
        <div className="flex items-center gap-3">
          <Checkbox value="option2" id="group-2">
            <Checkbox.Indicator />
          </Checkbox>
          <Label htmlFor="group-2">Option 2</Label>
        </div>
        <div className="flex items-center gap-3">
          <Checkbox value="option3" id="group-3">
            <Checkbox.Indicator />
          </Checkbox>
          <Label htmlFor="group-3">Option 3</Label>
        </div>
      </CheckboxGroup.Items>
    </CheckboxGroup>
  );
}