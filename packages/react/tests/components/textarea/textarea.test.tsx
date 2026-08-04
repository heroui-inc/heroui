import type {ComponentProps} from "react";

import {render, screen, setupUser} from "@heroui/testing/helpers";

import {TextArea} from "@/components/textarea";

describe("TextArea", () => {
  let user: ReturnType<typeof setupUser>;

  beforeAll(() => {
    user = setupUser();
  });

  const renderTextArea = (props: ComponentProps<typeof TextArea> = {}) =>
    render(<TextArea aria-label="Bio" placeholder="Tell us about yourself" {...props} />);

  it("renders a textarea element with textbox role and accessible name", () => {
    renderTextArea();
    const textarea = screen.getByRole("textbox", {name: "Bio"});

    expect(textarea).toBeInTheDocument();
    expect(textarea.tagName).toBe("TEXTAREA");
  });

  it("exposes BEM block and data-slot", () => {
    renderTextArea();
    const textarea = screen.getByRole("textbox", {name: "Bio"});

    expect(textarea).toHaveAttribute("data-slot", "textarea");
    expect(textarea.className).toEqual(expect.stringContaining("textarea"));
  });

  it("exposes variant BEM modifier", () => {
    renderTextArea({variant: "secondary"});

    expect(screen.getByRole("textbox", {name: "Bio"}).className).toEqual(
      expect.stringContaining("textarea--secondary"),
    );
  });

  it("supports typing and calls onChange", async () => {
    const onChange = vi.fn();

    renderTextArea({onChange});
    const textarea = screen.getByRole("textbox", {name: "Bio"});

    await user.type(textarea, "Hello");
    expect(textarea).toHaveValue("Hello");
    expect(onChange).toHaveBeenCalled();
  });

  it("supports disabled state", () => {
    renderTextArea({disabled: true});

    expect(screen.getByRole("textbox", {name: "Bio"})).toBeDisabled();
  });
});
