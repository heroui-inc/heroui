"use client";

import type {Key} from "@heroui/react";

import {
  Autocomplete,
  Description,
  EmptyState,
  Label,
  ListBox,
  SearchField,
  useFilter,
} from "@heroui/react";
import {useState} from "react";

export function WithDescription() {
  const [selectedKey, setSelectedKey] = useState<Key | null>(null);
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
    <Autocomplete
      className="w-[256px]"
      placeholder="请选择一项"
      selectionMode="single"
      value={selectedKey}
      onChange={setSelectedKey}
    >
      <Label>州</Label>
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
              <SearchField.Input placeholder="搜索州名…" />
              <SearchField.ClearButton />
            </SearchField.Group>
          </SearchField>
          <ListBox renderEmptyState={() => <EmptyState>未找到结果</EmptyState>}>
            {items.map((item) => (
              <ListBox.Item key={item.id} id={item.id} textValue={item.name}>
                {item.name}
                <ListBox.ItemIndicator />
              </ListBox.Item>
            ))}
          </ListBox>
        </Autocomplete.Filter>
      </Autocomplete.Popover>
      <Description>请选择你的居住州</Description>
    </Autocomplete>
  );
}
