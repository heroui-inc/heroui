"use client";

import {Button, ComboBox, FieldError, Form, Input, Label, ListBox, Surface} from "@heroui/react";

export function OnSurface() {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: Record<string, string> = {};

    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    alert("表单提交成功！");
  };

  return (
    <Surface className="w-[320px] rounded-3xl p-6">
      <Form className="flex w-full flex-col gap-4" onSubmit={onSubmit}>
        <ComboBox isRequired className="w-full" name="animal" variant="secondary">
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
          <FieldError />
        </ComboBox>
        <Button type="submit">提交</Button>
      </Form>
    </Surface>
  );
}
