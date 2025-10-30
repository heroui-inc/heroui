"use client";

import {Checkbox, CheckboxGroup, Label} from "@heroui/react";
import {useState} from "react";

export function Controlled() {
  const [selected, setSelected] = useState(["coding", "design"]);

  return (
    <CheckboxGroup className="min-w-[320px]" name="skills" value={selected} onChange={setSelected}>
      <Label>Your skills</Label>
      <Checkbox.Root value="coding">
        <Checkbox.Control>
          <Checkbox.Indicator />
        </Checkbox.Control>
        <Checkbox.Content>
          <Label>Coding</Label>
        </Checkbox.Content>
      </Checkbox.Root>
      <Checkbox.Root value="design">
        <Checkbox.Control>
          <Checkbox.Indicator />
        </Checkbox.Control>
        <Checkbox.Content>
          <Label>Design</Label>
        </Checkbox.Content>
      </Checkbox.Root>
      <Checkbox.Root value="writing">
        <Checkbox.Control>
          <Checkbox.Indicator />
        </Checkbox.Control>
        <Checkbox.Content>
          <Label>Writing</Label>
        </Checkbox.Content>
      </Checkbox.Root>
      <Label className="text-muted my-4 text-sm">Selected: {selected.join(", ") || "None"}</Label>
    </CheckboxGroup>
  );
}
