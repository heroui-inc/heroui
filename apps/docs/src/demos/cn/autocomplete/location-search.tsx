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

interface City {
  name: string;
  country: string;
}

export function LocationSearch() {
  const allCities: City[] = [
    {country: "美国", name: "纽约"},
    {country: "美国", name: "洛杉矶"},
    {country: "美国", name: "芝加哥"},
    {country: "英国", name: "伦敦"},
    {country: "法国", name: "巴黎"},
    {country: "日本", name: "东京"},
    {country: "澳大利亚", name: "悉尼"},
    {country: "加拿大", name: "多伦多"},
    {country: "德国", name: "柏林"},
    {country: "西班牙", name: "马德里"},
  ];

  const [selectedKey, setSelectedKey] = useState<Key | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const {contains} = useFilter({sensitivity: "base"});

  // Simulate async filtering
  const customFilter = (text: string, inputValue: string) => {
    if (!inputValue) return true;
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 300);

    return contains(text, inputValue);
  };

  return (
    <Autocomplete
      className="w-[256px]"
      placeholder="搜索城市"
      selectionMode="single"
      value={selectedKey}
      onChange={setSelectedKey}
    >
      <Label>城市</Label>
      <Autocomplete.Trigger>
        <Autocomplete.Value />
        <Autocomplete.ClearButton />
        <Autocomplete.Indicator />
      </Autocomplete.Trigger>
      <Autocomplete.Popover>
        <Autocomplete.Filter filter={customFilter}>
          <SearchField autoFocus name="search" variant="secondary">
            <SearchField.Group>
              <SearchField.SearchIcon />
              <SearchField.Input placeholder="搜索城市…" />
              <SearchField.ClearButton />
            </SearchField.Group>
          </SearchField>
          <ListBox
            renderEmptyState={() => <EmptyState>{isLoading ? "搜索中…" : "未找到城市"}</EmptyState>}
          >
            {allCities.map((city) => (
              <ListBox.Item
                key={city.name}
                id={city.name}
                textValue={`${city.name} ${city.country}`}
              >
                <div className="flex flex-col">
                  <Label>{city.name}</Label>
                  <Description>{city.country}</Description>
                </div>
                <ListBox.ItemIndicator />
              </ListBox.Item>
            ))}
          </ListBox>
        </Autocomplete.Filter>
      </Autocomplete.Popover>
    </Autocomplete>
  );
}
