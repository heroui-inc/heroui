"use client";

import {ComboBox, Input, Label, ListBox} from "@heroui/react";

export function CustomFiltering() {
  const animals = [
    {id: "cat", name: "猫"},
    {id: "dog", name: "狗"},
    {id: "bird", name: "鸟"},
    {id: "fish", name: "鱼"},
    {id: "hamster", name: "仓鼠"},
  ];

  return (
    <ComboBox
      className="w-[256px]"
      defaultFilter={(text, inputValue) => {
        if (!inputValue) return true;

        return text.toLowerCase().includes(inputValue.toLowerCase());
      }}
    >
      <Label>动物（自定义筛选）</Label>
      <ComboBox.InputGroup>
        <Input placeholder="搜索动物…" />
        <ComboBox.Trigger />
      </ComboBox.InputGroup>
      <ComboBox.Popover>
        <ListBox>
          {animals.map((animal) => (
            <ListBox.Item key={animal.id} id={animal.id} textValue={animal.name}>
              {animal.name}
              <ListBox.ItemIndicator />
            </ListBox.Item>
          ))}
        </ListBox>
      </ComboBox.Popover>
    </ComboBox>
  );
}
