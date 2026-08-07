import {render, screen} from "@heroui/testing/helpers";

import {Typography} from "@/components/typography";

describe("Typography", () => {
  it("renders text content", () => {
    render(<Typography>HeroUI Typography</Typography>);

    expect(screen.getByText("HeroUI Typography")).toBeInTheDocument();
  });

  it("exposes BEM block, data-slot, and data-type", () => {
    render(<Typography data-testid="typography">Body copy</Typography>);
    const typography = screen.getByTestId("typography");

    expect(typography).toHaveAttribute("data-slot", "typography");
    expect(typography).toHaveAttribute("data-type", "body");
    expect(typography.className).toEqual(expect.stringContaining("typography--body"));
  });

  it("supports data attribute passthrough", () => {
    render(
      <Typography data-foo="bar" data-testid="typography">
        Body copy
      </Typography>,
    );

    expect(screen.getByTestId("typography")).toHaveAttribute("data-foo", "bar");
  });

  describe("Typography.Heading", () => {
    it("renders the requested heading level", () => {
      render(<Typography.Heading level={2}>Section title</Typography.Heading>);

      expect(screen.getByRole("heading", {level: 2, name: "Section title"})).toBeInTheDocument();
    });
  });

  describe("Typography.Paragraph", () => {
    it("exposes size BEM modifier", () => {
      render(
        <Typography.Paragraph data-testid="paragraph" size="sm">
          Small copy
        </Typography.Paragraph>,
      );

      expect(screen.getByTestId("paragraph").className).toEqual(
        expect.stringContaining("typography--body-sm"),
      );
    });
  });

  describe("Typography.Code", () => {
    it("renders as a code element", () => {
      render(<Typography.Code>const x = 1;</Typography.Code>);

      expect(screen.getByText("const x = 1;").tagName).toBe("CODE");
    });
  });

  describe("Typography.Prose", () => {
    it("exposes BEM block and data-slot", () => {
      render(
        <Typography.Prose data-testid="prose">
          <p>Prose content</p>
        </Typography.Prose>,
      );
      const prose = screen.getByTestId("prose");

      expect(prose).toHaveAttribute("data-slot", "prose");
      expect(prose.className).toEqual(expect.stringContaining("typography-prose"));
    });
  });
});
