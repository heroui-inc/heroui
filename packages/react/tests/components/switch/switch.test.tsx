import type {ComponentProps} from "react";

import {render, screen, setupUser} from "@heroui/testing/helpers";

import {Label} from "@/components/label";
import {Switch} from "@/components/switch";

describe("Switch", () => {
  let user: ReturnType<typeof setupUser>;

  beforeAll(() => {
    user = setupUser();
  });

  const renderSwitch = (props: ComponentProps<typeof Switch> = {}) =>
    render(
      <Switch {...props}>
        <Switch.Content>
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          <Label>Enable notifications</Label>
        </Switch.Content>
      </Switch>,
    );

  it("renders with role and accessible name", () => {
    renderSwitch();

    expect(screen.getByRole("switch", {name: "Enable notifications"})).toBeInTheDocument();
  });

  it("exposes BEM block and composed data-slots", () => {
    renderSwitch();

    const field = document.querySelector('[data-slot="switch"]');

    expect(field?.className).toEqual(expect.stringContaining("switch"));
    expect(document.querySelector('[data-slot="switch-content"]')).not.toBeNull();
    expect(document.querySelector('[data-slot="switch-control"]')).not.toBeNull();
    expect(document.querySelector('[data-slot="switch-thumb"]')).not.toBeNull();
  });

  it("supports data attribute passthrough on the field", () => {
    render(
      <Switch data-testid="notifications">
        <Switch.Content>
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          Enable notifications
        </Switch.Content>
      </Switch>,
    );

    expect(screen.getByTestId("notifications")).toHaveAttribute("data-slot", "switch");
  });

  it("calls onChange when selection is toggled", async () => {
    const onChange = vi.fn();

    renderSwitch({onChange});
    const control = screen.getByRole("switch", {name: "Enable notifications"});

    await user.click(control);
    expect(control).toBeChecked();
    expect(onChange).toHaveBeenCalledWith(true);

    await user.click(control);
    expect(control).not.toBeChecked();
    expect(onChange).toHaveBeenCalledWith(false);
  });

  it("supports Space key toggle", async () => {
    const onChange = vi.fn();

    renderSwitch({onChange});
    const control = screen.getByRole("switch", {name: "Enable notifications"});

    await user.tab();
    expect(control).toHaveFocus();

    await user.keyboard(" ");
    expect(control).toBeChecked();
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("supports controlled isSelected", async () => {
    const onChange = vi.fn();

    const {rerender} = render(
      <Switch isSelected={false} onChange={onChange}>
        <Switch.Content>
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          <Label>Enable notifications</Label>
        </Switch.Content>
      </Switch>,
    );
    const control = screen.getByRole("switch", {name: "Enable notifications"});

    expect(control).not.toBeChecked();

    await user.click(control);
    expect(onChange).toHaveBeenCalledWith(true);

    rerender(
      <Switch isSelected onChange={onChange}>
        <Switch.Content>
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          <Label>Enable notifications</Label>
        </Switch.Content>
      </Switch>,
    );
    expect(screen.getByRole("switch", {name: "Enable notifications"})).toBeChecked();
  });

  it("exposes data-selected when selected", async () => {
    renderSwitch();
    const control = screen.getByRole("switch", {name: "Enable notifications"});
    const field = control.closest("[data-slot='switch']");

    await user.click(control);
    expect(field).toHaveAttribute("data-selected", "true");
  });

  it("supports hover state on the interactive surface", async () => {
    renderSwitch();
    const control = screen.getByRole("switch", {name: "Enable notifications"});
    const content = control.closest("[data-slot='switch-content']") ?? control;

    await user.hover(content);
    expect(content).toHaveAttribute("data-hovered", "true");

    await user.unhover(content);
    expect(content).not.toHaveAttribute("data-hovered");
  });

  it("supports disabled state and blocks interaction", async () => {
    const onChange = vi.fn();

    renderSwitch({isDisabled: true, onChange});
    const control = screen.getByRole("switch", {name: "Enable notifications"});
    const field = control.closest("[data-slot='switch']");

    expect(control).toBeDisabled();
    expect(field).toHaveAttribute("data-disabled", "true");

    await user.click(control);
    expect(onChange).not.toHaveBeenCalled();
  });

  it("exposes no hover state when disabled", async () => {
    renderSwitch({isDisabled: true});
    const control = screen.getByRole("switch", {name: "Enable notifications"});
    const content = control.closest("[data-slot='switch-content']") ?? control;

    await user.hover(content);
    expect(content).not.toHaveAttribute("data-hovered");
  });

  it("supports focus-visible via keyboard", async () => {
    renderSwitch();
    const control = screen.getByRole("switch", {name: "Enable notifications"});
    const content = control.closest("[data-slot='switch-content']");

    await user.tab();
    expect(control).toHaveFocus();
    expect(content).toHaveAttribute("data-focus-visible", "true");
  });
});
