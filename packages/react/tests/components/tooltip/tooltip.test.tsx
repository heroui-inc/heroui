import {act, cleanup, render, runAllTimers, screen, setupUser} from "@heroui/testing/helpers";

import {Button} from "@/components/button";
import {Tooltip} from "@/components/tooltip";

/** Prime RAC tooltip warmup flag (first hover races under fake timers). */
const primeTooltipWarmup = async (user: ReturnType<typeof setupUser>) => {
  const view = render(
    <Tooltip delay={0}>
      <Button>Warmup</Button>
      <Tooltip.Content>warm</Tooltip.Content>
    </Tooltip>,
  );

  await user.hover(screen.getByRole("button", {name: "Warmup"}));
  view.unmount();

  await act(async () => {
    vi.runOnlyPendingTimers();
  });
};

describe("Tooltip", () => {
  let user: ReturnType<typeof setupUser>;

  beforeEach(async () => {
    vi.useFakeTimers({shouldAdvanceTime: true});
    user = setupUser({advanceTimers: vi.advanceTimersByTime});
    await primeTooltipWarmup(user);
  });

  afterEach(() => {
    cleanup();
    runAllTimers();
    vi.useRealTimers();
  });

  it("exposes Tooltip.Trigger data-slot", () => {
    render(
      <Tooltip delay={0}>
        <Tooltip.Trigger aria-label="Info">
          <span>i</span>
        </Tooltip.Trigger>
        <Tooltip.Content>Tooltip content</Tooltip.Content>
      </Tooltip>,
    );

    expect(document.querySelector('[data-slot="tooltip-trigger"]')).not.toBeNull();
  });

  it("renders content on hover with BEM block", async () => {
    render(
      <Tooltip delay={0}>
        <Button>Hover me</Button>
        <Tooltip.Content>Hover tip</Tooltip.Content>
      </Tooltip>,
    );

    await user.hover(screen.getByRole("button", {name: "Hover me"}));
    await act(async () => {
      vi.advanceTimersByTime(0);
    });

    const tooltip = screen.getByRole("tooltip");

    expect(tooltip).toHaveTextContent("Hover tip");
    expect(tooltip.className).toEqual(expect.stringContaining("tooltip"));
  });

  it("supports hiding content after closeDelay on unhover", async () => {
    render(
      <Tooltip closeDelay={300} delay={0}>
        <Button>Hover me</Button>
        <Tooltip.Content>Closable tip</Tooltip.Content>
      </Tooltip>,
    );

    const trigger = screen.getByRole("button", {name: "Hover me"});

    await user.hover(trigger);
    await act(async () => {
      vi.advanceTimersByTime(0);
    });

    expect(screen.getByRole("tooltip")).toBeInTheDocument();

    await user.unhover(trigger);
    expect(screen.getByRole("tooltip")).toBeInTheDocument();

    await act(async () => {
      vi.advanceTimersByTime(300);
    });

    expect(screen.queryByRole("tooltip")).toBeNull();
  });

  it("supports isDisabled without showing content", async () => {
    render(
      <Tooltip isDisabled delay={0}>
        <Button>Hover me</Button>
        <Tooltip.Content>Should not appear</Tooltip.Content>
      </Tooltip>,
    );

    await user.hover(screen.getByRole("button", {name: "Hover me"}));
    await act(async () => {
      vi.advanceTimersByTime(0);
    });

    expect(screen.queryByRole("tooltip")).toBeNull();
  });

  it("renders arrow slot when composed", async () => {
    render(
      <Tooltip delay={0}>
        <Button>Hover me</Button>
        <Tooltip.Content showArrow>
          <Tooltip.Arrow />
          Arrow tip
        </Tooltip.Content>
      </Tooltip>,
    );

    await user.hover(screen.getByRole("button", {name: "Hover me"}));
    await act(async () => {
      vi.advanceTimersByTime(0);
    });

    expect(screen.getByRole("tooltip")).toBeInTheDocument();
    expect(document.querySelector('[data-slot="tooltip-arrow"]')).not.toBeNull();
  });
});
