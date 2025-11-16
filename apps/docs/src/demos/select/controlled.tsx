"use client";

import type {Key} from "react-aria-components";

import {Label, ListBox, Select} from "@heroui/react";
import {useState} from "react";

export function Controlled() {
  const states = [
    {
      id: "california",
      name: "California",
    },
    {
      id: "texas",
      name: "Texas",
    },
    {
      id: "florida",
      name: "Florida",
    },
    {
      id: "new-york",
      name: "New York",
    },
    {
      id: "illinois",
      name: "Illinois",
    },
    {
      id: "pennsylvania",
      name: "Pennsylvania",
    },
  ];

  const [state, setState] = useState<Key | null>("california");

  const selectedState = states.find((s) => s.id === state);

  return (
    <div className="space-y-2">
      <Select
        className="w-[256px]"
        placeholder="Select a state"
        value={state}
        onChange={(value) => setState(value)}
      >
        <Label>State (controlled)</Label>
        <Select.Trigger>
          <Select.Value />
          <Select.Indicator />
        </Select.Trigger>
        <Select.Popover>
          <ListBox>
            {states.map((state) => (
              <ListBox.Item key={state.id} id={state.id} textValue={state.name}>
                {state.name}
                <ListBox.ItemIndicator />
              </ListBox.Item>
            ))}
          </ListBox>
        </Select.Popover>
      </Select>
      <p className="text-muted text-sm">Selected: {selectedState?.name || "None"}</p>
    </div>
  );
}
