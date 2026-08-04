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
});
