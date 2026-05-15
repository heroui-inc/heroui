"use client";

import {ComboBox, Description, Input, Label, ListBox} from "@heroui/react";

export function MenuTrigger() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-muted">聚焦（默认）</p>
        <ComboBox className="w-[256px]" menuTrigger="focus">
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
          <Description>输入框获得焦点时打开弹出层</Description>
        </ComboBox>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-muted">输入</p>
        <ComboBox className="w-[256px]" menuTrigger="input">
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
          <Description>用户编辑输入文本时打开弹出层</Description>
        </ComboBox>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-muted">手动</p>
        <ComboBox className="w-[256px]" menuTrigger="manual">
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
          <Description>仅在按下触发按钮或使用方向键时打开弹出层</Description>
        </ComboBox>
      </div>
    </div>
  );
}
