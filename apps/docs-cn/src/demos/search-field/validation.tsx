import {FieldError, Label, SearchField} from "@heroui/react";

export function Validation() {
  return (
    <div className="flex flex-col gap-4">
      <SearchField isInvalid isRequired name="search" value="ab">
        <Label>Search</Label>
        <SearchField.Group>
          <SearchField.SearchIcon />
          <SearchField.Input className="w-[280px]" placeholder="Search..." />
          <SearchField.ClearButton />
        </SearchField.Group>
        <FieldError>Search query must be at least 3 characters</FieldError>
      </SearchField>
      <SearchField isInvalid name="search-invalid">
        <Label>Search</Label>
        <SearchField.Group>
          <SearchField.SearchIcon />
          <SearchField.Input className="w-[280px]" placeholder="Search..." value="invalid@query" />
          <SearchField.ClearButton />
        </SearchField.Group>
        <FieldError>Invalid characters in search query</FieldError>
      </SearchField>
    </div>
  );
}
