"use client";

import {ComboBox, Input, Label, ListBox} from "@heroui/react";

export function DefaultSelectedKey() {
  return (
    <ComboBox className="w-[256px]" defaultSelectedKey="cat">
      <Label>最喜欢的动物</Label>
      <ComboBox.InputGroup>
        <Input placeholder="搜索动物…" />
        <ComboBox.Trigger />
      </ComboBox.InputGroup>
      <ComboBox.Popover>
        <ListBox>
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
