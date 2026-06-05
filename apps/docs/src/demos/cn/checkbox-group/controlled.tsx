"use client";

import {Checkbox, CheckboxGroup, Label} from "@heroui/react";
import {useState} from "react";

export function Controlled() {
  const [selected, setSelected] = useState(["coding", "design"]);

  return (
    <CheckboxGroup className="min-w-[320px]" name="skills" value={selected} onChange={setSelected}>
      <Label>你的技能</Label>
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
      <Label className="my-4 text-sm text-muted">已选：{selected.join(", ") || "无"}</Label>
    </CheckboxGroup>
  );
}
