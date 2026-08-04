import {User, cleanup, render, runAllTimers, screen, setupUser} from "@heroui/testing/helpers";

import {DrawerFixture} from "./fixtures";

const renderDrawer = (
  props: {
    defaultOpen?: boolean;
    isOpen?: boolean;
    isDismissable?: boolean;
    isKeyboardDismissDisabled?: boolean;
    onOpenChange?: (open: boolean) => void;
    placement?: "top" | "bottom" | "left" | "right";
  } = {},
) => render(<DrawerFixture {...props} />);

describe("Drawer", () => {
  let user: ReturnType<typeof setupUser>;
  let testUtilUser: User;

  beforeEach(() => {
    vi.useFakeTimers({shouldAdvanceTime: true});
    user = setupUser({advanceTimers: vi.advanceTimersByTime});
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

  it("exposes compound slots via Dialog tester", async () => {
    renderDrawer();

    const tester = testUtilUser.createTester("Dialog", {
      root: screen.getByRole("button", {name: "Open Drawer"}),
      overlayType: "modal",
    });

    expect(tester.getDialog()).toBeNull();

    await tester.open();
    runAllTimers();

    const dialog = tester.getDialog();

    expect(dialog).not.toBeNull();
    expect(dialog).toHaveAttribute("data-slot", "drawer-dialog");
    expect(dialog?.className).toEqual(expect.stringContaining("drawer__dialog"));
    expect(document.querySelector('[data-slot="drawer-backdrop"]')).not.toBeNull();
    expect(document.querySelector('[data-slot="drawer-content"]')).not.toBeNull();
    expect(document.querySelector('[data-slot="drawer-handle"]')).not.toBeNull();
    expect(document.querySelector('[data-slot="drawer-header"]')).not.toBeNull();
    expect(document.querySelector('[data-slot="drawer-body"]')).not.toBeNull();
    expect(document.querySelector('[data-slot="drawer-footer"]')).not.toBeNull();
    expect(screen.getByRole("heading", {name: "Drawer Title"})).toBeInTheDocument();

    await tester.close();
    runAllTimers();

    expect(tester.getDialog()).toBeNull();
  });

  it("supports Escape dismiss when dismissable", async () => {
    const onOpenChange = vi.fn();

    renderDrawer({defaultOpen: true, onOpenChange});
    runAllTimers();

    expect(screen.getByRole("dialog")).toBeInTheDocument();

    await user.keyboard("{Escape}");
    runAllTimers();

    expect(onOpenChange).toHaveBeenCalledWith(false);
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("blocks Escape dismiss when keyboard dismiss is disabled", async () => {
    const onOpenChange = vi.fn();

    renderDrawer({defaultOpen: true, isKeyboardDismissDisabled: true, onOpenChange});
    runAllTimers();

    expect(screen.getByRole("dialog")).toBeInTheDocument();

    await user.keyboard("{Escape}");
    runAllTimers();

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(onOpenChange).not.toHaveBeenCalledWith(false);
  });

  it("supports closing via CloseTrigger when outside dismiss is disabled", async () => {
    const onOpenChange = vi.fn();

    renderDrawer({defaultOpen: true, isDismissable: false, onOpenChange});
    runAllTimers();

    await user.click(screen.getByRole("button", {name: "Close"}));
    runAllTimers();

    expect(onOpenChange).toHaveBeenCalledWith(false);
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("exposes placement content modifier and data-placement", async () => {
    renderDrawer({defaultOpen: true, placement: "right"});
    runAllTimers();

    const content = document.querySelector('[data-slot="drawer-content"]');

    expect(content).toHaveAttribute("data-placement", "right");
    expect(content?.className).toEqual(expect.stringContaining("drawer__content--right"));
  });

  it("supports controlled isOpen", async () => {
    const onOpenChange = vi.fn();

    const {rerender} = renderDrawer({isOpen: false, onOpenChange});

    runAllTimers();

    expect(screen.queryByRole("dialog")).toBeNull();

    rerender(<DrawerFixture isOpen onOpenChange={onOpenChange} />);
    runAllTimers();

    expect(screen.getByRole("dialog")).toBeInTheDocument();

    await user.keyboard("{Escape}");
    runAllTimers();

    expect(onOpenChange).toHaveBeenCalledWith(false);
    // Controlled: stays open until `isOpen` changes.
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });
});
