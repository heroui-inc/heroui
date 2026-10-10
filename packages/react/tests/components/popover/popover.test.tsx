import {User, cleanup, render, runAllTimers, screen, setupUser} from "@heroui/testing/helpers";

import {Button} from "@/components/button";
import {Popover} from "@/components/popover";

import {PopoverFixture} from "./fixtures";

const renderPopover = (
  props: {
    isOpen?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
  } = {},
) => render(<PopoverFixture {...props} />);

describe("Popover", () => {
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

  it("exposes dialog slots via Dialog tester", async () => {
    renderPopover();

    const tester = testUtilUser.createTester("Dialog", {
      root: screen.getByRole("button", {name: "Open popover"}),
      overlayType: "popover",
    });

    expect(tester.getDialog()).toBeNull();

    await tester.open();
    runAllTimers();

    const dialog = tester.getDialog();

    expect(dialog).not.toBeNull();
    expect(dialog).toHaveAttribute("data-slot", "popover-dialog");
    expect(dialog?.className).toEqual(expect.stringContaining("popover__dialog"));
    expect(screen.getByText("This is the popover content")).toBeInTheDocument();
    expect(document.querySelector(".popover")).not.toBeNull();

    await tester.close();
    runAllTimers();

    expect(tester.getDialog()).toBeNull();
  });

  it("supports Escape dismiss", async () => {
    const onOpenChange = vi.fn();

    renderPopover({defaultOpen: true, onOpenChange});
    runAllTimers();

    expect(screen.getByRole("dialog")).toBeInTheDocument();

    await user.keyboard("{Escape}");
    runAllTimers();

    expect(onOpenChange).toHaveBeenCalledWith(false);
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  describe("Arrow", () => {
    it("renders a default arrow when no child is provided", () => {
      render(
        <Popover defaultOpen>
          <Button>Open popover</Button>
          <Popover.Content>
            <Popover.Arrow />
            <Popover.Dialog>Content</Popover.Dialog>
          </Popover.Content>
        </Popover>,
      );

      runAllTimers();

      expect(document.querySelector('[data-slot="popover-overlay-arrow-group"]')).not.toBeNull();
      expect(document.querySelector('svg[data-slot="popover-overlay-arrow"]')).not.toBeNull();
    });

    it("tags a custom arrow child with the arrow slot", () => {
      render(
        <Popover defaultOpen>
          <Button>Open popover</Button>
          <Popover.Content>
            <Popover.Arrow>
              <span data-testid="custom-arrow">▲</span>
            </Popover.Arrow>
            <Popover.Dialog>Content</Popover.Dialog>
          </Popover.Content>
        </Popover>,
      );

      runAllTimers();

      const custom = screen.getByTestId("custom-arrow");

      expect(custom).toHaveAttribute("data-slot", "popover-overlay-arrow");
      expect(document.querySelector('svg[data-slot="popover-overlay-arrow"]')).toBeNull();
    });
  });

  describe("Trigger", () => {
    it("exposes the trigger slot and opens the popover on press", async () => {
      render(
        <Popover>
          <Popover.Trigger>Open</Popover.Trigger>
          <Popover.Content>
            <Popover.Dialog>Trigger content</Popover.Dialog>
          </Popover.Content>
        </Popover>,
      );

      const trigger = screen.getByRole("button", {name: "Open"});

      expect(trigger).toHaveAttribute("data-slot", "popover-trigger");
      expect(trigger.className).toEqual(expect.stringContaining("popover__trigger"));

      await user.click(trigger);
      runAllTimers();

      expect(screen.getByText("Trigger content")).toBeInTheDocument();
    });
  });

  it("exposes heading slot", async () => {
    render(
      <Popover defaultOpen>
        <Button>Open popover</Button>
        <Popover.Content>
          <Popover.Dialog>
            <Popover.Heading>Popover heading</Popover.Heading>
          </Popover.Dialog>
        </Popover.Content>
      </Popover>,
    );

    runAllTimers();

    const heading = screen.getByRole("heading", {name: "Popover heading"});

    expect(heading.className).toEqual(expect.stringContaining("popover__heading"));
  });
});
