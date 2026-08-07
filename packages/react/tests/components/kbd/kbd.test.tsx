import {render, screen} from "@heroui/testing/helpers";

import {Kbd} from "@/components/kbd";

describe("Kbd", () => {
  it("renders abbreviated key and content", () => {
    render(
      <Kbd>
        <Kbd.Abbr keyValue="command" />
        <Kbd.Content>K</Kbd.Content>
      </Kbd>,
    );

    expect(screen.getByText("⌘")).toBeInTheDocument();
    expect(screen.getByText("K")).toBeInTheDocument();
  });

  it("exposes a title label for the abbreviated key", () => {
    render(
      <Kbd>
        <Kbd.Abbr keyValue="command" />
      </Kbd>,
    );

    expect(screen.getByTitle("Command")).toBeInTheDocument();
  });

  it("exposes BEM block class on the root", () => {
    render(
      <Kbd data-testid="kbd">
        <Kbd.Content>Esc</Kbd.Content>
      </Kbd>,
    );

    expect(screen.getByTestId("kbd").className).toEqual(expect.stringContaining("kbd"));
  });

  it("exposes variant BEM modifier", () => {
    render(
      <Kbd data-testid="kbd" variant="light">
        <Kbd.Content>Esc</Kbd.Content>
      </Kbd>,
    );

    expect(screen.getByTestId("kbd").className).toEqual(expect.stringContaining("kbd--light"));
  });

  it("supports data attribute passthrough", () => {
    render(
      <Kbd data-foo="bar" data-testid="kbd">
        <Kbd.Content>Esc</Kbd.Content>
      </Kbd>,
    );

    expect(screen.getByTestId("kbd")).toHaveAttribute("data-foo", "bar");
  });
});
