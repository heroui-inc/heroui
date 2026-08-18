import {render} from "@heroui/testing/browser";
import {page} from "vitest/browser";

// Tags are removed by pressing an area that only exists in compiled CSS, so this suite needs the
// built stylesheet. Every `pnpm test*` entry point builds `@heroui/styles` first.
import "../../../../styles/dist/heroui.min.css";

import {AutocompleteMultipleFixture} from "./fixtures";

/** Offset from the glyph centre that a finger routinely lands on, inside the 24px target. */
const OFF_CENTRE = 11;

describe("Autocomplete (browser)", () => {
  describe("multiple selection with tags", () => {
    it("removes the tag on the first press landing off the glyph", async () => {
      const screen = await render(<AutocompleteMultipleFixture />);

      const removeButton = page.getByRole("button", {name: "Remove tag Dog"});
      const {height, width} = removeButton.element().getBoundingClientRect();

      // `position` is relative to the element's top-left corner, so this aims `OFF_CENTRE` px to
      // the left of the glyph. A press that far off used to land on the tag body, which consumes
      // it and removes nothing — the reason removing a tag by touch took several attempts.
      await removeButton.click({position: {x: width / 2 - OFF_CENTRE, y: height / 2}});

      await expect.element(screen.getByRole("row", {name: "Dog"})).not.toBeInTheDocument();
      await expect.element(screen.getByRole("row", {name: "Cat"})).toBeInTheDocument();
      await expect.element(screen.getByRole("row", {name: "Panda"})).toBeInTheDocument();

      // A press inside the trigger must not open the dropdown, otherwise the next press is
      // swallowed dismissing the popover instead of removing a tag.
      await expect.element(page.getByRole("listbox")).not.toBeInTheDocument();
    });
  });
});
