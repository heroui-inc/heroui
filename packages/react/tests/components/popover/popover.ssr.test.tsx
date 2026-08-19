import {ssrSmoke} from "@heroui/testing/helpers";

import {PopoverFixture} from "./fixtures";

describe("Popover SSR", () => {
  it("renders without hydration mismatch when closed", async () => {
    await ssrSmoke(<PopoverFixture />);
  });

  it("renders without hydration mismatch when defaultOpen", async () => {
    await ssrSmoke(<PopoverFixture defaultOpen />);
  });
});
