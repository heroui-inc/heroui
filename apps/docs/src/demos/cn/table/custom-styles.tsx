import {Table} from "@heroui/react";

const headerCell = "text-xs font-semibold uppercase tracking-wide text-muted";

const rowClass =
  "border-t border-border/60 transition-colors hover:bg-default even:bg-surface-secondary";

export function CustomStyles() {
  return (
    <Table className="w-full max-w-2xl overflow-hidden rounded-xl border border-border/80 shadow-sm">
      <Table.ScrollContainer>
        <Table.Content aria-label="团队成员" className="min-w-[600px]">
          <Table.Header className="bg-surface-secondary">
            <Table.Column isRowHeader className={headerCell}>
              姓名
            </Table.Column>
            <Table.Column className={headerCell}>角色</Table.Column>
            <Table.Column className={headerCell}>状态</Table.Column>
          </Table.Header>
          <Table.Body>
            <Table.Row className={rowClass}>
              <Table.Cell className="font-medium text-foreground">Kate Moore</Table.Cell>
              <Table.Cell>CEO</Table.Cell>
              <Table.Cell>在职</Table.Cell>
            </Table.Row>
            <Table.Row className={rowClass}>
              <Table.Cell className="font-medium text-foreground">John Smith</Table.Cell>
              <Table.Cell>CTO</Table.Cell>
              <Table.Cell>在职</Table.Cell>
            </Table.Row>
            <Table.Row className={rowClass}>
              <Table.Cell className="font-medium text-foreground">Sara Johnson</Table.Cell>
              <Table.Cell>CMO</Table.Cell>
              <Table.Cell>休假中</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  );
}
