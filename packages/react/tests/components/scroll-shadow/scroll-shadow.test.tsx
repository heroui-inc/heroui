import {render, screen} from "@heroui/testing/helpers";

import {ScrollShadow} from "@/components/scroll-shadow";

describe("ScrollShadow", () => {
  it("renders children content", () => {
    render(<ScrollShadow>Scrollable content</ScrollShadow>);

    expect(screen.getByText("Scrollable content")).toBeInTheDocument();
  });

  it("exposes BEM block and data-slot", () => {
    render(<ScrollShadow data-testid="scroll-shadow">Content</ScrollShadow>);
    const scrollShadow = screen.getByTestId("scroll-shadow");

    expect(scrollShadow).toHaveAttribute("data-slot", "scroll-shadow");
    expect(scrollShadow.className).toEqual(expect.stringContaining("scroll-shadow"));
  });

  it("exposes orientation BEM modifier and data attribute", () => {
    render(
      <ScrollShadow data-testid="scroll-shadow" orientation="horizontal">
        Content
      </ScrollShadow>,
    );
    const scrollShadow = screen.getByTestId("scroll-shadow");

    expect(scrollShadow).toHaveAttribute("data-orientation", "horizontal");
    expect(scrollShadow.className).toEqual(expect.stringContaining("scroll-shadow--horizontal"));
  });

  it("exposes hideScrollBar BEM modifier", () => {
    render(
      <ScrollShadow hideScrollBar data-testid="scroll-shadow">
        Content
      </ScrollShadow>,
    );

    expect(screen.getByTestId("scroll-shadow").className).toEqual(
      expect.stringContaining("scroll-shadow--hide-scrollbar"),
    );
  });

  describe("shadow mode", () => {
    it("exposes the auto mode that drives the scroll-timeline fade", () => {
      render(<ScrollShadow data-testid="scroll-shadow">Content</ScrollShadow>);

      expect(screen.getByTestId("scroll-shadow")).toHaveAttribute(
        "data-scroll-shadow-mode",
        "auto",
      );
    });

    it("falls back to manual mode when visibility is controlled", () => {
      render(
        <ScrollShadow data-testid="scroll-shadow" visibility="both">
          Content
        </ScrollShadow>,
      );

      expect(screen.getByTestId("scroll-shadow")).toHaveAttribute(
        "data-scroll-shadow-mode",
        "manual",
      );
    });

    it("falls back to manual mode when detection is disabled", () => {
      render(
        <ScrollShadow data-testid="scroll-shadow" isEnabled={false}>
          Content
        </ScrollShadow>,
      );

      expect(screen.getByTestId("scroll-shadow")).toHaveAttribute(
        "data-scroll-shadow-mode",
        "manual",
      );
    });
  });

  it("keeps the shadow size and offset variables when a style prop is supplied", () => {
    render(
      <ScrollShadow data-testid="scroll-shadow" offset={20} size={64} style={{height: 240}}>
        Content
      </ScrollShadow>,
    );
    const scrollShadow = screen.getByTestId("scroll-shadow");

    expect(scrollShadow.style.getPropertyValue("--scroll-shadow-size")).toBe("64px");
    expect(scrollShadow.style.getPropertyValue("--scroll-shadow-offset")).toBe("20px");
    expect(scrollShadow.style.height).toBe("240px");
  });

  it("supports data attribute passthrough", () => {
    render(
      <ScrollShadow data-foo="bar" data-testid="scroll-shadow">
        Content
      </ScrollShadow>,
    );

    expect(screen.getByTestId("scroll-shadow")).toHaveAttribute("data-foo", "bar");
  });
});
