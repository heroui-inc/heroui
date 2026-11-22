import {fireEvent, render, screen, setupUser} from "@heroui/testing/helpers";
import {ButtonContext} from "react-aria-components/Button";

import {Button} from "@/components/button";

const pointerOpts = {
  button: 0,
  pointerId: 1,
  pointerType: "mouse",
  clientX: 1,
  clientY: 1,
} as const;

// RAC usePress sequence in jsdom.
const pressDown = (element: HTMLElement) => fireEvent.pointerDown(element, pointerOpts);
const pressUp = (element: HTMLElement) => {
  fireEvent.pointerUp(element, pointerOpts);
  fireEvent.click(element, {button: 0});
};

describe("Button", () => {
  let user: ReturnType<typeof setupUser>;

  beforeAll(() => {
    user = setupUser();
  });

  it("renders with role and accessible name", () => {
    render(<Button>Save</Button>);

    expect(screen.getByRole("button", {name: "Save"})).toBeInTheDocument();
  });

  it("exposes BEM block and data-slot", () => {
    render(<Button>Save</Button>);
    const button = screen.getByRole("button", {name: "Save"});

    expect(button.className).toEqual(expect.stringContaining("button"));
    expect(button).toHaveAttribute("data-slot", "button");
  });

  it("exposes variant BEM modifier", () => {
    render(<Button variant="secondary">Save</Button>);

    expect(screen.getByRole("button", {name: "Save"}).className).toEqual(
      expect.stringContaining("button--secondary"),
    );
  });

  it("merges a string className onto variant classes", () => {
    render(
      <Button className="custom-action" variant="secondary">
        Save
      </Button>,
    );
    const button = screen.getByRole("button", {name: "Save"});

    expect(button.className).toEqual(expect.stringContaining("button"));
    expect(button.className).toEqual(expect.stringContaining("button--secondary"));
    expect(button.className).toEqual(expect.stringContaining("custom-action"));
  });

  it("supports data attribute passthrough", () => {
    render(<Button data-testid="save-btn">Save</Button>);

    expect(screen.getByTestId("save-btn")).toBeInTheDocument();
  });

  it("supports hover state", async () => {
    render(<Button>Save</Button>);
    const button = screen.getByRole("button", {name: "Save"});

    expect(button).not.toHaveAttribute("data-hovered");

    await user.hover(button);
    expect(button).toHaveAttribute("data-hovered", "true");

    await user.unhover(button);
    expect(button).not.toHaveAttribute("data-hovered");
  });

  it("supports press state", () => {
    render(<Button>Save</Button>);
    const button = screen.getByRole("button", {name: "Save"});

    expect(button).not.toHaveAttribute("data-pressed");

    pressDown(button);
    expect(button).toHaveAttribute("data-pressed", "true");

    pressUp(button);
    expect(button).not.toHaveAttribute("data-pressed");
  });

  it("calls onPress on click", async () => {
    const onPress = vi.fn();

    render(<Button onPress={onPress}>Save</Button>);

    await user.click(screen.getByRole("button", {name: "Save"}));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("supports focus-visible via keyboard", async () => {
    render(<Button>Save</Button>);
    const button = screen.getByRole("button", {name: "Save"});

    expect(button).not.toHaveAttribute("data-focus-visible");

    await user.tab();
    expect(button).toHaveFocus();
    expect(button).toHaveAttribute("data-focus-visible", "true");

    await user.tab();
    expect(button).not.toHaveAttribute("data-focus-visible");
  });

  it("supports disabled state and blocks press", async () => {
    const onPress = vi.fn();

    render(
      <Button isDisabled onPress={onPress}>
        Save
      </Button>,
    );
    const button = screen.getByRole("button", {name: "Save"});

    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("data-disabled", "true");

    await user.click(button);
    expect(onPress).not.toHaveBeenCalled();
  });

  it("exposes no hover state when disabled", async () => {
    render(<Button isDisabled>Save</Button>);
    const button = screen.getByRole("button", {name: "Save"});

    await user.hover(button);
    expect(button).not.toHaveAttribute("data-hovered");
  });

  it("supports keyboard activation with Enter and Space", async () => {
    const onPress = vi.fn();

    render(<Button onPress={onPress}>Save</Button>);
    const button = screen.getByRole("button", {name: "Save"});

    await user.tab();
    expect(button).toHaveFocus();

    await user.keyboard("{Enter}");
    expect(onPress).toHaveBeenCalledTimes(1);

    await user.keyboard(" ");
    expect(onPress).toHaveBeenCalledTimes(2);
  });

  describe("form submission", () => {
    const renderSubmitForm = () => {
      const events: string[] = [];
      const onClick = vi.fn(() => events.push("click"));
      const onPress = vi.fn();
      const onSubmit = vi.fn((e: React.FormEvent) => {
        e.preventDefault();
        events.push("submit");
      });

      render(
        <form onSubmit={onSubmit}>
          <Button type="submit" onClick={onClick} onPress={onPress}>
            Submit
          </Button>
        </form>,
      );

      return {button: screen.getByRole("button", {name: "Submit"}), events, onClick, onPress};
    };

    it("calls onClick once before submit on mouse click", async () => {
      const {button, events, onPress} = renderSubmitForm();

      await user.click(button);

      expect(events).toEqual(["click", "submit"]);
      expect(onPress).toHaveBeenCalledTimes(1);
    });

    it("calls onClick once before submit on Enter", async () => {
      const {events, onPress} = renderSubmitForm();

      await user.tab();
      await user.keyboard("{Enter}");

      expect(events).toEqual(["click", "submit"]);
      expect(onPress).toHaveBeenCalledTimes(1);
    });

    it("calls onClick once before submit on Space", async () => {
      const {events} = renderSubmitForm();

      await user.tab();
      await user.keyboard(" ");

      expect(events).toEqual(["click", "submit"]);
    });

    it("calls onClick once before submit on virtual click", () => {
      const {button, events, onPress} = renderSubmitForm();

      button.click();

      expect(events).toEqual(["click", "submit"]);
      expect(onPress).toHaveBeenCalledTimes(1);
    });

    it("calls onClick once when Enter keydown is prevented and does not submit", async () => {
      const events: string[] = [];
      const onPress = vi.fn();
      const onSubmit = vi.fn((e: React.FormEvent) => e.preventDefault());

      render(
        <form onSubmit={onSubmit}>
          <Button
            type="submit"
            onClick={() => events.push("click")}
            onPress={onPress}
            onKeyDown={(e) => {
              if (e.key === "Enter") e.preventDefault();
            }}
          >
            Submit
          </Button>
        </form>,
      );

      await user.tab();
      await user.keyboard("{Enter}");

      expect(events).toEqual(["click"]);
      expect(onPress).toHaveBeenCalledTimes(1);
      expect(onSubmit).not.toHaveBeenCalled();
    });

    it("calls onClick once when Space keyup is prevented and does not submit", async () => {
      const onClick = vi.fn();
      const onSubmit = vi.fn((e: React.FormEvent) => e.preventDefault());

      render(
        <form onSubmit={onSubmit}>
          <Button
            type="submit"
            onClick={onClick}
            onKeyUp={(e) => {
              if (e.key === " ") e.preventDefault();
            }}
          >
            Submit
          </Button>
        </form>,
      );

      await user.tab();
      await user.keyboard(" ");

      await vi.waitFor(() => expect(onClick).toHaveBeenCalledTimes(1));
      expect(onSubmit).not.toHaveBeenCalled();
    });

    it("does not treat a later mouse click as keyboard activation", async () => {
      const {button, events} = renderSubmitForm();

      await user.tab();
      await user.keyboard("{Enter}");
      await user.click(button);

      expect(events).toEqual(["click", "submit", "click", "submit"]);
    });

    it("calls onClick once before reset on Enter", async () => {
      const events: string[] = [];

      render(
        <form onReset={() => events.push("reset")}>
          <Button type="reset" onClick={() => events.push("click")}>
            Reset
          </Button>
        </form>,
      );

      await user.tab();
      await user.keyboard("{Enter}");

      expect(events).toEqual(["click", "reset"]);
    });

    it("applies to a submit type set through ButtonContext", async () => {
      const events: string[] = [];
      const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        events.push("submit");
      };

      render(
        <form onSubmit={onSubmit}>
          <ButtonContext value={{type: "submit"}}>
            <Button onClick={() => events.push("click")}>Submit</Button>
          </ButtonContext>
        </form>,
      );

      await user.tab();
      await user.keyboard("{Enter}");

      expect(events).toEqual(["click", "submit"]);
    });

    it("forwards onKeyDown, onKeyUp and onClickCapture on a submit button", async () => {
      const onClickCapture = vi.fn();
      const onKeyDown = vi.fn();
      const onKeyUp = vi.fn();

      render(
        <form onSubmit={(e) => e.preventDefault()}>
          <Button
            type="submit"
            onClick={vi.fn()}
            onClickCapture={onClickCapture}
            onKeyDown={onKeyDown}
            onKeyUp={onKeyUp}
          >
            Submit
          </Button>
        </form>,
      );

      await user.tab();
      await user.keyboard("{Enter}");

      expect(onKeyDown).toHaveBeenCalledWith(expect.objectContaining({key: "Enter"}));
      expect(onKeyUp).toHaveBeenCalledWith(expect.objectContaining({key: "Enter"}));
      expect(onClickCapture).toHaveBeenCalledTimes(1);
    });

    it("does not call onClick or submit while pending", async () => {
      const onClick = vi.fn();
      const onSubmit = vi.fn((e: React.FormEvent) => e.preventDefault());

      render(
        <form onSubmit={onSubmit}>
          <Button isPending type="submit" onClick={onClick}>
            Submit
          </Button>
        </form>,
      );
      const button = screen.getByRole("button", {name: "Submit"});

      await user.click(button);
      button.focus();
      await user.keyboard("{Enter}");
      await user.keyboard(" ");

      expect(onClick).not.toHaveBeenCalled();
      expect(onSubmit).not.toHaveBeenCalled();
    });

    it("calls onClick once for each Enter and Space press on a non-submit button", async () => {
      const onClick = vi.fn();

      render(<Button onClick={onClick}>Save</Button>);

      await user.tab();
      await user.keyboard("{Enter}");
      expect(onClick).toHaveBeenCalledTimes(1);

      await user.keyboard(" ");
      expect(onClick).toHaveBeenCalledTimes(2);
    });
  });

  it("supports render-prop children for press state", () => {
    render(<Button>{({isPressed}) => (isPressed ? "Pressed" : "Save")}</Button>);
    const button = screen.getByRole("button", {name: "Save"});

    pressDown(button);
    expect(button).toHaveTextContent("Pressed");

    pressUp(button);
    expect(button).toHaveTextContent("Save");
  });
});
