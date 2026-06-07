"use client";

import {Autocomplete, EmptyState, Label, ListBox, SearchField, useFilter} from "@heroui/react";

export function Disabled() {
  const {contains} = useFilter({sensitivity: "base"});

  const items = [
    {id: "florida", name: "Florida"},
    {id: "delaware", name: "Delaware"},
    {id: "california", name: "California"},
    {id: "texas", name: "Texas"},
    {id: "new-york", name: "New York"},
    {id: "washington", name: "Washington"},
  ];

  const countries = [
    {id: "argentina", name: "Argentina"},
    {id: "venezuela", name: "Venezuela"},
    {id: "japan", name: "Japan"},
    {id: "france", name: "France"},
    {id: "italy", name: "Italy"},
    {id: "spain", name: "Spain"},
  ];

  return (
    <div className="flex flex-col gap-4">
      <Autocomplete
        isDisabled
        className="w-[256px]"
        defaultValue="california"
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
      <Autocomplete
        isDisabled
        className="w-[256px]"
        defaultValue={["argentina", "japan", "france"]}
        placeholder="选择国家"
        selectionMode="multiple"
      >
        <Label>计划前往的国家</Label>
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
                <SearchField.Input placeholder="搜索国家…" />
                <SearchField.ClearButton />
              </SearchField.Group>
            </SearchField>
            <ListBox renderEmptyState={() => <EmptyState>未找到结果</EmptyState>}>
              {countries.map((country) => (
                <ListBox.Item key={country.id} id={country.id} textValue={country.name}>
                  {country.name}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </Autocomplete.Filter>
        </Autocomplete.Popover>
      </Autocomplete>
    </div>
  );
}
