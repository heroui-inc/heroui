import type {Meta, StoryObj} from "@storybook/react";
import type {Selection, SortDescriptor} from "react-aria-components";

import {cn} from "@heroui/styles";
import {Icon} from "@iconify/react";
import React from "react";

import {Avatar} from "../avatar";
import {Button} from "../button";
import {Checkbox} from "../checkbox";
import {Chip} from "../chip";

import {Table} from "./index";

export default {
  component: Table,
  parameters: {
    layout: "centered",
  },
  title: "Components/Data Display/Table",
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary"],
    },
  },
} as Meta<typeof Table>;

type Story = StoryObj<typeof Table>;

/* -------------------------------------------------------------------------------------------------
 * Sample Data
 * -----------------------------------------------------------------------------------------------*/
interface User {
  id: number;
  name: string;
  image_url: string;
  role: string;
  status: "Active" | "Inactive" | "On Leave";
  email: string;
}

const users: User[] = [
  {
    email: "kate@acme.com",
    image_url: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/red.jpg",
    id: 4586932,
    name: "Kate Moore",
    role: "Chief Executive Officer",
    status: "Active",
  },
  {
    email: "john@acme.com",
    image_url: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/green.jpg",
    id: 5273849,
    name: "John Smith",
    role: "Chief Technology Officer",
    status: "Active",
  },
  {
    email: "sara@acme.com",
    image_url: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg",
    id: 7492836,
    name: "Sara Johnson",
    role: "Chief Marketing Officer",
    status: "On Leave",
  },
  {
    email: "michael@acme.com",
    image_url: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/purple.jpg",
    id: 8293746,
    name: "Michael Brown",
    role: "Chief Financial Officer",
    status: "Active",
  },
  {
    email: "emily@acme.com",
    image_url: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/orange.jpg",
    id: 1234567,
    name: "Emily Davis",
    role: "Product Manager",
    status: "Inactive",
  },
  {
    email: "davis@acme.com",
    image_url: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/black.jpg",
    id: 9876543,
    name: "Davis Wilson",
    role: "Lead Designer",
    status: "Active",
  },
];

const columns = [
  {id: "name", isRowHeader: true, name: "Name"},
  {id: "role", name: "Role"},
  {id: "status", name: "Status"},
  {id: "email", name: "Email"},
];

/* -------------------------------------------------------------------------------------------------
 * Wrapper
 * -----------------------------------------------------------------------------------------------*/
const Wrapper = ({children}: {children: React.ReactNode}) => (
  <div className="w-full max-w-4xl">{children}</div>
);

/* -------------------------------------------------------------------------------------------------
 * Stories
 * -----------------------------------------------------------------------------------------------*/

/**
 * Basic table with primary variant (default).
 */
