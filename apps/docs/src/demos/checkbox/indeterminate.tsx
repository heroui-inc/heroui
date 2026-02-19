"use client";

import {Checkbox, Description, Label} from "@heroui/react";
import {useState} from "react";

export function Indeterminate() {
  const [isIndeterminate, setIsIndeterminate] = useState(true);
  const [isSelected, setIsSelected] = useState(false);

  return (
    <Checkbox
      id="select-all"
      isIndeterminate={isIndeterminate}
      isSelected={isSelected}
      onChange={(selected: boolean) => {
        setIsSelected(selected);
        setIsIndeterminate(false);
      }}
    >
      <Checkbox.Control>
        <Checkbox.Indicator />
      </Checkbox.Control>
      <Checkbox.Content>
        <Label htmlFor="select-all">Select all</Label>
        <Description>Shows indeterminate state (dash icon)</Description>
      </Checkbox.Content>
    </Checkbox>
  );
}
