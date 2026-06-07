"use client";

import type {Key} from "@heroui/react";

import {Autocomplete, EmptyState, Label, ListBox, SearchField, useFilter} from "@heroui/react";
import {useState} from "react";

export function WithDisabledOptions() {
  const [selectedKey, setSelectedKey] = useState<Key | null>(null);
  const {contains} = useFilter({sensitivity: "base"});

  return (
    <Autocomplete
      className="w-[256px]"
      disabledKeys={["cat", "kangaroo"]}
      placeholder="选择一种动物"
      selectionMode="single"
      value={selectedKey}
      onChange={setSelectedKey}
    >
      <Label>动物</Label>
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
            <ListBox.Item id="dog" textValue="狗">
              狗
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item id="cat" textValue="猫">
              猫
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item id="bird" textValue="鸟">
              鸟
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item id="kangaroo" textValue="袋鼠">
              袋鼠
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item id="elephant" textValue="象">
              象
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item id="tiger" textValue="老虎">
              老虎
              <ListBox.ItemIndicator />
            </ListBox.Item>
          </ListBox>
        </Autocomplete.Filter>
      </Autocomplete.Popover>
    </Autocomplete>
  );
}
