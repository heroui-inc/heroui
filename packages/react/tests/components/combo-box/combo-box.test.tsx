import {User, cleanup, render, runAllTimers, screen, setupUser} from "@heroui/testing/helpers";

import {ComboBoxFixture} from "./fixtures";

describe("ComboBox", () => {
  let user: ReturnType<typeof setupUser>;
  let testUtilUser: User;

  beforeEach(() => {
    vi.useFakeTimers({shouldAdvanceTime: true});
    user = setupUser({advanceTimers: vi.advanceTimersByTime});
    testUtilUser = new User({
      interactionType: "mouse",
      advanceTimer: vi.advanceTimersByTime,
    });
  });

  afterEach(() => {
    cleanup();
    runAllTimers();
    vi.useRealTimers();
  });

  it("exposes data-slots and BEM block", () => {
    render(<ComboBoxFixture />);

    const root = screen.getByTestId("combo-box");

    expect(root).toHaveAttribute("data-slot", "combo-box");
    expect(root.className).toEqual(expect.stringContaining("combo-box"));
    expect(document.querySelector('[data-slot="combo-box-input-group"]')).not.toBeNull();
    expect(document.querySelector('[data-slot="combo-box-trigger"]')).not.toBeNull();
  });

  it("supports open and select via ComboBox tester", async () => {
    const onChange = vi.fn();

    render(<ComboBoxFixture onChange={onChange} />);

    const tester = testUtilUser.createTester("ComboBox", {
      root: screen.getByTestId("combo-box"),
    });

    await tester.open({triggerBehavior: "manual"});
    runAllTimers();

    expect(tester.getListbox()).not.toBeNull();
    expect(document.querySelector('[data-slot="combo-box-popover"]')).not.toBeNull();

    await tester.toggleOptionSelection({option: "Dog", triggerBehavior: "manual"});
    runAllTimers();

    expect(onChange).toHaveBeenCalledWith("dog");
    expect(tester.getCombobox()).toHaveValue("Dog");
  });

  it("supports filtering options while typing", async () => {
    render(<ComboBoxFixture />);

    const combobox = screen.getByRole("combobox", {name: "Favorite Animal"});

    await user.click(combobox);
    await user.keyboard("pa");
    runAllTimers();

    expect(screen.getByRole("option", {name: "Panda"})).toBeInTheDocument();
    expect(screen.queryByRole("option", {name: "Cat"})).toBeNull();
    expect(screen.queryByRole("option", {name: "Dog"})).toBeNull();
  });

  it("supports disabled state", async () => {
    const onChange = vi.fn();

    render(<ComboBoxFixture isDisabled onChange={onChange} />);

    const tester = testUtilUser.createTester("ComboBox", {
      root: screen.getByTestId("combo-box"),
    });

    expect(tester.getCombobox()).toBeDisabled();

    await tester.open({triggerBehavior: "manual"});
    runAllTimers();

    expect(tester.getListbox()).toBeNull();
    expect(onChange).not.toHaveBeenCalled();
  });

  it("renders default selected value", () => {
    render(<ComboBoxFixture defaultValue="cat" />);

    expect(screen.getByRole("combobox", {name: "Favorite Animal"})).toHaveValue("Cat");
  });

  it("renders FieldError when invalid", () => {
    render(<ComboBoxFixture isInvalid />);

    expect(screen.getByText("Please choose an animal")).toBeInTheDocument();
    expect(document.querySelector('[data-slot="field-error"]')).not.toBeNull();
    expect(screen.getByTestId("combo-box")).toHaveAttribute("data-invalid", "true");
  });
});
