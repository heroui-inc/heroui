"use client";

import {Autocomplete, Button, Label, ListBox, SearchField, useFilter} from "@heroui/react";
import {useState} from "react";

export function ControlledOpenState() {
  const [isOpen, setIsOpen] = useState(false);
  const {contains} = useFilter({sensitivity: "base"});

  const items = [
    {id: "florida", name: "Florida"},
    {id: "delaware", name: "Delaware"},
    {id: "california", name: "California"},
    {id: "texas", name: "Texas"},
    {id: "new-york", name: "New York"},
    {id: "washington", name: "Washington"},
  ];

  return (
    <div className="space-y-4">
      <Autocomplete
        className="w-[256px]"
        isOpen={isOpen}
        placeholder="Select one"
        selectionMode="single"
        onOpenChange={setIsOpen}
      >
        <Label>State</Label>
        <Autocomplete.Trigger>
          <Autocomplete.Value />
          <Autocomplete.ClearButton />
          <Autocomplete.Indicator />
        </Autocomplete.Trigger>
        <Autocomplete.Popover>
          <Autocomplete.Filter filter={contains}>
            <SearchField autoFocus name="search" variant="secondary">
              <SearchField.Group>
                <SearchField.SearchIcon />
                <SearchField.Input placeholder="Search states..." />
                <SearchField.ClearButton />
              </SearchField.Group>
            </SearchField>
            <ListBox>
              {items.map((item) => (
                <ListBox.Item key={item.id} id={item.id} textValue={item.name}>
                  {item.name}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </Autocomplete.Filter>
        </Autocomplete.Popover>
      </Autocomplete>
      <Button onPress={() => setIsOpen(!isOpen)}>{isOpen ? "Close" : "Open"} Autocomplete</Button>
      <p className="text-sm text-muted">Autocomplete is {isOpen ? "open" : "closed"}</p>
    </div>
  );
}
