import {render, screen, setupUser} from "@heroui/testing/helpers";

import {Label} from "@/components/label";
import {Radio} from "@/components/radio";
import {RadioGroup} from "@/components/radio-group";

describe("Radio", () => {
  let user: ReturnType<typeof setupUser>;

  beforeAll(() => {
    user = setupUser();
  });

  const renderGroup = (
    props: {
      defaultValue?: string;
      onChange?: (value: string) => void;
      disabledValue?: string;
    } = {},
  ) =>
    render(
      <RadioGroup defaultValue={props.defaultValue} onChange={props.onChange}>
        <Label>Plan</Label>
        <Radio isDisabled={props.disabledValue === "a"} value="a">
          <Radio.Content>
            <Radio.Control>
              <Radio.Indicator />
            </Radio.Control>
            Basic
          </Radio.Content>
        </Radio>
        <Radio isDisabled={props.disabledValue === "b"} value="b">
          <Radio.Content>
            <Radio.Control>
              <Radio.Indicator />
            </Radio.Control>
            Premium
          </Radio.Content>
        </Radio>
      </RadioGroup>,
    );

  it("renders radiogroup and radio roles with accessible names", () => {
    renderGroup({defaultValue: "a"});

    expect(screen.getByRole("radiogroup", {name: "Plan"})).toBeInTheDocument();
    expect(screen.getByRole("radio", {name: "Basic"})).toBeChecked();
    expect(screen.getByRole("radio", {name: "Premium"})).not.toBeChecked();
  });

  it("exposes BEM block and composed data-slots", () => {
    renderGroup({defaultValue: "a"});

    const field = document.querySelector('[data-slot="radio"]');

    expect(field?.className).toEqual(expect.stringContaining("radio"));
    expect(document.querySelector('[data-slot="radio-content"]')).not.toBeNull();
    expect(document.querySelector('[data-slot="radio-control"]')).not.toBeNull();
    expect(document.querySelector('[data-slot="radio-indicator"]')).not.toBeNull();
  });

  it("calls onChange when a radio is selected", async () => {
    const onChange = vi.fn();

    renderGroup({defaultValue: "a", onChange});

    await user.click(screen.getByRole("radio", {name: "Premium"}));
    expect(screen.getByRole("radio", {name: "Premium"})).toBeChecked();
    expect(screen.getByRole("radio", {name: "Basic"})).not.toBeChecked();
    expect(onChange).toHaveBeenCalledWith("b");
  });

  it("exposes data-selected on the selected field", async () => {
    renderGroup({defaultValue: "a"});

    const premium = screen.getByRole("radio", {name: "Premium"});
    const field = premium.closest("[data-slot='radio']");

    await user.click(premium);
    expect(field).toHaveAttribute("data-selected", "true");
  });

  it("supports disabled radio without selecting", async () => {
    const onChange = vi.fn();

    renderGroup({defaultValue: "a", onChange, disabledValue: "b"});
    const premium = screen.getByRole("radio", {name: "Premium"});
    const field = premium.closest("[data-slot='radio']");

    expect(premium).toBeDisabled();
    expect(field).toHaveAttribute("data-disabled", "true");

    await user.click(premium);
    expect(onChange).not.toHaveBeenCalled();
    expect(screen.getByRole("radio", {name: "Basic"})).toBeChecked();
  });

  it("supports arrow key selection", async () => {
    const onChange = vi.fn();

    renderGroup({defaultValue: "a", onChange});

    await user.tab();
    expect(screen.getByRole("radio", {name: "Basic"})).toHaveFocus();

    await user.keyboard("{ArrowDown}");
    expect(screen.getByRole("radio", {name: "Premium"})).toBeChecked();
    expect(onChange).toHaveBeenCalledWith("b");

    await user.keyboard("{ArrowUp}");
    expect(screen.getByRole("radio", {name: "Basic"})).toBeChecked();
    expect(onChange).toHaveBeenCalledWith("a");
  });
});
