import type {SearchFieldProps} from "@heroui/react";

import {Label, SearchField} from "@heroui/react";

export function Basic(props: SearchFieldProps) {
  return (
    <SearchField {...props} name="search">
      <Label>搜索</Label>
      <SearchField.Group>
        <SearchField.SearchIcon />
        <SearchField.Input className="w-[280px]" placeholder="搜索…" />
        <SearchField.ClearButton />
      </SearchField.Group>
    </SearchField>
  );
}
