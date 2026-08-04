import {render, screen} from "@heroui/testing/helpers";

import {Badge} from "@/components/badge";

describe("Badge", () => {
  it("renders text content", () => {
    render(<Badge>5</Badge>);

    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("exposes BEM block and data-slot", () => {
    render(<Badge data-testid="badge">5</Badge>);
    const badge = screen.getByTestId("badge");

    expect(badge).toHaveAttribute("data-slot", "badge");
    expect(badge.className).toEqual(expect.stringContaining("badge"));
  });

  it("exposes color BEM modifier", () => {
    render(
      <Badge color="accent" data-testid="badge">
        5
      </Badge>,
    );

    expect(screen.getByTestId("badge").className).toEqual(expect.stringContaining("badge--accent"));
  });

  it("supports data attribute passthrough", () => {
    render(
      <Badge data-foo="bar" data-testid="badge">
        5
      </Badge>,
    );

    expect(screen.getByTestId("badge")).toHaveAttribute("data-foo", "bar");
  });

  it("renders string children in a labeled sub-part", () => {
    render(<Badge>New</Badge>);

    expect(document.querySelector('[data-slot="badge-label"]')).not.toBeNull();
  });

  describe("Badge.Anchor", () => {
    it("exposes data-slot when composing with a badge", () => {
      render(
        <Badge.Anchor data-testid="anchor">
          <span>Avatar</span>
          <Badge>5</Badge>
        </Badge.Anchor>,
      );

      expect(screen.getByTestId("anchor")).toHaveAttribute("data-slot", "badge-anchor");
    });
  });
});
