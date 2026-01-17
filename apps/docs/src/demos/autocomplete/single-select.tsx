"use client";

import type {Key} from "@heroui/react";

import {Autocomplete, Label, ListBox, SearchField, useFilter} from "@heroui/react";
import {useState} from "react";

export default function SingleSelect() {
  const {contains} = useFilter({sensitivity: "base"});

  const [selectedKey, setSelectedKey] = useState<Key | null>(null);

  const items = [
    {id: "cat", name: "Cat"},
    {id: "dog", name: "Dog"},
    {id: "elephant", name: "Elephant"},
    {id: "lion", name: "Lion"},
    {id: "tiger", name: "Tiger"},
    {id: "giraffe", name: "Giraffe"},
  ];

  return (
    <Autocomplete
      className="w-[256px]"
      placeholder="Select an animal"
      selectionMode="single"
      value={selectedKey}
      onChange={(key: Key | Key[] | null) => setSelectedKey(key as Key | null)}
    >
      <Label>Favorite Animal</Label>
      <Autocomplete.Trigger>
        <Autocomplete.Value />
        <Autocomplete.ClearButton />
        <Autocomplete.Indicator />
      </Autocomplete.Trigger>
      <Autocomplete.Popover>
        <Autocomplete.Filter filter={contains}>
          <SearchField autoFocus name="search">
            <SearchField.Group>
              <SearchField.SearchIcon />
              <SearchField.Input placeholder="Search animals..." />
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
  );
}
