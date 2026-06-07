import {Description, Label, SearchField, Surface} from "@heroui/react";

export function OnSurface() {
  return (
    <Surface className="flex w-full max-w-sm flex-col gap-4 rounded-3xl p-6">
      <SearchField name="search" variant="secondary">
        <Label>搜索</Label>
        <SearchField.Group>
          <SearchField.SearchIcon />
          <SearchField.Input className="w-full" placeholder="搜索…" />
          <SearchField.ClearButton />
        </SearchField.Group>
        <Description>输入关键词进行搜索</Description>
      </SearchField>
      <SearchField name="search-2" variant="secondary">
        <Label>高级搜索</Label>
        <SearchField.Group>
          <SearchField.SearchIcon />
          <SearchField.Input className="w-full" placeholder="高级搜索…" />
          <SearchField.ClearButton />
        </SearchField.Group>
        <Description>使用筛选条件细化搜索</Description>
      </SearchField>
    </Surface>
  );
}
