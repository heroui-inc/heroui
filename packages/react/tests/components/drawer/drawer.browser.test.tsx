import {render} from "@heroui/testing/browser";
import {isDocumentScrollLocked} from "@heroui/testing/helpers";
import {page, userEvent} from "vitest/browser";

import {DrawerFixture} from "./fixtures";

const renderDrawer = () => render(<DrawerFixture />);

describe("Drawer (browser)", () => {
  it("supports focus trap, scroll lock, and Escape focus restore", async () => {
    await renderDrawer();

    const trigger = page.getByRole("button", {name: "Open Drawer"});

    await trigger.click();

    const dialog = page.getByRole("dialog");

    await expect.element(dialog).toBeInTheDocument();
    expect(isDocumentScrollLocked()).toBe(true);
    expect(dialog.element().contains(document.activeElement)).toBe(true);

    await userEvent.tab();
    expect(dialog.element().contains(document.activeElement)).toBe(true);

    await userEvent.keyboard("{Escape}");

    await expect.element(dialog).not.toBeInTheDocument();
    expect(isDocumentScrollLocked()).toBe(false);
    await expect.element(trigger).toHaveFocus();
  });
});
