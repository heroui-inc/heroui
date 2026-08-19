import {render, screen} from "@heroui/testing/helpers";

import {Fieldset} from "@/components/fieldset";

describe("Fieldset", () => {
  it("renders composed legend and fields", () => {
    render(
      <Fieldset>
        <Fieldset.Legend>Profile</Fieldset.Legend>
        <Fieldset.Group>
          <span>Name field</span>
        </Fieldset.Group>
        <Fieldset.Actions>
          <button type="submit">Save</button>
        </Fieldset.Actions>
      </Fieldset>,
    );

    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(screen.getByText("Name field")).toBeInTheDocument();
    expect(screen.getByRole("button", {name: "Save"})).toBeInTheDocument();
  });

  it("exposes BEM block and data-slot", () => {
    render(<Fieldset data-testid="fieldset">Content</Fieldset>);
    const fieldset = screen.getByTestId("fieldset");

    expect(fieldset).toHaveAttribute("data-slot", "fieldset");
    expect(fieldset.className).toEqual(expect.stringContaining("fieldset"));
  });

  it("supports data attribute passthrough", () => {
    render(
      <Fieldset data-foo="bar" data-testid="fieldset">
        Content
      </Fieldset>,
    );

    expect(screen.getByTestId("fieldset")).toHaveAttribute("data-foo", "bar");
  });

  it("exposes data-disabled from native disabled state", () => {
    render(
      <Fieldset disabled data-testid="fieldset">
        Content
      </Fieldset>,
    );

    expect(screen.getByTestId("fieldset")).toHaveAttribute("data-disabled", "true");
  });

  describe("composition", () => {
    it("exposes data-slot on each sub-part", () => {
      render(
        <Fieldset>
          <Fieldset.Legend data-testid="legend">Profile</Fieldset.Legend>
          <Fieldset.Group data-testid="group">Fields</Fieldset.Group>
          <Fieldset.Actions data-testid="actions">Actions</Fieldset.Actions>
        </Fieldset>,
      );

      expect(screen.getByTestId("legend")).toHaveAttribute("data-slot", "fieldset-legend");
      expect(screen.getByTestId("group")).toHaveAttribute("data-slot", "fieldset-field-group");
      expect(screen.getByTestId("actions")).toHaveAttribute("data-slot", "fieldset-actions");
    });
  });
});
