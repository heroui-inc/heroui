"use client";

import {Autocomplete, EmptyState, Label, ListBox, SearchField, useFilter} from "@heroui/react";

export function AllowsEmptyCollection() {
  const {contains} = useFilter({sensitivity: "base"});

  return (
    <Autocomplete
      allowsEmptyCollection
      className="w-[256px]"
      placeholder="Select one"
      selectionMode="single"
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
          <ListBox renderEmptyState={() => <EmptyState>No results found</EmptyState>} />
        </Autocomplete.Filter>
      </Autocomplete.Popover>
    </Autocomplete>
  );
}
