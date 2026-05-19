import {Label, SearchField} from "@heroui/react";

export function CustomStyles() {
  return (
    <SearchField className="w-full max-w-72 gap-1.5" name="search">
      <Label className="font-medium text-neutral-800 dark:text-neutral-100">Find files</Label>
      <SearchField.Group className="rounded-xl border border-border/80 bg-linear-to-b from-neutral-50/90 to-white shadow-sm ring-1 ring-black/5 transition-[box-shadow,border-color] focus-within:border-neutral-400/40 focus-within:ring-2 focus-within:ring-neutral-400/20 dark:from-neutral-900/80 dark:to-neutral-900 dark:ring-white/10 dark:focus-within:border-neutral-500/50 dark:focus-within:ring-neutral-500/25">
        <SearchField.SearchIcon className="text-muted" />
        <SearchField.Input
          className="w-full text-sm text-neutral-800 placeholder:text-neutral-400 dark:text-neutral-100 dark:placeholder:text-neutral-500"
          placeholder="Search by name..."
        />
        <SearchField.ClearButton className="text-muted" />
      </SearchField.Group>
    </SearchField>
  );
}
