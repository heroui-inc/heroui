"use client";

import type {Key} from "@heroui/react";

import {Autocomplete, Label, ListBox, SearchField, useFilter} from "@heroui/react";
import {useState} from "react";

export function Controlled() {
  const states = [
    {id: "california", name: "California"},
    {id: "texas", name: "Texas"},
    {id: "florida", name: "Florida"},
    {id: "new-york", name: "New York"},
    {id: "illinois", name: "Illinois"},
    {id: "pennsylvania", name: "Pennsylvania"},
  ];

  const [state, setState] = useState<Key | null>("california");
  const {contains} = useFilter({sensitivity: "base"});

  const selectedState = states.find((s) => s.id === state);

  return (
    <div className="space-y-2">
      <Autocomplete
        className="w-[256px]"
        placeholder="Select a state"
        selectionMode="single"
        value={state}
        onChange={(value) => setState(value)}
      >
        <Label>State (controlled)</Label>
        <Autocomplete.Trigger>
          <Autocomplete.Value />
          <Autocomplete.Indicator />
        </Autocomplete.Trigger>
        <Autocomplete.Popover>
          <Autocomplete.Filter filter={contains}>
            <SearchField autoFocus name="search">
              <SearchField.Group>
                <SearchField.SearchIcon />
                <SearchField.Input placeholder="Search states..." />
                <SearchField.ClearButton />
              </SearchField.Group>
            </SearchField>
            <ListBox>
              {states.map((state) => (
                <ListBox.Item key={state.id} id={state.id} textValue={state.name}>
                  {state.name}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </Autocomplete.Filter>
        </Autocomplete.Popover>
      </Autocomplete>
      <p className="text-sm text-muted">Selected: {selectedState?.name || "None"}</p>
    </div>
  );
}
