"use client";

import {Checkbox, CheckboxGroup, Label} from "@heroui/react";
import {useState} from "react";

export function Indeterminate() {
  const [selected, setSelected] = useState(["coding"]);
  const allOptions = ["coding", "design", "writing"];

  return (
    <div>
      <Checkbox
        isIndeterminate={selected.length > 0 && selected.length < allOptions.length}
        isSelected={selected.length === allOptions.length}
        name="select-all"
        onChange={(isSelected: boolean) => {
          setSelected(isSelected ? allOptions : []);
        }}
      >
        <Checkbox.Button>
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
          <Label>Select all</Label>
        </Checkbox.Button>
      </Checkbox>
      <div className="ml-6 flex flex-col gap-2">
        <CheckboxGroup value={selected} onChange={setSelected}>
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
        </CheckboxGroup>
      </div>
    </div>
  );
}
