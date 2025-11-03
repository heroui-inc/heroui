"use client";

import {Button, Label, ListBox, Select} from "@heroui/react";
import {useState} from "react";

export function ControlledOpenState() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-4">
      <Select
        className="w-[256px]"
        isOpen={isOpen}
        placeholder="Select one"
        onOpenChange={setIsOpen}
      >
        <Label>State</Label>
        <Select.Trigger>
          <Select.Value />
          <Select.Indicator />
        </Select.Trigger>
        <Select.Content>
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
        </Select.Content>
      </Select>
      <Button onPress={() => setIsOpen(!isOpen)}>{isOpen ? "Close" : "Open"} Select</Button>
      <p className="text-sm text-neutral-500">Select is {isOpen ? "open" : "closed"}</p>
    </div>
  );
}
