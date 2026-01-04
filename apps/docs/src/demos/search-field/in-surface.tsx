import {Description, Label, SearchField, Surface} from "@heroui/react";

export function InSurface() {
  return (
    <Surface className="flex w-full max-w-sm flex-col gap-4 rounded-3xl p-6">
      <SearchField name="search">
        <Label>Search</Label>
        <SearchField.Group>
          <SearchField.SearchIcon />
          <SearchField.Input className="w-full" placeholder="Search..." />
          <SearchField.ClearButton />
        </SearchField.Group>
        <Description>Enter keywords to search</Description>
      </SearchField>
      <SearchField name="search-2">
        <Label>Advanced search</Label>
        <SearchField.Group>
          <SearchField.SearchIcon />
          <SearchField.Input className="w-full" placeholder="Advanced search..." />
          <SearchField.ClearButton />
        </SearchField.Group>
        <Description>Use filters to refine your search</Description>
      </SearchField>
    </Surface>
  );
}
