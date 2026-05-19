import {Label, SearchField} from "@heroui/react";

export function CustomStyles() {
  return (
    <SearchField className="w-full max-w-72 gap-1.5" name="search">
      <Label className="font-medium text-foreground">Find files</Label>
      <SearchField.Group className="rounded-xl border border-border bg-surface shadow-sm ring-1 ring-black/5 transition-[box-shadow,border-color] focus-within:ring-2 focus-within:ring-foreground/15 dark:ring-white/10">
        <SearchField.SearchIcon className="text-muted" />
        <SearchField.Input
          className="w-full text-sm text-foreground placeholder:text-muted"
          placeholder="Search by name..."
        />
        <SearchField.ClearButton className="text-muted" />
      </SearchField.Group>
    </SearchField>
  );
}
