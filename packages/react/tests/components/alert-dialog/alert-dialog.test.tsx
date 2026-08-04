import {User, cleanup, render, runAllTimers, screen, setupUser} from "@heroui/testing/helpers";

import {AlertDialogFixture} from "./fixtures";

const renderAlertDialog = (
  props: {
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    isDismissable?: boolean;
    isKeyboardDismissDisabled?: boolean;
  } = {},
) => render(<AlertDialogFixture {...props} />);

describe("AlertDialog", () => {
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

  it("exposes alertdialog role and compound slots", async () => {
    renderAlertDialog();

    const tester = testUtilUser.createTester("Dialog", {
      root: screen.getByRole("button", {name: "Delete Project"}),
      overlayType: "modal",
    });

    expect(tester.getDialog()).toBeNull();

    await tester.open();
    runAllTimers();

    const dialog = tester.getDialog();

    expect(dialog).not.toBeNull();
    expect(dialog).toHaveAttribute("role", "alertdialog");
    expect(dialog).toHaveAttribute("data-slot", "alert-dialog-dialog");
    expect(document.querySelector('[data-slot="alert-dialog-backdrop"]')).not.toBeNull();
    expect(document.querySelector('[data-slot="alert-dialog-container"]')).not.toBeNull();
    expect(document.querySelector('[data-slot="alert-dialog-header"]')).not.toBeNull();
    expect(document.querySelector('[data-slot="alert-dialog-body"]')).not.toBeNull();
    expect(document.querySelector('[data-slot="alert-dialog-footer"]')).not.toBeNull();
    expect(document.querySelector('[data-slot="alert-dialog-icon"]')).not.toBeNull();
    expect(screen.getByRole("heading", {name: "Delete project permanently?"})).toBeInTheDocument();

    await user.click(document.querySelector('[data-slot="alert-dialog-close-trigger"]')!);
    runAllTimers();

    expect(screen.queryByRole("alertdialog")).toBeNull();
  });

  it("supports blocked Escape by default", async () => {
    const onOpenChange = vi.fn();

    renderAlertDialog({defaultOpen: true, onOpenChange});
    runAllTimers();

    expect(screen.getByRole("alertdialog")).toBeInTheDocument();

    await user.keyboard("{Escape}");
    runAllTimers();

    expect(screen.getByRole("alertdialog")).toBeInTheDocument();
    expect(onOpenChange).not.toHaveBeenCalledWith(false);
  });

  it("supports closing via CloseTrigger", async () => {
    const onOpenChange = vi.fn();

    renderAlertDialog({defaultOpen: true, onOpenChange});
    runAllTimers();

    await user.click(document.querySelector('[data-slot="alert-dialog-close-trigger"]')!);
    runAllTimers();

    expect(onOpenChange).toHaveBeenCalledWith(false);
    expect(screen.queryByRole("alertdialog")).toBeNull();
  });

  it("supports Escape dismiss when keyboard dismiss is enabled", async () => {
    const onOpenChange = vi.fn();

    renderAlertDialog({
      defaultOpen: true,
      onOpenChange,
      isKeyboardDismissDisabled: false,
    });
    runAllTimers();

    expect(screen.getByRole("alertdialog")).toBeInTheDocument();

    await user.keyboard("{Escape}");
    runAllTimers();

    expect(onOpenChange).toHaveBeenCalledWith(false);
    expect(screen.queryByRole("alertdialog")).toBeNull();
  });
});
