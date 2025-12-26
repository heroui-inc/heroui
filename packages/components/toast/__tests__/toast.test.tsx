import type {UserEvent} from "@testing-library/user-event";

import * as React from "react";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {addToast, ToastProvider} from "../src";

const title = "Testing Title";
const description = "Testing Description";

describe("Toast", () => {
  let user: UserEvent;

  beforeEach(() => {
    user = userEvent.setup();
  });

  it("should render correctly", () => {
    const wrapper = render(
      <>
        <ToastProvider />
        <button
          onClick={() => {
            addToast({
              title: "toast title",
              description: "toast description",
            });
          }}
        >
          Show Toast
        </button>
      </>,
    );

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", async () => {
    const ref = React.createRef<HTMLDivElement>();

    const wrapper = render(
      <>
        <ToastProvider />
        <button
          data-testid="button"
          onClick={() => {
            addToast({
              title: "toast title",
              description: "toast description",
              ref: ref,
            });
          }}
        >
          Show Toast
        </button>
      </>,
    );

    const button = wrapper.getByTestId("button");

    await user.click(button);
    expect(ref.current).not.toBeNull();
  });

  it("should display title and description when component is rendered", async () => {
    const wrapper = render(
      <>
        <ToastProvider />
        <button
          data-testid="button"
          onClick={() => {
            addToast({
              title: title,
              description: description,
            });
          }}
        >
          Show Toast
        </button>
      </>,
    );

    const button = wrapper.getByTestId("button");

    await user.click(button);

    const region = screen.getByRole("region");

    expect(region).toContainHTML(title);
    expect(region).toContainHTML(description);

    await user.click(wrapper.getAllByRole("button")[0]);
  });

  it("should close", async () => {
    const wrapper = render(
      <>
        <ToastProvider />
        <button
          data-testid="button"
          onClick={() => {
            addToast({
              title: title,
              description: description,
            });
          }}
        >
          Show Toast
        </button>
      </>,
    );

    const button = wrapper.getByTestId("button");

    await user.click(button);

    const initialCloseButtons = wrapper.getAllByRole("button");

    await user.click(initialCloseButtons[0]);

    const toast = wrapper.getAllByRole("alertdialog")[0]! as HTMLElement;

    expect(toast).toHaveAttribute("data-toast-exiting", "true");
  });

  it("should work with placement", async () => {
    const wrapper = render(
      <>
        <ToastProvider placement="bottom-left" />
        <button
          data-testid="button"
          onClick={() => {
            addToast({
              title: title,
              description: description,
            });
          }}
        >
          Show Toast
        </button>
      </>,
    );

    const region = wrapper.getByRole("region");

    expect(region).toHaveAttribute("data-placement", "bottom-left");
  });

  it("should have loading-icon when promise prop is passed.", async () => {
    const wrapper = render(
      <>
        <ToastProvider />
        <button
          data-testid="button"
          onClick={() => {
            addToast({
              title: title,
              description: description,
              promise: new Promise((resolve) => setTimeout(resolve, 3000)),
            });
          }}
        >
          Show Toast
        </button>
      </>,
    );

    const button = wrapper.getByTestId("button");

    await user.click(button);

    const loadingIcon = wrapper.getByLabelText("loadingIcon");

    expect(loadingIcon).toBeTruthy();
  });

  it("should call onClose when toast times out", async () => {
    const onCloseMock = jest.fn();

    const wrapper = render(
      <>
        <ToastProvider disableAnimation />
        <button
          data-testid="button"
          onClick={() => {
            addToast({
              title: title,
              description: description,
              timeout: 500,
              onClose: onCloseMock,
            });
          }}
        >
          Show Toast
        </button>
      </>,
    );

    const button = wrapper.getByTestId("button");

    await user.click(button);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it("should call onClose when close button is clicked", async () => {
    const onCloseMock = jest.fn();

    const wrapper = render(
      <>
        <ToastProvider disableAnimation maxVisibleToasts={1} />
        <button
          data-testid="button"
          onClick={() => {
            addToast({
              title: title,
              description: description,
              onClose: onCloseMock,
            });
          }}
        >
          Show Toast
        </button>
      </>,
    );

    const button = wrapper.getByTestId("button");

    await user.click(button);

    await new Promise((resolve) => setTimeout(resolve, 500));

    const closeButtons = wrapper.getAllByRole("button");

    await user.click(closeButtons[0]);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
