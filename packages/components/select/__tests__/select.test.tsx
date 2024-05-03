import * as React from "react";
import {act, render} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {Select, SelectItem, SelectSection, type SelectProps} from "../src";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter} from "../../modal/src";

type Item = {
  label: string;
  id: string;
};

const itemsData: Item[] = [
  {label: "Cat", id: "cat"},
  {label: "Dog", id: "dog"},
  {label: "Elephant", id: "elephant"},
  {label: "Lion", id: "lion"},
  {label: "Tiger", id: "tiger"},
  {label: "Giraffe", id: "giraffe"},
  {label: "Dolphin", id: "dolphin"},
  {label: "Penguin", id: "penguin"},
  {label: "Zebra", id: "zebra"},
  {label: "Shark", id: "shark"},
  {label: "Whale", id: "whale"},
  {label: "Otter", id: "otter"},
  {label: "Crocodile", id: "crocodile"},
];

const itemsSectionData = [
  {
    key: "mammals",
    title: "Mammals",
    children: [
      {key: "lion", label: "Lion", value: "lion"},
      {key: "tiger", label: "Tiger", value: "tiger"},
      {key: "elephant", label: "Elephant", value: "elephant"},
    ],
  },
  {
    key: "birds",
    title: "Birds",
    children: [
      {key: "penguin", label: "Penguin", value: "penguin"},
      {key: "ostrich", label: "Ostrich", value: "ostrich"},
      {key: "peacock", label: "Peacock", value: "peacock"},
    ],
  },
];

