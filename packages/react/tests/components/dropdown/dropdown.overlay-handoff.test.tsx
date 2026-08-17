import {User, cleanup, render, runAllTimers, screen} from "@heroui/testing/helpers";

import {
  DropdownToAlertDialogFixture,
  DropdownToDrawerFixture,
  DropdownToModalFixture,
} from "./fixtures";

/**
 * Regressions for the leftover dropdown overlay reported in #6344 and #6361: opening a
 * modal-level overlay from a dropdown item must leave nothing of the dropdown behind.
 */
describe("Dropdown", () => {
  let testUtilUser: User;

  beforeEach(() => {
    vi.useFakeTimers({shouldAdvanceTime: true});
    testUtilUser = new User({
      interactionType: "mouse",
      advanceTimer: vi.advanceTimersByTime,
    });
  });

  afterEach(() => {
    cleanup();
    runAllTimers();
    vi.useRealTimers();
  });

  describe("handing off to a modal-level overlay", () => {
    const selectItem = async (name: string) => {
      const tester = testUtilUser.createTester("Menu", {
        root: screen.getByRole("button", {name: "Menu"}),
      });

      await tester.open();
      runAllTimers();

      await tester.toggleOptionSelection({option: name});
      runAllTimers();

      return tester;
    };

    it("supports opening a Modal from an item without leaving the popover behind", async () => {
      render(<DropdownToModalFixture />);

      const tester = await selectItem("Open modal");

      expect(tester.getMenu()).toBeNull();
      expect(document.querySelector('[data-slot="dropdown-popover"]')).toBeNull();
      expect(screen.getByRole("dialog", {name: "Modal from dropdown"})).toBeInTheDocument();
    });

    it("supports closing a controlled dropdown while opening an AlertDialog", async () => {
      render(<DropdownToAlertDialogFixture />);

      const tester = await selectItem("Delete project");

      expect(tester.getMenu()).toBeNull();
      expect(document.querySelector('[data-slot="dropdown-popover"]')).toBeNull();
      expect(screen.getByRole("alertdialog")).toBeInTheDocument();
    });

    it("supports opening a Drawer from an item without leaving the popover behind", async () => {
      render(<DropdownToDrawerFixture />);

      const tester = await selectItem("Open drawer");

      expect(tester.getMenu()).toBeNull();
      expect(document.querySelector('[data-slot="dropdown-popover"]')).toBeNull();
      expect(screen.getByRole("dialog", {name: "Drawer from dropdown"})).toBeInTheDocument();
    });

    it("keeps the dropdown closed while the AlertDialog holds focus", async () => {
      render(<DropdownToAlertDialogFixture />);

      const tester = await selectItem("Delete project");

      // React Aria restores focus to the trigger when the popover unmounts; that must not
      // resurrect the controlled dropdown behind the dialog.
      runAllTimers();

      expect(tester.getMenu()).toBeNull();
      expect(screen.getByRole("alertdialog")).toBeInTheDocument();
    });
  });
});
