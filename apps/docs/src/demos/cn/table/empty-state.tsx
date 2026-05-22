"use client";

import {EmptyState, Table} from "@heroui/react";
import {Icon} from "@iconify/react";

export function EmptyStateDemo() {
  return (
    <Table className="min-h-[200px]">
      <Table.ScrollContainer>
        <Table.Content aria-label="空表格" className="h-full min-w-[600px]">
          <Table.Header>
            <Table.Column isRowHeader>姓名</Table.Column>
            <Table.Column>角色</Table.Column>
            <Table.Column>状态</Table.Column>
            <Table.Column>邮箱</Table.Column>
          </Table.Header>
          <Table.Body
            renderEmptyState={() => (
              <EmptyState className="flex h-full w-full flex-col items-center justify-center gap-4 text-center">
                <Icon className="size-6 text-muted" icon="gravity-ui:tray" />
                <span className="text-sm text-muted">未找到结果</span>
              </EmptyState>
            )}
          >
            {[]}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  );
}
