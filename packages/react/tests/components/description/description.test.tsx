import {render, screen} from "@heroui/testing/helpers";

import {Description} from "@/components/description";
import {Input} from "@/components/input";
import {Label} from "@/components/label";
import {TextField} from "@/components/textfield";

describe("Description", () => {
  it("exposes data-slot and BEM block inside TextField", () => {
    render(
      <TextField name="name">
        <Label>Your name</Label>
        <Input />
        <Description>Visible to other users</Description>
      </TextField>,
    );

    const description = document.querySelector('[data-slot="description"]');

    expect(description).not.toBeNull();
    expect(description?.className).toEqual(expect.stringContaining("description"));
    expect(screen.getByText("Visible to other users")).toBeInTheDocument();
  });

  it("exposes accessible description on the input", () => {
    render(
      <TextField name="name">
        <Label>Your name</Label>
        <Input />
        <Description>Helpful hint</Description>
      </TextField>,
    );

    expect(screen.getByRole("textbox", {name: "Your name"})).toHaveAccessibleDescription(
      "Helpful hint",
    );
  });

  it("renders standalone outside a field gate", () => {
    render(<Description>Standalone</Description>);

    expect(document.querySelector('[data-slot="description"]')).not.toBeNull();
    expect(screen.getByText("Standalone")).toBeInTheDocument();
  });
});
