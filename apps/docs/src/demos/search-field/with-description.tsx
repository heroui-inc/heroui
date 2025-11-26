import {Description, Label, SearchField} from "@heroui/react";

export function WithDescription() {
  return (
    <div className="flex flex-col gap-4">
      <SearchField name="search">
        <Label>Search products</Label>
        <SearchField.Group>
          <SearchField.SearchIcon />
          <SearchField.Input className="w-[280px]" placeholder="Search products..." />
          <SearchField.ClearButton />
        </SearchField.Group>
        <Description>Enter keywords to search for products</Description>
      </SearchField>
      <SearchField name="search-users">
        <Label>Search users</Label>
        <SearchField.Group>
          <SearchField.SearchIcon />
          <SearchField.Input className="w-[280px]" placeholder="Search users..." />
          <SearchField.ClearButton />
        </SearchField.Group>
        <Description>Search by name, email, or username</Description>
      </SearchField>
    </div>
  );
}
