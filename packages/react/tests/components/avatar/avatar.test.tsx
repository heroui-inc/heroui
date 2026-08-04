import {render, screen} from "@heroui/testing/helpers";

import {Avatar} from "@/components/avatar";

describe("Avatar", () => {
  it("renders fallback text content", () => {
    render(
      <Avatar>
        <Avatar.Fallback>JD</Avatar.Fallback>
      </Avatar>,
    );

    expect(screen.getByText("JD")).toBeInTheDocument();
  });

  it("exposes BEM block class on the root", () => {
    render(
      <Avatar data-testid="avatar">
        <Avatar.Fallback>JD</Avatar.Fallback>
      </Avatar>,
    );

    expect(screen.getByTestId("avatar").className).toEqual(expect.stringContaining("avatar"));
  });

  it("exposes color fallback BEM modifier", () => {
    render(
      <Avatar color="accent">
        <Avatar.Fallback data-testid="fallback">AC</Avatar.Fallback>
      </Avatar>,
    );

    expect(screen.getByTestId("fallback").className).toEqual(
      expect.stringContaining("avatar__fallback--accent"),
    );
  });

  it("supports data attribute passthrough", () => {
    render(
      <Avatar data-foo="bar" data-testid="avatar">
        <Avatar.Fallback>JD</Avatar.Fallback>
      </Avatar>,
    );

    expect(screen.getByTestId("avatar")).toHaveAttribute("data-foo", "bar");
  });

  describe("Avatar.Fallback", () => {
    it("exposes data-slot when composed", () => {
      render(
        <Avatar>
          <Avatar.Fallback>JD</Avatar.Fallback>
        </Avatar>,
      );

      expect(document.querySelector('[data-slot="avatar-fallback"]')).not.toBeNull();
    });
  });
});
