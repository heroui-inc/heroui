import {render, screen, setupUser} from "@heroui/testing/helpers";

import {Link} from "@/components/link";

describe("Link", () => {
  let user: ReturnType<typeof setupUser>;

  beforeAll(() => {
    user = setupUser();
  });

  it("renders with role, accessible name, and href", () => {
    render(<Link href="https://heroui.com">HeroUI</Link>);

    const link = screen.getByRole("link", {name: "HeroUI"});

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "https://heroui.com");
  });

  it("exposes BEM block and data-slot", () => {
    render(<Link href="#docs">Docs</Link>);
    const link = screen.getByRole("link", {name: "Docs"});

    expect(link.className).toEqual(expect.stringContaining("link"));
    expect(link).toHaveAttribute("data-slot", "link");
  });

  it("supports data attribute passthrough", () => {
    render(
      <Link data-foo="bar" data-testid="docs" href="#docs">
        Docs
      </Link>,
    );
    const link = screen.getByTestId("docs");

    expect(link).toHaveAttribute("data-slot", "link");
    expect(link).toHaveAttribute("data-foo", "bar");
  });

  it("supports hover state", async () => {
    render(<Link href="#docs">Docs</Link>);
    const link = screen.getByRole("link", {name: "Docs"});

    await user.hover(link);
    expect(link).toHaveAttribute("data-hovered", "true");

    await user.unhover(link);
    expect(link).not.toHaveAttribute("data-hovered");
  });

  it("supports focus-visible via keyboard", async () => {
    render(<Link href="#docs">Docs</Link>);
    const link = screen.getByRole("link", {name: "Docs"});

    await user.tab();
    expect(link).toHaveFocus();
    expect(link).toHaveAttribute("data-focus-visible", "true");
  });

  it("calls onPress on click", async () => {
    const onPress = vi.fn();

    render(
      <Link href="#docs" onPress={onPress}>
        Docs
      </Link>,
    );

    await user.click(screen.getByRole("link", {name: "Docs"}));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("supports disabled state and blocks press", async () => {
    const onPress = vi.fn();

    render(
      <Link isDisabled href="#docs" onPress={onPress}>
        Docs
      </Link>,
    );
    const link = screen.getByRole("link", {name: "Docs"});

    expect(link).toHaveAttribute("aria-disabled", "true");
    expect(link).toHaveAttribute("data-disabled", "true");

    await user.click(link);
    expect(onPress).not.toHaveBeenCalled();
  });

  it("exposes no hover state when disabled", async () => {
    render(
      <Link isDisabled href="#docs">
        Docs
      </Link>,
    );
    const link = screen.getByRole("link", {name: "Docs"});

    await user.hover(link);
    expect(link).not.toHaveAttribute("data-hovered");
  });

  describe("Link.Icon", () => {
    it("exposes data-slot when composed", () => {
      render(
        <Link href="https://heroui.com">
          HeroUI
          <Link.Icon />
        </Link>,
      );

      const icon = document.querySelector('[data-slot="link-icon"]');

      expect(icon).not.toBeNull();
      expect(icon).toHaveAttribute("data-default-icon", "true");
      expect(icon?.querySelector('[data-slot="link-default-icon"]')).not.toBeNull();
    });

    it("supports custom icon children without default icon marker", () => {
      render(
        <Link href="https://heroui.com">
          HeroUI
          <Link.Icon>
            <span data-testid="custom-icon">→</span>
          </Link.Icon>
        </Link>,
      );

      const icon = document.querySelector('[data-slot="link-icon"]');

      expect(icon).not.toHaveAttribute("data-default-icon");
      expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
      expect(icon?.querySelector('[data-slot="link-default-icon"]')).toBeNull();
    });
  });
});
