"use client";

import type {SortDescriptor} from "@heroui/react";

import {Table} from "@heroui/react";
import {useMemo, useState} from "react";

interface User {
  id: number;
  name: string;
  role: string;
  status: string;
  email: string;
}

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
];

export function Sorting() {
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "name",
    direction: "ascending",
  });

  const sortedUsers = useMemo(() => {
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
    <Table>
      <Table.ScrollContainer>
        <Table.Content
          aria-label="可排序表格"
          className="min-w-[600px]"
          sortDescriptor={sortDescriptor}
          onSortChange={setSortDescriptor}
        >
          <Table.Header>
            <Table.Column allowsSorting isRowHeader id="name">
              {({sortDirection}) => (
                <Table.SortableColumnHeader sortDirection={sortDirection}>
                  姓名
                </Table.SortableColumnHeader>
              )}
            </Table.Column>
            <Table.Column allowsSorting id="role">
              {({sortDirection}) => (
                <Table.SortableColumnHeader sortDirection={sortDirection}>
                  角色
                </Table.SortableColumnHeader>
              )}
            </Table.Column>
            <Table.Column allowsSorting id="status">
              {({sortDirection}) => (
                <Table.SortableColumnHeader sortDirection={sortDirection}>
                  状态
                </Table.SortableColumnHeader>
              )}
            </Table.Column>
            <Table.Column allowsSorting id="email">
              {({sortDirection}) => (
                <Table.SortableColumnHeader sortDirection={sortDirection}>
                  邮箱
                </Table.SortableColumnHeader>
              )}
            </Table.Column>
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
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  );
}
