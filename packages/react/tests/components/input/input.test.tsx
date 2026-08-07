import type {ComponentProps} from "react";

import {render, screen, setupUser} from "@heroui/testing/helpers";

import {Input} from "@/components/input";

describe("Input", () => {
  let user: ReturnType<typeof setupUser>;

  beforeAll(() => {
    user = setupUser();
  });

  const renderInput = (props: ComponentProps<typeof Input> = {}) =>
    render(<Input aria-label="Name" placeholder="John" {...props} />);

  it("renders with textbox role and accessible name", () => {
    renderInput();

    expect(screen.getByRole("textbox", {name: "Name"})).toBeInTheDocument();
  });

  it("exposes BEM block and data-slot", () => {
    renderInput();
    const input = screen.getByRole("textbox", {name: "Name"});

    expect(input).toHaveAttribute("data-slot", "input");
    expect(input.className).toEqual(expect.stringContaining("input"));
  });

  it("exposes variant BEM modifier", () => {
    renderInput({variant: "secondary"});

    expect(screen.getByRole("textbox", {name: "Name"}).className).toEqual(
      expect.stringContaining("input--secondary"),
    );
  });

  it("supports typing and calls onChange", async () => {
    const onChange = vi.fn();

    renderInput({onChange});
    const input = screen.getByRole("textbox", {name: "Name"});

    await user.type(input, "Ada");
    expect(input).toHaveValue("Ada");
    expect(onChange).toHaveBeenCalled();
  });

  it("supports disabled state", () => {
    renderInput({disabled: true});

    expect(screen.getByRole("textbox", {name: "Name"})).toBeDisabled();
  });
});
