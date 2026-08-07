import type {ComponentProps} from "react";

import {render, screen, setupUser} from "@heroui/testing/helpers";

import {InputGroup} from "@/components/input-group";
import {Label} from "@/components/label";
import {TextField} from "@/components/textfield";

describe("InputGroup", () => {
  let user: ReturnType<typeof setupUser>;

  beforeAll(() => {
    user = setupUser();
  });

  const renderGroup = (props: ComponentProps<typeof TextField> = {}) =>
    render(
      <TextField {...props}>
        <Label>Amount</Label>
        <InputGroup>
          <InputGroup.Prefix>$</InputGroup.Prefix>
          <InputGroup.Input />
          <InputGroup.Suffix>USD</InputGroup.Suffix>
        </InputGroup>
      </TextField>,
    );

  it("exposes compound data-slots under TextField", () => {
    renderGroup();

    expect(document.querySelector('[data-slot="input-group"]')).not.toBeNull();
    expect(document.querySelector('[data-slot="input-group-prefix"]')).not.toBeNull();
    expect(document.querySelector('[data-slot="input-group-input"]')).not.toBeNull();
    expect(document.querySelector('[data-slot="input-group-suffix"]')).not.toBeNull();
  });

  it("exposes BEM block on the group", () => {
    renderGroup();

    expect(document.querySelector('[data-slot="input-group"]')?.className).toEqual(
      expect.stringContaining("input-group"),
    );
  });

  it("exposes accessible name on the input", () => {
    renderGroup();

    expect(screen.getByRole("textbox", {name: "Amount"})).toBeInTheDocument();
  });

  it("supports focusing the input when Prefix is clicked", async () => {
    renderGroup();

    const input = screen.getByRole("textbox", {name: "Amount"});
    const prefix = document.querySelector('[data-slot="input-group-prefix"]');

    expect(prefix).not.toBeNull();
    await user.click(prefix!);

    expect(input).toHaveFocus();
  });

  it("supports focusing the input when Suffix is clicked", async () => {
    renderGroup();

    const input = screen.getByRole("textbox", {name: "Amount"});
    const suffix = document.querySelector('[data-slot="input-group-suffix"]');

    expect(suffix).not.toBeNull();
    await user.click(suffix!);

    expect(input).toHaveFocus();
  });

  it("exposes inherited variant from TextField", () => {
    renderGroup({variant: "secondary"});

    expect(document.querySelector('[data-slot="input-group"]')?.className).toEqual(
      expect.stringContaining("input-group--secondary"),
    );
  });

  it("supports disabling the input via TextField", () => {
    renderGroup({isDisabled: true});

    expect(screen.getByRole("textbox", {name: "Amount"})).toBeDisabled();
  });

  it("supports TextArea slot composition", () => {
    render(
      <TextField>
        <Label>Notes</Label>
        <InputGroup>
          <InputGroup.Prefix>#</InputGroup.Prefix>
          <InputGroup.TextArea />
        </InputGroup>
      </TextField>,
    );

    expect(document.querySelector('[data-slot="input-group-textarea"]')).not.toBeNull();
    expect(screen.getByRole("textbox", {name: "Notes"})).toBeInTheDocument();
  });
});
