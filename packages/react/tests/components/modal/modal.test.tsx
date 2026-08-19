import {User, cleanup, render, runAllTimers, screen, setupUser} from "@heroui/testing/helpers";

import {ModalFixture} from "./fixtures";

const renderModal = (props: {defaultOpen?: boolean; onOpenChange?: (open: boolean) => void} = {}) =>
  render(<ModalFixture {...props} />);

describe("Modal", () => {
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
    renderModal();

    const tester = testUtilUser.createTester("Dialog", {
      root: screen.getByRole("button", {name: "Open modal"}),
      overlayType: "modal",
    });

    expect(tester.getDialog()).toBeNull();

    await tester.open();
    runAllTimers();

    const dialog = tester.getDialog();

    expect(dialog).not.toBeNull();
    expect(dialog).toHaveAttribute("data-slot", "modal-dialog");
    expect(dialog?.className).toEqual(expect.stringContaining("modal__dialog"));
    expect(document.querySelector('[data-slot="modal-backdrop"]')).not.toBeNull();
    expect(document.querySelector('[data-slot="modal-container"]')).not.toBeNull();
    expect(document.querySelector('[data-slot="modal-header"]')).not.toBeNull();
    expect(document.querySelector('[data-slot="modal-body"]')).not.toBeNull();
    expect(document.querySelector('[data-slot="modal-footer"]')).not.toBeNull();
    expect(screen.getByRole("heading", {name: "Welcome"})).toBeInTheDocument();

    await tester.close();
    runAllTimers();

    expect(tester.getDialog()).toBeNull();
  });

  it("supports Escape dismiss", async () => {
    const onOpenChange = vi.fn();

    renderModal({defaultOpen: true, onOpenChange});
    runAllTimers();

    expect(screen.getByRole("dialog")).toBeInTheDocument();

    await user.keyboard("{Escape}");
    runAllTimers();

    expect(onOpenChange).toHaveBeenCalledWith(false);
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("supports closing via CloseTrigger", async () => {
    const onOpenChange = vi.fn();

    renderModal({defaultOpen: true, onOpenChange});
    runAllTimers();

    await user.click(document.querySelector('[data-slot="modal-close-trigger"]')!);
    runAllTimers();

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});
