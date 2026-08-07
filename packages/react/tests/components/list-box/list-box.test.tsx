import type {Key, Selection} from "@react-types/shared";

import {User, render, screen} from "@heroui/testing/helpers";

import {Header} from "@/components/header";
import {Label} from "@/components/label";
import {ListBox} from "@/components/list-box";

const renderUsers = (props: {onSelectionChange?: (keys: Selection) => void} = {}) => {
  return render(
    <ListBox
      aria-label="Users"
      data-testid="users"
      selectionMode="single"
      onSelectionChange={props.onSelectionChange}
    >
      <ListBox.Item id="bob" textValue="Bob">
        <Label>Bob</Label>
        <ListBox.ItemIndicator />
      </ListBox.Item>
      <ListBox.Item id="fred" textValue="Fred">
        <Label>Fred</Label>
        <ListBox.ItemIndicator />
      </ListBox.Item>
      <ListBox.Item id="martha" textValue="Martha">
        <Label>Martha</Label>
        <ListBox.ItemIndicator />
      </ListBox.Item>
    </ListBox>,
  );
};

describe("ListBox", () => {
  let testUtilUser: User;

  beforeAll(() => {
    testUtilUser = new User({interactionType: "mouse"});
  });

  it("exposes listbox role, BEM, and data-slot", () => {
    renderUsers();

    const listbox = screen.getByRole("listbox", {name: "Users"});

    expect(listbox).toHaveAttribute("data-slot", "list-box");
    expect(listbox.className).toEqual(expect.stringContaining("list-box"));
    expect(document.querySelector('[data-slot="list-box-item"]')).not.toBeNull();
  });

  it("calls onSelectionChange when an option is selected via ListBox tester", async () => {
    const onSelectionChange = vi.fn();

    renderUsers({onSelectionChange});

    const tester = testUtilUser.createTester("ListBox", {
      root: screen.getByTestId("users"),
    });

    expect(tester.getOptions()).toHaveLength(3);

    await tester.toggleOptionSelection({option: "Fred"});

    expect(onSelectionChange).toHaveBeenCalled();
    const selection = onSelectionChange.mock.calls[0]?.[0] as Selection;

    expect(selection === "all" ? null : [...selection]).toEqual(["fred"]);
    expect(tester.getSelectedOptions()).toHaveLength(1);
  });

  it("supports sections with onAction when selectionMode is none", async () => {
    const onAction = vi.fn<(key: Key) => void>();

    render(
      <ListBox aria-label="File actions" selectionMode="none" onAction={onAction}>
        <ListBox.Section>
          <Header>Actions</Header>
          <ListBox.Item id="new-file" textValue="New file">
            <Label>New file</Label>
          </ListBox.Item>
          <ListBox.Item id="copy-link" textValue="Copy link">
            <Label>Copy link</Label>
          </ListBox.Item>
        </ListBox.Section>
      </ListBox>,
    );

    const tester = testUtilUser.createTester("ListBox", {
      root: screen.getByRole("listbox", {name: "File actions"}),
    });

    await tester.toggleOptionSelection({option: "Copy link"});
    expect(onAction).toHaveBeenCalledWith("copy-link");
  });
});
