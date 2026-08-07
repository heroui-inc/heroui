import {User, render, screen, setupUser} from "@heroui/testing/helpers";

import {Checkbox} from "@/components/checkbox";
import {CheckboxGroup} from "@/components/checkbox-group";
import {Description} from "@/components/description";
import {FieldError} from "@/components/field-error";
import {Label} from "@/components/label";

const renderInterests = (
  props: {
    isDisabled?: boolean;
    isInvalid?: boolean;
    onChange?: (value: string[]) => void;
    defaultValue?: string[];
    variant?: "primary" | "secondary";
  } = {},
) =>
  render(
    <CheckboxGroup
      data-testid="interests"
      defaultValue={props.defaultValue}
      isDisabled={props.isDisabled}
      isInvalid={props.isInvalid}
      name="interests"
      variant={props.variant}
      onChange={props.onChange}
    >
      <Label>Select your interests</Label>
      <Description>Choose all that apply</Description>
      <Checkbox value="coding">
        <Checkbox.Content>
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
          Coding
        </Checkbox.Content>
      </Checkbox>
      <Checkbox value="design">
        <Checkbox.Content>
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
          Design
        </Checkbox.Content>
      </Checkbox>
      {props.isInvalid ? <FieldError>Pick at least one</FieldError> : null}
    </CheckboxGroup>,
  );

describe("CheckboxGroup", () => {
  let user: ReturnType<typeof setupUser>;
  let testUtilUser: User;

  beforeAll(() => {
    user = setupUser();
    testUtilUser = new User({interactionType: "mouse"});
  });

  it("exposes group role, BEM, and data-slot", () => {
    renderInterests();

    const group = screen.getByRole("group", {name: "Select your interests"});

    expect(group).toHaveAttribute("data-slot", "checkbox-group");
    expect(group.className).toEqual(expect.stringContaining("checkbox-group"));
    expect(screen.getByRole("checkbox", {name: "Coding"})).toBeInTheDocument();
    expect(screen.getByText("Choose all that apply")).toBeInTheDocument();
  });

  it("exposes variant BEM modifier", () => {
    renderInterests({variant: "secondary"});

    expect(screen.getByTestId("interests").className).toEqual(
      expect.stringContaining("checkbox-group--secondary"),
    );
  });

  it("calls onChange when selection is toggled via createTester", async () => {
    const onChange = vi.fn();

    renderInterests({onChange});

    const tester = testUtilUser.createTester("CheckboxGroup", {
      root: screen.getByTestId("interests"),
    });

    expect(tester.getCheckboxes()).toHaveLength(2);

    await tester.toggleCheckbox({checkbox: "Coding"});
    expect(onChange).toHaveBeenCalledWith(["coding"]);
    expect(tester.getSelectedCheckboxes()).toHaveLength(1);

    await tester.toggleCheckbox({checkbox: "Design"});
    expect(onChange).toHaveBeenCalledWith(["coding", "design"]);
    expect(tester.getSelectedCheckboxes()).toHaveLength(2);
  });

  it("supports keyboard toggle via createTester", async () => {
    const onChange = vi.fn();

    renderInterests({onChange});

    const tester = testUtilUser.createTester("CheckboxGroup", {
      root: screen.getByTestId("interests"),
      interactionType: "keyboard",
    });

    await tester.toggleCheckbox({checkbox: "Design", interactionType: "keyboard"});
    expect(onChange).toHaveBeenCalledWith(["design"]);
  });

  it("supports group disabled state", async () => {
    const onChange = vi.fn();

    renderInterests({isDisabled: true, onChange});

    expect(screen.getByTestId("interests")).toHaveAttribute("data-disabled", "true");
    expect(screen.getByRole("checkbox", {name: "Coding"})).toBeDisabled();

    await user.click(screen.getByRole("checkbox", {name: "Coding"}));
    expect(onChange).not.toHaveBeenCalled();
  });

  it("renders FieldError when invalid", () => {
    renderInterests({isInvalid: true});

    expect(screen.getByText("Pick at least one")).toBeInTheDocument();
    expect(screen.getByTestId("interests")).toHaveAttribute("data-invalid", "true");
  });
});
