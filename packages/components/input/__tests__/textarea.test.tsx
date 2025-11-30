import * as React from "react";
import {render} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {Textarea} from "../src";

jest.mock("react-textarea-autosize");

describe("Textarea", () => {
  it("should clear the value and onClear is triggered", async () => {
    const onClear = jest.fn();

    const ref = React.createRef<HTMLTextAreaElement>();

    const {getByRole} = render(
      <Textarea
        ref={ref}
        isClearable
        defaultValue="junior@heroui.com"
        label="test textarea"
        onClear={onClear}
      />,
    );

    const clearButton = getByRole("button");

    expect(clearButton).not.toBeNull();

    const user = userEvent.setup();

    await user.click(clearButton);

    expect(ref.current?.value)?.toBe("");

    expect(onClear).toHaveBeenCalledTimes(1);
  });

  it("should disable clear button when isReadOnly is true", async () => {
    const onClear = jest.fn();

    const ref = React.createRef<HTMLTextAreaElement>();

    const {getByRole} = render(
      <Textarea
        ref={ref}
        isClearable
        isReadOnly
        defaultValue="readOnly test for clear button"
        label="test textarea"
        onClear={onClear}
      />,
    );

    const clearButton = getByRole("button")!;

    expect(clearButton).not.toBeNull();

    const user = userEvent.setup();

    await user.click(clearButton);

    expect(onClear).toHaveBeenCalledTimes(0);
  });

  it("should appear clear button when just define onClear but not define isClearable", async () => {
    const onClear = jest.fn();

    const ref = React.createRef<HTMLTextAreaElement>();

    const {getByRole} = render(
      <Textarea
        ref={ref}
        defaultValue="junior@heroui.com"
        label="test textarea"
        onClear={onClear}
      />,
    );

    const clearButton = getByRole("button");

    expect(clearButton).not.toBeNull();
  });

  it("should restore value when DOM is cleared externally (e.g. form reset)", async () => {
    const {getByRole, rerender} = render(<Textarea defaultValue="Hello" />);
    const textarea = getByRole("textbox") as HTMLTextAreaElement;

    expect(textarea.value).toBe("Hello");

    // Simulate external DOM change (e.g., form reset)
    textarea.value = "";

    // Trigger re-render. The mock ensures React skips update if props are unchanged.
    rerender(<Textarea defaultValue="Hello" />);

    expect(textarea.value).toBe("Hello");
  });
});
