import {render} from "@heroui/testing/browser";
import {page, userEvent} from "vitest/browser";

import {DropdownFixture} from "./fixtures";

const renderDropdown = () => render(<DropdownFixture />);

describe("Dropdown (browser)", () => {
  it("opens the menu, shows items, and restores focus to the trigger after Escape", async () => {
    await renderDropdown();

    const trigger = page.getByRole("button", {name: "Menu"});

    await trigger.click();

    const menu = page.getByRole("menu");

    await expect.element(menu).toBeInTheDocument();
    await expect.element(page.getByRole("menuitem", {name: "New file"})).toBeInTheDocument();
    await expect.element(page.getByRole("menuitem", {name: "Copy link"})).toBeInTheDocument();

    await userEvent.keyboard("{Escape}");

    await expect.element(menu).not.toBeInTheDocument();
    await expect.element(trigger).toHaveFocus();
  });
});
