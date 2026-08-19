import type {Color} from "@react-types/color";

import {act, render, screen, setupUser} from "@heroui/testing/helpers";

import {ColorArea} from "@/components/color-area";

const renderColorArea = (
  props: {
    defaultValue?: string;
    onChange?: (color: Color) => void;
    showDots?: boolean;
  } = {},
) =>
  render(
    <ColorArea
      aria-label="Color"
      defaultValue={props.defaultValue ?? "hsl(200, 100%, 50%)"}
      showDots={props.showDots}
      onChange={props.onChange}
    >
      <ColorArea.Thumb />
    </ColorArea>,
  );

describe("ColorArea", () => {
  let user: ReturnType<typeof setupUser>;

  beforeAll(() => {
    user = setupUser();
  });

  it("renders an accessible 2D slider backed by two range inputs", () => {
    renderColorArea();

    // y-channel is aria-hidden; only x-channel is exposed.
    expect(screen.getByRole("slider")).toBeInTheDocument();
    expect(screen.getAllByRole("slider", {hidden: true})).toHaveLength(2);
  });

  it("exposes data-slot and BEM block", () => {
    renderColorArea();

    const root = document.querySelector('[data-slot="color-area"]');

    expect(root?.className).toEqual(expect.stringContaining("color-area"));
    expect(document.querySelector('[data-slot="color-area-thumb"]')).not.toBeNull();
  });

  it("exposes showDots BEM modifier", () => {
    renderColorArea({showDots: true});

    expect(document.querySelector('[data-slot="color-area"]')?.className).toEqual(
      expect.stringContaining("color-area--show-dots"),
    );
  });

  it("calls onChange with an updated color when adjusted via arrow keys", async () => {
    const onChange = vi.fn();

    renderColorArea({defaultValue: "hsl(200, 50%, 50%)", onChange});
    const slider = screen.getByRole("slider");

    await act(async () => {
      slider.focus();
    });
    await user.keyboard("{ArrowRight}");

    expect(onChange).toHaveBeenCalled();
    const value = onChange.mock.calls.at(-1)?.[0] as Color;

    expect(value.getChannelValue("hue")).toBeGreaterThan(200);
    expect(value.toString("hsl")).not.toBe("hsl(200, 50%, 50%)");
  });
});
