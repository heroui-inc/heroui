"use client";

import {Autocomplete, EmptyState, Label, ListBox, SearchField, Spinner} from "@heroui/react";
import {useAsyncList} from "@react-stately/data";
import {cn} from "tailwind-variants";

interface Character {
  name: string;
}

export function AsynchronousFiltering() {
  const list = useAsyncList<Character>({
    async load({filterText, signal}) {
      const res = await fetch(`https://swapi.py4e.com/api/people/?search=${filterText}`, {
        signal,
      });

      const json = await res.json();

      return {
        items: json.results,
      };
    },
  });

  return (
    <Autocomplete className="w-[256px]" placeholder="Search..." selectionMode="single">
      <Label>Search a Star Wars characters</Label>
      <Autocomplete.Trigger>
        <Autocomplete.Value />
        <Autocomplete.ClearButton />
        <Autocomplete.Indicator />
      </Autocomplete.Trigger>
      <Autocomplete.Popover>
        <Autocomplete.Filter inputValue={list.filterText} onInputChange={list.setFilterText}>
          <SearchField autoFocus className="sticky top-0 z-10" name="search" variant="secondary">
            <SearchField.Group>
              <SearchField.SearchIcon />
              <SearchField.Input placeholder="Search characters..." />
              <Spinner
                size="sm"
                className={cn("absolute top-1/2 right-2 -translate-y-1/2", {
                  "pointer-events-none opacity-0": !list.isLoading,
                })}
              />
              <SearchField.ClearButton
                className={cn({"pointer-events-none opacity-0": !!list.isLoading})}
              />
            </SearchField.Group>
          </SearchField>
          <ListBox
            className="max-h-[420px] overflow-y-auto"
            items={list.items}
            renderEmptyState={() => <EmptyState>No results found</EmptyState>}
          >
            {(item: Character) => (
              <ListBox.Item id={item.name} textValue={item.name}>
                {item.name}
                <ListBox.ItemIndicator />
              </ListBox.Item>
            )}
          </ListBox>
        </Autocomplete.Filter>
      </Autocomplete.Popover>
    </Autocomplete>
  );
}
