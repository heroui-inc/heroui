import {Label, SearchField} from "@heroui/react";

export function FullWidth() {
  return (
    <div className="w-[400px] space-y-4">
      <SearchField fullWidth name="search">
        <Label>搜索</Label>
        <SearchField.Group>
          <SearchField.SearchIcon />
          <SearchField.Input placeholder="搜索…" />
          <SearchField.ClearButton />
        </SearchField.Group>
      </SearchField>
    </div>
  );
}
