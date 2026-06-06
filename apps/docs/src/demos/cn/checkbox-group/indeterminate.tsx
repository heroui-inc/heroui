"use client";

import {Checkbox, CheckboxGroup} from "@heroui/react";
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
        <Checkbox.Content>
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
          全选
        </Checkbox.Content>
      </Checkbox>
      <div className="ml-6 flex flex-col gap-2">
        <CheckboxGroup value={selected} onChange={setSelected}>
          <Checkbox value="coding">
            <Checkbox.Content>
              <Checkbox.Control>
                <Checkbox.Indicator />
              </Checkbox.Control>
              编程
            </Checkbox.Content>
          </Checkbox>
          <Checkbox value="design">
            <Checkbox.Content>
              <Checkbox.Control>
                <Checkbox.Indicator />
              </Checkbox.Control>
              设计
            </Checkbox.Content>
          </Checkbox>
          <Checkbox value="writing">
            <Checkbox.Content>
              <Checkbox.Control>
                <Checkbox.Indicator />
              </Checkbox.Control>
              写作
            </Checkbox.Content>
          </Checkbox>
        </CheckboxGroup>
      </div>
    </div>
  );
}
