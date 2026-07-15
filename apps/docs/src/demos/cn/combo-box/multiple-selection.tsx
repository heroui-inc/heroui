"use client";

import {ComboBox, Input, Label, ListBox} from "@heroui/react";

export function MultipleSelection() {
  return (
    <ComboBox className="w-[256px]" selectionMode="multiple">
      <Label>最喜欢的动物</Label>
      <ComboBox.InputGroup>
        <Input placeholder="搜索动物…" />
        <ComboBox.Trigger />
      </ComboBox.InputGroup>
      <ComboBox.Value placeholder="未选择任何动物" />
      <ComboBox.Popover>
        <ListBox selectionMode="multiple">
          <ListBox.Item id="aardvark" textValue="土豚">
            土豚
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="cat" textValue="猫">
            猫
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="dog" textValue="狗">
            狗
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="kangaroo" textValue="袋鼠">
            袋鼠
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="panda" textValue="熊猫">
            熊猫
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="snake" textValue="蛇">
            蛇
            <ListBox.ItemIndicator />
          </ListBox.Item>
        </ListBox>
      </ComboBox.Popover>
    </ComboBox>
  );
}
