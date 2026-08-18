import {User, cleanup, render, runAllTimers, screen} from "@heroui/testing/helpers";

import {
  DropdownFixture,
  DropdownToAlertDialogFixture,
  DropdownToDrawerFixture,
  DropdownToModalFixture,
} from "./fixtures";

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

  it("exposes trigger data-slot when using Dropdown.Trigger", () => {
    render(<DropdownFixture />);

    expect(document.querySelector('[data-slot="dropdown-trigger"]')).not.toBeNull();
  });

  it("supports open and select via Menu tester", async () => {
    const onAction = vi.fn();

    render(<DropdownFixture onAction={onAction} />);

    const tester = testUtilUser.createTester("Menu", {
      root: screen.getByRole("button", {name: "Menu"}),
    });

    expect(tester.getMenu()).toBeNull();

    await tester.open();
    runAllTimers();

    const menu = tester.getMenu();

    expect(menu).not.toBeNull();
    expect(menu).toHaveAttribute("data-slot", "dropdown-menu");
    expect(document.querySelector('[data-slot="dropdown-popover"]')).not.toBeNull();
    expect(tester.getOptions()).toHaveLength(3);

    await tester.toggleOptionSelection({option: "Copy link"});
    runAllTimers();

    expect(onAction.mock.calls[0]?.[0]).toBe("copy-link");
    expect(tester.getMenu()).toBeNull();
  });

  it("supports open and select via keyboard", async () => {
    const onAction = vi.fn();

    render(<DropdownFixture onAction={onAction} />);

    const tester = testUtilUser.createTester("Menu", {
      root: screen.getByRole("button", {name: "Menu"}),
      interactionType: "keyboard",
    });

    await tester.open();
    runAllTimers();

    expect(tester.getMenu()).not.toBeNull();

    await tester.toggleOptionSelection({option: "Delete file"});
    runAllTimers();

    expect(onAction.mock.calls[0]?.[0]).toBe("delete-file");
    expect(tester.getMenu()).toBeNull();
  });

  it("supports Escape dismiss without selecting", async () => {
    const onAction = vi.fn();

    render(<DropdownFixture onAction={onAction} />);

    const tester = testUtilUser.createTester("Menu", {
      root: screen.getByRole("button", {name: "Menu"}),
    });

    await tester.open();
    runAllTimers();
    expect(tester.getMenu()).not.toBeNull();

    await tester.close();
    runAllTimers();

    expect(tester.getMenu()).toBeNull();
    expect(onAction).not.toHaveBeenCalled();
  });

  /** Regressions for the leftover dropdown overlay reported in #6344 and #6361. */
  describe("handing off to a modal-level overlay", () => {
    const selectItem = async (option: string) => {
      const tester = testUtilUser.createTester("Menu", {
        root: screen.getByRole("button", {name: "Menu"}),
      });

      await tester.open();
      runAllTimers();

      await tester.toggleOptionSelection({option});
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

    it("keeps a controlled dropdown closed once the AlertDialog holds focus", async () => {
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
