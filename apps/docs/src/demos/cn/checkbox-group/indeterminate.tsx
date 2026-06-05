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
          <Label>全选</Label>
        </Checkbox.Button>
      </Checkbox>
      <div className="ml-6 flex flex-col gap-2">
        <CheckboxGroup value={selected} onChange={setSelected}>
          <Checkbox value="coding">
            <Checkbox.Button>
              <Checkbox.Control>
                <Checkbox.Indicator />
              </Checkbox.Control>
              <Label>编程</Label>
            </Checkbox.Button>
          </Checkbox>
          <Checkbox value="design">
            <Checkbox.Button>
              <Checkbox.Control>
                <Checkbox.Indicator />
              </Checkbox.Control>
              <Label>设计</Label>
            </Checkbox.Button>
          </Checkbox>
          <Checkbox value="writing">
            <Checkbox.Button>
              <Checkbox.Control>
                <Checkbox.Indicator />
              </Checkbox.Control>
              <Label>写作</Label>
            </Checkbox.Button>
          </Checkbox>
        </CheckboxGroup>
      </div>
    </div>
  );
}
