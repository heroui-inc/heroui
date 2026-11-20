import {render} from "@heroui/testing/browser";
import {isDocumentScrollLocked} from "@heroui/testing/helpers";
import {page, userEvent} from "vitest/browser";

import {AlertDialog} from "@/components/alert-dialog";
import {Button} from "@/components/button";

import {animatedProperties, stretchAnimation} from "../../helpers/overlay-motion";

import {AlertDialogFixture} from "./fixtures";

import "@/styles.css";

const renderFooterDialog = (dialogWidth: number) =>
  render(
    <AlertDialog defaultOpen>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog style={{width: dialogWidth}}>
            <AlertDialog.Header>
              <AlertDialog.Heading>Delete project permanently?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Footer>
              <Button slot="close" style={{width: 140}} variant="tertiary">
                Keep
              </Button>
              <Button slot="close" style={{width: 140}} variant="danger">
                Delete
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>,
  );

const footerBoxes = () => {
  const dialog = page.getByRole("alertdialog").element().getBoundingClientRect();
  const footer = document
    .querySelector<HTMLElement>('[data-slot="alert-dialog-footer"]')!
    .getBoundingClientRect();
  const keep = page.getByRole("button", {name: "Keep"}).element().getBoundingClientRect();
  const remove = page.getByRole("button", {name: "Delete"}).element().getBoundingClientRect();

  return {dialog, footer, keep, remove};
};

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

  it("opens with an opacity and transform only animation", async () => {
    stretchAnimation(
      '.alert-dialog__container[data-entering="true"], .alert-dialog__backdrop[data-entering="true"]',
    );
    await renderAlertDialog();
    await page.getByRole("button", {name: "Delete Project"}).click();
    await expect.element(page.getByRole("alertdialog")).toBeInTheDocument();

    const container = document.querySelector<HTMLElement>(".alert-dialog__container")!;
    const backdrop = document.querySelector<HTMLElement>(".alert-dialog__backdrop")!;
    const containerMotion = animatedProperties(container);
    const backdropMotion = animatedProperties(backdrop);

    expect(containerMotion.animation?.animationName).toMatch(/^heroui-overlay-enter-105/);
    expect(containerMotion.properties).toEqual(["opacity", "transform"]);
    expect(backdropMotion.animation?.animationName).toBe("heroui-overlay-fade-in");
    expect(backdropMotion.properties).toEqual(["opacity"]);
  });

  it("keeps the backdrop mounted until the container finishes closing", async () => {
    stretchAnimation('.alert-dialog__container[data-exiting="true"]');
    await renderAlertDialog();
    await page.getByRole("button", {name: "Delete Project"}).click();
    await expect.element(page.getByRole("alertdialog")).toBeInTheDocument();

    const openContainer = document.querySelector<HTMLElement>(".alert-dialog__container")!;

    await expect.poll(() => openContainer.getAnimations().length).toBe(0);
    await page.getByRole("button", {name: "Close"}).click();
    await new Promise((resolve) => setTimeout(resolve, 300));

    const container = document.querySelector<HTMLElement>(".alert-dialog__container")!;

    expect(document.querySelector(".alert-dialog__backdrop")).toHaveAttribute(
      "data-exiting",
      "true",
    );
    expect(container).toHaveAttribute("data-exiting", "true");

    const {animation, properties} = animatedProperties(container);

    expect(animation?.animationName).toBe("heroui-overlay-exit");
    expect(getComputedStyle(container).animationFillMode).toBe("none");
    expect(properties).toEqual(["opacity", "transform"]);
  });

  // Regression: a nowrap footer pushed the first action past the dialog's start edge.
  it("wraps footer actions that do not fit on one row", async () => {
    await renderFooterDialog(220);

    const {dialog, footer, keep, remove} = footerBoxes();

    expect(keep.left).toBeGreaterThanOrEqual(dialog.left - 1);
    expect(remove.left).toBeGreaterThanOrEqual(dialog.left - 1);
    expect(keep.right).toBeLessThanOrEqual(dialog.right + 1);
    expect(remove.right).toBeLessThanOrEqual(dialog.right + 1);
    expect(remove.top).toBeGreaterThanOrEqual(keep.bottom - 1);
    expect(Math.abs(keep.right - footer.right)).toBeLessThan(1);
    expect(Math.abs(remove.right - footer.right)).toBeLessThan(1);
  });

  it("keeps footer actions on one row when they fit", async () => {
    await renderFooterDialog(400);

    const {keep, remove} = footerBoxes();

    expect(Math.abs(remove.top - keep.top)).toBeLessThan(1);
    expect(keep.right).toBeLessThanOrEqual(remove.left);
  });
});
