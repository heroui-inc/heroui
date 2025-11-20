"use client";

import {ComboBox, Input, Label, ListBox} from "@heroui/react";
import {useState} from "react";

export function ControlledInputValue() {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="space-y-2">
      <ComboBox className="w-[256px]" inputValue={inputValue} onInputChange={setInputValue}>
        <Label>Search (controlled input)</Label>
        <ComboBox.InputGroup>
          <Input placeholder="Type to search..." />
          <ComboBox.Trigger />
        </ComboBox.InputGroup>
        <ComboBox.Popover>
          <ListBox>
            <ListBox.Item id="aardvark" textValue="Aardvark">
              Aardvark
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item id="cat" textValue="Cat">
              Cat
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item id="dog" textValue="Dog">
              Dog
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item id="kangaroo" textValue="Kangaroo">
              Kangaroo
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item id="panda" textValue="Panda">
              Panda
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item id="snake" textValue="Snake">
              Snake
              <ListBox.ItemIndicator />
            </ListBox.Item>
          </ListBox>
        </ComboBox.Popover>
      </ComboBox>
      <p className="text-muted text-sm">Input value: {inputValue || "(empty)"}</p>
    </div>
  );
}
