import {render, screen} from "@heroui/testing/helpers";

import {Skeleton} from "@/components/skeleton";

describe("Skeleton", () => {
  it("exposes BEM block class with the default animation modifier", () => {
    render(<Skeleton data-testid="skeleton" />);
    const skeleton = screen.getByTestId("skeleton");

    expect(skeleton.className).toEqual(expect.stringContaining("skeleton"));
    expect(skeleton.className).toEqual(expect.stringContaining("skeleton--shimmer"));
  });

  it("exposes animationType BEM modifier", () => {
    render(<Skeleton animationType="pulse" data-testid="skeleton" />);

    expect(screen.getByTestId("skeleton").className).toEqual(
      expect.stringContaining("skeleton--pulse"),
    );
  });

  it("supports data attribute passthrough", () => {
    render(<Skeleton data-foo="bar" data-testid="skeleton" />);

    expect(screen.getByTestId("skeleton")).toHaveAttribute("data-foo", "bar");
  });
});
