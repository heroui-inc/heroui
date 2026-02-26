import type {Meta, StoryObj} from "@storybook/react";
import type {Selection, SortDescriptor} from "react-aria-components";

import {cn} from "@heroui/styles";
import {Icon} from "@iconify/react";
import React from "react";

import {Avatar} from "../avatar";
import {Button} from "../button";
import {Checkbox} from "../checkbox";
import {Chip} from "../chip";
import {Pagination} from "../pagination";

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
  {
    email: "olivia@acme.com",
    image_url: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/red.jpg",
    id: 3456789,
    name: "Olivia Martinez",
    role: "Frontend Engineer",
    status: "Active",
  },
  {
    email: "james@acme.com",
    image_url: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/green.jpg",
    id: 4567890,
    name: "James Taylor",
    role: "Backend Engineer",
    status: "Active",
  },
  {
    email: "sophia@acme.com",
    image_url: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg",
    id: 5678901,
    name: "Sophia Anderson",
    role: "QA Engineer",
    status: "On Leave",
  },
  {
    email: "liam@acme.com",
    image_url: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/purple.jpg",
    id: 6789012,
    name: "Liam Thomas",
    role: "DevOps Engineer",
    status: "Active",
  },
  {
    email: "ava@acme.com",
    image_url: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/orange.jpg",
    id: 7890123,
    name: "Ava Jackson",
    role: "Data Analyst",
    status: "Inactive",
  },
  {
    email: "noah@acme.com",
    image_url: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/black.jpg",
    id: 8901234,
    name: "Noah White",
    role: "Security Engineer",
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
 * Pagination Helpers
 * -----------------------------------------------------------------------------------------------*/
const ROWS_PER_PAGE = 4;

function usePagination<T>(items: T[], rowsPerPage = ROWS_PER_PAGE) {
  const [page, setPage] = React.useState(1);
  const totalPages = Math.ceil(items.length / rowsPerPage);

  const paginatedItems = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;

    return items.slice(start, start + rowsPerPage);
  }, [items, page, rowsPerPage]);

  const start = (page - 1) * rowsPerPage + 1;
  const end = Math.min(page * rowsPerPage, items.length);

  return {end, page, paginatedItems, setPage, start, total: items.length, totalPages};
}

function TablePaginationFooter({pagination}: {pagination: ReturnType<typeof usePagination>}) {
  const {end, page, setPage, start, total, totalPages} = pagination;
  const pages = Array.from({length: totalPages}, (_, i) => i + 1);

  return (
    <Pagination size="sm">
      <Pagination.Summary>
        {start} to {end} of {total} results
      </Pagination.Summary>
      <Pagination.Content>
        <Pagination.Item>
          <Pagination.Previous
            isDisabled={page === 1}
            onPress={() => setPage((p) => Math.max(1, p - 1))}
          >
            <Pagination.PreviousIcon />
            Prev
          </Pagination.Previous>
        </Pagination.Item>
        {pages.map((p) => (
          <Pagination.Item key={p}>
            <Pagination.Link isActive={p === page} onPress={() => setPage(p)}>
              {p}
            </Pagination.Link>
          </Pagination.Item>
        ))}
        <Pagination.Item>
          <Pagination.Next
            isDisabled={page === totalPages}
            onPress={() => setPage((p) => Math.min(totalPages, p + 1))}
          >
            Next
            <Pagination.NextIcon />
          </Pagination.Next>
        </Pagination.Item>
      </Pagination.Content>
    </Pagination>
  );
}

/* -------------------------------------------------------------------------------------------------
 * Stories
 * -----------------------------------------------------------------------------------------------*/

const statusColorMap: Record<string, "success" | "danger" | "warning"> = {
  Active: "success",
  Inactive: "danger",
  "On Leave": "warning",
};

function SortableColumnHeader({
  children,
  sortDirection,
}: {
  children: React.ReactNode;
  sortDirection?: "ascending" | "descending";
}) {
  return (
    <span className="flex items-center justify-between">
      {children}
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
  );
}

