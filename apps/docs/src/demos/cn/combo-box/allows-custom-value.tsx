"use client";

import {ComboBox, Description, Input, Label, ListBox} from "@heroui/react";

export function AllowsCustomValue() {
  return (
    <ComboBox allowsCustomValue className="w-[256px]">
      <Label>最喜欢的动物</Label>
      <ComboBox.InputGroup>
        <Input placeholder="搜索或输入动物…" />
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
      <Description>可输入任意动物名称，即使不在列表中</Description>
    </ComboBox>
  );
}
