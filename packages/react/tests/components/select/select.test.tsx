import {User, cleanup, render, runAllTimers, screen} from "@heroui/testing/helpers";

import {SelectFixture} from "./fixtures";

describe("Select", () => {
  let testUtilUser: User;

  beforeEach(() => {
    vi.useFakeTimers({shouldAdvanceTime: true});
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
});
