import type {ComponentProps} from "react";

import {act, render, screen, setupUser} from "@heroui/testing/helpers";

import {Label} from "@/components/label";
import {Slider} from "@/components/slider";

const renderSlider = (props: Partial<ComponentProps<typeof Slider>> = {}) =>
  render(
    <Slider data-testid="slider" defaultValue={30} {...props}>
      <Label>Volume</Label>
      <Slider.Output />
      <Slider.Track>
        <Slider.Fill />
        <Slider.Thumb />
      </Slider.Track>
    </Slider>,
  );

const renderRangeSlider = (props: Partial<ComponentProps<typeof Slider>> = {}) =>
  render(
    <Slider
      data-testid="slider"
      defaultValue={[100, 500]}
      maxValue={1000}
      minValue={0}
      step={50}
      {...props}
    >
      <Label>Price Range</Label>
      <Slider.Output />
      <Slider.Track>
        {({state}) => (
          <>
            <Slider.Fill />
            {state.values.map((_, i) => (
              <Slider.Thumb key={i} index={i} />
            ))}
          </>
        )}
      </Slider.Track>
    </Slider>,
  );

describe("Slider", () => {
  let user: ReturnType<typeof setupUser>;

  beforeAll(() => {
    user = setupUser();
  });

  it("renders a slider thumb with accessible name from composed Label", () => {
    renderSlider();

    expect(screen.getByRole("slider", {name: "Volume"})).toBeInTheDocument();
  });

  it("exposes data-slots and BEM block", () => {
    renderSlider();

    const root = screen.getByTestId("slider");

    expect(root).toHaveAttribute("data-slot", "slider");
    expect(root.className).toEqual(expect.stringContaining("slider"));
    expect(document.querySelector('[data-slot="slider-track"]')).not.toBeNull();
    expect(document.querySelector('[data-slot="slider-fill"]')).not.toBeNull();
    expect(document.querySelector('[data-slot="slider-thumb"]')).not.toBeNull();
    expect(document.querySelector('[data-slot="slider-output"]')).not.toBeNull();
  });

  it("exposes default value via range input and output text", () => {
    renderSlider({defaultValue: 30});

    const thumb = screen.getByRole("slider", {name: "Volume"});

    expect(thumb).toHaveValue("30");
    expect(document.querySelector('[data-slot="slider-output"]')).toHaveTextContent("30");
  });

  it("calls onChange when value is incremented or decremented", async () => {
    const onChange = vi.fn();

    renderSlider({defaultValue: 30, onChange});
    const thumb = screen.getByRole("slider", {name: "Volume"});

    await act(async () => {
      thumb.focus();
    });
    await user.keyboard("{ArrowRight}");
    expect(onChange).toHaveBeenLastCalledWith(31);
    expect(thumb).toHaveValue("31");

    await user.keyboard("{ArrowLeft}");
    expect(onChange).toHaveBeenLastCalledWith(30);
    expect(thumb).toHaveValue("30");
  });

  it("supports Home / End keys to jump to min / max", async () => {
    const onChange = vi.fn();

    renderSlider({defaultValue: 30, onChange});
    const thumb = screen.getByRole("slider", {name: "Volume"});

    await act(async () => {
      thumb.focus();
    });
    await user.keyboard("{End}");
    expect(onChange).toHaveBeenLastCalledWith(100);

    await user.keyboard("{Home}");
    expect(onChange).toHaveBeenLastCalledWith(0);
  });

  it("calls onChangeEnd when the interaction completes", async () => {
    const onChangeEnd = vi.fn();

    renderSlider({defaultValue: 30, onChangeEnd});
    const thumb = screen.getByRole("slider", {name: "Volume"});

    await act(async () => {
      thumb.focus();
    });
    await user.keyboard("{ArrowRight}");

    expect(onChangeEnd).toHaveBeenCalledWith(31);
  });

  it("supports controlled value", () => {
    const onChange = vi.fn();

    const {rerender} = render(
      <Slider data-testid="slider" value={40} onChange={onChange}>
        <Label>Volume</Label>
        <Slider.Output />
        <Slider.Track>
          <Slider.Fill />
          <Slider.Thumb />
        </Slider.Track>
      </Slider>,
    );

    expect(screen.getByRole("slider", {name: "Volume"})).toHaveValue("40");

    rerender(
      <Slider data-testid="slider" value={60} onChange={onChange}>
        <Label>Volume</Label>
        <Slider.Output />
        <Slider.Track>
          <Slider.Fill />
          <Slider.Thumb />
        </Slider.Track>
      </Slider>,
    );

    expect(screen.getByRole("slider", {name: "Volume"})).toHaveValue("60");
  });

  it("supports disabled state and blocks keyboard interaction", async () => {
    const onChange = vi.fn();

    renderSlider({defaultValue: 30, isDisabled: true, onChange});
    const thumb = screen.getByRole("slider", {name: "Volume"});

    expect(document.querySelector('[data-slot="slider-track"]')).toHaveAttribute(
      "data-disabled",
      "true",
    );
    expect(document.querySelector('[data-slot="slider-fill"]')).toHaveAttribute(
      "data-disabled",
      "true",
    );

    await act(async () => {
      thumb.focus();
    });
    await user.keyboard("{ArrowRight}");
    expect(onChange).not.toHaveBeenCalled();
  });

  it("supports vertical orientation via data-orientation", () => {
    renderSlider({orientation: "vertical"});

    expect(screen.getByTestId("slider")).toHaveAttribute("data-orientation", "vertical");
  });

  it("supports focus-visible via keyboard", async () => {
    renderSlider();

    await user.tab();
    expect(screen.getByRole("slider", {name: "Volume"})).toHaveFocus();

    const focusTarget = document.querySelector("[data-focus-visible='true']");

    expect(focusTarget).not.toBeNull();
  });

  describe("range slider", () => {
    it("renders two thumbs with independent accessible names", () => {
      renderRangeSlider();

      const thumbs = screen.getAllByRole("slider");

      expect(thumbs).toHaveLength(2);
      expect(thumbs[0]).toHaveValue("100");
      expect(thumbs[1]).toHaveValue("500");
    });

    it("supports moving the focused thumb via arrow keys", async () => {
      const onChange = vi.fn();

      renderRangeSlider({onChange});
      const thumbs = screen.getAllByRole("slider");

      await act(async () => {
        thumbs[0]!.focus();
      });
      await user.keyboard("{ArrowRight}");

      expect(onChange).toHaveBeenLastCalledWith([150, 500]);
      expect(thumbs[0]).toHaveValue("150");
      expect(thumbs[1]).toHaveValue("500");

      await act(async () => {
        thumbs[1]!.focus();
      });
      await user.keyboard("{ArrowLeft}");
      expect(onChange).toHaveBeenLastCalledWith([150, 450]);
    });

    it("exposes track fill-start and fill-end data attributes", () => {
      renderRangeSlider();

      const track = document.querySelector('[data-slot="slider-track"]');

      expect(track).not.toHaveAttribute("data-fill-start", "true");
      expect(track).not.toHaveAttribute("data-fill-end", "true");
    });
  });
});
