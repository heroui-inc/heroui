import * as React from "react";
import {act, render, fireEvent} from "@testing-library/react";

import {Modal, ModalContent, ModalBody, ModalHeader, ModalFooter, useDraggable} from "../src";

// e.g. console.error Warning: Function components cannot be given refs.
// Attempts to access this ref will fail. Did you mean to use React.forwardRef()?
const spy = jest.spyOn(console, "error").mockImplementation(() => {});

const ModalDraggable = ({overflow = false}) => {
  const targetRef = React.useRef(null);
  const dragRef = React.useRef(null);

  useDraggable({targetRef, dragRef, overflow});

  return (
    <Modal ref={targetRef} isOpen>
      <ModalContent>
        <ModalHeader ref={dragRef}>Modal header</ModalHeader>
        <ModalBody>Modal body</ModalBody>
        <ModalFooter>Modal footer</ModalFooter>
      </ModalContent>
    </Modal>
  );
};

describe("Modal", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly", () => {
    const wrapper = render(
      <Modal isOpen>
        <ModalContent>
          <ModalHeader>Modal header</ModalHeader>
          <ModalBody>Modal body</ModalBody>
          <ModalFooter>Modal footer</ModalFooter>
        </ModalContent>
      </Modal>,
    );

    expect(() => wrapper.unmount()).not.toThrow();

    expect(spy).toBeCalledTimes(0);
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLElement>();

    render(
      <Modal ref={ref} isOpen>
        <ModalContent>
          <ModalHeader>Modal header</ModalHeader>
          <ModalBody>Modal body</ModalBody>
          <ModalFooter>Modal footer</ModalFooter>
        </ModalContent>
      </Modal>,
    );
    expect(ref.current).not.toBeNull();
  });

  test("should have the proper 'aria' attributes", () => {
    const {getByRole, getByText} = render(
      <Modal isOpen>
        <ModalContent>
          <ModalHeader>Modal header</ModalHeader>
          <ModalBody>Modal body</ModalBody>
          <ModalFooter>Modal footer</ModalFooter>
        </ModalContent>
      </Modal>,
    );

    const modal = getByRole("dialog");

    expect(modal).toHaveAttribute("aria-modal", "true");
    expect(modal).toHaveAttribute("role", "dialog");

    const modalHeader = getByText("Modal header");

    expect(modal).toHaveAttribute("aria-labelledby", modalHeader.id);

    const modalBody = getByText("Modal body");

    expect(modal).toHaveAttribute("aria-describedby", modalBody.id);
  });

  test("should fire 'onOpenChange' callback when close button is clicked", () => {
    const onClose = jest.fn();

    const {getByLabelText} = render(
      <Modal isOpen onClose={onClose}>
        <ModalContent>
          <ModalHeader>Modal header</ModalHeader>
          <ModalBody>Modal body</ModalBody>
          <ModalFooter>Modal footer</ModalFooter>
        </ModalContent>
      </Modal>,
    );

    const closeButton = getByLabelText("Close");

    act(() => {
      closeButton.click();
    });

    expect(onClose).toHaveBeenCalled();
  });

  it("should hide the modal when pressing the escape key", () => {
    const onClose = jest.fn();

    const wrapper = render(
      <Modal isOpen onClose={onClose}>
        <ModalContent>
          <ModalHeader>Modal header</ModalHeader>
          <ModalBody>Modal body</ModalBody>
          <ModalFooter>Modal footer</ModalFooter>
        </ModalContent>
      </Modal>,
    );

    const modal = wrapper.getByRole("dialog");

    fireEvent.keyDown(modal, {key: "Escape"});
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("should be rendered a draggable modal", () => {
    // mock viewport size to 1920x1080
    jest.spyOn(document.documentElement, "clientWidth", "get").mockImplementation(() => 1920);
    jest.spyOn(document.documentElement, "clientHeight", "get").mockImplementation(() => 1080);
    const wrapper = render(<ModalDraggable />);

    const modal = wrapper.getByRole("dialog");
    const modalHeader = wrapper.getByText("Modal header");

    fireEvent.mouseDown(modalHeader, {clientX: 0, clientY: 0});
    fireEvent.mouseMove(modalHeader, {clientX: 100, clientY: 50});
    fireEvent.mouseUp(modalHeader, {clientX: 100, clientY: 50});

    expect(() => wrapper.unmount()).not.toThrow();
    expect(document.documentElement.clientWidth).toBe(1920);
    expect(document.documentElement.clientHeight).toBe(1080);
    expect(modalHeader.style.cursor).toBe("move");
    expect(modal.style.transform).toBe("translate(100px, 50px)");
  });

  it("should not drag overflow viewport", () => {
    // mock viewport size to 1920x1080
    jest.spyOn(document.documentElement, "clientWidth", "get").mockImplementation(() => 1920);
    jest.spyOn(document.documentElement, "clientHeight", "get").mockImplementation(() => 1080);
    const wrapper = render(<ModalDraggable />);
    const modal = wrapper.getByRole("dialog");
    const modalHeader = wrapper.getByText("Modal header");

    fireEvent.mouseDown(modalHeader, {clientX: 100, clientY: 50});
    fireEvent.mouseMove(modalHeader, {clientX: 10000, clientY: 5000});
    fireEvent.mouseUp(modalHeader, {clientX: 10000, clientY: 5000});

    expect(modal.style.transform).toBe("translate(1920px, 1080px)");
  });

  test("should be rendered a draggable modal with overflow", () => {
    // mock viewport size to 1920x1080
    jest.spyOn(document.documentElement, "clientWidth", "get").mockImplementation(() => 1920);
    jest.spyOn(document.documentElement, "clientHeight", "get").mockImplementation(() => 1080);

    const wrapper = render(<ModalDraggable overflow />);

    const modal = wrapper.getByRole("dialog");
    const modalHeader = wrapper.getByText("Modal header");

    fireEvent.mouseDown(modalHeader, {clientX: 0, clientY: 0});
    fireEvent.mouseMove(modalHeader, {clientX: 2000, clientY: 1500});
    fireEvent.mouseUp(modalHeader, {clientX: 2000, clientY: 1500});

    expect(document.documentElement.clientWidth).toBe(1920);
    expect(document.documentElement.clientHeight).toBe(1080);
    expect(modal.style.transform).toBe("translate(2000px, 1500px)");
  });
});
