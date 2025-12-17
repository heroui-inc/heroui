import type {UserEvent} from "@testing-library/user-event";

import * as React from "react";
import {render, fireEvent, act} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {useForm} from "react-hook-form";
import {Form} from "@heroui/form";
import {HeroUIProvider} from "@heroui/system";

import {NumberInput} from "../src";

describe("NumberInput", () => {
  let user: UserEvent;

  beforeEach(() => {
    user = userEvent.setup();
  });

  it("should render correctly", () => {
    const wrapper = render(<NumberInput label="test number input" />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLInputElement>();

    render(<NumberInput ref={ref} label="test number input" />);

    expect(ref.current).not.toBeNull();
  });

  it("should have aria-invalid when invalid", () => {
    const {container} = render(<NumberInput isInvalid={true} label="test number input" />);

    expect(container.querySelector("input")).toHaveAttribute("aria-invalid", "true");
  });

  it("should have aria-readonly when isReadOnly", () => {
    const {container} = render(<NumberInput isReadOnly label="test number input" />);

    expect(container.querySelector("input")).toHaveAttribute("aria-readonly", "true");
  });

  it("should have disabled attribute when isDisabled", () => {
    const {container} = render(<NumberInput isDisabled label="test number input" />);

    expect(container.querySelector("input")).toHaveAttribute("disabled");
  });

  it("should disable the clear button when isDisabled", () => {
    const {getByRole} = render(
      <NumberInput hideStepper isClearable isDisabled label="test number input" />,
    );

    const clearButton = getByRole("button");

    expect(clearButton).toBeDisabled();
  });

  it("should not allow clear button to be focusable", () => {
    const {getByRole} = render(<NumberInput hideStepper isClearable label="test number input" />);

    const clearButton = getByRole("button");

    expect(clearButton).toHaveAttribute("tabIndex", "-1");
  });

  it("should have required attribute when isRequired with native validationBehavior", () => {
    const {container} = render(
      <NumberInput isRequired label="test number input" validationBehavior="native" />,
    );

    expect(container.querySelector("input")).toHaveAttribute("required");
    expect(container.querySelector("input")).not.toHaveAttribute("aria-required");
  });

  it("should have aria-required attribute when isRequired with aria validationBehavior", () => {
    const {container} = render(
      <NumberInput isRequired label="test number input" validationBehavior="aria" />,
    );

    expect(container.querySelector("input")).not.toHaveAttribute("required");
    expect(container.querySelector("input")).toHaveAttribute("aria-required", "true");
  });

  it("should have aria-describedby when description is provided", () => {
    const {container} = render(<NumberInput description="description" label="test number input" />);

    expect(container.querySelector("input")).toHaveAttribute("aria-describedby");
  });

  it("should have aria-describedby when errorMessage is provided", () => {
    const {container} = render(
      <NumberInput isInvalid errorMessage="error text" label="test number input" />,
    );

    expect(container.querySelector("input")).toHaveAttribute("aria-describedby");
  });

  it("should have the same aria-labelledby as label id", () => {
    const {container} = render(<NumberInput label="test number input" />);

    const labelId = container.querySelector("label")?.id;

    const labelledBy = container.querySelector("input")?.getAttribute("aria-labelledby");

    expect(labelledBy?.includes(labelId as string)).toBeTruthy();
  });

  it("should call dom event handlers only once", () => {
    const onFocus = jest.fn();

    const {container} = render(<NumberInput label="test number input" onFocus={onFocus} />);

    act(() => {
      container.querySelector("input")?.focus();

      container.querySelector("input")?.blur();

      expect(onFocus).toHaveBeenCalledTimes(1);
    });
  });

  it("ref should update the value", () => {
    const ref = React.createRef<HTMLInputElement>();

    const {container} = render(<NumberInput ref={ref} label="test number input" />);

    if (!ref.current) {
      throw new Error("ref is null");
    }
    const value = "1234";

    ref.current!.value = value;

    act(() => {
      container.querySelector("input")?.focus();

      expect(ref.current?.value)?.toBe(value);
    });
  });

  it("should clear the value and onClear is triggered", async () => {
    const onClear = jest.fn();

    const ref = React.createRef<HTMLInputElement>();

    const {getByRole} = render(
      <NumberInput
        ref={ref}
        hideStepper
        isClearable
        defaultValue={1234}
        label="test number-input"
        onClear={onClear}
      />,
    );

    const clearButton = getByRole("button")!;

    expect(clearButton).not.toBeNull();

    const user = userEvent.setup();

    await user.click(clearButton);

    expect(ref.current?.value)?.toBe("");

    expect(onClear).toHaveBeenCalledTimes(1);
  });

  it("should disable clear button when isReadOnly is true", async () => {
    const onClear = jest.fn();

    const ref = React.createRef<HTMLInputElement>();

    const {getByRole} = render(
      <NumberInput
        ref={ref}
        hideStepper
        isClearable
        isReadOnly
        defaultValue={1234}
        label="test number-input"
        onClear={onClear}
      />,
    );

    const clearButton = getByRole("button")!;

    expect(clearButton).not.toBeNull();

    const user = userEvent.setup();

    await user.click(clearButton);

    expect(onClear).toHaveBeenCalledTimes(0);
  });

  it("should reset to max value if the value exceeds", async () => {
    const {container} = render(
      <NumberInput isInvalid={true} label="test number input" maxValue={100} />,
    );

    const input = container.querySelector("input") as HTMLInputElement;

    await user.click(input);
    await user.keyboard("1024");
    await user.tab();

    expect(input).toHaveValue("100");
  });

  it("should reset to min value if the value subceed", async () => {
    const {container} = render(
      <NumberInput isInvalid={true} label="test number input" minValue={100} />,
    );

    const input = container.querySelector("input") as HTMLInputElement;

    await user.click(input);
    await user.keyboard("50");
    await user.tab();

    expect(input).toHaveValue("100");
  });

  it("should render stepper", async () => {
    const {container} = render(<NumberInput isInvalid={true} label="test number input" />);

    const stepperButton = container.querySelector("[data-slot='stepper-wrapper'] button")!;

    expect(stepperButton).not.toBeNull();
  });

  it("should hide stepper", async () => {
    const {container} = render(
      <NumberInput hideStepper isInvalid={true} label="test number input" />,
    );

    const stepperButton = container.querySelector("[data-slot='stepper-wrapper'] button")!;

    expect(stepperButton).toBeNull();
  });

  it("should clear value when isClearable and pressing ESC key", async () => {
    const onClear = jest.fn();
    const defaultValue = 12;

    const {container} = render(
      <NumberInput isClearable defaultValue={defaultValue} onClear={onClear} />,
    );

    const input = container.querySelector("input") as HTMLInputElement;

    expect(input.value).toBe(defaultValue.toString());

    fireEvent.keyDown(input, {key: "Escape"});
    expect(input.value).toBe("");
    expect(onClear).toHaveBeenCalledTimes(1);
  });

  it("should not clear value when pressing ESC key if input is empty", () => {
    const onClear = jest.fn();

    const {container} = render(<NumberInput isClearable onClear={onClear} />);

    const input = container.querySelector("input") as HTMLInputElement;

    fireEvent.keyDown(input, {key: "Escape"});
    expect(onClear).not.toHaveBeenCalled();
  });

  it("should not clear value when pressing ESC key without isClearable", () => {
    const defaultValue = 12;

    const {container} = render(<NumberInput defaultValue={defaultValue} />);

    const input = container.querySelector("input") as HTMLInputElement;

    expect(input.value).toBe(defaultValue.toString());

    fireEvent.keyDown(input, {key: "Escape"});
    expect(input.value).toBe(defaultValue.toString());
  });

  it("should not clear value when pressing ESC key if input is readonly", () => {
    const onClear = jest.fn();
    const defaultValue = 42;

    const {container} = render(<NumberInput isReadOnly defaultValue={defaultValue} />);

    const input = container.querySelector("input") as HTMLInputElement;

    expect(input.value).toBe(defaultValue.toString());

    fireEvent.keyDown(input, {key: "Escape"});

    expect(input.value).toBe(defaultValue.toString());
    expect(onClear).not.toHaveBeenCalled();
  });

  it("should emit onChange", async () => {
    const onChange = jest.fn();

    const {container} = render(<NumberInput label="test number input" onChange={onChange} />);

    const input = container.querySelector("input") as HTMLInputElement;

    await user.click(input);
    await user.keyboard("1024");

    expect(onChange).toHaveBeenCalledTimes(4);
  });

  it("should emit onChange with keyboard up & down key", async () => {
    const onChange = jest.fn();

    const {container} = render(<NumberInput label="test number input" onChange={onChange} />);

    const input = container.querySelector("input") as HTMLInputElement;

    await user.click(input);
    await user.keyboard("[ArrowUp]");
    await user.keyboard("[ArrowUp]");
    expect(onChange).toHaveBeenCalledTimes(2);
    await user.keyboard("[ArrowDown]");
    expect(onChange).toHaveBeenCalledTimes(3);
  });
});

describe("NumberInput with React Hook Form", () => {
  let hiddenInput1: HTMLInputElement;
  let hiddenInput2: HTMLInputElement;
  let hiddenInput3: HTMLInputElement;
  let visibleInput3: HTMLInputElement;
  let submitButton: HTMLButtonElement;
  let onSubmit: () => void;

  beforeEach(() => {
    onSubmit = jest.fn();

    function TestForm() {
      const {
        handleSubmit,
        setValue,
        watch,
        register,
        formState: {errors},
      } = useForm<{
        withDefaultValue: number;
        withoutDefaultValue?: number;
        requiredField?: number;
      }>();

      React.useEffect(() => {
        register("withDefaultValue");
        register("withoutDefaultValue");
        register("requiredField", {required: true});
      }, [register]);

      const requiredFieldValue = watch("requiredField");

      return (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <NumberInput
            isClearable
            data-testid="input-1"
            defaultValue={1234}
            label="With default value"
            name="withDefaultValue"
            onValueChange={(value) => setValue("withDefaultValue", value)}
          />
          <NumberInput
            data-testid="input-2"
            label="Without default value"
            name="withoutDefaultValue"
            onValueChange={(value) => setValue("withoutDefaultValue", value)}
          />
          <NumberInput
            data-testid="input-3"
            label="Required"
            name="requiredField"
            value={requiredFieldValue}
            onValueChange={(value) =>
              setValue("requiredField", value, {shouldValidate: true, shouldDirty: true})
            }
          />
          {errors.requiredField && <span className="text-danger">This field is required</span>}
          <button type="submit">Submit</button>
        </form>
      );
    }

    const {getByTestId} = render(<TestForm />);

    hiddenInput1 = document.querySelector("input[name=withDefaultValue][type=hidden]")!;
    hiddenInput2 = document.querySelector("input[name=withoutDefaultValue][type=hidden]")!;
    hiddenInput3 = document.querySelector("input[name=requiredField][type=hidden]")!;
    visibleInput3 = getByTestId("input-3") as HTMLInputElement;
    submitButton = document.querySelector('button[type="submit"]')!;
  });

  it("should work with defaultValues", () => {
    expect(hiddenInput1).toHaveValue("1234");
    expect(hiddenInput2).not.toHaveValue();
    expect(hiddenInput3).not.toHaveValue();

    expect(document.querySelectorAll('input[name="requiredField"]')).toHaveLength(1);
    expect(visibleInput3).not.toHaveAttribute("name");
    expect(hiddenInput3).toHaveAttribute("name", "requiredField");
  });

  it("should not submit form when required field is empty", async () => {
    const user = userEvent.setup();

    await user.click(submitButton);

    expect(onSubmit).toHaveBeenCalledTimes(0);
  });

  it("should submit form when required field is not empty", async () => {
    const user = userEvent.setup();

    await user.click(visibleInput3);
    await user.keyboard("123");

    expect(hiddenInput3).toHaveValue("123");

    await user.click(submitButton);

    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  describe("validation", () => {
    let user: UserEvent;

    beforeEach(() => {
      user = userEvent.setup();
    });

    describe("validationBehavior=native", () => {
      it("supports isRequired", async () => {
        const {getByTestId} = render(
          <Form data-testid="form" validationBehavior="native">
            <NumberInput isRequired data-testid="input" label="Name" />
          </Form>,
        );

        const input = getByTestId("input") as HTMLInputElement;

        expect(input).toHaveAttribute("required");
        expect(input).not.toHaveAttribute("aria-required");
        expect(input).not.toHaveAttribute("aria-describedby");
        expect(input.validity.valid).toBe(false);

        act(() => {
          (getByTestId("form") as HTMLFormElement).checkValidity();
        });

        expect(document.activeElement).toBe(input);
        expect(input).toHaveAttribute("aria-describedby");
        expect(document.getElementById(input.getAttribute("aria-describedby")!)).toHaveTextContent(
          "Constraints not satisfied",
        );

        await user.keyboard("1234");

        expect(input).toHaveAttribute("aria-describedby");
        expect(input.validity.valid).toBe(true);

        await user.tab();

        expect(input).not.toHaveAttribute("aria-describedby");
      });

      it("supports validate function", async () => {
        const {getByTestId} = render(
          <Form data-testid="form" validationBehavior="native">
            <NumberInput
              data-testid="input"
              defaultValue={1234}
              label="Name"
              validate={(v) => (v === 1234 ? "Invalid amount" : null)}
            />
          </Form>,
        );

        const input = getByTestId("input") as HTMLInputElement;

        expect(input).not.toHaveAttribute("aria-describedby");
        expect(input.validity.valid).toBe(false);

        act(() => {
          (getByTestId("form") as HTMLFormElement).checkValidity();
        });

        expect(document.activeElement).toBe(input);
        expect(input).toHaveAttribute("aria-describedby");
        expect(document.getElementById(input.getAttribute("aria-describedby")!)).toHaveTextContent(
          "Invalid amount",
        );

        await user.keyboard("4321");
        await user.tab();

        act(() => {
          (getByTestId("form") as HTMLFormElement).checkValidity();
        });

        expect(input.validity.valid).toBe(true);
        expect(input).not.toHaveAttribute("aria-describedby");
      });

      it("supports server validation", async () => {
        function Test() {
          let [serverErrors, setServerErrors] = React.useState({});
          let onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            setServerErrors({
              name: "Invalid amount.",
            });
          };

          return (
            <Form
              data-testid="form"
              validationBehavior="native"
              validationErrors={serverErrors}
              onSubmit={onSubmit}
            >
              <NumberInput data-testid="input" label="Name" name="name" />
              <button data-testid="submit" type="submit">
                Submit
              </button>
            </Form>
          );
        }

        const {getByTestId} = render(<Test />);

        const input = getByTestId("input") as HTMLInputElement;
        const submitButton = getByTestId("submit");

        expect(input).not.toHaveAttribute("aria-describedby");

        await user.click(submitButton);
        act(() => {
          (getByTestId("form") as HTMLFormElement).checkValidity();
        });

        expect(input).toHaveAttribute("aria-describedby");
        expect(document.getElementById(input.getAttribute("aria-describedby")!)).toHaveTextContent(
          "Invalid amount.",
        );
        expect(input.validity.valid).toBe(false);

        // Clicking twice doesn't clear server errors.
        await user.click(submitButton);
        act(() => {
          (getByTestId("form") as HTMLFormElement).checkValidity();
        });

        expect(document.activeElement).toBe(input);
        expect(input).toHaveAttribute("aria-describedby");
        expect(document.getElementById(input.getAttribute("aria-describedby")!)).toHaveTextContent(
          "Invalid amount.",
        );
        expect(input.validity.valid).toBe(false);

        await user.keyboard("1234");
        await user.tab();

        expect(input).not.toHaveAttribute("aria-describedby");
        expect(input.validity.valid).toBe(true);
      });
    });

    describe('validationBehavior="aria"', () => {
      it("supports validate function", async () => {
        const {getByTestId} = render(
          <Form data-testid="form" validationBehavior="aria">
            <NumberInput
              data-testid="input"
              defaultValue={1234}
              label="Amount"
              validate={(v) => (v === 1234 ? "Invalid amount" : null)}
            />
          </Form>,
        );

        const input = getByTestId("input") as HTMLInputElement;

        expect(input).toHaveAttribute("aria-describedby");
        expect(input).toHaveAttribute("aria-invalid", "true");
        expect(document.getElementById(input.getAttribute("aria-describedby")!)).toHaveTextContent(
          "Invalid amount",
        );
        expect(input.validity.valid).toBe(true);

        await user.tab();
        await user.keyboard("1234");
      });

      it("supports server validation", async () => {
        const {getByTestId} = render(
          <Form validationBehavior="aria" validationErrors={{name: "Invalid amount"}}>
            <NumberInput data-testid="input" label="Name" name="name" />
          </Form>,
        );

        const input = getByTestId("input");

        expect(input).toHaveAttribute("aria-describedby");
        expect(input).toHaveAttribute("aria-invalid", "true");
        expect(document.getElementById(input.getAttribute("aria-describedby")!)).toHaveTextContent(
          "Invalid amount",
        );

        await user.tab();
        await user.keyboard("1234");
      });
    });

    describe("Backspace behavior with formatted numbers", () => {
      it("should handle backspace when cursor is between first digit and comma", async () => {
        const {container} = render(
          <NumberInput
            defaultValue={1234}
            formatOptions={{
              style: "decimal",
              useGrouping: true,
            }}
            label="test number input"
          />,
        );

        const input = container.querySelector("input[type='text']") as HTMLInputElement;

        expect(input.value).toBe("1,234");

        act(() => {
          input.focus();
          input.setSelectionRange(1, 1);
        });

        act(() => {
          fireEvent.keyDown(input, {key: "Backspace", code: "Backspace"});
        });

        expect(input.value).toBe("234");
      });

      it("should handle backspace for other formatted number scenarios", async () => {
        const {container} = render(
          <NumberInput
            defaultValue={1234567}
            formatOptions={{
              style: "decimal",
              useGrouping: true,
            }}
            label="test number input"
          />,
        );

        const input = container.querySelector("input[type='text']") as HTMLInputElement;

        expect(input.value).toBe("1,234,567");

        act(() => {
          input.focus();
          input.setSelectionRange(5, 5);
        });

        act(() => {
          fireEvent.keyDown(input, {key: "Backspace", code: "Backspace"});
        });

        expect(input.value).toBe("123,567");
      });
    });
  });

  describe("NumberInput with HeroUIProvider context", () => {
    it("should inherit labelPlacement from HeroUIProvider", () => {
      const {container} = render(
        <HeroUIProvider labelPlacement="outside">
          <NumberInput label="Test number input" />
        </HeroUIProvider>,
      );

      const label = container.querySelector("label");

      expect(label).toBeTruthy();
      expect(label?.className).toMatch(/translate-y.*100%/);
    });

    it("should prioritize labelPlacement prop over HeroUIProvider context", () => {
      const {container} = render(
        <HeroUIProvider labelPlacement="outside">
          <NumberInput label="Test number input" labelPlacement="inside" />
        </HeroUIProvider>,
      );

      const label = container.querySelector("label");

      expect(label).toBeTruthy();
      expect(label?.className).not.toMatch(/translate-y.*100%/);
    });

    it("should inherit labelPlacement='outside-top' from HeroUIProvider", () => {
      const {container} = render(
        <HeroUIProvider labelPlacement="outside-top">
          <NumberInput label="Test number input" />
        </HeroUIProvider>,
      );

      const label = container.querySelector("label");
      const mainWrapper = container.querySelector("[data-slot=main-wrapper]");

      expect(label).toBeTruthy();
      // outside-top uses flex-col on mainWrapper and relative label (no translate-y)
      expect(mainWrapper).toHaveClass("flex-col");
      expect(label?.className).not.toMatch(/translate-y.*100%/);
    });
  });
});

describe("NumberInput Real-Time Formatting", () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    user = userEvent.setup();
  });

  it("should format value in real-time when isRealTimeFormat is true", async () => {
    const {container} = render(
      <NumberInput
        isRealTimeFormat
        formatOptions={{style: "decimal", useGrouping: true}}
        label="Price"
      />,
    );
    const input = container.querySelector("input") as HTMLInputElement;

    await user.type(input, "1234");
    expect(input.value).toBe("1,234");
  });

  it("should format even if useGrouping is false when isRealTimeFormat is true", async () => {
    const {container} = render(
      <NumberInput
        isRealTimeFormat
        formatOptions={{style: "currency", currency: "USD", useGrouping: false}}
        label="Price"
      />,
    );
    const input = container.querySelector("input") as HTMLInputElement;

    // Type 1234. Should be formatted as $1234 (no comma)
    // Note: Currency symbol depends on locale. Default en-US -> $
    await user.type(input, "1234");
    // Standard currency formatting often adds decimals and currency symbol
    // We check that it has some currency formatting but NO commas for thousands
    expect(input.value).toMatch(/\$1234(\.00)?/);
    expect(input.value).not.toContain(",");
  });

  it("should prevent invalid input via beforeInput", async () => {
    const {container} = render(<NumberInput isRealTimeFormat label="Number" />);
    const input = container.querySelector("input") as HTMLInputElement;

    // Simulate beforeInput with invalid char
    // Note: userEvent.type simulates a sequence of events.
    // Ideally we'd use a more direct beforeInput simulation if userEvent passes through 'a' by default in JSDOM,
    // but the implementation logic we added (preventDefault) should block it if JSDOM/userEvent fires beforeInput.
    await user.type(input, "1a2");
    // 'a' should be blocked.
    expect(input.value).toBe("12");
  });

  it("should handle paste and format", async () => {
    const {container} = render(<NumberInput isRealTimeFormat label="Number" />);
    const input = container.querySelector("input") as HTMLInputElement;

    await user.click(input);
    await user.paste("1234");

    expect(input.value).toBe("1,234");
  });

  it("should NOT format in real-time when isRealTimeFormat is false (default)", async () => {
    const {container} = render(
      <NumberInput
        // isRealTimeFormat is undefined (false)
        formatOptions={{style: "decimal", useGrouping: true}}
        label="Price"
      />,
    );
    const input = container.querySelector("input") as HTMLInputElement;

    await user.click(input);
    await user.keyboard("1234");

    // Should remain "1234" (no commas) while typing because real-time formatting is off
    // Note: React Aria might format on blur, but here we check immediate value
    expect(input.value).toBe("1234");
  });

  describe("Cursor Restoration", () => {
    // Helper to spy on setSelectionRange
    let setSelectionRangeSpy: jest.SpyInstance;

    beforeEach(() => {
      jest.useFakeTimers();
      setSelectionRangeSpy = jest.spyOn(HTMLInputElement.prototype, "setSelectionRange");
    });

    afterEach(() => {
      setSelectionRangeSpy.mockRestore();
      jest.useRealTimers();
    });

    it("should restore cursor correctly when appending a digit", async () => {
      // 1,234 -> type '5' at end -> 12,345
      const {container} = render(
        <NumberInput
          isRealTimeFormat
          defaultValue={1234}
          formatOptions={{style: "decimal", useGrouping: true}}
          label="Price"
        />,
      );
      const input = container.querySelector("input") as HTMLInputElement;

      await user.click(input);
      // Move cursor to end
      act(() => {
        input.setSelectionRange(5, 5); // after 4
      });

      await user.keyboard("5");

      // Original: 1,234 (digits: 1234)
      // Type 5 -> Value: 12,345
      // Cursor should be after 5.
      // 1 (1) 2 (2) , (x) 3 (3) 4 (4) 5 (5) -> Index 6

      await act(async () => {
        jest.runAllTimers();
      });

      expect(input.value).toBe("12,345");
      expect(setSelectionRangeSpy).toHaveBeenLastCalledWith(6, 6);
    });

    it("should restore cursor correctly when prepending a digit", async () => {
      // 1,234 -> type '5' at start -> 51,234
      const {container} = render(
        <NumberInput
          isRealTimeFormat
          defaultValue={1234}
          formatOptions={{style: "decimal", useGrouping: true}}
          label="Price"
        />,
      );
      const input = container.querySelector("input") as HTMLInputElement;

      await user.click(input);
      // Move cursor to start
      act(() => {
        input.setSelectionRange(0, 0);
      });

      await user.keyboard("5");

      // Result: 51,234
      // Cursor should be after 5 (1st digit).
      // 5 (1) -> Index 1

      await act(async () => {
        jest.runAllTimers();
      });

      expect(input.value).toBe("51,234");
      expect(setSelectionRangeSpy).toHaveBeenLastCalledWith(1, 1);
    });

    it("should restore cursor correctly when inserting in middle", async () => {
      // 1,234 -> type '5' after '1' -> 15,234
      const {container} = render(
        <NumberInput
          isRealTimeFormat
          defaultValue={1234}
          formatOptions={{style: "decimal", useGrouping: true}}
          label="Price"
        />,
      );
      const input = container.querySelector("input") as HTMLInputElement;

      await user.click(input);
      // Cursor after '1'
      act(() => {
        input.setSelectionRange(1, 1); // 1|,234
      });

      await user.keyboard("5");

      // Result: 15,234
      // Cursor should be after 5.
      // Digits before: 1, 5 (2 digits)
      // 1 (1) 5 (2) , (x) ...
      // Index 2

      await act(async () => {
        jest.runAllTimers();
      });

      expect(input.value).toBe("15,234");
      expect(setSelectionRangeSpy).toHaveBeenLastCalledWith(2, 2);
    });

    it("should restore cursor correctly with currency symbols", async () => {
      // $1,234 -> type '5' after '1' -> $15,234 (Assuming en-US default)
      const {container} = render(
        <NumberInput
          isRealTimeFormat
          defaultValue={1234}
          formatOptions={{style: "currency", currency: "USD", useGrouping: true}}
          label="Price"
        />,
      );
      const input = container.querySelector("input") as HTMLInputElement;

      await user.click(input);
      // Move cursor after '1' (index 2)
      act(() => {
        // Find position of '1'
        const idx = input.value.indexOf("1");

        input.setSelectionRange(idx + 1, idx + 1);
      });

      await user.keyboard("5");

      // Result: $15,234.00
      // Digits before cursor: 1, 5 (2 digits)
      // New string: $ 1 5 , 2 3 4 . 0 0
      // Digits:     x 1 2 x 3 4 5 x 6 7
      // 2nd digit is '5'. Cursor should be after it.
      // Index of '5' is 2. So cursor at 3.

      await act(async () => {
        jest.runAllTimers();
      });

      expect(input.value).toContain("15,234");

      // We check if the cursor is placed after the 2nd digit
      const matches = input.value.match(/^[^0-9]*\d\d/); // match prefix + 2 digits
      const expectedIndex = matches ? matches[0].length : 0;

      expect(setSelectionRangeSpy).toHaveBeenLastCalledWith(expectedIndex, expectedIndex);
    });
  });
});
