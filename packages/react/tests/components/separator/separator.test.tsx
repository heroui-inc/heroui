import {render, screen} from "@heroui/testing/helpers";

import {Separator} from "@/components/separator";

describe("Separator", () => {
  it("renders with separator role", () => {
    render(<Separator />);

    expect(screen.getByRole("separator")).toBeInTheDocument();
  });

  it("exposes BEM block and data-slot", () => {
    render(<Separator data-testid="separator" />);
    const separator = screen.getByTestId("separator");

    expect(separator).toHaveAttribute("data-slot", "separator");
    expect(separator.className).toEqual(expect.stringContaining("separator"));
  });

  it("exposes orientation BEM modifier and data attribute", () => {
    render(<Separator data-testid="separator" orientation="vertical" />);
    const separator = screen.getByTestId("separator");

    expect(separator).toHaveAttribute("data-orientation", "vertical");
    expect(separator.className).toEqual(expect.stringContaining("separator--vertical"));
  });

  it("exposes variant BEM modifier", () => {
    render(<Separator data-testid="separator" variant="secondary" />);

    expect(screen.getByTestId("separator").className).toEqual(
      expect.stringContaining("separator--secondary"),
    );
  });

  it("supports data attribute passthrough", () => {
    render(<Separator data-foo="bar" data-testid="separator" />);

    expect(screen.getByTestId("separator")).toHaveAttribute("data-foo", "bar");
  });
});
