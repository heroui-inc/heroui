"use client";

import type {Key} from "@heroui/react";

import {ComboBox, Input, Label, ListBox} from "@heroui/react";
import {useState} from "react";

export function Controlled() {
  const animals = [
    {
      id: "cat",
      name: "猫",
    },
    {
      id: "dog",
      name: "狗",
    },
    {
      id: "bird",
      name: "鸟",
    },
    {
      id: "fish",
      name: "鱼",
    },
    {
      id: "hamster",
      name: "仓鼠",
    },
  ];

  const [selectedKey, setSelectedKey] = useState<Key | null>("cat");

  const selectedAnimal = animals.find((a) => a.id === selectedKey);

  return (
    <div className="space-y-2">
      <ComboBox
        className="w-[256px]"
        selectedKey={selectedKey}
        onSelectionChange={(key) => setSelectedKey(key)}
      >
        <Label>动物（受控）</Label>
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
      <p className="text-sm text-muted">已选：{selectedAnimal?.name || "无"}</p>
    </div>
  );
}
