import type {Selection, SortDescriptor} from "react-aria-components/Table";

import {User, cleanup, render, runAllTimers, screen} from "@heroui/testing/helpers";

import {Checkbox} from "@/components/checkbox";
import {Table} from "@/components/table";

const rows = [
  {id: "1", name: "Kate", role: "CEO"},
  {id: "2", name: "John", role: "CTO"},
  {id: "3", name: "Sara", role: "CMO"},
];

const renderTable = (
  props: {
    selectedKeys?: Selection;
    onSelectionChange?: (keys: Selection) => void;
    sortDescriptor?: SortDescriptor;
    onSortChange?: (descriptor: SortDescriptor) => void;
  } = {},
) => {
  return render(
    <Table data-testid="table">
      <Table.ScrollContainer>
        <Table.Content
          aria-label="Team"
          selectedKeys={props.selectedKeys}
          selectionMode="multiple"
          sortDescriptor={props.sortDescriptor}
          onSelectionChange={props.onSelectionChange}
          onSortChange={props.onSortChange}
        >
          <Table.Header>
            <Table.Column>
              <Checkbox aria-label="Select all" slot="selection">
                <Checkbox.Content>
                  <Checkbox.Control>
                    <Checkbox.Indicator />
                  </Checkbox.Control>
                </Checkbox.Content>
              </Checkbox>
            </Table.Column>
            <Table.Column allowsSorting isRowHeader id="name">
              {({sortDirection}) => (
                <Table.SortableColumnHeader sortDirection={sortDirection}>
                  Member
                </Table.SortableColumnHeader>
              )}
            </Table.Column>
            <Table.Column id="role">Role</Table.Column>
          </Table.Header>
          <Table.Body>
            {rows.map((row) => (
              <Table.Row key={row.id} id={row.id}>
                <Table.Cell>
                  <Checkbox aria-label={`Select ${row.name}`} slot="selection">
                    <Checkbox.Content>
                      <Checkbox.Control>
                        <Checkbox.Indicator />
                      </Checkbox.Control>
                    </Checkbox.Content>
                  </Checkbox>
                </Table.Cell>
                <Table.Cell>{row.name}</Table.Cell>
                <Table.Cell>{row.role}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>,
  );
};

describe("Table", () => {
  let testUtilUser: User;

  beforeEach(() => {
    vi.useFakeTimers({shouldAdvanceTime: true});
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

  it("exposes shell slots and grid role", () => {
    renderTable();

    expect(screen.getByTestId("table")).toHaveAttribute("data-slot", "table");
    expect(screen.getByTestId("table").className).toEqual(expect.stringContaining("table"));
    expect(document.querySelector('[data-slot="table-scroll-container"]')).not.toBeNull();
    expect(document.querySelector('[data-slot="table-content"]')).not.toBeNull();
    expect(screen.getByRole("grid", {name: "Team"})).toBeInTheDocument();
    expect(document.querySelector('[data-slot="table-header"]')).not.toBeNull();
    expect(document.querySelector('[data-slot="table-body"]')).not.toBeNull();
    expect(document.querySelector('[data-slot="table-row"]')).not.toBeNull();
    expect(document.querySelector('[data-slot="table-cell"]')).not.toBeNull();
  });

  it("supports toggling row selection via Table tester", async () => {
    const onSelectionChange = vi.fn();

    renderTable({onSelectionChange});

    const tester = testUtilUser.createTester("Table", {
      root: screen.getByRole("grid", {name: "Team"}),
      advanceTimer: vi.advanceTimersByTime,
    });

    await tester.toggleRowSelection({row: "John"});
    runAllTimers();

    expect(onSelectionChange).toHaveBeenCalled();
    const selection = onSelectionChange.mock.calls[0]?.[0] as Selection;

    expect(selection === "all" ? null : [...selection]).toEqual(["2"]);
  });

  it("supports toggling sort via Table tester", async () => {
    const onSortChange = vi.fn();

    renderTable({
      sortDescriptor: {column: "name", direction: "ascending"},
      onSortChange,
    });

    expect(document.querySelector('[data-slot="table-sortable-column-header"]')).not.toBeNull();

    const tester = testUtilUser.createTester("Table", {
      root: screen.getByRole("grid", {name: "Team"}),
      advanceTimer: vi.advanceTimersByTime,
    });

    await tester.toggleSort({column: "Member"});
    runAllTimers();

    expect(onSortChange).toHaveBeenCalled();
    expect(onSortChange.mock.calls[0]?.[0]).toEqual(expect.objectContaining({column: "name"}));
  });
});
