import {render, screen} from "@heroui/testing/helpers";

import {EmptyState} from "@/components/empty-state";

describe("EmptyState", () => {
  it("renders default text content when no children are provided", () => {
    render(<EmptyState />);

    expect(screen.getByText("No results found")).toBeInTheDocument();
  });

  it("renders custom children", () => {
    render(<EmptyState>No matches for your search</EmptyState>);

    expect(screen.getByText("No matches for your search")).toBeInTheDocument();
  });

  it("exposes BEM block and data-slot", () => {
    render(<EmptyState data-testid="empty-state" />);
    const emptyState = screen.getByTestId("empty-state");

    expect(emptyState).toHaveAttribute("data-slot", "empty-state");
    expect(emptyState.className).toEqual(expect.stringContaining("empty-state"));
  });

  it("supports data attribute passthrough", () => {
    render(<EmptyState data-foo="bar" data-testid="empty-state" />);

    expect(screen.getByTestId("empty-state")).toHaveAttribute("data-foo", "bar");
  });
});
