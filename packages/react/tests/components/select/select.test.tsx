import {
  User,
  cleanup,
  fireEvent,
  render,
  runAllTimers,
  screen,
  setupUser,
} from "@heroui/testing/helpers";

import {SelectFixture} from "./fixtures";

describe("Select", () => {
  let testUtilUser: User;
  let user: ReturnType<typeof setupUser>;

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
    render(<SelectFixture />);

    const root = screen.getByTestId("select");

    expect(root).toHaveAttribute("data-slot", "select");
    expect(root.className).toEqual(expect.stringContaining("select"));
    expect(document.querySelector('[data-slot="select-trigger"]')).not.toBeNull();
    expect(document.querySelector('[data-slot="select-value"]')).not.toBeNull();
  });

  it("supports open, select, and value update via Select tester", async () => {
    const onChange = vi.fn();

    render(<SelectFixture onChange={onChange} />);

    const tester = testUtilUser.createTester("Select", {
      root: screen.getByTestId("select"),
    });

    expect(tester.getListbox()).toBeNull();

    await tester.open();
    runAllTimers();

    expect(tester.getListbox()).not.toBeNull();
    expect(document.querySelector('[data-slot="select-popover"]')).not.toBeNull();
    expect(tester.getOptions()).toHaveLength(3);

    await tester.toggleOptionSelection({option: "California"});
    runAllTimers();

    expect(onChange).toHaveBeenCalledWith("california");
    expect(tester.getListbox()).toBeNull();
    expect(screen.getByTestId("select")).toHaveTextContent("California");
  });

  it("supports open and select via keyboard", async () => {
    const onChange = vi.fn();

    render(<SelectFixture onChange={onChange} />);

    const tester = testUtilUser.createTester("Select", {
      root: screen.getByTestId("select"),
      interactionType: "keyboard",
    });

    await tester.open();
    runAllTimers();

    expect(tester.getListbox()).not.toBeNull();

    await tester.toggleOptionSelection({option: "Texas"});
    runAllTimers();

    expect(onChange).toHaveBeenCalledWith("texas");
    expect(tester.getListbox()).toBeNull();
    expect(screen.getByTestId("select")).toHaveTextContent("Texas");
  });

  it("supports controlled value", () => {
    render(<SelectFixture value="texas" />);

    expect(screen.getByTestId("select")).toHaveTextContent("Texas");
  });

  it("supports disabled state", async () => {
    const onChange = vi.fn();

    render(<SelectFixture isDisabled onChange={onChange} />);

    const tester = testUtilUser.createTester("Select", {
      root: screen.getByTestId("select"),
    });

    expect(tester.getTrigger()).toBeDisabled();

    await tester.open();
    runAllTimers();

    expect(tester.getListbox()).toBeNull();
    expect(onChange).not.toHaveBeenCalled();
  });

  it("renders FieldError when invalid", () => {
    render(<SelectFixture isInvalid />);

    expect(screen.getByText("Please choose a state")).toBeInTheDocument();
    expect(document.querySelector('[data-slot="field-error"]')).not.toBeNull();
    expect(screen.getByTestId("select")).toHaveAttribute("data-invalid", "true");
  });

  describe("clear button", () => {
    const getClearButton = () => document.querySelector('[data-slot="select-clear-button"]')!;

    it("renders as a span so the trigger never nests a button", () => {
      render(<SelectFixture withClearButton defaultValue="california" />);

      const trigger = document.querySelector('[data-slot="select-trigger"]')!;

      expect(getClearButton()).not.toBeNull();
      expect(getClearButton().tagName).toBe("SPAN");
      expect(trigger.contains(getClearButton())).toBe(true);
      expect(trigger.querySelectorAll("button")).toHaveLength(0);
    });

    it("clears the selection on click without opening the listbox", async () => {
      const onChange = vi.fn();
      const onClear = vi.fn();

      render(
        <SelectFixture
          withClearButton
          defaultValue="california"
          onChange={onChange}
          onClear={onClear}
        />,
      );

      await user.click(getClearButton());
      runAllTimers();

      expect(onClear).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(null);
      expect(document.querySelector('[data-slot="select-popover"]')).toBeNull();
      expect(screen.getByTestId("select")).toHaveTextContent("Select one");
      expect(document.querySelector('[data-slot="select-value"]')).toHaveAttribute(
        "data-placeholder",
        "true",
      );
    });

    it("does not clear on secondary or middle pointer buttons", async () => {
      const onClear = vi.fn();

      render(<SelectFixture withClearButton defaultValue="california" onClear={onClear} />);

      await user.pointer({keys: "[MouseRight]", target: getClearButton()});
      await user.pointer({keys: "[MouseMiddle]", target: getClearButton()});
      runAllTimers();

      expect(onClear).not.toHaveBeenCalled();
      expect(screen.getByTestId("select")).toHaveTextContent("California");
    });

    it("exposes an empty state and ignores clicks with no selection", async () => {
      const onClear = vi.fn();

      render(<SelectFixture withClearButton onClear={onClear} />);

      expect(getClearButton()).toHaveAttribute("data-empty", "true");

      await user.click(getClearButton());
      runAllTimers();

      expect(onClear).not.toHaveBeenCalled();
    });

    it("does not clear when the select is disabled", () => {
      const onClear = vi.fn();

      render(
        <SelectFixture isDisabled withClearButton defaultValue="california" onClear={onClear} />,
      );

      fireEvent.click(getClearButton());
      runAllTimers();

      expect(onClear).not.toHaveBeenCalled();
      expect(screen.getByTestId("select")).toHaveTextContent("California");
    });

    it("does not clear when only the trigger is disabled", () => {
      const onClear = vi.fn();

      render(
        <SelectFixture
          isTriggerDisabled
          withClearButton
          defaultValue="california"
          onClear={onClear}
        />,
      );

      fireEvent.click(getClearButton());
      runAllTimers();

      expect(onClear).not.toHaveBeenCalled();
      expect(screen.getByTestId("select")).toHaveTextContent("California");
    });

    it("renders custom children in place of the default icon", () => {
      render(
        <SelectFixture
          withClearButton
          clearButtonChildren={<span data-testid="custom-clear-icon" />}
          defaultValue="california"
        />,
      );

      expect(screen.getByTestId("custom-clear-icon")).toBeInTheDocument();
      expect(document.querySelector('[data-slot="select-clear-button-icon"]')).toBeNull();
    });
  });

  describe("clear shortcut", () => {
    const getTrigger = () =>
      document.querySelector('[data-slot="select-trigger"]') as HTMLButtonElement;

    const focusTriggerAndPress = async (key: string) => {
      getTrigger().focus();
      expect(getTrigger()).toHaveFocus();

      await user.keyboard(key);
      runAllTimers();
    };

    it("clears the selection with Backspace", async () => {
      const onChange = vi.fn();
      const onClear = vi.fn();

      render(
        <SelectFixture
          withClearButton
          defaultValue="california"
          onChange={onChange}
          onClear={onClear}
        />,
      );

      await focusTriggerAndPress("{Backspace}");

      expect(onClear).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(null);
      expect(screen.getByTestId("select")).toHaveTextContent("Select one");
      expect(document.querySelector('[data-slot="select-popover"]')).toBeNull();
    });

    it("clears the selection with Delete", async () => {
      const onChange = vi.fn();

      render(<SelectFixture withClearButton defaultValue="california" onChange={onChange} />);

      await focusTriggerAndPress("{Delete}");

      expect(onChange).toHaveBeenCalledWith(null);
      expect(screen.getByTestId("select")).toHaveTextContent("Select one");
    });

    it("does not clear when no clear button is composed", async () => {
      const onChange = vi.fn();

      render(<SelectFixture defaultValue="california" onChange={onChange} />);

      await focusTriggerAndPress("{Backspace}");

      expect(onChange).not.toHaveBeenCalled();
      expect(screen.getByTestId("select")).toHaveTextContent("California");
    });

    it("leaves other keys to the select", async () => {
      const onChange = vi.fn();

      render(<SelectFixture withClearButton defaultValue="california" onChange={onChange} />);

      await focusTriggerAndPress("{ArrowDown}");

      expect(onChange).not.toHaveBeenCalled();
      expect(document.querySelector('[data-slot="select-popover"]')).not.toBeNull();
    });
  });
});
