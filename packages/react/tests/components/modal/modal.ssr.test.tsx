import {ssrSmoke} from "@heroui/testing/helpers";

import {ModalFixture} from "./fixtures";

describe("Modal SSR", () => {
  it("renders without hydration mismatch when closed", async () => {
    await ssrSmoke(<ModalFixture />);
  });

  it("renders without hydration mismatch when defaultOpen", async () => {
    await ssrSmoke(<ModalFixture defaultOpen />);
  });
});
