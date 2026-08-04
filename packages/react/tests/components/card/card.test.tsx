import {render, screen} from "@heroui/testing/helpers";

import {Card} from "@/components/card";

describe("Card", () => {
  it("renders composed content", () => {
    render(
      <Card>
        <Card.Header>
          <Card.Title>Title</Card.Title>
          <Card.Description>Description</Card.Description>
        </Card.Header>
        <Card.Content>Content</Card.Content>
        <Card.Footer>Footer</Card.Footer>
      </Card>,
    );

    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
    expect(screen.getByText("Footer")).toBeInTheDocument();
  });

  it("exposes BEM block and data-slot", () => {
    render(<Card data-testid="card">Body</Card>);
    const card = screen.getByTestId("card");

    expect(card).toHaveAttribute("data-slot", "card");
    expect(card.className).toEqual(expect.stringContaining("card"));
  });

  it("exposes variant BEM modifier", () => {
    render(
      <Card data-testid="card" variant="secondary">
        Body
      </Card>,
    );

    expect(screen.getByTestId("card").className).toEqual(
      expect.stringContaining("card--secondary"),
    );
  });

  it("supports data attribute passthrough", () => {
    render(
      <Card data-foo="bar" data-testid="card">
        Body
      </Card>,
    );

    expect(screen.getByTestId("card")).toHaveAttribute("data-foo", "bar");
  });

  describe("composition", () => {
    it("exposes data-slot on each sub-part", () => {
      render(
        <Card>
          <Card.Header data-testid="header">
            <Card.Title data-testid="title">Title</Card.Title>
            <Card.Description data-testid="description">Description</Card.Description>
          </Card.Header>
          <Card.Content data-testid="content">Content</Card.Content>
          <Card.Footer data-testid="footer">Footer</Card.Footer>
        </Card>,
      );

      expect(screen.getByTestId("header")).toHaveAttribute("data-slot", "card-header");
      expect(screen.getByTestId("title")).toHaveAttribute("data-slot", "card-title");
      expect(screen.getByTestId("description")).toHaveAttribute("data-slot", "card-description");
      expect(screen.getByTestId("content")).toHaveAttribute("data-slot", "card-content");
      expect(screen.getByTestId("footer")).toHaveAttribute("data-slot", "card-footer");
    });
  });
});
