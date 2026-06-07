"use client";

import {Autocomplete, EmptyState, Label, ListBox, SearchField, useFilter} from "@heroui/react";

export function AllowsEmptyCollection() {
  const {contains} = useFilter({sensitivity: "base"});

  return (
    <Autocomplete
      allowsEmptyCollection
      className="w-[256px]"
      placeholder="请选择一项"
      selectionMode="single"
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
          <ListBox renderEmptyState={() => <EmptyState>未找到结果</EmptyState>} />
        </Autocomplete.Filter>
      </Autocomplete.Popover>
    </Autocomplete>
  );
}
