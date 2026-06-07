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
  {email: "kate@acme.com", id: 1, name: "Kate Moore", role: "CEO", status: "Active"},
  {email: "john@acme.com", id: 2, name: "John Smith", role: "CTO", status: "Active"},
  {email: "sara@acme.com", id: 3, name: "Sara Johnson", role: "CMO", status: "On Leave"},
  {email: "michael@acme.com", id: 4, name: "Michael Brown", role: "CFO", status: "Active"},
  {
    email: "emily@acme.com",
    id: 5,
    name: "Emily Davis",
    role: "Product Manager",
    status: "Inactive",
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
          aria-label="Sortable table"
          className="min-w-[600px]"
          sortDescriptor={sortDescriptor}
          onSortChange={setSortDescriptor}
        >
          <Table.Header>
            <Table.Column allowsSorting isRowHeader id="name">
              {({sortDirection}) => (
                <Table.SortableColumnHeader sortDirection={sortDirection}>
                  Name
                </Table.SortableColumnHeader>
              )}
            </Table.Column>
            <Table.Column allowsSorting id="role">
              {({sortDirection}) => (
                <Table.SortableColumnHeader sortDirection={sortDirection}>
                  Role
                </Table.SortableColumnHeader>
              )}
            </Table.Column>
            <Table.Column allowsSorting id="status">
              {({sortDirection}) => (
                <Table.SortableColumnHeader sortDirection={sortDirection}>
                  Status
                </Table.SortableColumnHeader>
              )}
            </Table.Column>
            <Table.Column allowsSorting id="email">
              {({sortDirection}) => (
                <Table.SortableColumnHeader sortDirection={sortDirection}>
                  Email
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
