import type {Color} from "@react-types/color";

import {cleanup, render, runAllTimers, screen, setupUser} from "@heroui/testing/helpers";

import {ColorArea} from "@/components/color-area";
import {ColorPicker} from "@/components/color-picker";
import {ColorSlider} from "@/components/color-slider";
import {ColorSwatch} from "@/components/color-swatch";
import {ColorSwatchPicker} from "@/components/color-swatch-picker";
import {Label} from "@/components/label";

const presets = ["#ef4444", "#22c55e", "#3b82f6"];

const renderColorPicker = (
  props: {
    defaultValue?: string;
    onChange?: (color: Color) => void;
    withSwatches?: boolean;
  } = {},
) => {
  return render(
    <ColorPicker defaultValue={props.defaultValue ?? "#0485F7"} onChange={props.onChange}>
      <ColorPicker.Trigger>
        <ColorSwatch size="lg" />
        <Label>Pick a color</Label>
      </ColorPicker.Trigger>
      <ColorPicker.Popover>
        {props.withSwatches ? (
          <ColorSwatchPicker aria-label="Color presets" size="xs">
            {presets.map((preset) => (
              <ColorSwatchPicker.Item key={preset} color={preset}>
                <ColorSwatchPicker.Swatch />
              </ColorSwatchPicker.Item>
            ))}
          </ColorSwatchPicker>
        ) : null}
        <ColorArea
          aria-label="Color area"
          colorSpace="hsb"
          xChannel="saturation"
          yChannel="brightness"
        >
          <ColorArea.Thumb />
        </ColorArea>
        <ColorSlider channel="hue" colorSpace="hsb">
          <Label>Hue</Label>
          <ColorSlider.Output />
          <ColorSlider.Track>
            <ColorSlider.Thumb />
          </ColorSlider.Track>
        </ColorSlider>
      </ColorPicker.Popover>
    </ColorPicker>,
  );
};

describe("ColorPicker", () => {
  let user: ReturnType<typeof setupUser>;

  beforeEach(() => {
    vi.useFakeTimers({shouldAdvanceTime: true});
    user = setupUser({advanceTimers: vi.advanceTimersByTime});
  });

  afterEach(() => {
    cleanup();
    runAllTimers();
    vi.useRealTimers();
  });

  it("exposes data-slots and BEM block", () => {
    renderColorPicker();

    const root = document.querySelector('[data-slot="color-picker"]');

    expect(root).not.toBeNull();
    expect(root?.className).toEqual(expect.stringContaining("color-picker"));
    expect(document.querySelector('[data-slot="color-picker-trigger"]')).not.toBeNull();
  });

  it("supports opening and closing the popover", async () => {
    renderColorPicker();

    await user.click(screen.getByRole("button", {name: /Pick a color/}));
    runAllTimers();

    expect(document.querySelector('[data-slot="color-picker-popover"]')).not.toBeNull();
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Hue")).toBeInTheDocument();

    await user.keyboard("{Escape}");
    runAllTimers();

    expect(document.querySelector('[data-slot="color-picker-popover"]')).toBeNull();
  });

  it("supports updating color via ColorSwatchPicker item", async () => {
    const onChange = vi.fn();

    renderColorPicker({withSwatches: true, onChange});

    await user.click(screen.getByRole("button", {name: /Pick a color/}));
    runAllTimers();

    const options = screen.getAllByRole("option");

    expect(options.length).toBeGreaterThan(0);

    await user.click(options[1]!);
    runAllTimers();

    expect(onChange).toHaveBeenCalled();
    const color = onChange.mock.calls[0]?.[0];

    expect(color.toString("hex").toLowerCase()).toBe("#22c55e");
  });
});