export const Default: Story = {
  args: {
    variant: "primary",
  },
  render: ({variant}) => (
    <Wrapper>
      <Table aria-label="Basic table" variant={variant}>
        <Table.Header>
          {columns.map((col) => (
            <Table.Column key={col.id} id={col.id} isRowHeader={col.isRowHeader}>
              {col.name}
            </Table.Column>
          ))}
        </Table.Header>
        <Table.Body>
          {users.map((user) => (
            <Table.Row key={user.id} id={user.id}>
              <Table.Cell>{user.name}</Table.Cell>
              <Table.Cell>{user.role}</Table.Cell>
              <Table.Cell>{user.status}</Table.Cell>
              <Table.Cell>{user.email}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
        <Table.Footer>
          <span className="flex-1 text-sm text-muted">1 to 3 of {users.length} results</span>
          <div className="flex items-center gap-2">
            <button className="rounded-full px-3 py-1 text-sm font-medium opacity-50">Prev</button>
            <button className="rounded-full px-3 py-1 text-sm font-medium">Next</button>
          </div>
        </Table.Footer>
      </Table>
    </Wrapper>
  ),
};

/**
 * Secondary variant with no border/shadow/rounding.
 */
export const SecondaryVariant: Story = {
  render: () => (
    <Wrapper>
      <Table aria-label="Secondary variant" variant="secondary">
        <Table.Header>
          {columns.map((col) => (
            <Table.Column key={col.id} id={col.id} isRowHeader={col.isRowHeader}>
              {col.name}
            </Table.Column>
          ))}
        </Table.Header>
        <Table.Body>
          {users.map((user) => (
            <Table.Row key={user.id} id={user.id}>
              <Table.Cell>{user.name}</Table.Cell>
              <Table.Cell>{user.role}</Table.Cell>
              <Table.Cell>{user.status}</Table.Cell>
              <Table.Cell>{user.email}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
        <Table.Footer>
          <span className="flex-1 text-sm text-muted">1 to 3 of {users.length} results</span>
          <div className="flex items-center gap-2">
            <button className="rounded-full px-3 py-1 text-sm font-medium opacity-50">Prev</button>
            <button className="rounded-full px-3 py-1 text-sm font-medium">Next</button>
          </div>
        </Table.Footer>
      </Table>
    </Wrapper>
  ),
};

/**
 * Multi-selection with user-placed checkboxes.
 */
const SelectionTemplate = () => {
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set());

  return (
    <Wrapper>
      <Table
        aria-label="Selection table"
        selectedKeys={selectedKeys}
        selectionMode="multiple"
        onSelectionChange={setSelectedKeys}
      >
        <Table.Header>
          <Table.Column>
            <Checkbox aria-label="Select all" slot="selection">
              <Checkbox.Control>
                <Checkbox.Indicator />
              </Checkbox.Control>
            </Checkbox>
          </Table.Column>
          {columns.map((col) => (
            <Table.Column key={col.id} id={col.id} isRowHeader={col.isRowHeader}>
              {col.name}
            </Table.Column>
          ))}
        </Table.Header>
        <Table.Body>
          {users.map((user) => (
            <Table.Row key={user.id} id={user.id}>
              <Table.Cell>
                <Checkbox aria-label={`Select ${user.name}`} slot="selection" variant="secondary">
                  <Checkbox.Control>
                    <Checkbox.Indicator />
                  </Checkbox.Control>
                </Checkbox>
              </Table.Cell>
              <Table.Cell>{user.name}</Table.Cell>
              <Table.Cell>{user.role}</Table.Cell>
              <Table.Cell>{user.status}</Table.Cell>
              <Table.Cell>{user.email}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
        <Table.Footer>
          <span className="flex-1 text-sm text-muted">1 to 3 of {users.length} results</span>
          <div className="flex items-center gap-2">
            <button className="rounded-full px-3 py-1 text-sm font-medium opacity-50">Prev</button>
            <button className="rounded-full px-3 py-1 text-sm font-medium">Next</button>
          </div>
        </Table.Footer>
      </Table>
    </Wrapper>
  );
};

export const WithSelection: Story = {
  render: () => <SelectionTemplate />,
};

/**
 * Sortable columns with user-composed sort indicators.
 */
const SortingTemplate = () => {
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "name",
    direction: "ascending",
  });

  const sortedUsers = React.useMemo(() => {
    return [...users].sort((a, b) => {
      const col = sortDescriptor.column as keyof User;
      const first = String(a[col]);
      const second = String(b[col]);
      let cmp = first.localeCompare(second);

      if (sortDescriptor.direction === "descending") {
        cmp *= -1;
      }

      return cmp;
    });
  }, [sortDescriptor]);

  return (
    <Wrapper>
      <Table
        aria-label="Sortable table"
        sortDescriptor={sortDescriptor}
        onSortChange={setSortDescriptor}
      >
        <Table.Header>
          <Table.Column allowsSorting isRowHeader id="name">
            {({sortDirection}) => (
              <span className="flex items-center justify-between">
                Name
                {!!sortDirection && (
                  <Icon
                    icon="gravity-ui:chevron-up"
                    className={cn(
                      "size-3 transform transition-transform duration-100 ease-out",
                      sortDirection === "descending" ? "rotate-180" : "",
                    )}
                  />
                )}
              </span>
            )}
          </Table.Column>
          <Table.Column allowsSorting id="role">
            {({sortDirection}) => (
              <span className="flex items-center justify-between">
                Role
                {!!sortDirection && (
                  <Icon
                    icon="gravity-ui:chevron-up"
                    className={cn(
                      "size-3 transform transition-transform duration-100 ease-out",
                      sortDirection === "descending" ? "rotate-180" : "",
                    )}
                  />
                )}
              </span>
            )}
          </Table.Column>
          <Table.Column id="status">Status</Table.Column>
          <Table.Column id="email">Email</Table.Column>
        </Table.Header>
        <Table.Body>
          {sortedUsers.map((user) => (
            <Table.Row key={user.id} id={user.id}>
              <Table.Cell>{user.name}</Table.Cell>
              <Table.Cell>{user.role}</Table.Cell>
              <Table.Cell>{user.status}</Table.Cell>
              <Table.Cell>{user.email}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
        <Table.Footer>
          <span className="flex-1 text-sm text-muted">1 to 3 of {users.length} results</span>
          <div className="flex items-center gap-2">
            <button className="rounded-full px-3 py-1 text-sm font-medium opacity-50">Prev</button>
            <button className="rounded-full px-3 py-1 text-sm font-medium">Next</button>
          </div>
        </Table.Footer>
      </Table>
    </Wrapper>
  );
};

export const WithSorting: Story = {
  render: () => <SortingTemplate />,
};

/**
 * Empty state via user-provided renderEmptyState.
 */
export const EmptyState: Story = {
  render: () => (
    <Wrapper>
      <Table aria-label="Empty state">
        <Table.Header>
          {columns.map((col) => (
            <Table.Column key={col.id} id={col.id} isRowHeader={col.isRowHeader}>
              {col.name}
            </Table.Column>
          ))}
        </Table.Header>
        <Table.Body
          renderEmptyState={() => (
            <div className="flex min-w-xl flex-col items-center justify-center py-12 text-center">
              <Icon className="mb-3 size-10 text-muted" icon="gravity-ui:magnifier" />
              <p className="text-sm font-medium text-foreground">No results found</p>
              <p className="text-xs text-muted">Try adjusting your search or filters.</p>
            </div>
          )}
        >
          {[]}
        </Table.Body>
      </Table>
    </Wrapper>
  ),
};

/**
 * Disabled rows via disabledKeys.
 */
export const DisabledRows: Story = {
  render: () => (
    <Wrapper>
      <Table aria-label="Disabled rows" disabledKeys={[3, 5]}>
        <Table.Header>
          {columns.map((col) => (
            <Table.Column key={col.id} id={col.id} isRowHeader={col.isRowHeader}>
              {col.name}
            </Table.Column>
          ))}
        </Table.Header>
        <Table.Body>
          {users.map((user) => (
            <Table.Row key={user.id} id={user.id}>
              <Table.Cell>{user.name}</Table.Cell>
              <Table.Cell>{user.role}</Table.Cell>
              <Table.Cell>{user.status}</Table.Cell>
              <Table.Cell>{user.email}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
        <Table.Footer>
          <span className="flex-1 text-sm text-muted">1 to 3 of {users.length} results</span>
          <div className="flex items-center gap-2">
            <button className="rounded-full px-3 py-1 text-sm font-medium opacity-50">Prev</button>
            <button className="rounded-full px-3 py-1 text-sm font-medium">Next</button>
          </div>
        </Table.Footer>
      </Table>
    </Wrapper>
  ),
};

/**
 * Custom cell content: avatars, chips, and action buttons composed by the user.
 */
const statusColorMap: Record<string, "success" | "danger" | "warning"> = {
  Active: "success",
  Inactive: "danger",
  "On Leave": "warning",
};

export const CustomCells: Story = {
  render: () => {
    const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set());

    return (
      <Wrapper>
        <Table
          aria-label="Custom cells"
          selectedKeys={selectedKeys}
          selectionMode="multiple"
          variant="primary"
          onSelectionChange={setSelectedKeys}
        >
          <Table.Header>
            <Table.Column className="pr-0">
              <Checkbox aria-label="Select all" slot="selection">
                <Checkbox.Control>
                  <Checkbox.Indicator />
                </Checkbox.Control>
              </Checkbox>
            </Table.Column>
            <Table.Column isRowHeader className="before:hidden">
              Worker ID
            </Table.Column>
            <Table.Column>Member</Table.Column>
            <Table.Column>Role</Table.Column>
            <Table.Column>Status</Table.Column>
            <Table.Column className="text-end">Actions</Table.Column>
          </Table.Header>
          <Table.Body>
            {users.map((user) => (
              <Table.Row key={user.id} id={user.id}>
                <Table.Cell className="pr-0">
                  <Checkbox aria-label={`Select ${user.name}`} slot="selection" variant="secondary">
                    <Checkbox.Control>
                      <Checkbox.Indicator />
                    </Checkbox.Control>
                  </Checkbox>
                </Table.Cell>
                <Table.Cell className="font-medium">
                  <div className="flex items-center gap-2">
                    #{user.id.toString()}{" "}
                    <Button isIconOnly size="sm" variant="ghost">
                      <Icon className="size-4 text-muted" icon="gravity-ui:copy" />
                    </Button>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <div className="flex items-center gap-3">
                    <Avatar size="sm">
                      <Avatar.Image src={user.image_url} />
                      <Avatar.Fallback>
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </Avatar.Fallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-xs">{user.name}</span>
                      <span className="text-xs text-muted">{user.email}</span>
                    </div>
                  </div>
                </Table.Cell>
                <Table.Cell className="min-w-52">{user.role}</Table.Cell>
                <Table.Cell className="min-w-25">
                  <Chip color={statusColorMap[user.status]} size="sm" variant="soft">
                    {user.status}
                  </Chip>
                </Table.Cell>
                <Table.Cell>
                  <div className="flex items-center gap-1">
                    <Button isIconOnly size="sm" variant="tertiary">
                      <Icon className="size-4" icon="gravity-ui:eye" />
                    </Button>
                    <Button isIconOnly size="sm" variant="tertiary">
                      <Icon className="size-4" icon="gravity-ui:pencil" />
                    </Button>
                    <Button isIconOnly size="sm" variant="danger-soft">
                      <Icon className="size-4" icon="gravity-ui:trash-bin" />
                    </Button>
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
          <Table.Footer>
            <span className="flex-1 text-sm text-muted">1 to 3 of {users.length} results</span>
            <div className="flex items-center gap-2">
              <button className="rounded-full px-3 py-1 text-sm font-medium opacity-50">
                Prev
              </button>
              <button className="rounded-full px-3 py-1 text-sm font-medium">Next</button>
            </div>
          </Table.Footer>
        </Table>
      </Wrapper>
    );
  },
};

/**
 * Dynamic collection with items prop.
 * Uses Table.Collection to render dynamic cells within rows,
 * which also allows placing static cells (e.g. checkbox) before the dynamic ones.
 */
export const DynamicCollection: Story = {
  render: () => (
    <Wrapper>
      <Table aria-label="Dynamic collection">
        <Table.Header columns={columns}>
          {(column) => <Table.Column isRowHeader={column.isRowHeader}>{column.name}</Table.Column>}
        </Table.Header>
        <Table.Body items={users}>
          {(user) => (
            <Table.Row>
              <Table.Collection items={columns}>
                {(column) => <Table.Cell>{user[column.id as keyof User]}</Table.Cell>}
              </Table.Collection>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </Wrapper>
  ),
};

/**
 * Dynamic collection with selection — shows how Table.Collection lets you
 * add static cells (checkbox) alongside dynamic column-based cells.
 */
const DynamicWithSelectionTemplate = () => {
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set());

  return (
    <Wrapper>
      <Table
        aria-label="Dynamic with selection"
        selectedKeys={selectedKeys}
        selectionMode="multiple"
        onSelectionChange={setSelectedKeys}
      >
        <Table.Header>
          <Table.Column>
            <Checkbox aria-label="Select all" slot="selection">
              <Checkbox.Control>
                <Checkbox.Indicator />
              </Checkbox.Control>
            </Checkbox>
          </Table.Column>
          <Table.Collection items={columns}>
            {(column) => (
              <Table.Column isRowHeader={column.isRowHeader}>{column.name}</Table.Column>
            )}
          </Table.Collection>
        </Table.Header>
        <Table.Body items={users}>
          {(user) => (
            <Table.Row>
              <Table.Cell>
                <Checkbox aria-label={`Select ${user.name}`} slot="selection" variant="secondary">
                  <Checkbox.Control>
                    <Checkbox.Indicator />
                  </Checkbox.Control>
                </Checkbox>
              </Table.Cell>
              <Table.Collection items={columns}>
                {(column) => <Table.Cell>{user[column.id]}</Table.Cell>}
              </Table.Collection>
            </Table.Row>
          )}
        </Table.Body>
        <Table.Footer>
          <span className="flex-1 text-sm text-muted">1 to 3 of {users.length} results</span>
          <div className="flex items-center gap-2">
            <button className="rounded-full px-3 py-1 text-sm font-medium opacity-50">Prev</button>
            <button className="rounded-full px-3 py-1 text-sm font-medium">Next</button>
          </div>
        </Table.Footer>
      </Table>
    </Wrapper>
  );
};

export const DynamicWithSelection: Story = {
  render: () => <DynamicWithSelectionTemplate />,
};
