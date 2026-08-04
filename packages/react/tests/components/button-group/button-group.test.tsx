import {render, screen, setupUser} from "@heroui/testing/helpers";

import {Button} from "@/components/button";
import {ButtonGroup} from "@/components/button-group";

describe("ButtonGroup", () => {
  let user: ReturnType<typeof setupUser>;

  beforeAll(() => {
    user = setupUser();
  });

  it("renders with role=group and data-slot", () => {
    render(
      <ButtonGroup>
        <Button>One</Button>
        <Button>Two</Button>
      </ButtonGroup>,
    );

    const group = screen.getByRole("group");

    expect(group).toHaveAttribute("data-slot", "button-group");
    expect(group.className).toEqual(expect.stringContaining("button-group"));
  });

  it("exposes orientation BEM modifiers", () => {
    const {rerender} = render(
      <ButtonGroup>
        <Button>One</Button>
      </ButtonGroup>,
    );

    expect(screen.getByRole("group").className).toEqual(
      expect.stringContaining("button-group--horizontal"),
    );

    rerender(
      <ButtonGroup orientation="vertical">
        <Button>One</Button>
      </ButtonGroup>,
    );

    expect(screen.getByRole("group").className).toEqual(
      expect.stringContaining("button-group--vertical"),
    );
  });

  it("renders Separator with data-slot", () => {
    render(
      <ButtonGroup>
        <Button>One</Button>
        <ButtonGroup.Separator />
        <Button>Two</Button>
      </ButtonGroup>,
    );

    const separator = document.querySelector('[data-slot="button-group-separator"]');

    expect(separator).not.toBeNull();
    expect(separator).toHaveAttribute("aria-hidden", "true");
  });

  it("exposes inherited size and variant on direct Button children", () => {
    render(
      <ButtonGroup size="sm" variant="secondary">
        <Button>Save</Button>
      </ButtonGroup>,
    );

    const button = screen.getByRole("button", {name: "Save"});

    expect(button.className).toEqual(expect.stringContaining("button--sm"));
    expect(button.className).toEqual(expect.stringContaining("button--secondary"));
  });

  it("exposes inherited isDisabled on direct Button children", () => {
    render(
      <ButtonGroup isDisabled>
        <Button>Save</Button>
      </ButtonGroup>,
    );

    expect(screen.getByRole("button", {name: "Save"})).toBeDisabled();
  });

  it("supports child Button props overriding group defaults", () => {
    render(
      <ButtonGroup size="sm" variant="secondary">
        <Button size="lg" variant="primary">
          Override
        </Button>
      </ButtonGroup>,
    );

    const button = screen.getByRole("button", {name: "Override"});

    expect(button.className).toEqual(expect.stringContaining("button--lg"));
    expect(button.className).toEqual(expect.stringContaining("button--primary"));
    expect(button.className).not.toEqual(expect.stringContaining("button--sm"));
  });

  it("exposes no inherited context on nested non-direct Buttons", () => {
    render(
      <ButtonGroup size="sm" variant="secondary">
        <div>
          <Button>Nested</Button>
        </div>
      </ButtonGroup>,
    );

    const button = screen.getByRole("button", {name: "Nested"});

    expect(button.className).not.toEqual(expect.stringContaining("button--sm"));
    expect(button.className).not.toEqual(expect.stringContaining("button--secondary"));
  });

  it("supports pressing grouped buttons", async () => {
    const onPress = vi.fn();

    render(
      <ButtonGroup>
        <Button onPress={onPress}>Save</Button>
        <Button>Cancel</Button>
      </ButtonGroup>,
    );

    await user.click(screen.getByRole("button", {name: "Save"}));

    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
