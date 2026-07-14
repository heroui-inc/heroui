import {Label, SearchField} from "@heroui/react";

export function CustomStyles() {
  return (
    <SearchField className="w-full max-w-64" name="docs" variant="secondary">
      <Label className="font-medium text-foreground">Search docs</Label>
      <SearchField.Group className="rounded-xl bg-default">
        <SearchField.SearchIcon className="text-muted" />
        <SearchField.Input className="placeholder:text-muted" placeholder="Components, guides..." />
        <SearchField.ClearButton className="text-muted" />
      </SearchField.Group>
    </SearchField>
  );
}
