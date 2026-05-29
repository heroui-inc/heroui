"use client";

import type {Selection, SortDescriptor} from "@heroui/react";

import {Avatar, Button, Checkbox, Chip, Table} from "@heroui/react";
import {Icon} from "@iconify/react";
import {useMemo, useState} from "react";

interface User {
  id: number;
  name: string;
  image_url: string;
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
  {
    email: "kate@acme.com",
    id: 4586932,
    image_url: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/red.jpg",
    name: "Kate Moore",
    role: "首席执行官",
    status: "在职",
  },
  {
    email: "john@acme.com",
    id: 5273849,
    image_url: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/green.jpg",
    name: "John Smith",
    role: "首席技术官",
    status: "在职",
  },
  {
    email: "sara@acme.com",
    id: 7492836,
    image_url: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg",
    name: "Sara Johnson",
    role: "首席营销官",
    status: "休假",
  },
  {
    email: "michael@acme.com",
    id: 8293746,
    image_url: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/purple.jpg",
    name: "Michael Brown",
    role: "首席财务官",
    status: "在职",
  },
  {
    email: "emily@acme.com",
    id: 1234567,
    image_url: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/orange.jpg",
    name: "Emily Davis",
    role: "产品经理",
    status: "未激活",
  },
];

export function CustomCells() {
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set());
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
          aria-label="自定义单元格表格"
          className="min-w-[800px]"
          selectedKeys={selectedKeys}
          selectionMode="multiple"
          sortDescriptor={sortDescriptor}
          onSelectionChange={setSelectedKeys}
          onSortChange={setSortDescriptor}
        >
          <Table.Header>
            <Table.Column className="pr-0">
              <Checkbox aria-label="全选" slot="selection">
                <Checkbox.Control>
                  <Checkbox.Indicator />
                </Checkbox.Control>
              </Checkbox>
            </Table.Column>
            <Table.Column allowsSorting isRowHeader className="after:hidden" id="id">
              {({sortDirection}) => (
                <Table.SortableColumnHeader sortDirection={sortDirection}>
                  员工 ID
                </Table.SortableColumnHeader>
              )}
            </Table.Column>
            <Table.Column allowsSorting id="name">
              {({sortDirection}) => (
                <Table.SortableColumnHeader sortDirection={sortDirection}>
                  成员
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
            <Table.Column className="text-end">操作</Table.Column>
          </Table.Header>
          <Table.Body>
            {sortedUsers.map((user) => (
              <Table.Row key={user.id} id={user.id}>
                <Table.Cell className="pr-0">
                  <Checkbox aria-label={`选择 ${user.name}`} slot="selection" variant="secondary">
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
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  );
}
