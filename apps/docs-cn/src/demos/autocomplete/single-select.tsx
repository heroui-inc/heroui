"use client";

import type {Key} from "@heroui/react";

import {Autocomplete, EmptyState, Label, ListBox, SearchField, useFilter} from "@heroui/react";
import {useState} from "react";

export default function SingleSelect() {
  const {contains} = useFilter({sensitivity: "base"});

  const [selectedKey, setSelectedKey] = useState<Key | null>(null);

  const items = [
    {id: "cat", name: "猫"},
    {id: "dog", name: "狗"},
    {id: "elephant", name: "象"},
    {id: "lion", name: "狮子"},
    {id: "tiger", name: "老虎"},
    {id: "giraffe", name: "长颈鹿"},
  ];

  return (
    <Autocomplete
      className="w-[256px]"
      placeholder="选择一种动物"
      selectionMode="single"
      value={selectedKey}
      onChange={setSelectedKey}
    >
      <Label>最喜欢的动物</Label>
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
              <SearchField.Input placeholder="搜索动物…" />
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
  );
}
