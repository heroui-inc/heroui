import {render} from "@heroui/testing/browser";
import {page, userEvent} from "vitest/browser";

import {SelectFixture} from "./fixtures";

const renderSelect = () => render(<SelectFixture />);

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
