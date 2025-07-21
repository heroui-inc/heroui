import * as React from "react";
import {render, act} from "@testing-library/react";
import {mocks} from "@heroui/test-utils";

import {Avatar} from "../src";

describe("Avatar", () => {
  it("should render correctly", () => {
    const wrapper = render(<Avatar />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLDivElement>();

    render(<Avatar ref={ref} />);
    expect(ref.current).not.toBeNull();
  });

  it("should populate imgRef", () => {
    const imgRef = React.createRef<HTMLImageElement>();
    const wrapper = render(
      <Avatar imgRef={imgRef} src="https://i.pravatar.cc/300?u=a042581f4e29026705d" />,
    );

    expect(imgRef.current).not.toBeNull();
    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("should render initials", () => {
    const {container} = render(<Avatar name="Junior" />);

    expect(container.querySelector("span")).toHaveTextContent("Jun");
  });

  it('should work with custom "getInitials" function', () => {
    const {container} = render(<Avatar getInitials={(name) => name.charAt(0)} name="Junior" />);

    expect(container.querySelector("span")).toHaveTextContent("J");
  });

  it('should be focusable if "isFocusable" is true', () => {
    const {container} = render(<Avatar isFocusable name="Junior" />);
    const avatar = container.querySelector("span");

    expect(avatar).toHaveAttribute("tabIndex", "0");
  });
});

describe("Avatar - fallback + loading strategy", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    mocks.image().restore();
  });

  test("should render an image", async () => {
    const mock = mocks.image();

    mock.simulate("loaded");
    const wrapper = render(
      <Avatar name="Junior" src="https://avatars.githubusercontent.com/u/30373425" />,
    );

    act(() => {
      jest.runAllTimers();
    });

    const img = wrapper.getByAltText("Junior");

    expect(img).toBeInTheDocument();
  });

  test("should fire onError if image fails to load", async () => {
    const mock = mocks.image();

    mock.simulate("error");

    const src = "https://avatars.githubusercontent.com/u/30373425";
    const name = "Junior";
    const onErrorFn = jest.fn();

    render(<Avatar name={name} src={src} onError={onErrorFn} />);

    act(() => {
      jest.runAllTimers();
    });

    expect(onErrorFn).toHaveBeenCalledTimes(1);
  });

  test("should render a name avatar if no src", () => {
    const {container} = render(<Avatar name="Junior" />);

    expect(container.querySelector("span")).toHaveTextContent("Jun");
  });

  test("should render a default avatar if no name or src", () => {
    const {container} = render(<Avatar />);

    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  test("should render fallback when image fails to load", async () => {
    const mock = mocks.image();

    mock.simulate("error");

    const {container} = render(
      <Avatar name="Junior" src="https://avatars.githubusercontent.com/u/30373425" />,
    );

    act(() => {
      jest.runAllTimers();
    });

    // Should show initials when image fails to load
    expect(container.querySelector("span")).toHaveTextContent("Jun");
  });

  test("should render fallback when image fails to load with showFallback=true", async () => {
    const mock = mocks.image();

    mock.simulate("error");

    const {container} = render(
      <Avatar showFallback name="Junior" src="https://avatars.githubusercontent.com/u/30373425" />,
    );

    act(() => {
      jest.runAllTimers();
    });

    // Should show initials when image fails to load
    expect(container.querySelector("span")).toHaveTextContent("Jun");
  });

  test("should show fallback when no src is provided", () => {
    const {container} = render(<Avatar name="Junior" />);

    // Should show initials when no src is provided
    expect(container.querySelector("span")).toHaveTextContent("Jun");
  });

  test("should not show fallback during loading when showFallback=false", async () => {
    const mock = mocks.image();

    // Simulate loaded to test that fallback is not shown when image loads successfully
    mock.simulate("loaded");

    const {container} = render(
      <Avatar
        name="Junior"
        showFallback={false}
        src="https://avatars.githubusercontent.com/u/30373425"
      />,
    );

    act(() => {
      jest.runAllTimers();
    });

    // Should not show initials when image loads successfully and showFallback is false
    expect(container.querySelector("span")).not.toHaveTextContent("Jun");
  });

  test("should show fallback when image fails to load even with showFallback=false", async () => {
    const mock = mocks.image();

    mock.simulate("error");

    const {container} = render(
      <Avatar
        name="Junior"
        showFallback={false}
        src="https://avatars.githubusercontent.com/u/30373425"
      />,
    );

    act(() => {
      jest.runAllTimers();
    });

    // Should show initials when image fails to load, even with showFallback=false
    expect(container.querySelector("span")).toHaveTextContent("Jun");
  });
});
