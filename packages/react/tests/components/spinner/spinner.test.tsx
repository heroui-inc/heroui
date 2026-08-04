import {render, screen} from "@heroui/testing/helpers";

import {Spinner} from "@/components/spinner";

describe("Spinner", () => {
  it("renders with status role and default accessible name", () => {
    render(<Spinner />);

    expect(screen.getByRole("status", {name: "Loading"})).toBeInTheDocument();
  });

  it("exposes BEM block, data-slot, and icon sub-part", () => {
    render(<Spinner />);
    const spinner = screen.getByRole("status", {name: "Loading"});

    expect(spinner).toHaveAttribute("data-slot", "spinner");
    expect(spinner.className).toEqual(expect.stringContaining("spinner"));
    expect(spinner.querySelector('[data-slot="spinner-icon"]')).not.toBeNull();
  });

  it("supports overriding aria-label", () => {
    render(<Spinner aria-label="Saving changes" />);

    expect(screen.getByRole("status", {name: "Saving changes"})).toBeInTheDocument();
  });

  it("exposes color and size BEM modifiers", () => {
    render(<Spinner color="danger" data-testid="spinner" size="lg" />);
    const spinner = screen.getByTestId("spinner");

    expect(spinner.className).toEqual(expect.stringContaining("spinner--danger"));
    expect(spinner.className).toEqual(expect.stringContaining("spinner--lg"));
  });

  it("supports data attribute passthrough", () => {
    render(<Spinner data-foo="bar" data-testid="spinner" />);

    expect(screen.getByTestId("spinner")).toHaveAttribute("data-foo", "bar");
  });
});