/**
 * Shared template for Default and SecondaryVariant stories.
 */
function DefaultTableTemplate({variant = "primary"}: {variant?: "primary" | "secondary"}) {
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set());
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

  const pagination = usePagination(sortedUsers);

  return (
    <Wrapper>
      <Table
        aria-label="Custom cells"
        className="min-w-[800px]"
        selectedKeys={selectedKeys}
        selectionMode="multiple"
        sortDescriptor={sortDescriptor}
        variant={variant}
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
      >
        <Table.Header>
          <Table.Column className="pr-0">
            <Checkbox aria-label="Select all" slot="selection">
              <Checkbox.Control>
                <Checkbox.Indicator />
              </Checkbox.Control>
            </Checkbox>
          </Table.Column>
          <Table.Column allowsSorting isRowHeader className="before:hidden" id="id">
            {({sortDirection}) => (
              <SortableColumnHeader sortDirection={sortDirection}>Worker ID</SortableColumnHeader>
            )}
          </Table.Column>
          <Table.Column allowsSorting id="name">
            {({sortDirection}) => (
              <SortableColumnHeader sortDirection={sortDirection}>Member</SortableColumnHeader>
            )}
          </Table.Column>
          <Table.Column allowsSorting id="role">
            {({sortDirection}) => (
              <SortableColumnHeader sortDirection={sortDirection}>Role</SortableColumnHeader>
            )}
          </Table.Column>
          <Table.Column allowsSorting id="status">
            {({sortDirection}) => (
              <SortableColumnHeader sortDirection={sortDirection}>Status</SortableColumnHeader>
            )}
          </Table.Column>
          <Table.Column className="text-end">Actions</Table.Column>
        </Table.Header>
        <Table.Body>
          {pagination.paginatedItems.map((user) => (
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
          <TablePaginationFooter pagination={pagination} />
        </Table.Footer>
      </Table>
    </Wrapper>
  );
}

/**
 * Default table with custom cells: avatars, chips, action buttons, and sortable columns.
 */
export const Default: Story = {
  args: {
    variant: "primary",
  },
  render: ({variant}) => <DefaultTableTemplate variant={variant} />,
};

/**
 * Secondary variant: same content as Default with secondary styling.
 */
export const SecondaryVariant: Story = {
  render: () => <DefaultTableTemplate variant="secondary" />,
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
 * Dynamic collection with items prop.
 * Uses Table.Collection to render dynamic cells within rows,
 * which also allows placing static cells (e.g. checkbox) before the dynamic ones.
 */
export const DynamicCollection: Story = {
  render: () => {
    const pagination = usePagination(users);

    return (
      <Wrapper>
        <Table aria-label="Dynamic collection" className="min-w-[600px]">
          <Table.Header columns={columns}>
            {(column) => (
              <Table.Column isRowHeader={column.isRowHeader}>{column.name}</Table.Column>
            )}
          </Table.Header>
          <Table.Body items={pagination.paginatedItems}>
            {(user) => (
              <Table.Row>
                <Table.Collection items={columns}>
                  {(column) => <Table.Cell>{user[column.id as keyof User]}</Table.Cell>}
                </Table.Collection>
              </Table.Row>
            )}
          </Table.Body>
          <Table.Footer>
            <TablePaginationFooter pagination={pagination} />
          </Table.Footer>
        </Table>
      </Wrapper>
    );
  },
};

/**
 * Dynamic collection with selection — shows how Table.Collection lets you
 * add static cells (checkbox) alongside dynamic column-based cells.
 */
const DynamicWithSelectionTemplate = () => {
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set());
  const pagination = usePagination(users);

  return (
    <Wrapper>
      <Table
        aria-label="Dynamic with selection"
        className="min-w-[650px]"
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
        <Table.Body items={pagination.paginatedItems}>
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
          <TablePaginationFooter pagination={pagination} />
        </Table.Footer>
      </Table>
    </Wrapper>
  );
};

export const DynamicWithSelection: Story = {
  render: () => <DynamicWithSelectionTemplate />,
};
