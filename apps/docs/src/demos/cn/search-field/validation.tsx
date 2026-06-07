import {FieldError, Label, SearchField} from "@heroui/react";

export function Validation() {
  return (
    <div className="flex flex-col gap-4">
      <SearchField isInvalid isRequired name="search" value="ab">
        <Label>搜索</Label>
        <SearchField.Group>
          <SearchField.SearchIcon />
          <SearchField.Input className="w-[280px]" placeholder="搜索…" />
          <SearchField.ClearButton />
        </SearchField.Group>
        <FieldError>搜索内容至少需要 3 个字符</FieldError>
      </SearchField>
      <SearchField isInvalid name="search-invalid">
        <Label>搜索</Label>
        <SearchField.Group>
          <SearchField.SearchIcon />
          <SearchField.Input className="w-[280px]" placeholder="搜索…" value="invalid@query" />
          <SearchField.ClearButton />
        </SearchField.Group>
        <FieldError>搜索内容包含无效字符</FieldError>
      </SearchField>
    </div>
  );
}
