"use client";

import {ComboBox, Input, Label, ListBox} from "@heroui/react";
import {useState} from "react";

export function ControlledInputValue() {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="space-y-2">
      <ComboBox className="w-[256px]" inputValue={inputValue} onInputChange={setInputValue}>
        <Label>搜索（受控输入）</Label>
        <ComboBox.InputGroup>
          <Input placeholder="输入以搜索…" />
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
      <p className="text-sm text-muted">输入值：{inputValue || "（空）"}</p>
    </div>
  );
}
