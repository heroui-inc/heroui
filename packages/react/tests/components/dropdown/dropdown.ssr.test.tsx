import {ssrSmoke} from "@heroui/testing/helpers";

import {DropdownFixture} from "./fixtures";

describe("Dropdown SSR", () => {
  it("renders without hydration mismatch when closed", async () => {
    await ssrSmoke(<DropdownFixture />);
  });

  it("renders without hydration mismatch when defaultOpen", async () => {
    await ssrSmoke(<DropdownFixture defaultOpen />);
  });
});
