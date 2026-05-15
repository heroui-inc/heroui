"use client";

import {Pagination, Table} from "@heroui/react";
import {useMemo, useState} from "react";

const columns = [
  {id: "name", name: "姓名"},
  {id: "role", name: "角色"},
  {id: "status", name: "状态"},
  {id: "email", name: "邮箱"},
];

const users = [
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

const ROWS_PER_PAGE = 4;

export function PaginationDemo() {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(users.length / ROWS_PER_PAGE);
  const pages = Array.from({length: totalPages}, (_, i) => i + 1);

  const paginatedItems = useMemo(() => {
    const start = (page - 1) * ROWS_PER_PAGE;

    return users.slice(start, start + ROWS_PER_PAGE);
  }, [page]);

  const start = (page - 1) * ROWS_PER_PAGE + 1;
  const end = Math.min(page * ROWS_PER_PAGE, users.length);

  return (
    <Table>
      <Table.ScrollContainer>
        <Table.Content aria-label="带分页的表格" className="min-w-[600px]">
          <Table.Header columns={columns}>
            {(column) => (
              <Table.Column isRowHeader={column.id === "name"}>{column.name}</Table.Column>
            )}
          </Table.Header>
          <Table.Body items={paginatedItems}>
            {(user) => (
              <Table.Row>
                <Table.Collection items={columns}>
                  {(column) => <Table.Cell>{user[column.id as keyof typeof user]}</Table.Cell>}
                </Table.Collection>
              </Table.Row>
            )}
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
                isDisabled={page === 1}
                onPress={() => setPage((p) => Math.max(1, p - 1))}
              >
                <Pagination.PreviousIcon />
                上一页
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
