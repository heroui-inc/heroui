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

  it("supports data attribute passthrough", () => {
    render(
      <ScrollShadow data-foo="bar" data-testid="scroll-shadow">
        Content
      </ScrollShadow>,
    );

    expect(screen.getByTestId("scroll-shadow")).toHaveAttribute("data-foo", "bar");
  });
});
