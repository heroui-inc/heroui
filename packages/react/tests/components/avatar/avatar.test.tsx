import {act, advanceTimersByTime, render, screen} from "@heroui/testing/helpers";

import {Avatar} from "@/components/avatar";

const SRC = "https://example.com/avatar.jpg";

/** jsdom never loads images, so the preloader is driven by hand. */
class FakeImage extends EventTarget {
  static last: FakeImage | undefined;

  complete = false;
  naturalWidth = 0;
  crossOrigin: string | null = null;
  referrerPolicy = "";
  src = "";

  constructor() {
    super();
    FakeImage.last = this;
  }
}

const settleImage = (type: "load" | "error") => {
  act(() => {
    const image = FakeImage.last!;

    image.complete = true;
    image.naturalWidth = type === "load" ? 40 : 0;
    image.dispatchEvent(new Event(type));
  });
};

describe("Avatar", () => {
  it("renders fallback text content", () => {
    render(
      <Avatar>
        <Avatar.Fallback>JD</Avatar.Fallback>
      </Avatar>,
    );

    expect(screen.getByText("JD")).toBeInTheDocument();
  });

  it("exposes BEM block class on the root", () => {
    render(
      <Avatar data-testid="avatar">
        <Avatar.Fallback>JD</Avatar.Fallback>
      </Avatar>,
    );

    expect(screen.getByTestId("avatar").className).toEqual(expect.stringContaining("avatar"));
  });

  it("exposes color fallback BEM modifier", () => {
    render(
      <Avatar color="accent">
        <Avatar.Fallback data-testid="fallback">AC</Avatar.Fallback>
      </Avatar>,
    );

    expect(screen.getByTestId("fallback").className).toEqual(
      expect.stringContaining("avatar__fallback--accent"),
    );
  });

  it("supports data attribute passthrough", () => {
    render(
      <Avatar data-foo="bar" data-testid="avatar">
        <Avatar.Fallback>JD</Avatar.Fallback>
      </Avatar>,
    );

    expect(screen.getByTestId("avatar")).toHaveAttribute("data-foo", "bar");
  });

  describe("Avatar.Fallback", () => {
    it("exposes data-slot when composed", () => {
      render(
        <Avatar>
          <Avatar.Fallback>JD</Avatar.Fallback>
        </Avatar>,
      );

      expect(document.querySelector('[data-slot="avatar-fallback"]')).not.toBeNull();
    });

    it("supports asChild", () => {
      render(
        <Avatar>
          <Avatar.Fallback asChild>
            <strong className="custom">JD</strong>
          </Avatar.Fallback>
        </Avatar>,
      );

      const fallback = screen.getByText("JD");

      expect(fallback.tagName).toBe("STRONG");
      expect(fallback.className).toEqual(expect.stringContaining("avatar__fallback"));
      expect(fallback.className).toEqual(expect.stringContaining("custom"));
    });

    describe("delayMs", () => {
      beforeEach(() => {
        vi.useFakeTimers();
      });

      afterEach(() => {
        vi.useRealTimers();
      });

      it("renders the fallback only after the delay", () => {
        render(
          <Avatar>
            <Avatar.Fallback delayMs={600}>JD</Avatar.Fallback>
          </Avatar>,
        );

        expect(screen.queryByText("JD")).toBeNull();

        advanceTimersByTime(600);

        expect(screen.getByText("JD")).toBeInTheDocument();
      });
    });
  });

  describe("Avatar.Image", () => {
    beforeEach(() => {
      FakeImage.last = undefined;
      vi.stubGlobal("Image", FakeImage);
    });

    afterEach(() => {
      vi.unstubAllGlobals();
    });

    it("renders the image and removes the fallback once it loads", () => {
      render(
        <Avatar>
          <Avatar.Image alt="John Doe" src={SRC} />
          <Avatar.Fallback>JD</Avatar.Fallback>
        </Avatar>,
      );

      expect(screen.queryByRole("img")).toBeNull();
      expect(screen.getByText("JD")).toBeInTheDocument();

      settleImage("load");

      expect(screen.getByRole("img", {name: "John Doe"})).toHaveAttribute("src", SRC);
      expect(screen.queryByText("JD")).toBeNull();
    });

    it("renders the fallback when the image fails to load", () => {
      render(
        <Avatar>
          <Avatar.Image alt="John Doe" src={SRC} />
          <Avatar.Fallback>JD</Avatar.Fallback>
        </Avatar>,
      );

      settleImage("error");

      expect(screen.queryByRole("img")).toBeNull();
      expect(screen.getByText("JD")).toBeInTheDocument();
    });

    it("renders the fallback when no src is given", () => {
      render(
        <Avatar>
          <Avatar.Image alt="John Doe" />
          <Avatar.Fallback>JD</Avatar.Fallback>
        </Avatar>,
      );

      expect(screen.queryByRole("img")).toBeNull();
      expect(screen.getByText("JD")).toBeInTheDocument();
    });

    it("calls onLoadingStatusChange as the image loads", () => {
      const onLoadingStatusChange = vi.fn();

      render(
        <Avatar>
          <Avatar.Image alt="John Doe" src={SRC} onLoadingStatusChange={onLoadingStatusChange} />
        </Avatar>,
      );

      expect(onLoadingStatusChange).toHaveBeenLastCalledWith("loading");

      settleImage("load");

      expect(onLoadingStatusChange).toHaveBeenLastCalledWith("loaded");
    });

    it("supports asChild with a custom image element", () => {
      render(
        <Avatar>
          <Avatar.Image asChild src={SRC}>
            <img alt="Custom" className="custom" />
          </Avatar.Image>
        </Avatar>,
      );

      settleImage("load");

      const image = screen.getByRole("img", {name: "Custom"});

      expect(image).toHaveAttribute("src", SRC);
      expect(image.className).toEqual(expect.stringContaining("avatar__image"));
      expect(image.className).toEqual(expect.stringContaining("custom"));
    });
  });
});
