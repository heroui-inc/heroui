import {render, screen} from "@heroui/testing/helpers";

import {Chip} from "@/components/chip";

describe("Chip", () => {
  it("renders text content", () => {
    render(<Chip>New</Chip>);

    expect(screen.getByText("New")).toBeInTheDocument();
  });

  it("exposes BEM block and data-slot", () => {
    render(<Chip data-testid="status">Beta</Chip>);
    const chip = screen.getByTestId("status");

    expect(chip).toHaveAttribute("data-slot", "chip");
    expect(chip.className).toEqual(expect.stringContaining("chip"));
  });

  it("exposes color BEM modifier", () => {
    render(
      <Chip color="accent" data-testid="chip">
        Pro
      </Chip>,
    );

    expect(screen.getByTestId("chip").className).toEqual(expect.stringContaining("chip--accent"));
  });

  it("supports data attribute passthrough", () => {
    render(
      <Chip data-foo="bar" data-testid="chip">
        Tag
      </Chip>,
    );

    expect(screen.getByTestId("chip")).toHaveAttribute("data-foo", "bar");
  });

  describe("Chip.Label", () => {
    it("exposes data-slot when composed", () => {
      render(
        <Chip>
          <Chip.Label>Pro</Chip.Label>
        </Chip>,
      );

      expect(screen.getByText("Pro")).toBeInTheDocument();
      expect(document.querySelector('[data-slot="chip-label"]')).not.toBeNull();
    });
  });
});
