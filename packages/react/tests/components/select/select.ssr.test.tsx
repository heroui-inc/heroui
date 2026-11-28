import {ssrSmoke} from "@heroui/testing/helpers";

import {SelectFixture} from "./fixtures";

describe("Select SSR", () => {
  it("renders without hydration mismatch when closed", async () => {
    await ssrSmoke(<SelectFixture />);
  });

  it("renders without hydration mismatch when defaultOpen", async () => {
    const {html} = await ssrSmoke(<SelectFixture defaultOpen />);
    const container = document.createElement("div");

    container.innerHTML = html;

    expect(container.querySelector('[data-slot="select-default-indicator"]')).toHaveAttribute(
      "data-open",
      "true",
    );
  });

  it("renders without hydration mismatch with a clear button", async () => {
    await ssrSmoke(<SelectFixture withClearButton defaultValue="california" />);
  });
});
