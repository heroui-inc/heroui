"use client";

import {ComboBox, Input, Label, ListBox} from "@heroui/react";

export function WithDisabledOptions() {
  return (
    <ComboBox className="w-[256px]" disabledKeys={["cat", "kangaroo"]}>
      <Label>动物</Label>
      <ComboBox.InputGroup>
        <Input placeholder="搜索动物…" />
        <ComboBox.Trigger />
      </ComboBox.InputGroup>
      <ComboBox.Popover>
        <ListBox>
          <ListBox.Item id="dog" textValue="狗">
            狗
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="cat" textValue="猫">
            猫
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="bird" textValue="鸟">
            鸟
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="kangaroo" textValue="袋鼠">
            袋鼠
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="elephant" textValue="象">
            象
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="tiger" textValue="老虎">
            老虎
            <ListBox.ItemIndicator />
          </ListBox.Item>
        </ListBox>
      </ComboBox.Popover>
    </ComboBox>
  );
}
