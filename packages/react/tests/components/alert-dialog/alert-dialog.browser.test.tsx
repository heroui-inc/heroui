import {render} from "@heroui/testing/browser";
import {isDocumentScrollLocked} from "@heroui/testing/helpers";
import {page, userEvent} from "vitest/browser";

import {AlertDialogFixture} from "./fixtures";

const renderAlertDialog = () => render(<AlertDialogFixture />);

describe("AlertDialog (browser)", () => {
  it("supports focus trap and scroll lock while open", async () => {
    await renderAlertDialog();

    await page.getByRole("button", {name: "Delete Project"}).click();

    const dialog = page.getByRole("alertdialog");

    await expect.element(dialog).toBeInTheDocument();
    expect(isDocumentScrollLocked()).toBe(true);
    expect(dialog.element().contains(document.activeElement)).toBe(true);

    await userEvent.tab();
    expect(dialog.element().contains(document.activeElement)).toBe(true);
  });

  it("supports blocked Escape and CloseTrigger with focus restore", async () => {
    await renderAlertDialog();

    const trigger = page.getByRole("button", {name: "Delete Project"});

    await trigger.click();

    const dialog = page.getByRole("alertdialog");

    await expect.element(dialog).toBeInTheDocument();

    await userEvent.keyboard("{Escape}");
    await expect.element(dialog).toBeInTheDocument();

    await page.getByRole("button", {name: "Close"}).click();

    await expect.element(dialog).not.toBeInTheDocument();
    expect(isDocumentScrollLocked()).toBe(false);
    await expect.element(trigger).toHaveFocus();
  });
});
