import {ssrSmoke} from "@heroui/testing/helpers";

import {SelectFixture} from "./fixtures";

describe("Select SSR", () => {
  it("renders without hydration mismatch when closed", async () => {
    await ssrSmoke(<SelectFixture />);
  });

  it("renders without hydration mismatch when defaultOpen", async () => {
    await ssrSmoke(<SelectFixture defaultOpen />);
  });

  it("renders without hydration mismatch with a clear button", async () => {
    await ssrSmoke(<SelectFixture withClearButton defaultValue="california" />);
  });
});
