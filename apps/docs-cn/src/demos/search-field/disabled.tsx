import {Description, Label, SearchField} from "@heroui/react";

export function Disabled() {
  return (
    <div className="flex flex-col gap-4">
      <SearchField isDisabled name="search" value="已禁用的搜索">
        <Label>搜索</Label>
        <SearchField.Group>
          <SearchField.SearchIcon />
          <SearchField.Input className="w-[280px]" placeholder="搜索…" />
          <SearchField.ClearButton />
        </SearchField.Group>
        <Description>此搜索框已禁用</Description>
      </SearchField>
      <SearchField isDisabled name="search-empty">
        <Label>搜索</Label>
        <SearchField.Group>
          <SearchField.SearchIcon />
          <SearchField.Input className="w-[280px]" placeholder="搜索…" />
          <SearchField.ClearButton />
        </SearchField.Group>
        <Description>此搜索框已禁用</Description>
      </SearchField>
    </div>
  );
}
