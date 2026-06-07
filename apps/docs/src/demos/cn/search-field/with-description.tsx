import {Description, Label, SearchField} from "@heroui/react";

export function WithDescription() {
  return (
    <div className="flex flex-col gap-4">
      <SearchField name="search">
        <Label>搜索产品</Label>
        <SearchField.Group>
          <SearchField.SearchIcon />
          <SearchField.Input className="w-[280px]" placeholder="搜索产品…" />
          <SearchField.ClearButton />
        </SearchField.Group>
        <Description>输入关键词进行搜索 for products</Description>
      </SearchField>
      <SearchField name="search-users">
        <Label>搜索用户</Label>
        <SearchField.Group>
          <SearchField.SearchIcon />
          <SearchField.Input className="w-[280px]" placeholder="搜索用户…" />
          <SearchField.ClearButton />
        </SearchField.Group>
        <Description>按姓名、邮箱或用户名搜索</Description>
      </SearchField>
    </div>
  );
}
