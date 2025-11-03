"use client";

import type {Selection} from "@react-types/shared";

import {Label, ListBox, Select} from "@heroui/react";
import {useState} from "react";

export function ControlledMultiple() {
  const [selected, setSelected] = useState<Selection>(new Set(["california", "texas"]));

  const selectedItems = Array.from(selected);

  return (
    <div className="space-y-4">
      <Select className="w-[256px]" placeholder="Select states" selectionMode="multiple">
        <Label>States (controlled multiple)</Label>
        <Select.Trigger>
          <Select.Value />
          <Select.Indicator />
        </Select.Trigger>
        <Select.Content>
          <ListBox
            selectedKeys={selected}
            selectionMode="multiple"
            onSelectionChange={(keys) => setSelected(keys as Selection)}
          >
            <ListBox.Item id="california" textValue="California">
              California
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item id="texas" textValue="Texas">
              Texas
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item id="florida" textValue="Florida">
              Florida
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item id="new-york" textValue="New York">
              New York
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item id="illinois" textValue="Illinois">
              Illinois
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item id="pennsylvania" textValue="Pennsylvania">
              Pennsylvania
              <ListBox.ItemIndicator />
            </ListBox.Item>
          </ListBox>
        </Select.Content>
      </Select>
      <p className="text-sm text-neutral-500">
        Selected: {selectedItems.length > 0 ? selectedItems.join(", ") : "None"}
      </p>
    </div>
  );
}
