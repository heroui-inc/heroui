"use client";

import {Checkbox, CheckboxGroup, Label} from "@heroui/react";
import {useState} from "react";

export function Controlled() {
  const [selected, setSelected] = useState(["coding", "design"]);

  return (
    <CheckboxGroup className="min-w-[320px]" name="skills" value={selected} onChange={setSelected}>
      <Label>Your skills</Label>
      <Checkbox value="coding">
        <Checkbox.Button>
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
          <Label>Coding</Label>
        </Checkbox.Button>
      </Checkbox>
      <Checkbox value="design">
        <Checkbox.Button>
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
          <Label>Design</Label>
        </Checkbox.Button>
      </Checkbox>
      <Checkbox value="writing">
        <Checkbox.Button>
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
          <Label>Writing</Label>
        </Checkbox.Button>
      </Checkbox>
      <Label className="my-4 text-sm text-muted">Selected: {selected.join(", ") || "None"}</Label>
    </CheckboxGroup>
  );
}
