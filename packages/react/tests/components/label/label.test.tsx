import {render, screen} from "@heroui/testing/helpers";

import {Input} from "@/components/input";
import {Label} from "@/components/label";
import {TextField} from "@/components/textfield";

describe("Label", () => {
  it("exposes data-slot and BEM block", () => {
    render(
      <TextField name="name">
        <Label>Your name</Label>
        <Input />
      </TextField>,
    );

    const label = document.querySelector('[data-slot="label"]');

    expect(label).not.toBeNull();
    expect(label?.className).toEqual(expect.stringContaining("label"));
    expect(screen.getByText("Your name")).toBeInTheDocument();
  });

  it("exposes isRequired BEM modifier", () => {
    render(<Label isRequired>Required</Label>);

    expect(document.querySelector('[data-slot="label"]')?.className).toEqual(
      expect.stringContaining("label--required"),
    );
  });

  it("exposes isDisabled BEM modifier", () => {
    render(<Label isDisabled>Disabled</Label>);

    expect(document.querySelector('[data-slot="label"]')?.className).toEqual(
      expect.stringContaining("label--disabled"),
    );
  });

  it("exposes isInvalid BEM modifier", () => {
    render(<Label isInvalid>Invalid</Label>);

    expect(document.querySelector('[data-slot="label"]')?.className).toEqual(
      expect.stringContaining("label--invalid"),
    );
  });

  it("exposes association with input via TextField", () => {
    render(
      <TextField name="name">
        <Label>Your name</Label>
        <Input />
      </TextField>,
    );

    expect(screen.getByRole("textbox", {name: "Your name"})).toBeInTheDocument();
  });
});
