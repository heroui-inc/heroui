"use client";

import type {Selection} from "@heroui/react";

import {Button, Dropdown, Header, Label} from "@heroui/react";
import {useState} from "react";

export function SingleWithCustomIndicator() {
  const [selected, setSelected] = useState<Selection>(new Set(["apple"]));

  const CustomCheckmarkIcon = (
    <svg height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg">
      <path
        className="text-accent"
        clipRule="evenodd"
        d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14m3.1-8.55a.75.75 0 1 0-1.2-.9L7.419 8.858L6.03 7.47a.75.75 0 0 0-1.06 1.06l2 2a.75.75 0 0 0 1.13-.08z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );

  return (
    <Dropdown>
      <Button aria-label="Menu" variant="secondary">
        Fruits
      </Button>
      <Dropdown.Content className="min-w-[256px]">
        <Dropdown.Menu
          selectedKeys={selected}
          selectionMode="single"
          onSelectionChange={setSelected}
        >
          <Dropdown.Section>
            <Header>Select a fruit</Header>
            <Dropdown.Item id="apple" textValue="Apple">
              <Dropdown.ItemIndicator>
                {({isSelected}) => (isSelected ? CustomCheckmarkIcon : null)}
              </Dropdown.ItemIndicator>
              <Label>Apple</Label>
            </Dropdown.Item>
            <Dropdown.Item id="banana" textValue="Banana">
              <Dropdown.ItemIndicator>
                {({isSelected}) => (isSelected ? CustomCheckmarkIcon : null)}
              </Dropdown.ItemIndicator>
              <Label>Banana</Label>
            </Dropdown.Item>
            <Dropdown.Item id="cherry" textValue="Cherry">
              <Dropdown.ItemIndicator>
                {({isSelected}) => (isSelected ? CustomCheckmarkIcon : null)}
              </Dropdown.ItemIndicator>
              <Label>Cherry</Label>
            </Dropdown.Item>
          </Dropdown.Section>
          <Dropdown.Item id="orange" textValue="Orange">
            <Dropdown.ItemIndicator>
              {({isSelected}) => (isSelected ? CustomCheckmarkIcon : null)}
            </Dropdown.ItemIndicator>
            <Label>Orange</Label>
          </Dropdown.Item>
          <Dropdown.Item id="pear" textValue="Pear">
            <Dropdown.ItemIndicator>
              {({isSelected}) => (isSelected ? CustomCheckmarkIcon : null)}
            </Dropdown.ItemIndicator>
            <Label>Pear</Label>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Content>
    </Dropdown>
  );
}
