import {advanceTimersByTime, cleanup, render, screen} from "@heroui/testing/helpers";

import {useFrameDeferred} from "@/utils/use-frame-deferred";

const FRAME = 16;

const Probe = ({value}: {value: boolean}) => (
  <span data-testid="probe" data-value={String(useFrameDeferred(value))} />
);

const renderedValue = () => screen.getByTestId("probe").getAttribute("data-value");

describe("useFrameDeferred", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    cleanup();
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("renders the initial value without waiting", () => {
    render(<Probe value />);

    expect(renderedValue()).toBe("true");
  });

  it("applies a change to true on the second frame", () => {
    const {rerender} = render(<Probe value={false} />);

    rerender(<Probe value />);
    expect(renderedValue()).toBe("false");

    advanceTimersByTime(FRAME);
    expect(renderedValue()).toBe("false");

    advanceTimersByTime(FRAME);
    expect(renderedValue()).toBe("true");
  });

  it("applies a change to false on the second frame", () => {
    const {rerender} = render(<Probe value />);

    rerender(<Probe value={false} />);
    advanceTimersByTime(FRAME);
    expect(renderedValue()).toBe("true");

    advanceTimersByTime(FRAME);
    expect(renderedValue()).toBe("false");
  });

  it("drops a change that is reverted before it applies", () => {
    const {rerender} = render(<Probe value={false} />);

    rerender(<Probe value />);
    advanceTimersByTime(FRAME);
    rerender(<Probe value={false} />);
    advanceTimersByTime(FRAME * 4);

    expect(renderedValue()).toBe("false");
  });

  it("cancels pending frames on unmount", () => {
    const requestFrame = vi.spyOn(globalThis, "requestAnimationFrame");
    const cancelFrame = vi.spyOn(globalThis, "cancelAnimationFrame");
    const {rerender, unmount} = render(<Probe value={false} />);

    rerender(<Probe value />);
    unmount();
    advanceTimersByTime(FRAME * 4);

    expect(cancelFrame).toHaveBeenCalledWith(requestFrame.mock.results[0]?.value);
    expect(requestFrame).toHaveBeenCalledTimes(1);
  });
});
