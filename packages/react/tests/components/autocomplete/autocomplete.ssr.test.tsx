import type {ReactNode} from "react";

import {ssrSmoke} from "@heroui/testing/helpers";
import {useFilter} from "react-aria-components/Autocomplete";

import {Autocomplete} from "@/components/autocomplete";
import {Label} from "@/components/label";
import {ListBox} from "@/components/list-box";
import {I18nProvider} from "@/components/rac";
import {SearchField} from "@/components/search-field";

const wrapper = ({children}: {children: ReactNode}) => (
  <I18nProvider locale="en-US">{children}</I18nProvider>
);

const AutocompleteExample = ({defaultOpen}: {defaultOpen?: boolean}) => {
  const {contains} = useFilter({sensitivity: "base"});

  return (
    <Autocomplete
      data-testid="autocomplete"
      defaultOpen={defaultOpen}
      placeholder="Select an animal"
      selectionMode="single"
    >
      <Label>Favorite Animal</Label>
      <Autocomplete.Trigger>
        <Autocomplete.Value />
        <Autocomplete.Indicator />
      </Autocomplete.Trigger>
      <Autocomplete.Popover>
        <Autocomplete.Filter filter={contains}>
          <SearchField autoFocus aria-label="Search animals" name="search" variant="secondary">
            <SearchField.Group>
              <SearchField.SearchIcon />
              <SearchField.Input placeholder="Search animals..." />
              <SearchField.ClearButton />
            </SearchField.Group>
          </SearchField>
          <ListBox>
            <ListBox.Item id="cat" textValue="Cat">
              Cat
              <ListBox.ItemIndicator />
            </ListBox.Item>
            <ListBox.Item id="dog" textValue="Dog">
              Dog
              <ListBox.ItemIndicator />
            </ListBox.Item>
          </ListBox>
        </Autocomplete.Filter>
      </Autocomplete.Popover>
    </Autocomplete>
  );
};

describe("Autocomplete SSR", () => {
  it("renders without hydration mismatch when closed", async () => {
    await ssrSmoke(<AutocompleteExample />, {wrapper});
  });

  it("renders without hydration mismatch when defaultOpen", async () => {
    await ssrSmoke(<AutocompleteExample defaultOpen />, {wrapper});
  });
});
