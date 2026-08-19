import {Label, SearchField} from "@heroui/react";

export function CustomStyles() {
  return (
    <SearchField className="w-full max-w-64" name="docs" variant="secondary">
      <Label className="font-medium text-foreground">搜索文档</Label>
      <SearchField.Group className="rounded-xl bg-default">
        <SearchField.SearchIcon className="text-muted" />
        <SearchField.Input className="placeholder:text-muted" placeholder="组件、指南..." />
        <SearchField.ClearButton className="text-muted" />
      </SearchField.Group>
    </SearchField>
  );
}
