"use client";

import {
  Autocomplete,
  Description,
  EmptyState,
  Label,
  ListBox,
  SearchField,
  useFilter,
} from "@heroui/react";

export function CustomValue() {
  const {contains} = useFilter({sensitivity: "base"});

  const currencies = [
    {code: "USD", id: "usd", name: "US Dollar", symbol: "$"},
    {code: "EUR", id: "eur", name: "Euro", symbol: "€"},
    {code: "GBP", id: "gbp", name: "British Pound", symbol: "£"},
    {code: "JPY", id: "jpy", name: "Japanese Yen", symbol: "¥"},
    {code: "CHF", id: "chf", name: "Swiss Franc", symbol: "₣"},
  ];

  return (
    <Autocomplete
      className="w-[256px]"
      defaultValue="usd"
      placeholder="Select a currency"
      selectionMode="single"
    >
      <Label>Currency</Label>
      <Autocomplete.Trigger>
        <Autocomplete.Value>
          {({defaultChildren, isPlaceholder, state}) => {
            const selectedCurrency = currencies.find(
              (currency) => currency.id === state.selectedItems[0]?.key,
            );

            if (isPlaceholder || !selectedCurrency) {
              return defaultChildren;
            }

            return (
              <span className="flex min-w-0 items-center gap-1.5">
                <span className="font-medium">{selectedCurrency.symbol}</span>
                <span>{selectedCurrency.code}</span>
                <span className="truncate text-muted">{selectedCurrency.name}</span>
              </span>
            );
          }}
        </Autocomplete.Value>
        <Autocomplete.Indicator />
      </Autocomplete.Trigger>
      <Autocomplete.Popover>
        <Autocomplete.Filter filter={contains}>
          <SearchField autoFocus aria-label="Search currencies" name="search" variant="secondary">
            <SearchField.Group>
              <SearchField.SearchIcon />
              <SearchField.Input placeholder="Search currencies..." />
              <SearchField.ClearButton />
            </SearchField.Group>
          </SearchField>
          <ListBox renderEmptyState={() => <EmptyState>No results found</EmptyState>}>
            {currencies.map((currency) => (
              <ListBox.Item
                key={currency.id}
                id={currency.id}
                textValue={`${currency.code} ${currency.name}`}
              >
                <div className="flex flex-col">
                  <Label>{currency.code}</Label>
                  <Description>{currency.name}</Description>
                </div>
                <ListBox.ItemIndicator />
              </ListBox.Item>
            ))}
          </ListBox>
        </Autocomplete.Filter>
      </Autocomplete.Popover>
    </Autocomplete>
  );
}
