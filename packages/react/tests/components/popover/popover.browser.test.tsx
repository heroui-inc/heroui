import {render} from "@heroui/testing/browser";
import {page, userEvent} from "vitest/browser";

import {PopoverFixture} from "./fixtures";

const renderPopover = () => render(<PopoverFixture />);

describe("Popover (browser)", () => {
  it("supports focus move into dialog and Escape restore", async () => {
    await renderPopover();

    const trigger = page.getByRole("button", {name: "Open popover"});

    await trigger.click();

    const dialog = page.getByRole("dialog");

    await expect.element(dialog).toBeInTheDocument();
    expect(dialog.element().contains(document.activeElement)).toBe(true);

    await userEvent.keyboard("{Escape}");

    await expect.element(dialog).not.toBeInTheDocument();
    await expect.element(trigger).toHaveFocus();
  });
});
