"use client";

import type {Key} from "@heroui/react";

import {Label, ListBox, Select} from "@heroui/react";
import {useState} from "react";

export function Controlled() {
  const states = [
    {
      id: "california",
      name: "加利福尼亚",
    },
    {
      id: "texas",
      name: "德克萨斯",
    },
    {
      id: "florida",
      name: "佛罗里达",
    },
    {
      id: "new-york",
      name: "纽约",
    },
    {
      id: "illinois",
      name: "伊利诺伊",
    },
    {
      id: "pennsylvania",
      name: "宾夕法尼亚",
    },
  ];

  const [state, setState] = useState<Key | null>("california");

  const selectedState = states.find((s) => s.id === state);

  return (
    <div className="space-y-2">
      <Select
        className="w-[256px]"
        placeholder="请选择州"
        value={state}
        onChange={(value) => setState(value)}
      >
        <Label>州（受控）</Label>
        <Select.Trigger>
          <Select.Value />
          <Select.Indicator />
        </Select.Trigger>
        <Select.Popover>
          <ListBox>
            {states.map((state) => (
              <ListBox.Item key={state.id} id={state.id} textValue={state.name}>
                {state.name}
                <ListBox.ItemIndicator />
              </ListBox.Item>
            ))}
          </ListBox>
        </Select.Popover>
      </Select>
      <p className="text-sm text-muted">已选：{selectedState?.name || "无"}</p>
    </div>
  );
}
