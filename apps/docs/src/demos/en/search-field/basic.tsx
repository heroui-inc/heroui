import type {SearchFieldProps} from "@heroui/react";

import {Label, SearchField} from "@heroui/react";

export function Basic(props: SearchFieldProps) {
  return (
    <SearchField {...props} name="search">
      <Label>Search</Label>
      <SearchField.Group>
        <SearchField.SearchIcon />
        <SearchField.Input className="w-[280px]" placeholder="Search..." />
        <SearchField.ClearButton />
      </SearchField.Group>
    </SearchField>
  );
}
