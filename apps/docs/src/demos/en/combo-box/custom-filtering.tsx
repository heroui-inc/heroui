"use client";

import {ComboBox, Input, Label, ListBox} from "@heroui/react";

export function CustomFiltering() {
  const animals = [
    {id: "cat", name: "Cat"},
    {id: "dog", name: "Dog"},
    {id: "bird", name: "Bird"},
    {id: "fish", name: "Fish"},
    {id: "hamster", name: "Hamster"},
  ];

  return (
    <ComboBox
      className="w-[256px]"
      defaultFilter={(text, inputValue) => {
        if (!inputValue) return true;

        return text.toLowerCase().includes(inputValue.toLowerCase());
      }}
    >
      <Label>Animal (custom filter)</Label>
      <ComboBox.InputGroup>
        <Input placeholder="Search animals..." />
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
