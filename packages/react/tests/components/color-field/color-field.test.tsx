import type {ComponentProps} from "react";
import type {Color} from "react-aria-components/ColorArea";

import {render, screen, setupUser} from "@heroui/testing/helpers";

import {ColorField} from "@/components/color-field";
import {Description} from "@/components/description";
import {FieldError} from "@/components/field-error";
import {Label} from "@/components/label";
import {parseColor} from "@/components/rac";

const renderColorField = (props: Partial<ComponentProps<typeof ColorField>> = {}) =>
  render(
    <ColorField name="color" {...props}>
      <Label>Color</Label>
      <ColorField.Group>
        <ColorField.Input />
      </ColorField.Group>
    </ColorField>,
  );

describe("ColorField", () => {
  let user: ReturnType<typeof setupUser>;

  beforeAll(() => {
    user = setupUser();
  });

  it("exposes accessible name via Label", () => {
    renderColorField({defaultValue: parseColor("#0485F7")});

    const input = screen.getByRole("textbox", {name: "Color"});

    expect(input).toHaveValue("#0485F7");
  });

  it("exposes data-slots and BEM block", () => {
    renderColorField();

    expect(document.querySelector('[data-slot="color-field"]')?.className).toEqual(
      expect.stringContaining("color-field"),
    );
    expect(document.querySelector('[data-slot="color-input-group"]')).not.toBeNull();
    expect(document.querySelector('[data-slot="color-input-group-input"]')).not.toBeNull();
  });

  it("exposes variant BEM modifier on Group", () => {
    render(
      <ColorField name="color">
        <Label>Color</Label>
        <ColorField.Group variant="secondary">
          <ColorField.Input />
        </ColorField.Group>
      </ColorField>,
    );

    expect(document.querySelector('[data-slot="color-input-group"]')?.className).toEqual(
      expect.stringContaining("color-input-group--secondary"),
    );
  });

  it("supports fullWidth prop as a BEM modifier", () => {
    renderColorField({fullWidth: true});

    expect(document.querySelector('[data-slot="color-field"]')?.className).toEqual(
      expect.stringContaining("color-field--full-width"),
    );
  });

  it("supports typing a hex value and commits it on blur", async () => {
    const onChange = vi.fn();

    renderColorField({onChange});
    const input = screen.getByRole("textbox", {name: "Color"});

    await user.type(input, "#22c55e");
    await user.tab();

    expect(onChange).toHaveBeenCalled();
    const value = onChange.mock.calls.at(-1)?.[0] as Color;

    expect(value.toString("hex").toLowerCase()).toBe("#22c55e");
  });

  it("supports controlled value", () => {
    const onChange = vi.fn();

    const {rerender} = render(
      <ColorField name="color" value={parseColor("#0485F7")} onChange={onChange}>
        <Label>Color</Label>
        <ColorField.Group>
          <ColorField.Input />
        </ColorField.Group>
      </ColorField>,
    );

    expect(screen.getByRole("textbox", {name: "Color"})).toHaveValue("#0485F7");

    rerender(
      <ColorField name="color" value={parseColor("#EF4444")} onChange={onChange}>
        <Label>Color</Label>
        <ColorField.Group>
          <ColorField.Input />
        </ColorField.Group>
      </ColorField>,
    );

    expect(screen.getByRole("textbox", {name: "Color"})).toHaveValue("#EF4444");
  });

  it("supports channel editing for a single HSL channel", async () => {
    const onChange = vi.fn();

    render(
      <ColorField
        channel="hue"
        colorSpace="hsl"
        name="hue"
        value={parseColor("hsl(200, 50%, 50%)")}
        onChange={onChange}
      >
        <Label>Hue</Label>
        <ColorField.Group>
          <ColorField.Input />
        </ColorField.Group>
      </ColorField>,
    );

    const input = screen.getByRole("textbox", {name: "Hue"});

    expect(input).toHaveValue("200°");

    await user.clear(input);
    await user.type(input, "90");
    await user.tab();

    expect(onChange).toHaveBeenCalled();
    const value = onChange.mock.calls.at(-1)?.[0] as Color;

    expect(value.getChannelValue("hue")).toBe(90);
  });

  it("supports isRequired and shows FieldError when isInvalid", () => {
    render(
      <ColorField isInvalid isRequired name="color">
        <Label>Color</Label>
        <ColorField.Group>
          <ColorField.Input />
        </ColorField.Group>
        <FieldError>Please enter a valid hex color</FieldError>
      </ColorField>,
    );

    expect(document.querySelector('[data-slot="color-field"]')).toHaveAttribute(
      "data-required",
      "true",
    );
    expect(screen.getByText("Please enter a valid hex color")).toBeInTheDocument();
  });

  it("exposes accessible description via Description", () => {
    render(
      <ColorField name="color">
        <Label>Color</Label>
        <ColorField.Group>
          <ColorField.Input />
        </ColorField.Group>
        <Description>Enter your brand's primary color</Description>
      </ColorField>,
    );

    expect(document.querySelector('[data-slot="description"]')).not.toBeNull();
    expect(screen.getByText("Enter your brand's primary color")).toBeInTheDocument();
  });

  it("supports disabled state and blocks typing", async () => {
    const onChange = vi.fn();

    renderColorField({
      defaultValue: parseColor("#0485F7"),
      isDisabled: true,
      onChange,
    });
    const input = screen.getByRole("textbox", {name: "Color"});

    expect(input).toBeDisabled();

    await user.type(input, "x");
    expect(onChange).not.toHaveBeenCalled();
  });

  it("supports prefix and suffix composition data-slots", () => {
    render(
      <ColorField name="color">
        <Label>Color</Label>
        <ColorField.Group>
          <ColorField.Prefix>
            <span>prefix</span>
          </ColorField.Prefix>
          <ColorField.Input />
          <ColorField.Suffix>
            <span>suffix</span>
          </ColorField.Suffix>
        </ColorField.Group>
      </ColorField>,
    );

    expect(document.querySelector('[data-slot="color-input-group-prefix"]')).not.toBeNull();
    expect(document.querySelector('[data-slot="color-input-group-suffix"]')).not.toBeNull();
  });

  it("supports focus-visible via keyboard", async () => {
    renderColorField();

    await user.tab();
    expect(screen.getByRole("textbox", {name: "Color"})).toHaveFocus();

    const focusTarget = document.querySelector("[data-focus-visible='true']");

    expect(focusTarget).not.toBeNull();
  });
});
