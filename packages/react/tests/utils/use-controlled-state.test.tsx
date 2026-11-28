import {render, screen, setupUser} from "@heroui/testing/helpers";

import {useControlledState} from "@/utils/use-controlled-state";

interface ToggleProps {
  defaultValue?: boolean;
  onChange?: (value: boolean) => void;
  value?: boolean;
}

const Toggle = ({defaultValue = false, onChange, value}: ToggleProps) => {
  const [isOn, setIsOn] = useControlledState(value, defaultValue, onChange);

  return (
    <>
      <button aria-pressed={isOn} type="button" onClick={() => setIsOn(!isOn)}>
        Toggle
      </button>
      <button type="button" onClick={() => setIsOn(true)}>
        Turn on
      </button>
    </>
  );
};

describe("useControlledState", () => {
  it("supports uncontrolled state starting from the default value", async () => {
    const user = setupUser();
    const onChange = vi.fn();

    render(<Toggle defaultValue onChange={onChange} />);

    const toggle = screen.getByRole("button", {name: "Toggle"});

    expect(toggle).toHaveAttribute("aria-pressed", "true");

    await user.click(toggle);

    expect(toggle).toHaveAttribute("aria-pressed", "false");
    expect(onChange).toHaveBeenLastCalledWith(false);
  });

  it("supports controlled state that only changes with the value prop", async () => {
    const user = setupUser();
    const onChange = vi.fn();
    const {rerender} = render(<Toggle value={false} onChange={onChange} />);

    const toggle = screen.getByRole("button", {name: "Toggle"});

    await user.click(toggle);

    expect(onChange).toHaveBeenLastCalledWith(true);
    expect(toggle).toHaveAttribute("aria-pressed", "false");

    rerender(<Toggle value onChange={onChange} />);

    expect(toggle).toHaveAttribute("aria-pressed", "true");
  });

  it("calls onChange only when the value changes", async () => {
    const user = setupUser();
    const onChange = vi.fn();

    render(<Toggle onChange={onChange} />);

    const turnOn = screen.getByRole("button", {name: "Turn on"});

    await user.click(turnOn);
    await user.click(turnOn);

    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