describe("Select", () => {
  let user;

  beforeEach(() => {
    user = userEvent.setup();
  });

  it("should render correctly", () => {
    const wrapper = render(
      <Select aria-label="Favorite Animal" label="Favorite Animal">
        <SelectItem key="penguin">Penguin</SelectItem>
        <SelectItem key="zebra">Zebra</SelectItem>
        <SelectItem key="shark">Shark</SelectItem>
      </Select>,
    );

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLSelectElement>();

    render(
      <Select ref={ref} aria-label="Favorite Animal" label="Favorite Animal">
        <SelectItem key="penguin">Penguin</SelectItem>
        <SelectItem key="zebra">Zebra</SelectItem>
        <SelectItem key="shark">Shark</SelectItem>
      </Select>,
    );
    expect(ref.current).not.toBeNull();
  });

  it("should render correctly (dynamic)", () => {
    const wrapper = render(
      <Select aria-label="Favorite Animal" items={itemsData} label="Favorite Animal">
        {(item) => <SelectItem>{item.label}</SelectItem>}
      </Select>,
    );

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("should render correctly with section (static)", () => {
    const wrapper = render(
      <Select aria-label="Favorite Animal" label="Favorite Animal">
        <SelectSection title="Birds">
          <SelectItem key="penguin">Penguin</SelectItem>
        </SelectSection>
        <SelectSection title="Mammals">
          <SelectItem key="zebra">Zebra</SelectItem>
          <SelectItem key="shark">Shark</SelectItem>
        </SelectSection>
      </Select>,
    );

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("should render correctly with section (dynamic)", () => {
    const wrapper = render(
      <Select aria-label="Favorite Animal" items={itemsSectionData} label="Favorite Animal">
        {(section) => (
          <SelectSection<Item>
            aria-label={section.title}
            items={section.children}
            title={section.title}
          >
            {/* @ts-ignore TODO: fix section children types*/}
            {(item: Item) => <SelectItem key={item.value}>{item.label}</SelectItem>}
          </SelectSection>
        )}
      </Select>,
    );

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("should work with single selection (controlled)", async () => {
    let onSelectionChange = jest.fn();

    const wrapper = render(
      <Select
        disallowEmptySelection
        isOpen
        aria-label="Favorite Animal"
        label="Favorite Animal"
        selectionMode="single"
        onSelectionChange={onSelectionChange}
      >
        <SelectItem key="penguin">Penguin</SelectItem>
        <SelectItem key="zebra">Zebra</SelectItem>
        <SelectItem key="shark">Shark</SelectItem>
      </Select>,
    );

    let listbox = wrapper.getByRole("listbox");

    expect(listbox).toBeTruthy();

    let listboxItems = wrapper.getAllByRole("option");

    expect(listboxItems.length).toBe(3);

    await act(async () => {
      await user.click(listboxItems[1]);

      expect(onSelectionChange).toBeCalledTimes(1);
    });
  });

  it("should work with multiple selection (controlled)", async () => {
    let onSelectionChange = jest.fn();

    const wrapper = render(
      <Select
        disallowEmptySelection
        isOpen
        aria-label="Favorite Animal"
        label="Favorite Animal"
        selectionMode="multiple"
        onSelectionChange={onSelectionChange}
      >
        <SelectItem key="penguin">Penguin</SelectItem>
        <SelectItem key="zebra">Zebra</SelectItem>
        <SelectItem key="shark">Shark</SelectItem>
      </Select>,
    );

    let listbox = wrapper.getByRole("listbox");

    expect(listbox).toBeTruthy();

    let listboxItems = wrapper.getAllByRole("option");

    expect(listboxItems.length).toBe(3);

    await act(async () => {
      await user.click(listboxItems[1]);
      await user.click(listboxItems[2]);

      expect(onSelectionChange).toBeCalledTimes(2);
    });
  });

  it("should work with dynamic placeholder and renderValue", async () => {
    const SelectWrapper = (props: {
      placeholder?: SelectProps["placeholder"];
      renderValue?: SelectProps["renderValue"];
    }) => {
      const {placeholder, renderValue} = props;

      return (
        <Select
          aria-label="Favorite Animal"
          data-testid="render-selected-item-test"
          label="Favorite Animal"
          placeholder={placeholder}
          renderValue={renderValue}
        >
          <SelectItem key="penguin">Penguin</SelectItem>
          <SelectItem key="zebra">Zebra</SelectItem>
          <SelectItem key="shark">Shark</SelectItem>
        </Select>
      );
    };

    const wrapper = render(<SelectWrapper placeholder="Select an animal" />);

    expect(wrapper.getByText("Select an animal")).toBeInTheDocument();

    wrapper.rerender(<SelectWrapper placeholder="Select an favorite animal" />);

    expect(wrapper.getByText("Select an favorite animal")).toBeInTheDocument();

    const select = wrapper.getByTestId("render-selected-item-test");

    await act(async () => {
      await user.click(select);
    });

    const listboxItems = wrapper.getAllByRole("option");

    await act(async () => {
      await user.click(listboxItems[0]);
    });

    expect(select).toHaveTextContent("Penguin");
    expect(wrapper.queryByText("Select an favorite animal")).toBe(null);

    wrapper.rerender(
      <SelectWrapper
        placeholder="Select an favorite animal"
        renderValue={(item) => `next ${item[0].textValue}`}
      />,
    );

    expect(wrapper.getByText("next Penguin")).toBeInTheDocument();
    expect(wrapper.queryByText("Select an favorite animal")).toBe(null);
  });

  it("should close dropdown when clicking outside select", async () => {
    const wrapper = render(
      <Select
        aria-label="Favorite Animal"
        data-testid="close-when-clicking-outside-test"
        label="Favorite Animal"
      >
        <SelectItem key="penguin">Penguin</SelectItem>
        <SelectItem key="zebra">Zebra</SelectItem>
        <SelectItem key="shark">Shark</SelectItem>
      </Select>,
    );

    const select = wrapper.getByTestId("close-when-clicking-outside-test");

    // open the select dropdown
    await act(async () => {
      await user.click(select);
    });

    // assert that the select is open
    expect(select).toHaveAttribute("aria-expanded", "true");

    // click outside the select component
    await act(async () => {
      await user.click(document.body);
    });

    // assert that the select is closed
    expect(select).toHaveAttribute("aria-expanded", "false");
  });

  it("should close dropdown when clicking outside select with modal open", async () => {
    const wrapper = render(
      <Modal isOpen>
        <ModalContent>
          <ModalHeader>Modal header</ModalHeader>
          <ModalBody>
            <Select
              aria-label="Favorite Animal"
              data-testid="close-when-clicking-outside-test"
              label="Favorite Animal"
            >
              <SelectItem key="penguin">Penguin</SelectItem>
              <SelectItem key="zebra">Zebra</SelectItem>
              <SelectItem key="shark">Shark</SelectItem>
            </Select>
          </ModalBody>
          <ModalFooter>Modal footer</ModalFooter>
        </ModalContent>
      </Modal>,
    );

    const select = wrapper.getByTestId("close-when-clicking-outside-test");

    // open the select dropdown
    await act(async () => {
      await user.click(select);
    });

    // assert that the select is open
    expect(select).toHaveAttribute("aria-expanded", "true");

    // click outside the select component
    await act(async () => {
      await user.click(document.body);
    });

    // assert that the select is closed
    expect(select).toHaveAttribute("aria-expanded", "false");
  });

  it("disabled select shouldn't update by keyboard", async () => {
    let onSelectionChange = jest.fn();

    const wrapper = render(
      <Select
        isDisabled
        aria-label="Favorite Animal"
        data-testid="test-select"
        label="Favorite Animal"
        selectionMode="single"
        onSelectionChange={onSelectionChange}
      >
        <SelectItem key="penguin">Penguin</SelectItem>
        <SelectItem key="zebra">Zebra</SelectItem>
        <SelectItem key="shark">Shark</SelectItem>
      </Select>,
    );
    const select = wrapper.getByTestId("test-select");

    await act(async () => {
      await user.click(document.body);
      await user.tab();
      await user.type(select, "z", {skipClick: true});

      expect(onSelectionChange).toBeCalledTimes(0);
    });
  });

  it("onSelectionChange should be called with a Set of item ids upon selection", async () => {
    const itemsWithId = [
      {id: 1, value: "penguin"},
      {id: 2, value: "zebra"},
      {id: 3, value: "shark"},
    ];

    const onSelectionChangeId = jest.fn();
    const wrapperWithId = render(
      <Select
        isOpen
        items={itemsWithId}
        label="Test with ID"
        onSelectionChange={onSelectionChangeId}
      >
        {(item) => <SelectItem>{item.value}</SelectItem>}
      </Select>,
    );

    const listbox = wrapperWithId.getByRole("listbox");

    expect(listbox).toBeInTheDocument();

    // Select item and check the correct ID is passed to the callback
    await act(async () => {
      await user.click(wrapperWithId.getByRole("option", {name: itemsWithId[0].value}));
    });
    expect(onSelectionChangeId).toHaveBeenCalled();
    let selectionArg = onSelectionChangeId.mock.calls[0][0];

    expect([...selectionArg]).toEqual([itemsWithId[0].id]);

    await act(async () => {
      await user.click(wrapperWithId.getByRole("option", {name: itemsWithId[1].value}));
    });
    expect(onSelectionChangeId).toHaveBeenCalledTimes(2);
    selectionArg = onSelectionChangeId.mock.calls[1][0];
    expect([...selectionArg]).toEqual([itemsWithId[1].id]);
  });

  it("onSelectionChange should be called with a Set of item keys upon selection", async () => {
    const itemsWithKey = [
      {key: 1, value: "penguin"},
      {key: 2, value: "zebra"},
      {key: 3, value: "shark"},
    ];

    const onSelectionChangeKey = jest.fn();
    const wrapperWithKey = render(
      <Select
        isOpen
        items={itemsWithKey}
        label="Test with Key"
        onSelectionChange={onSelectionChangeKey}
      >
        {(item) => <SelectItem>{item.value}</SelectItem>}
      </Select>,
    );

    const listbox = wrapperWithKey.getByRole("listbox");

    expect(listbox).toBeInTheDocument();

    // Select item and check the correct key is passed to the callback
    await act(async () => {
      await user.click(wrapperWithKey.getByRole("option", {name: itemsWithKey[0].value}));
    });
    expect(onSelectionChangeKey).toHaveBeenCalled();
    let selectionArg = onSelectionChangeKey.mock.calls[0][0];

    expect([...selectionArg]).toEqual([itemsWithKey[0].key]);

    await act(async () => {
      await user.click(wrapperWithKey.getByRole("option", {name: itemsWithKey[1].value}));
    });
    expect(onSelectionChangeKey).toHaveBeenCalledTimes(2);
    selectionArg = onSelectionChangeKey.mock.calls[1][0];
    expect([...selectionArg]).toEqual([itemsWithKey[1].key]);
  });

  it("should display selected items as comma-separated string inside the select", async () => {
    const wrapper = render(
      <Select
        isDisabled
        aria-label="Favorite Animal"
        data-testid="test-select"
        selectedKeys={["penguin", "zebra"]}
        selectionMode="multiple"
      >
        <SelectItem key="penguin">Penguin</SelectItem>
        <SelectItem key="zebra">Zebra</SelectItem>
        <SelectItem key="shark">Shark</SelectItem>
      </Select>,
    );
    const select = wrapper.getByTestId("test-select");
    const displayedText = select?.textContent?.trim();

    expect(displayedText).toBe("Penguin, Zebra");
  });
});
