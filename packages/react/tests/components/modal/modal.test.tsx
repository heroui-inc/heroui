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

    // A classic scrollbar makes react-aria reserve `scrollbar-gutter: stable`. That
    // reservation is what keeps the page from shifting, so the overlay must not clear it
    // or pad the document. Overlay scrollbars (width 0) leave the page untouched.
    const setScrollbarWidth = (scrollbarWidth: number) => {
      window.innerWidth = VIEWPORT_WIDTH;
      Object.defineProperty(document.documentElement, "clientWidth", {
        configurable: true,
        value: VIEWPORT_WIDTH - scrollbarWidth,
      });
    };

    afterEach(() => {
      vi.restoreAllMocks();
      Reflect.deleteProperty(document.documentElement, "clientWidth");
      document.documentElement.style.removeProperty("scrollbar-gutter");
      document.documentElement.style.removeProperty("padding-right");
      document.documentElement.style.removeProperty("padding-left");
      document.documentElement.style.removeProperty("background-color");
      document.body.style.removeProperty("margin-right");
      document.body.style.removeProperty("margin-left");
      document.body.style.removeProperty("background-color");
    });

    const getBackdrop = () => document.querySelector<HTMLElement>('[data-slot="modal-backdrop"]')!;

    it("keeps the reserved gutter so the page does not shift", () => {
      setScrollbarWidth(15);

      renderModal({defaultOpen: true});
      runAllTimers();

      expect(document.documentElement.style.getPropertyValue("scrollbar-gutter")).toBe("stable");
      expect(document.documentElement.style.paddingRight).toBe("");
      expect(document.body.style.marginRight).toBe("");
    });

    it("paints the reserved gutter with the backdrop wash", () => {
      setScrollbarWidth(15);
      document.body.style.backgroundColor = "rgb(200, 200, 200)";
      vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue({
        fillStyle: "",
        fillRect() {},
        getImageData: () => ({data: new Uint8ClampedArray([9, 8, 7, 255])}),
      } as unknown as CanvasRenderingContext2D);

      render(
        <ModalFixture
          defaultOpen
          onBackdropMount={(node) => {
            node?.style.setProperty("background-color", "rgba(0, 0, 0, 0.5)");
          }}
        />,
      );
      runAllTimers();

      expect(document.documentElement.style.backgroundColor).toBe("rgb(9, 8, 7)");
      expect(document.documentElement.style.getPropertyValue("scrollbar-gutter")).toBe("stable");
      expect(document.body.style.marginRight).toBe("");
    });

    it("does not inset the page when no gutter is reserved", () => {
      setScrollbarWidth(0);

      renderModal({defaultOpen: true});
      runAllTimers();

      expect(document.documentElement.style.getPropertyValue("scrollbar-gutter")).toBe("");
      expect(document.body.style.marginRight).toBe("");
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
