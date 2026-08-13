import {render} from "@heroui/testing/browser";
import {isDocumentScrollLocked} from "@heroui/testing/helpers";
import {act} from "react";
import {page, userEvent} from "vitest/browser";

import {DrawerFixture, StackedDrawerFixture} from "./fixtures";

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

  it("dismisses only the owning drawer when its stacked handle is dragged", async () => {
    const onChildOpenChange = vi.fn();
    const onParentOpenChange = vi.fn();

    await render(
      <StackedDrawerFixture
        onChildOpenChange={onChildOpenChange}
        onParentOpenChange={onParentOpenChange}
      />,
    );

    const childHandle = page.getByTestId("child-drawer-handle").element();
    const childDialog = childHandle.closest<HTMLElement>('[data-slot="drawer-dialog"]');
    const parentDialog = page
      .getByTestId("parent-drawer-handle")
      .element()
      .closest<HTMLElement>('[data-slot="drawer-dialog"]');

    expect(childDialog).not.toBeNull();
    expect(parentDialog).not.toBeNull();

    if (!childDialog || !parentDialog) return;

    [childDialog, parentDialog].forEach((dialog) => {
      Object.defineProperties(dialog, {
        offsetHeight: {configurable: true, value: 100},
        releasePointerCapture: {configurable: true, value: vi.fn()},
        setPointerCapture: {configurable: true, value: vi.fn()},
      });
    });

    await act(async () => {
      childHandle.dispatchEvent(
        new PointerEvent("pointerdown", {
          bubbles: true,
          button: 0,
          clientY: 0,
          pointerId: 1,
          pointerType: "touch",
        }),
      );
      childHandle.dispatchEvent(
        new PointerEvent("pointermove", {
          bubbles: true,
          button: 0,
          clientY: 50,
          pointerId: 1,
          pointerType: "touch",
        }),
      );
      childHandle.dispatchEvent(
        new PointerEvent("pointerup", {
          bubbles: true,
          button: 0,
          clientY: 50,
          pointerId: 1,
          pointerType: "touch",
        }),
      );
    });

    expect(onChildOpenChange).toHaveBeenCalledWith(false);
    expect(onParentOpenChange).not.toHaveBeenCalledWith(false);
    expect(parentDialog.style.transform).toBe("");
  });
});
