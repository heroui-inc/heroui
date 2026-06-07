"use client";

import type {Selection} from "@heroui/react";

import {Button, Dropdown, Header, Label} from "@heroui/react";
import {useState} from "react";

export function WithMultipleSelection() {
  const [selected, setSelected] = useState<Selection>(new Set(["apple"]));

  return (
    <Dropdown>
      <Button aria-label="菜单" variant="secondary">
        喜爱的水果
      </Button>
      <Dropdown.Popover className="min-w-[256px]">
        <Dropdown.Menu
          selectedKeys={selected}
          selectionMode="multiple"
          onSelectionChange={setSelected}
        >
          <Dropdown.Section>
            <Header>选择水果</Header>
            <Dropdown.Item id="apple" textValue="苹果">
              <Dropdown.ItemIndicator />
              <Label>苹果</Label>
            </Dropdown.Item>
            <Dropdown.Item id="banana" textValue="香蕉">
              <Dropdown.ItemIndicator />
              <Label>香蕉</Label>
            </Dropdown.Item>
            <Dropdown.Item id="cherry" textValue="樱桃">
              <Dropdown.ItemIndicator />
              <Label>樱桃</Label>
            </Dropdown.Item>
          </Dropdown.Section>
          <Dropdown.Item id="orange" textValue="橙子">
            <Dropdown.ItemIndicator />
            <Label>橙子</Label>
          </Dropdown.Item>
          <Dropdown.Item id="pear" textValue="梨">
            <Dropdown.ItemIndicator />
            <Label>梨</Label>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
}
