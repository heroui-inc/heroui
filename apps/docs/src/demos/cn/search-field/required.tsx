import {Description, Label, SearchField} from "@heroui/react";

export function Required() {
  return (
    <div className="flex flex-col gap-4">
      <SearchField isRequired name="search">
        <Label>搜索</Label>
        <SearchField.Group>
          <SearchField.SearchIcon />
          <SearchField.Input className="w-[280px]" placeholder="搜索…" />
          <SearchField.ClearButton />
        </SearchField.Group>
      </SearchField>
      <SearchField isRequired name="search-query">
        <Label>搜索内容</Label>
        <SearchField.Group>
          <SearchField.SearchIcon />
          <SearchField.Input className="w-[280px]" placeholder="输入搜索内容…" />
          <SearchField.ClearButton />
        </SearchField.Group>
        <Description>至少需要 3 个字符</Description>
      </SearchField>
    </div>
  );
}
