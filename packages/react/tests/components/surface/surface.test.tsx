import {render, screen} from "@heroui/testing/helpers";

import {Surface} from "@/components/surface";

describe("Surface", () => {
  it("renders children content", () => {
    render(<Surface>Panel content</Surface>);

    expect(screen.getByText("Panel content")).toBeInTheDocument();
  });

  it("exposes BEM block and data-slot", () => {
    render(<Surface data-testid="surface">Content</Surface>);
    const surface = screen.getByTestId("surface");

    expect(surface).toHaveAttribute("data-slot", "surface");
    expect(surface.className).toEqual(expect.stringContaining("surface"));
  });

  it("exposes variant BEM modifier", () => {
    render(
      <Surface data-testid="surface" variant="secondary">
        Content
      </Surface>,
    );

    expect(screen.getByTestId("surface").className).toEqual(
      expect.stringContaining("surface--secondary"),
    );
  });

  it("supports data attribute passthrough", () => {
    render(
      <Surface data-foo="bar" data-testid="surface">
        Content
      </Surface>,
    );

    expect(screen.getByTestId("surface")).toHaveAttribute("data-foo", "bar");
  });
});
