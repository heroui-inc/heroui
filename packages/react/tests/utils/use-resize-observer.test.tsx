import {act, render} from "@heroui/testing/helpers";
import {useRef} from "react";

import {useResizeObserver} from "@/utils/use-resize-observer";

class FakeResizeObserver {
  static instances: FakeResizeObserver[] = [];

  observed: Element[] = [];
  isDisconnected = false;

  constructor(readonly callback: (entries: unknown[]) => void) {
    FakeResizeObserver.instances.push(this);
  }

  observe(element: Element) {
    this.observed.push(element);
  }

  unobserve() {}

  disconnect() {
    this.isDisconnected = true;
  }
}

const Box = ({onResize}: {onResize: () => void}) => {
  const ref = useRef<HTMLDivElement>(null);

  useResizeObserver({onResize, ref});

  return <div ref={ref} data-testid="box" />;
};

const resize = () => {
  act(() => {
    FakeResizeObserver.instances.at(-1)!.callback([{}]);
  });
};

describe("useResizeObserver", () => {
  beforeEach(() => {
    FakeResizeObserver.instances = [];
    vi.stubGlobal("ResizeObserver", FakeResizeObserver);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("calls onResize when the observed element resizes", () => {
    const onResize = vi.fn();
    const {getByTestId} = render(<Box onResize={onResize} />);

    expect(FakeResizeObserver.instances[0]!.observed).toEqual([getByTestId("box")]);
    expect(onResize).not.toHaveBeenCalled();

    resize();

    expect(onResize).toHaveBeenCalledTimes(1);
  });

  it("calls the latest onResize without observing again", () => {
    const first = vi.fn();
    const second = vi.fn();
    const {rerender} = render(<Box onResize={first} />);

    rerender(<Box onResize={second} />);
    resize();

    expect(FakeResizeObserver.instances).toHaveLength(1);
    expect(first).not.toHaveBeenCalled();
    expect(second).toHaveBeenCalledTimes(1);
  });

  it("supports disconnecting on unmount", () => {
    const {unmount} = render(<Box onResize={vi.fn()} />);

    unmount();

    expect(FakeResizeObserver.instances[0]!.isDisconnected).toBe(true);
  });

  it("supports the window resize event when ResizeObserver is unavailable", () => {
    vi.stubGlobal("ResizeObserver", undefined);

    const onResize = vi.fn();
    const {unmount} = render(<Box onResize={onResize} />);

    act(() => {
      window.dispatchEvent(new Event("resize"));
    });

    expect(onResize).toHaveBeenCalledTimes(1);

    unmount();
    window.dispatchEvent(new Event("resize"));

    expect(onResize).toHaveBeenCalledTimes(1);
  });
});
