"use client";

import type {Key} from "react-aria-components";

import {Label, ListBox, Select} from "@heroui/react";
import {useState} from "react";

export function WithClearButton() {
  const [selectedKey, setSelectedKey] = useState<Key | null>(null);

  return (
    <Select
      className="w-[256px]"
      placeholder="Select one"
      value={selectedKey}
      onChange={setSelectedKey}
    >
      <Label>State</Label>
      <Select.Trigger>
        <Select.Value />
        <Select.ClearButton />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover>
        <ListBox>
          <ListBox.Item id="florida" textValue="Florida">
            Florida
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="delaware" textValue="Delaware">
            Delaware
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="california" textValue="California">
            California
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="texas" textValue="Texas">
            Texas
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="new-york" textValue="New York">
            New York
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="washington" textValue="Washington">
            Washington
            <ListBox.ItemIndicator />
          </ListBox.Item>
        </ListBox>
      </Select.Popover>
    </Select>
  );
}
