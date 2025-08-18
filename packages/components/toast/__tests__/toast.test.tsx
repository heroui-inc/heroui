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

  it("should work with multiple ToastProvider", async () => {
    const left_toaster_id = "left";
    const left_title = "Left Toast Title";
    const left_description = "Left Toast Description";

    const right_toaster_id = "right";
    const right_title = "Right Toast Title";
    const right_description = "Right Toast Description";

    const wrapper = render(
      <>
        <ToastProvider placement="bottom-left" toasterId={left_toaster_id} />
        <ToastProvider placement="bottom-right" toasterId={right_toaster_id} />
        <button
          data-testid="left-button"
          onClick={() => {
            addToast({
              title: left_title,
              description: left_description,
              toasterId: left_toaster_id,
            });
          }}
        >
          Show Left Toast
        </button>
        <button
          data-testid="right-button"
          onClick={() => {
            addToast({
              title: right_title,
              description: right_description,
              toasterId: right_toaster_id,
            });
          }}
        >
          Show Right Toast
        </button>
      </>,
    );

    const left_button = wrapper.getByTestId("left-button");
    const right_button = wrapper.getByTestId("right-button");

    await user.click(left_button);
    await user.click(right_button);
    const region = screen.getAllByRole("region");

    // check for left ToastProvider
    expect(region[0]).toHaveAttribute("data-placement", "bottom-left");
    expect(region[0]).toContainHTML(left_title);
    expect(region[0]).toContainHTML(left_description);
    expect(region[0]).not.toContainHTML(right_title);
    expect(region[0]).not.toContainHTML(right_description);

    // check for right ToastProvider
    expect(region[1]).toHaveAttribute("data-placement", "bottom-right");
    expect(region[1]).toContainHTML(right_title);
    expect(region[1]).toContainHTML(right_description);
    expect(region[1]).not.toContainHTML(left_title);
    expect(region[1]).not.toContainHTML(left_description);
  });
});
