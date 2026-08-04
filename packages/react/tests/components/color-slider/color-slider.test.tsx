import type {Color} from "@react-types/color";

import {act, render, screen, setupUser} from "@heroui/testing/helpers";

import {ColorSlider} from "@/components/color-slider";
import {Label} from "@/components/label";

const renderColorSlider = (
  props: {
    defaultValue?: string;
    isDisabled?: boolean;
    onChange?: (color: Color) => void;
  } = {},
) =>
  render(
    <ColorSlider
      channel="hue"
      colorSpace="hsl"
      defaultValue={props.defaultValue ?? "hsl(0, 100%, 50%)"}
      isDisabled={props.isDisabled}
      onChange={props.onChange}
    >
      <Label>Hue</Label>
      <ColorSlider.Output />
      <ColorSlider.Track>
        <ColorSlider.Thumb />
      </ColorSlider.Track>
    </ColorSlider>,
  );

describe("ColorSlider", () => {
  let user: ReturnType<typeof setupUser>;

  beforeAll(() => {
    user = setupUser();
  });

  it("renders a slider thumb with accessible name from composed Label", () => {
    renderColorSlider();

    expect(screen.getByRole("slider", {name: "Hue"})).toBeInTheDocument();
  });

  it("exposes data-slots and BEM block", () => {
    renderColorSlider();

    expect(document.querySelector('[data-slot="color-slider"]')?.className).toEqual(
      expect.stringContaining("color-slider"),
    );
    expect(document.querySelector('[data-slot="color-slider-track"]')).not.toBeNull();
    expect(document.querySelector('[data-slot="color-slider-thumb"]')).not.toBeNull();
    expect(document.querySelector('[data-slot="color-slider-output"]')).not.toBeNull();
  });

  it("calls onChange with an updated hue when the channel is adjusted via arrow keys", async () => {
    const onChange = vi.fn();

    renderColorSlider({onChange});
    const thumb = screen.getByRole("slider", {name: "Hue"});

    await act(async () => {
      thumb.focus();
    });
    await user.keyboard("{ArrowRight}");

    expect(onChange).toHaveBeenCalled();
    const value = onChange.mock.calls.at(-1)?.[0] as Color;

    expect(value.getChannelValue("hue")).toBeGreaterThan(0);
  });

  it("supports disabled state and blocks keyboard interaction", async () => {
    const onChange = vi.fn();

    renderColorSlider({isDisabled: true, onChange});
    const thumb = screen.getByRole("slider", {name: "Hue"});

    await act(async () => {
      thumb.focus();
    });
    await user.keyboard("{ArrowRight}");

    expect(onChange).not.toHaveBeenCalled();
  });
});
