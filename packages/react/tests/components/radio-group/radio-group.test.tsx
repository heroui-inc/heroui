import {User, render, screen, setupUser} from "@heroui/testing/helpers";

import {Description} from "@/components/description";
import {FieldError} from "@/components/field-error";
import {Label} from "@/components/label";
import {Radio} from "@/components/radio";
import {RadioGroup} from "@/components/radio-group";

const renderPlan = (
  props: {
    isDisabled?: boolean;
    isInvalid?: boolean;
    onChange?: (value: string) => void;
    defaultValue?: string;
    variant?: "primary" | "secondary";
  } = {},
) =>
  render(
    <RadioGroup
      data-testid="plan"
      defaultValue={props.defaultValue}
      isDisabled={props.isDisabled}
      isInvalid={props.isInvalid}
      name="plan"
      variant={props.variant}
      onChange={props.onChange}
    >
      <Label>Plan</Label>
      <Description>Choose one plan</Description>
      <Radio value="a">
        <Radio.Content>
          <Radio.Control>
            <Radio.Indicator />
          </Radio.Control>
          Basic
        </Radio.Content>
      </Radio>
      <Radio value="b">
        <Radio.Content>
          <Radio.Control>
            <Radio.Indicator />
          </Radio.Control>
          Premium
        </Radio.Content>
      </Radio>
      {props.isInvalid ? <FieldError>Select a plan</FieldError> : null}
    </RadioGroup>,
  );

describe("RadioGroup", () => {
  let user: ReturnType<typeof setupUser>;
  let testUtilUser: User;

  beforeAll(() => {
    user = setupUser();
    testUtilUser = new User({interactionType: "mouse"});
  });

  it("exposes radiogroup role, BEM, and data-slot", () => {
    renderPlan({defaultValue: "a"});

    const group = screen.getByRole("radiogroup", {name: "Plan"});

    expect(group).toHaveAttribute("data-slot", "radio-group");
    expect(group.className).toEqual(expect.stringContaining("radio-group"));
    expect(screen.getByText("Choose one plan")).toBeInTheDocument();
  });

  it("exposes variant BEM modifier", () => {
    renderPlan({variant: "secondary"});

    expect(screen.getByTestId("plan").className).toEqual(
      expect.stringContaining("radio-group--secondary"),
    );
  });

  it("supports selection via createTester", async () => {
    const onChange = vi.fn();

    renderPlan({defaultValue: "a", onChange});

    const tester = testUtilUser.createTester("RadioGroup", {
      root: screen.getByTestId("plan"),
    });

    expect(tester.getRadios()).toHaveLength(2);
    expect(tester.getSelectedRadio()).toBe(screen.getByRole("radio", {name: "Basic"}));

    await tester.triggerRadio({radio: "Premium"});
    expect(onChange).toHaveBeenCalledWith("b");
    expect(tester.getSelectedRadio()).toBe(screen.getByRole("radio", {name: "Premium"}));
  });

  it("supports group disabled state", async () => {
    const onChange = vi.fn();

    renderPlan({defaultValue: "a", isDisabled: true, onChange});

    expect(screen.getByTestId("plan")).toHaveAttribute("data-disabled", "true");
    expect(screen.getByRole("radio", {name: "Basic"})).toBeDisabled();

    await user.click(screen.getByRole("radio", {name: "Premium"}));
    expect(onChange).not.toHaveBeenCalled();
  });

  it("renders FieldError when invalid", () => {
    renderPlan({isInvalid: true});

    expect(screen.getByText("Select a plan")).toBeInTheDocument();
    expect(screen.getByTestId("plan")).toHaveAttribute("data-invalid", "true");
  });
});
