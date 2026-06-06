"use client";

import {Checkbox, CheckboxGroup, Label} from "@heroui/react";
import {useState} from "react";

export function Controlled() {
  const [selected, setSelected] = useState(["coding", "design"]);

  return (
    <CheckboxGroup className="min-w-[320px]" name="skills" value={selected} onChange={setSelected}>
      <Label>你的技能</Label>
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
      <Label className="my-4 text-sm text-muted">已选：{selected.join(", ") || "无"}</Label>
    </CheckboxGroup>
  );
}
