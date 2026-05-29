"use client";

import type {SortDescriptor} from "@heroui/react";
import type {SortingState} from "@tanstack/react-table";

import {Chip, Pagination, Table} from "@heroui/react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {useMemo, useState} from "react";

// --- Data -----------------------------------------------------------------
interface User {
  id: number;
  name: string;
  role: string;
  status: "在职" | "未激活" | "休假";
  email: string;
}

const statusColorMap: Record<string, "success" | "danger" | "warning"> = {
  休假: "warning",
  在职: "success",
  未激活: "danger",
};

const users: User[] = [
  {email: "kate@acme.com", id: 1, name: "Kate Moore", role: "首席执行官", status: "在职"},
  {email: "john@acme.com", id: 2, name: "John Smith", role: "首席技术官", status: "在职"},
  {email: "sara@acme.com", id: 3, name: "Sara Johnson", role: "首席营销官", status: "休假"},
  {email: "michael@acme.com", id: 4, name: "Michael Brown", role: "首席财务官", status: "在职"},
  {
    email: "emily@acme.com",
    id: 5,
    name: "Emily Davis",
    role: "产品经理",
    status: "未激活",
  },
  {email: "davis@acme.com", id: 6, name: "Davis Wilson", role: "首席设计师", status: "在职"},
  {
    email: "olivia@acme.com",
    id: 7,
    name: "Olivia Martinez",
    role: "前端工程师",
    status: "在职",
  },
  {
    email: "james@acme.com",
    id: 8,
    name: "James Taylor",
    role: "后端工程师",
    status: "在职",
  },
];

// --- TanStack Column Definitions ------------------------------------------
const columnHelper = createColumnHelper<User>();

const columns = [
  columnHelper.accessor("name", {header: "姓名"}),
  columnHelper.accessor("role", {header: "角色"}),
  columnHelper.accessor("status", {
    cell: (info) => (
      <Chip color={statusColorMap[info.getValue()]} size="sm" variant="soft">
        {info.getValue()}
      </Chip>
    ),
    header: "状态",
  }),
  columnHelper.accessor("email", {header: "邮箱"}),
];

// --- Sorting Bridge -------------------------------------------------------
// Convert TanStack SortingState → React Aria SortDescriptor
function toSortDescriptor(sorting: SortingState): SortDescriptor | undefined {
  const first = sorting[0];

  if (!first) return undefined;

  return {
    column: first.id,
    direction: first.desc ? "descending" : "ascending",
  };
}

// Convert React Aria SortDescriptor → TanStack SortingState
function toSortingState(descriptor: SortDescriptor): SortingState {
  return [{desc: descriptor.direction === "descending", id: descriptor.column as string}];
}

// --- Component ------------------------------------------------------------
const PAGE_SIZE = 4;

export function TanstackTable() {
  const [sorting, setSorting] = useState<SortingState>([]);

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    columns,
    data: users,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: {pagination: {pageSize: PAGE_SIZE}},
    onSortingChange: setSorting,
    state: {sorting},
  });

  const sortDescriptor = useMemo(() => toSortDescriptor(sorting), [sorting]);

  const {pageIndex} = table.getState().pagination;
  const pageCount = table.getPageCount();
  const pages = Array.from({length: pageCount}, (_, i) => i + 1);
  const start = pageIndex * PAGE_SIZE + 1;
  const end = Math.min((pageIndex + 1) * PAGE_SIZE, users.length);

  return (
    <Table>
      <Table.ScrollContainer>
        <Table.Content
          aria-label="TanStack 表格示例"
          className="min-w-[600px]"
          sortDescriptor={sortDescriptor}
          onSortChange={(d) => setSorting(toSortingState(d))}
        >
          <Table.Header>
            {table.getHeaderGroups()[0]!.headers.map((header) => (
              <Table.Column
                key={header.id}
                allowsSorting={header.column.getCanSort()}
                id={header.id}
                isRowHeader={header.id === "name"}
              >
                {({sortDirection}) => (
                  <Table.SortableColumnHeader sortDirection={sortDirection}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </Table.SortableColumnHeader>
                )}
              </Table.Column>
            ))}
          </Table.Header>
          <Table.Body>
            {table.getRowModel().rows.map((row) => (
              <Table.Row key={row.id} id={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <Table.Cell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Table.Cell>
                ))}
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
      <Table.Footer>
        <Pagination size="sm">
          <Pagination.Summary>
            {start}–{end} / 共 {users.length} 条
          </Pagination.Summary>
          <Pagination.Content>
            <Pagination.Item>
              <Pagination.Previous
                isDisabled={!table.getCanPreviousPage()}
                onPress={() => table.previousPage()}
              >
                <Pagination.PreviousIcon />
                上一页
              </Pagination.Previous>
            </Pagination.Item>
            {pages.map((p) => (
              <Pagination.Item key={p}>
                <Pagination.Link
                  isActive={p === pageIndex + 1}
                  onPress={() => table.setPageIndex(p - 1)}
                >
                  {p}
                </Pagination.Link>
              </Pagination.Item>
            ))}
            <Pagination.Item>
              <Pagination.Next
                isDisabled={!table.getCanNextPage()}
                onPress={() => table.nextPage()}
              >
                下一页
                <Pagination.NextIcon />
              </Pagination.Next>
            </Pagination.Item>
          </Pagination.Content>
        </Pagination>
      </Table.Footer>
    </Table>
  );
}
