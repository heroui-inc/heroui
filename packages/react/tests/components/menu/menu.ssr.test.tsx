import {ssrSmoke} from "@heroui/testing/helpers";

import {MenuFixture} from "./fixtures";

describe("Menu SSR", () => {
  it("renders without hydration mismatch when closed", async () => {
    await ssrSmoke(<MenuFixture />);
  });
});
