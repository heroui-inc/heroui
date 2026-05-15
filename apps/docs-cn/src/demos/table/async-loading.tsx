"use client";

import {Chip, Spinner, Table} from "@heroui/react";
import {useCallback, useRef, useState} from "react";

interface User {
  id: number;
  name: string;
  role: string;
  status: string;
  email: string;
}

const statusColorMap: Record<string, "success" | "danger" | "warning"> = {
  休假: "warning",
  在职: "success",
  未激活: "danger",
};

const allUsers: User[] = [
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
  {
    email: "sophia@acme.com",
    id: 9,
    name: "Sophia Anderson",
    role: "测试工程师",
    status: "休假",
  },
  {email: "liam@acme.com", id: 10, name: "Liam Thomas", role: "DevOps 工程师", status: "在职"},
  {
    email: "lucas@acme.com",
    id: 11,
    name: "Lucas Martinez",
    role: "产品经理",
    status: "在职",
  },
  {
    email: "emma@acme.com",
    id: 12,
    name: "Emma Johnson",
    role: "前端工程师",
    status: "在职",
  },
  {email: "noah@acme.com", id: 13, name: "Noah Davis", role: "后端工程师", status: "在职"},
  {email: "ava@acme.com", id: 14, name: "Ava Wilson", role: "首席设计师", status: "在职"},
  {
    email: "oliver@acme.com",
    id: 15,
    name: "Oliver Martinez",
    role: "前端工程师",
    status: "在职",
  },
  {
    email: "isabella@acme.com",
    id: 16,
    name: "Isabella Johnson",
    role: "后端工程师",
    status: "在职",
  },
  {email: "mia@acme.com", id: 17, name: "Mia Davis", role: "首席设计师", status: "在职"},
  {
    email: "william@acme.com",
    id: 18,
    name: "William Wilson",
    role: "前端工程师",
    status: "在职",
  },
];

const ITEMS_PER_PAGE = 6;

const columns = [
  {id: "name", name: "姓名"},
  {id: "role", name: "角色"},
  {id: "status", name: "状态"},
  {id: "email", name: "邮箱"},
];

export function AsyncLoading() {
  const [items, setItems] = useState<User[]>(() => allUsers.slice(0, ITEMS_PER_PAGE));
  const [isLoading, setIsLoading] = useState(false);
  const isLoadingRef = useRef(false);
  const hasMore = items.length < allUsers.length;

  const loadMore = useCallback(() => {
    if (!hasMore || isLoadingRef.current) return;
    isLoadingRef.current = true;
    setIsLoading(true);
    setTimeout(() => {
      setItems((prev) => allUsers.slice(0, prev.length + ITEMS_PER_PAGE));
      setIsLoading(false);
      requestAnimationFrame(() => {
        isLoadingRef.current = false;
      });
    }, 1500);
  }, [hasMore]);

  return (
    <Table>
      <Table.ScrollContainer className="h-[280px] overflow-y-auto">
        <Table.Content aria-label="异步加载表格" className="min-w-[600px]">
          <Table.Header className="sticky top-0 z-10 bg-surface-secondary">
            {columns.map((col) => (
              <Table.Column key={col.id} id={col.id} isRowHeader={col.id === "name"}>
                {col.name}
              </Table.Column>
            ))}
          </Table.Header>
          <Table.Body>
            <Table.Collection items={items}>
              {(user) => (
                <Table.Row>
                  <Table.Cell>{user.name}</Table.Cell>
                  <Table.Cell>{user.role}</Table.Cell>
                  <Table.Cell>
                    <Chip color={statusColorMap[user.status]} size="sm" variant="soft">
                      {user.status}
                    </Chip>
                  </Table.Cell>
                  <Table.Cell>{user.email}</Table.Cell>
                </Table.Row>
              )}
            </Table.Collection>
            {!!hasMore && (
              <Table.LoadMore isLoading={isLoading} scrollOffset={0} onLoadMore={loadMore}>
                <Table.LoadMoreContent>
                  <Spinner size="md" />
                </Table.LoadMoreContent>
              </Table.LoadMore>
            )}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  );
}
