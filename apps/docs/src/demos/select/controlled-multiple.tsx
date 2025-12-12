"use client";

import type {Key} from "@heroui/react";

import {Label, ListBox, Select} from "@heroui/react";
import React from "react";

export function ControlledMultiple() {
  const [selected, setSelected] = React.useState<Key[]>(["california", "texas"]);

  return (
    <div className="space-y-4">
      <Select
        className="w-[256px]"
        placeholder="Select states"
        selectionMode="multiple"
        value={selected}
        onChange={(keys) => setSelected(keys as Key[])}
      >
        <Label>States (controlled multiple)</Label>
        <Select.Trigger>
          <Select.Value />
          <Select.Indicator />
        </Select.Trigger>
        <Select.Popover>
          <ListBox selectionMode="multiple">
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
        </Select.Popover>
      </Select>
      <p className="text-sm text-muted">
        Selected: {selected.length > 0 ? selected.join(", ") : "None"}
      </p>
    </div>
  );
}
