import {render} from "@heroui/testing/browser";
import {page, userEvent} from "vitest/browser";

import {SelectFixture} from "./fixtures";

import "@/styles.css";

const renderSelect = () => render(<SelectFixture />);

/** The focus ring transitions in, so settle it to read a steady-state box-shadow. */
const disableTransitions = () => {
  const style = document.createElement("style");

  style.textContent = "*, *::before, *::after { transition: none !important; }";
  document.head.append(style);

  return () => style.remove();
};

const ringOf = (name: string) =>
  getComputedStyle(page.getByRole("option", {name}).element()).boxShadow;

describe("Select (browser)", () => {
  it("opens the listbox, shows options, and restores focus to the trigger after Escape", async () => {
    await renderSelect();

    const trigger = page.getByRole("button", {name: "State"});

    await trigger.click();

    const listbox = page.getByRole("listbox");

    await expect.element(listbox).toBeInTheDocument();
    await expect.element(page.getByRole("option", {name: "Florida"})).toBeInTheDocument();
    await expect.element(page.getByRole("option", {name: "California"})).toBeInTheDocument();
    await expect.element(page.getByRole("option", {name: "Texas"})).toBeInTheDocument();

    await userEvent.keyboard("{Escape}");

    await expect.element(listbox).not.toBeInTheDocument();
    await expect.element(trigger).toHaveFocus();
  });

  describe("focus ring", () => {
    // React Aria restores focus to the selected option on open, so a native
    // `:focus-visible` rule would paint a ring even for a mouse-driven open.
    it("supports opening with the mouse without ringing the focused option", async () => {
      const restore = disableTransitions();

      try {
        await render(<SelectFixture defaultValue="california" />);

        await page.getByRole("button", {name: "State"}).click();
        await expect.element(page.getByRole("listbox")).toBeInTheDocument();

        const selected = page.getByRole("option", {name: "California"});

        await expect.element(selected).toHaveFocus();
        await expect.element(selected).not.toHaveAttribute("data-focus-visible");
        expect(ringOf("California")).toBe("none");
      } finally {
        restore();
      }
    });

    it("supports opening with the keyboard and rings the focused option", async () => {
      const restore = disableTransitions();

      try {
        await render(<SelectFixture defaultValue="california" />);

        const trigger = page.getByRole("button", {name: "State"});

        // Open and dismiss with the mouse first, so the reopen below is the
        // only keyboard-driven open in the test.
        await trigger.click();
        await expect.element(page.getByRole("listbox")).toBeInTheDocument();

        await userEvent.keyboard("{Escape}");
        await expect.element(page.getByRole("listbox")).not.toBeInTheDocument();
        await expect.element(trigger).toHaveFocus();

        await userEvent.keyboard("{Enter}");
        await expect.element(page.getByRole("listbox")).toBeInTheDocument();

        const selected = page.getByRole("option", {name: "California"});

        await expect.element(selected).toHaveAttribute("data-focus-visible", "true");
        expect(ringOf("California")).not.toBe("none");
      } finally {
        restore();
      }
    });

    it("supports arrow navigation moving the ring to the newly focused option", async () => {
      const restore = disableTransitions();

      try {
        await renderSelect();

        await page.getByRole("button", {name: "State"}).click();
        await expect.element(page.getByRole("listbox")).toBeInTheDocument();

        await userEvent.keyboard("{ArrowDown}");

        await expect
          .element(page.getByRole("option", {name: "Florida"}))
          .toHaveAttribute("data-focus-visible", "true");

        await userEvent.keyboard("{ArrowDown}");

        await expect
          .element(page.getByRole("option", {name: "California"}))
          .toHaveAttribute("data-focus-visible", "true");
        expect(ringOf("California")).not.toBe("none");
        expect(ringOf("Florida")).toBe("none");
      } finally {
        restore();
      }
    });
  });

  describe("clear button", () => {
    it("clears on click, leaves the listbox closed, and focuses the trigger", async () => {
      await render(<SelectFixture withClearButton defaultValue="california" />);

      const trigger = page.getByRole("button", {name: "State"});

      await expect.element(trigger).toHaveTextContent("California");

      await page.getByTestId("select-clear-button").click();

      await expect.element(trigger).toHaveTextContent("Select one");
      await expect.element(page.getByRole("listbox")).not.toBeInTheDocument();
      await expect.element(trigger).toHaveFocus();
    });

    it("clears with the Backspace shortcut", async () => {
      await render(<SelectFixture withClearButton defaultValue="california" />);

      const trigger = page.getByRole("button", {name: "State"});

      await trigger.click();
      await userEvent.keyboard("{Escape}");
      await expect.element(trigger).toHaveFocus();

      await userEvent.keyboard("{Backspace}");

      await expect.element(trigger).toHaveTextContent("Select one");
      await expect.element(page.getByRole("listbox")).not.toBeInTheDocument();
    });
  });
});
