"use client";

import type {Key} from "@heroui/react";

import {Label, ListBox, Select} from "@heroui/react";
import React from "react";

export function ControlledMultiple() {
  const [selected, setSelected] = React.useState<Key[]>(["california", "texas"]);

  return (
    <div className="space-y-4">
      <Select
        className="w-[256px]"
        placeholder="请选择州"
        selectionMode="multiple"
        value={selected}
        onChange={(keys) => setSelected(keys as Key[])}
      >
        <Label>州（受控多选）</Label>
        <Select.Trigger>
          <Select.Value />
          <Select.Indicator />
        </Select.Trigger>
        <Select.Popover>
          <ListBox selectionMode="multiple">
            <ListBox.Item id="california" textValue="加利福尼亚">
              加利福尼亚
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item id="texas" textValue="德克萨斯">
              德克萨斯
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item id="florida" textValue="佛罗里达">
              佛罗里达
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item id="new-york" textValue="纽约">
              纽约
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item id="illinois" textValue="伊利诺伊">
              伊利诺伊
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item id="pennsylvania" textValue="宾夕法尼亚">
              宾夕法尼亚
              <ListBox.ItemIndicator />
            </ListBox.Item>
          </ListBox>
        </Select.Popover>
      </Select>
      <p className="text-sm text-muted">已选：{selected.length > 0 ? selected.join(", ") : "无"}</p>
    </div>
  );
}
