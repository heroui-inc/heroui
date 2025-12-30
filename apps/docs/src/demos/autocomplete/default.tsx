"use client";

import type {Key} from "@heroui/react";

import {Autocomplete, Label, ListBox, SearchField, Tag, TagGroup, useFilter} from "@heroui/react";
import {useRef, useState} from "react";

export default function AutocompleteDefault() {
  const triggerRef = useRef<HTMLDivElement | null>(null);

  const {contains} = useFilter({sensitivity: "base"});

  const [selectedKeys, setSelectedKeys] = useState<Key[]>([]);

  const items = [
    {id: "california", name: "California"},
    {id: "texas", name: "Texas"},
    {id: "florida", name: "Florida"},
    {id: "new-york", name: "New York"},
    {id: "illinois", name: "Illinois"},
    {id: "pennsylvania", name: "Pennsylvania"},
  ];

  const onRemoveTags = (keys: Set<Key>) => {
    setSelectedKeys((prev) => prev.filter((key) => !keys.has(key)));
  };

  return (
    <Autocomplete
      className="w-[256px]"
      placeholder="Select countries"
      selectionMode="multiple"
      value={selectedKeys}
      onChange={(keys: Key | Key[] | null) => setSelectedKeys(keys as Key[])}
    >
      <Label>Countries to Visit</Label>
      <Autocomplete.Group ref={triggerRef}>
        <Autocomplete.Value>
          {({defaultChildren, isPlaceholder, state}: any) => {
            if (isPlaceholder || state.selectedItems.length === 0) {
              return defaultChildren;
            }

            const selectedItemsKeys = state.selectedItems.map((item: any) => item.key);

            return (
              <TagGroup onRemove={onRemoveTags}>
                <TagGroup.List className="flex flex-wrap gap-1">
                  {selectedItemsKeys.map((selectedItemKey: Key) => {
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
        </Autocomplete.Value>
        <Autocomplete.Indicator />
      </Autocomplete.Group>
      <Autocomplete.Popover className="w-[256px]" triggerRef={triggerRef}>
        <Autocomplete.Filter filter={contains}>
          <SearchField name="search">
            <SearchField.Group>
              <SearchField.SearchIcon />
              <SearchField.Input className="w-70" placeholder="Search..." />
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
