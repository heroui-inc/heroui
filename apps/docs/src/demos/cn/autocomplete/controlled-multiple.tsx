"use client";

import type {Key} from "@heroui/react";

import {Autocomplete, EmptyState, Label, ListBox, SearchField, useFilter} from "@heroui/react";
import {useState} from "react";

export function ControlledMultiple() {
  const [selected, setSelected] = useState<Key[]>(["california", "texas"]);
  const {contains} = useFilter({sensitivity: "base"});

  const items = [
    {id: "california", name: "California"},
    {id: "texas", name: "Texas"},
    {id: "florida", name: "Florida"},
    {id: "new-york", name: "New York"},
    {id: "illinois", name: "Illinois"},
    {id: "pennsylvania", name: "Pennsylvania"},
  ];

  return (
    <div className="space-y-2">
      <Autocomplete
        className="w-[256px]"
        placeholder="选择州"
        selectionMode="multiple"
        value={selected}
        onChange={(keys) => setSelected(keys as Key[])}
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
      </Autocomplete>
      <p className="text-sm text-muted">已选：{selected.length > 0 ? selected.join(", ") : "无"}</p>
    </div>
  );
}
