import {render} from "@heroui/testing/browser";
import {page} from "vitest/browser";

import {ComboBoxFixture} from "./fixtures";

// The popover item padding lives in CSS; Vite Tailwind compiles `@/styles.css`.
import "@/styles.css";

/** How far the option's content box runs under its indicator, which is absolutely positioned
 * and therefore only kept off the label by the item's inline-end padding. */
const indicatorOverlapOf = (name: string) => {
  const option = page.getByRole("option", {name}).element();
  const indicator = option.querySelector('[data-slot="list-box-item-indicator"]')!;
  const contentEnd =
    option.getBoundingClientRect().right - parseFloat(getComputedStyle(option).paddingInlineEnd);

  return contentEnd - indicator.getBoundingClientRect().left;
};

describe("ComboBox (browser)", () => {
  describe("item indicator", () => {
    it("reserves room for the indicator so it never sits on the label", async () => {
      await render(<ComboBoxFixture defaultValue="dog" />);

      await page.getByRole("button", {name: "Show suggestions"}).click();
      await expect.element(page.getByRole("listbox")).toBeInTheDocument();

      expect(indicatorOverlapOf("Dog")).toBeLessThanOrEqual(0);
    });
  });
});
