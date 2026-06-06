"use client";

import type {Selection} from "@heroui/react";

import {Checkbox, Table} from "@heroui/react";
import {useState} from "react";

const users = [
  {email: "kate@acme.com", id: 1, name: "Kate Moore", role: "首席执行官", status: "在职"},
  {email: "john@acme.com", id: 2, name: "John Smith", role: "首席技术官", status: "在职"},
  {email: "sara@acme.com", id: 3, name: "Sara Johnson", role: "首席营销官", status: "休假"},
  {email: "michael@acme.com", id: 4, name: "Michael Brown", role: "首席财务官", status: "在职"},
];

export function SelectionDemo() {
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set());

  return (
    <div className="flex flex-col gap-3">
      <Table>
        <Table.ScrollContainer>
          <Table.Content
            aria-label="带选择的表格"
            className="min-w-[600px]"
            selectedKeys={selectedKeys}
            selectionMode="multiple"
            onSelectionChange={setSelectedKeys}
          >
            <Table.Header>
              <Table.Column className="pr-0">
                <Checkbox aria-label="全选" slot="selection">
                  <Checkbox.Content>
                    <Checkbox.Control>
                      <Checkbox.Indicator />
                    </Checkbox.Control>
                  </Checkbox.Content>
                </Checkbox>
              </Table.Column>
              <Table.Column isRowHeader>姓名</Table.Column>
              <Table.Column>角色</Table.Column>
              <Table.Column>状态</Table.Column>
              <Table.Column>邮箱</Table.Column>
            </Table.Header>
            <Table.Body>
              {users.map((user) => (
                <Table.Row key={user.id} id={user.id}>
                  <Table.Cell className="pr-0">
                    <Checkbox aria-label={`选择 ${user.name}`} slot="selection" variant="secondary">
                      <Checkbox.Content>
                        <Checkbox.Control>
                          <Checkbox.Indicator />
                        </Checkbox.Control>
                      </Checkbox.Content>
                    </Checkbox>
                  </Table.Cell>
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
      <p className="text-sm text-muted">
        已选：{" "}
        <span className="font-medium">
          {selectedKeys === "all"
            ? "全部"
            : selectedKeys.size > 0
              ? Array.from(selectedKeys).join(", ")
              : "无"}
        </span>
      </p>
    </div>
  );
}
