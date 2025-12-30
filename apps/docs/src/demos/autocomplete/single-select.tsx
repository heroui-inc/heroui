"use client";

import type {Key} from "@heroui/react";

import {Autocomplete, Label, ListBox, SearchField, useFilter} from "@heroui/react";
import {useRef, useState} from "react";

export default function AutocompleteSingleSelect() {
  const triggerRef = useRef<HTMLDivElement | null>(null);

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
      <Autocomplete.Group ref={triggerRef}>
        <Autocomplete.Value />
        <Autocomplete.Indicator />
      </Autocomplete.Group>
      <Autocomplete.Popover className="w-[256px]" triggerRef={triggerRef}>
        <Autocomplete.Filter filter={contains}>
          <SearchField name="search">
            <SearchField.Group>
              <SearchField.SearchIcon />
              <SearchField.Input className="w-70" placeholder="Search animals..." />
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
