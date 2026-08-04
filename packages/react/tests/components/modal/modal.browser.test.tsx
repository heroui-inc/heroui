import {render} from "@heroui/testing/browser";
import {isDocumentScrollLocked} from "@heroui/testing/helpers";
import {page, userEvent} from "vitest/browser";

import {ModalFixture} from "./fixtures";

const renderModal = () => render(<ModalFixture />);

describe("Modal (browser)", () => {
  it("supports focus trap, scroll lock, and Escape focus restore", async () => {
    await renderModal();

    const trigger = page.getByRole("button", {name: "Open modal"});

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

  it("supports focus restore after CloseTrigger", async () => {
    await renderModal();

    const trigger = page.getByRole("button", {name: "Open modal"});

    await trigger.click();

    const dialog = page.getByRole("dialog");

    await expect.element(dialog).toBeInTheDocument();

    await page.getByRole("button", {name: "Close"}).click();

    await expect.element(dialog).not.toBeInTheDocument();
    await expect.element(trigger).toHaveFocus();
  });
});
