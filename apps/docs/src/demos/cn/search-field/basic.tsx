import {Label, SearchField} from "@heroui/react";

export function Basic() {
  return (
    <SearchField name="search">
      <Label>搜索</Label>
      <SearchField.Group>
        <SearchField.SearchIcon />
        <SearchField.Input className="w-[280px]" placeholder="搜索…" />
        <SearchField.ClearButton />
      </SearchField.Group>
    </SearchField>
  );
}
