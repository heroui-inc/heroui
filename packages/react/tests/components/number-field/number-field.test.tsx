import type {ComponentProps} from "react";

import {render, screen, setupUser} from "@heroui/testing/helpers";

import {FieldError} from "@/components/field-error";
import {Label} from "@/components/label";
import {NumberField} from "@/components/number-field";

const stepperCompositions = [
  ["no stepper buttons", false, false],
  ["only a decrement button", true, false],
  ["only an increment button", false, true],
  ["both stepper buttons", true, true],
] as const;

describe("NumberField", () => {
  let user: ReturnType<typeof setupUser>;

  beforeAll(() => {
    user = setupUser();
  });

  const renderNumber = (props: ComponentProps<typeof NumberField> = {}) =>
    render(
      <NumberField defaultValue={10} minValue={0} name="width" {...props}>
        <Label>Width</Label>
        <NumberField.Group>
          <NumberField.DecrementButton />
          <NumberField.Input />
          <NumberField.IncrementButton />
        </NumberField.Group>
      </NumberField>,
    );

  it("renders number textbox with accessible name", () => {
    renderNumber();

    expect(screen.getByRole("textbox", {name: "Width"})).toBeInTheDocument();
    expect(screen.getByRole("textbox", {name: "Width"})).toHaveAttribute(
      "aria-roledescription",
      "Number field",
    );
  });

  it("exposes compound data-slots and BEM block", () => {
    renderNumber();

    expect(document.querySelector('[data-slot="number-field"]')?.className).toEqual(
      expect.stringContaining("number-field"),
    );
    expect(document.querySelector('[data-slot="number-field-group"]')).not.toBeNull();
    expect(document.querySelector('[data-slot="number-field-input"]')).not.toBeNull();
    expect(document.querySelector('[data-slot="number-field-increment-button"]')).not.toBeNull();
    expect(document.querySelector('[data-slot="number-field-decrement-button"]')).not.toBeNull();
  });

  it.each(stepperCompositions)(
    "supports composition with %s",
    (_description, hasDecrement, hasIncrement) => {
      render(
        <NumberField defaultValue={11} name="customer-number">
          <Label>Customer number</Label>
          <NumberField.Group data-testid="number-field-group">
            {hasDecrement ? <NumberField.DecrementButton /> : null}
            <NumberField.Input />
            {hasIncrement ? <NumberField.IncrementButton /> : null}
          </NumberField.Group>
        </NumberField>,
      );

      const group = screen.getByTestId("number-field-group");

      expect(group.querySelector('[slot="decrement"]') !== null).toBe(hasDecrement);
      expect(group.querySelector('[slot="increment"]') !== null).toBe(hasIncrement);
    },
  );

  it("exposes variant BEM modifier", () => {
    renderNumber({variant: "secondary"});

    expect(document.querySelector('[data-slot="number-field"]')?.className).toEqual(
      expect.stringContaining("number-field--secondary"),
    );
  });

  it("supports typing a value and calls onChange on commit", async () => {
    const onChange = vi.fn();

    render(
      <NumberField defaultValue={0} name="width" onChange={onChange}>
        <Label>Width</Label>
        <NumberField.Group>
          <NumberField.DecrementButton />
          <NumberField.Input />
          <NumberField.IncrementButton />
        </NumberField.Group>
      </NumberField>,
    );

    const input = screen.getByRole("textbox", {name: "Width"});

    await user.clear(input);
    await user.type(input, "42");
    await user.tab();
    expect(onChange).toHaveBeenCalledWith(42);
  });

  it("supports incrementing and decrementing via stepper buttons", async () => {
    const onChange = vi.fn();

    renderNumber({defaultValue: 10, onChange});

    await user.click(
      document.querySelector('[data-slot="number-field-increment-button"]') as HTMLElement,
    );
    expect(onChange).toHaveBeenCalledWith(11);

    await user.click(
      document.querySelector('[data-slot="number-field-decrement-button"]') as HTMLElement,
    );
    expect(onChange).toHaveBeenCalledWith(10);
  });

  it("supports ArrowUp and ArrowDown on the input", async () => {
    const onChange = vi.fn();

    renderNumber({defaultValue: 5, onChange});
    const input = screen.getByRole("textbox", {name: "Width"});

    await user.click(input);
    await user.keyboard("{ArrowUp}");
    expect(onChange).toHaveBeenCalledWith(6);

    await user.keyboard("{ArrowDown}");
    expect(onChange).toHaveBeenCalledWith(5);
  });

  it("supports maxValue and invalid state", async () => {
    const onChange = vi.fn();

    render(
      <NumberField
        isInvalid
        defaultValue={9}
        maxValue={10}
        minValue={0}
        name="width"
        onChange={onChange}
      >
        <Label>Width</Label>
        <NumberField.Group>
          <NumberField.DecrementButton />
          <NumberField.Input />
          <NumberField.IncrementButton />
        </NumberField.Group>
        <FieldError>Max is 10</FieldError>
      </NumberField>,
    );

    expect(screen.getByText("Max is 10")).toBeInTheDocument();
    expect(document.querySelector('[data-slot="number-field"]')).toHaveAttribute(
      "data-invalid",
      "true",
    );

    await user.click(
      document.querySelector('[data-slot="number-field-increment-button"]') as HTMLElement,
    );
    expect(onChange).toHaveBeenCalledWith(10);

    onChange.mockClear();
    await user.click(
      document.querySelector('[data-slot="number-field-increment-button"]') as HTMLElement,
    );
    expect(onChange).not.toHaveBeenCalled();
  });

  it("supports disabled state", async () => {
    const onChange = vi.fn();

    renderNumber({isDisabled: true, onChange});
    const input = screen.getByRole("textbox", {name: "Width"});

    expect(input).toBeDisabled();
    expect(document.querySelector('[data-slot="number-field"]')).toHaveAttribute(
      "data-disabled",
      "true",
    );

    await user.click(
      document.querySelector('[data-slot="number-field-increment-button"]') as HTMLElement,
    );
    expect(onChange).not.toHaveBeenCalled();
  });

  it("supports focus-visible via keyboard", async () => {
    renderNumber();
    const input = screen.getByRole("textbox", {name: "Width"});

    await user.tab();
    expect(input).toHaveFocus();

    const focusTarget =
      input.closest("[data-focus-visible='true']") ??
      document.querySelector("[data-focus-visible='true']");

    expect(focusTarget).not.toBeNull();
  });
});
