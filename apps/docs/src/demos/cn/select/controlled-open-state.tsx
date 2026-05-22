"use client";

import {Button, Label, ListBox, Select} from "@heroui/react";
import {useState} from "react";

export function ControlledOpenState() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-4">
      <Select className="w-[256px]" isOpen={isOpen} placeholder="请选择" onOpenChange={setIsOpen}>
        <Label>州</Label>
        <Select.Trigger>
          <Select.Value />
          <Select.Indicator />
        </Select.Trigger>
        <Select.Popover>
          <ListBox>
            <ListBox.Item id="florida" textValue="佛罗里达">
              佛罗里达
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item id="delaware" textValue="特拉华">
              特拉华
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item id="california" textValue="加利福尼亚">
              加利福尼亚
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item id="texas" textValue="德克萨斯">
              德克萨斯
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item id="new-york" textValue="纽约">
              纽约
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item id="washington" textValue="华盛顿">
              华盛顿
              <ListBox.ItemIndicator />
            </ListBox.Item>
          </ListBox>
        </Select.Popover>
      </Select>
      <Button onPress={() => setIsOpen(!isOpen)}>{isOpen ? "关闭" : "打开"}选择框</Button>
      <p className="text-sm text-muted">选择框{isOpen ? "已打开" : "已关闭"}</p>
    </div>
  );
}
