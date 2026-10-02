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

  describe("scrollbar gutter", () => {
    const VIEWPORT_WIDTH = 1024;

    // A classic scrollbar makes react-aria's scroll lock reserve the column with
    // `scrollbar-gutter: stable`, which keeps the fixed backdrop out of it. Overlay
    // scrollbars (width 0) never reserve anything, so the page is left untouched.
    const setScrollbarWidth = (scrollbarWidth: number) => {
      window.innerWidth = VIEWPORT_WIDTH;
      Object.defineProperty(document.documentElement, "clientWidth", {
        configurable: true,
        value: VIEWPORT_WIDTH - scrollbarWidth,
      });
    };

    afterEach(() => {
      Reflect.deleteProperty(document.documentElement, "clientWidth");
      document.documentElement.style.removeProperty("scrollbar-gutter");
      document.documentElement.style.removeProperty("padding-right");
      document.documentElement.style.removeProperty("padding-left");
      document.documentElement.style.removeProperty("direction");
    });

    const getBackdrop = () => document.querySelector<HTMLElement>('[data-slot="modal-backdrop"]')!;

    it("releases the reserved gutter and pads the page instead", () => {
      setScrollbarWidth(15);

      const {unmount} = renderModal({defaultOpen: true});

      runAllTimers();

      expect(document.documentElement.style.getPropertyValue("scrollbar-gutter")).toBe("auto");
      expect(document.documentElement.style.paddingRight).toBe("15px");

      unmount();
      runAllTimers();

      expect(document.documentElement.style.paddingRight).toBe("");
    });

    it("pads the leading side when the page is right to left", () => {
      setScrollbarWidth(15);
      document.documentElement.style.direction = "rtl";

      renderModal({defaultOpen: true});
      runAllTimers();

      expect(document.documentElement.style.paddingLeft).toBe("15px");
      expect(document.documentElement.style.paddingRight).toBe("");
    });

    it("adds the gutter to the padding the page already has", () => {
      setScrollbarWidth(15);

      const sheet = document.createElement("style");

      sheet.textContent = "html { padding-right: 4px; }";
      document.head.append(sheet);

      renderModal({defaultOpen: true});
      runAllTimers();

      expect(document.documentElement.style.paddingRight).toBe("19px");

      sheet.remove();
    });

    it("does not inset the page when no gutter is reserved", () => {
      setScrollbarWidth(0);

      renderModal({defaultOpen: true});
      runAllTimers();

      expect(document.documentElement.style.getPropertyValue("scrollbar-gutter")).toBe("");
      expect(document.documentElement.style.paddingRight).toBe("");
    });

    it("forwards the backdrop ref", () => {
      setScrollbarWidth(0);

      const onBackdropMount = vi.fn();

      render(<ModalFixture defaultOpen onBackdropMount={onBackdropMount} />);
      runAllTimers();

      expect(onBackdropMount).toHaveBeenCalledWith(getBackdrop());
    });
  });
});
