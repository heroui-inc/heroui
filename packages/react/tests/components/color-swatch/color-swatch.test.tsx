import {render, screen} from "@heroui/testing/helpers";

import {ColorSwatch} from "@/components/color-swatch";

describe("ColorSwatch", () => {
  it("renders with img role", () => {
    render(<ColorSwatch color="#0485F7" />);

    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  it("exposes BEM block and data-slot", () => {
    render(<ColorSwatch color="#0485F7" />);
    const swatch = screen.getByRole("img");

    expect(swatch).toHaveAttribute("data-slot", "color-swatch");
    expect(swatch.className).toEqual(expect.stringContaining("color-swatch"));
  });

  it("exposes size and shape BEM modifiers", () => {
    render(<ColorSwatch color="#0485F7" shape="square" size="lg" />);
    const swatch = screen.getByRole("img");

    expect(swatch.className).toEqual(expect.stringContaining("color-swatch--lg"));
    expect(swatch.className).toEqual(expect.stringContaining("color-swatch--square"));
  });

  it("supports a custom accessible name via colorName", () => {
    render(<ColorSwatch color="#0485F7" colorName="Brand blue" />);

    expect(screen.getByRole("img", {name: "Brand blue"})).toBeInTheDocument();
  });
});
