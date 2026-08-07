import type {Key} from "@react-types/shared";

import {User, cleanup, render, runAllTimers, screen, setupUser} from "@heroui/testing/helpers";
import {useFilter} from "react-aria-components/Autocomplete";

import {Autocomplete} from "@/components/autocomplete";
import {FieldError} from "@/components/field-error";
import {Label} from "@/components/label";
import {ListBox} from "@/components/list-box";
import {SearchField} from "@/components/search-field";

const animals = [
  {id: "cat", name: "Cat"},
  {id: "dog", name: "Dog"},
  {id: "panda", name: "Panda"},
];

const AutocompleteExample = (props: {
  isDisabled?: boolean;
  isInvalid?: boolean;
  value?: Key | null;
  defaultValue?: Key;
  onChange?: (key: Key | null) => void;
  onClear?: () => void;
  withClearButton?: boolean;
}) => {
  const {contains} = useFilter({sensitivity: "base"});

  return (
    <Autocomplete
      data-testid="autocomplete"
      defaultValue={props.defaultValue}
      isDisabled={props.isDisabled}
      isInvalid={props.isInvalid}
      placeholder="Select an animal"
      selectionMode="single"
      value={props.value}
      onChange={props.onChange}
      onClear={props.onClear}
    >
      <Label>Favorite Animal</Label>
      <Autocomplete.Trigger>
        <Autocomplete.Value />
        {props.withClearButton ? <Autocomplete.ClearButton /> : null}
        <Autocomplete.Indicator />
      </Autocomplete.Trigger>
      <Autocomplete.Popover>
        <Autocomplete.Filter filter={contains}>
          <SearchField autoFocus aria-label="Search animals" name="search" variant="secondary">
            <SearchField.Group>
              <SearchField.SearchIcon />
              <SearchField.Input placeholder="Search animals..." />
              <SearchField.ClearButton />
            </SearchField.Group>
          </SearchField>
          <ListBox>
            {animals.map((item) => (
              <ListBox.Item key={item.id} id={item.id} textValue={item.name}>
                {item.name}
                <ListBox.ItemIndicator />
              </ListBox.Item>
            ))}
          </ListBox>
        </Autocomplete.Filter>
      </Autocomplete.Popover>
      {props.isInvalid ? <FieldError>Please choose an animal</FieldError> : null}
    </Autocomplete>
  );
};

describe("Autocomplete", () => {
  let user: ReturnType<typeof setupUser>;
  let testUtilUser: User;

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
    render(<AutocompleteExample />);

    const root = screen.getByTestId("autocomplete");

    expect(root).toHaveAttribute("data-slot", "autocomplete");
    expect(root.className).toEqual(expect.stringContaining("autocomplete"));
    expect(document.querySelector('[data-slot="autocomplete-trigger"]')).not.toBeNull();
    expect(document.querySelector('[data-slot="autocomplete-value"]')).not.toBeNull();
  });

  it("supports open, select, and value update via Select tester", async () => {
    const onChange = vi.fn();

    render(<AutocompleteExample onChange={onChange} />);

    const tester = testUtilUser.createTester("Select", {
      root: screen.getByTestId("autocomplete"),
    });

    expect(tester.getListbox()).toBeNull();

    await tester.open();
    runAllTimers();

    expect(tester.getListbox()).not.toBeNull();
    expect(document.querySelector('[data-slot="autocomplete-popover"]')).not.toBeNull();
    expect(screen.getByPlaceholderText("Search animals...")).toBeInTheDocument();
    expect(tester.getOptions()).toHaveLength(3);

    await tester.toggleOptionSelection({option: "Dog"});
    runAllTimers();

    expect(onChange).toHaveBeenCalledWith("dog");
    expect(tester.getListbox()).toBeNull();
    expect(screen.getByTestId("autocomplete")).toHaveTextContent("Dog");
  });

  it("exposes ClearButton and calls onClear", async () => {
    const onClear = vi.fn();
    const onChange = vi.fn();

    render(
      <AutocompleteExample
        withClearButton
        defaultValue="cat"
        onChange={onChange}
        onClear={onClear}
      />,
    );

    expect(document.querySelector('[data-slot="autocomplete-clear-button"]')).not.toBeNull();

    await user.click(document.querySelector('[data-slot="autocomplete-clear-button"]')!);
    runAllTimers();

    expect(onClear).toHaveBeenCalledTimes(1);
  });

  it("supports disabled state", async () => {
    const onChange = vi.fn();

    render(<AutocompleteExample isDisabled onChange={onChange} />);

    const tester = testUtilUser.createTester("Select", {
      root: screen.getByTestId("autocomplete"),
    });

    expect(tester.getTrigger()).toBeDisabled();

    await tester.open();
    runAllTimers();

    expect(tester.getListbox()).toBeNull();
    expect(onChange).not.toHaveBeenCalled();
  });

  it("renders FieldError when invalid", () => {
    render(<AutocompleteExample isInvalid />);

    expect(screen.getByText("Please choose an animal")).toBeInTheDocument();
    expect(document.querySelector('[data-slot="field-error"]')).not.toBeNull();
    expect(screen.getByTestId("autocomplete")).toHaveAttribute("data-invalid", "true");
  });
});
