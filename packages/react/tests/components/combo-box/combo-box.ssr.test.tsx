import {ssrSmoke} from "@heroui/testing/helpers";

import {ComboBoxFixture} from "./fixtures";

describe("ComboBox SSR", () => {
  it("renders without hydration mismatch when closed", async () => {
    await ssrSmoke(<ComboBoxFixture />);
  });

  it("renders without hydration mismatch with a default value", async () => {
    await ssrSmoke(<ComboBoxFixture defaultValue="cat" />);
  });
});
