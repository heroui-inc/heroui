import {ssrSmoke} from "@heroui/testing/helpers";

import {Label} from "@/components/label";
import {SearchField} from "@/components/search-field";

describe("SearchField SSR", () => {
  it("renders without hydration mismatch with a default value", async () => {
    const {html} = await ssrSmoke(
      <SearchField defaultValue="hero" name="search">
        <Label>Search</Label>
        <SearchField.Group>
          <SearchField.SearchIcon />
          <SearchField.Input placeholder="Search..." />
          <SearchField.ClearButton />
        </SearchField.Group>
      </SearchField>,
    );

    expect(html).toContain('data-slot="search-field"');
    expect(html).toContain('data-slot="search-field-clear-button"');
  });
});
