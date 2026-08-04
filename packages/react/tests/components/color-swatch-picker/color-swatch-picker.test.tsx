import type {Color} from "@react-types/color";

import {render, screen, setupUser} from "@heroui/testing/helpers";

import {ColorSwatchPicker} from "@/components/color-swatch-picker";

const colors = ["#ef4444", "#22c55e", "#3b82f6"];

const renderPicker = (
  props: {
    defaultValue?: string;
    onChange?: (color: Color) => void;
  } = {},
) =>
  render(
    <ColorSwatchPicker
      aria-label="Color presets"
      defaultValue={props.defaultValue}
      onChange={props.onChange}
    >
      {colors.map((color) => (
        <ColorSwatchPicker.Item key={color} color={color}>
          <ColorSwatchPicker.Swatch />
          <ColorSwatchPicker.Indicator />
        </ColorSwatchPicker.Item>
      ))}
    </ColorSwatchPicker>,
  );

describe("ColorSwatchPicker", () => {
  let user: ReturnType<typeof setupUser>;

  beforeAll(() => {
    user = setupUser();
  });

  it("renders a listbox of color options", () => {
    renderPicker();

    expect(screen.getByRole("listbox", {name: "Color presets"})).toBeInTheDocument();
    expect(screen.getAllByRole("option")).toHaveLength(3);
  });

  it("exposes data-slots and BEM block", () => {
    renderPicker();

    expect(document.querySelector('[data-slot="color-swatch-picker"]')?.className).toEqual(
      expect.stringContaining("color-swatch-picker"),
    );
    expect(document.querySelector('[data-slot="color-swatch-picker-item"]')).not.toBeNull();
    expect(document.querySelector('[data-slot="color-swatch-picker-swatch"]')).not.toBeNull();
    expect(document.querySelector('[data-slot="color-swatch-picker-indicator"]')).not.toBeNull();
  });

  it("exposes default layout BEM modifier", () => {
    renderPicker();

    expect(document.querySelector('[data-slot="color-swatch-picker"]')?.className).toEqual(
      expect.stringContaining("color-swatch-picker--grid"),
    );
  });

  it("calls onChange when selecting a swatch", async () => {
    const onChange = vi.fn();

    renderPicker({onChange});
    const options = screen.getAllByRole("option");

    await user.click(options[1]!);

    expect(onChange).toHaveBeenCalled();
    const color = onChange.mock.calls[0]?.[0] as Color;

    expect(color.toString("hex").toLowerCase()).toBe("#22c55e");
  });
});
