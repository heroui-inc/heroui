"use client";

import {Label, ListBox, SearchField, Select, Tag, TagGroup} from "@heroui/react";
import {Autocomplete, useFilter} from "react-aria-components";

const items = [
  {id: "california", name: "California"},
  {id: "texas", name: "Texas"},
  {id: "florida", name: "Florida"},
  {id: "new-york", name: "New York"},
  {id: "illinois", name: "Illinois"},
  {id: "pennsylvania", name: "Pennsylvania"},
];

export function WithAutocomplete() {
  const {contains} = useFilter({sensitivity: "base"});

  return (
    <Select className="w-[256px]" placeholder="Select countries" selectionMode="multiple">
      <Label>Countries to Visit</Label>
      <Select.Trigger>
        <Select.Value className="no-truncate flex flex-wrap gap-2">
          {({defaultChildren, isPlaceholder, state}) => {
            if (isPlaceholder || state.selectedItems.length === 0) {
              return defaultChildren;
            }

            const selectedItemsKeys = state.selectedItems.map((item) => item.key);

            return (
              <TagGroup>
                <TagGroup.List className="flex flex-wrap gap-1">
                  {selectedItemsKeys.map((selectedItemKey) => {
                    const item = items.find((s) => s.id === selectedItemKey);

                    if (!item) return null;

                    return (
                      <Tag key={item.id} id={item.id}>
                        {item.name}
                      </Tag>
                    );
                  })}
                </TagGroup.List>
              </TagGroup>
            );
          }}
        </Select.Value>
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover className="flex flex-col gap-1 p-2 pt-3">
        <Autocomplete filter={contains}>
          <SearchField name="search">
            <SearchField.Group>
              <SearchField.SearchIcon />
              <SearchField.Input className="w-[280px]" placeholder="Search..." />
            </SearchField.Group>
          </SearchField>
          <ListBox selectionMode="multiple">
            {items.map((item) => (
              <ListBox.Item key={item.id} id={item.id} textValue={item.name}>
                {item.name}
                <ListBox.ItemIndicator />
              </ListBox.Item>
            ))}
          </ListBox>
        </Autocomplete>
      </Select.Popover>
    </Select>
  );
}
