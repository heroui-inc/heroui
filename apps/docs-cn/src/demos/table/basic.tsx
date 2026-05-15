import {Table} from "@heroui/react";

export function Basic() {
  return (
    <Table>
      <Table.ScrollContainer>
        <Table.Content aria-label="团队成员" className="min-w-[600px]">
          <Table.Header>
            <Table.Column isRowHeader>姓名</Table.Column>
            <Table.Column>角色</Table.Column>
            <Table.Column>状态</Table.Column>
            <Table.Column>邮箱</Table.Column>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>Kate Moore</Table.Cell>
              <Table.Cell>首席执行官</Table.Cell>
              <Table.Cell>在职</Table.Cell>
              <Table.Cell>kate@acme.com</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>John Smith</Table.Cell>
              <Table.Cell>首席技术官</Table.Cell>
              <Table.Cell>在职</Table.Cell>
              <Table.Cell>john@acme.com</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Sara Johnson</Table.Cell>
              <Table.Cell>首席营销官</Table.Cell>
              <Table.Cell>休假</Table.Cell>
              <Table.Cell>sara@acme.com</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Michael Brown</Table.Cell>
              <Table.Cell>首席财务官</Table.Cell>
              <Table.Cell>在职</Table.Cell>
              <Table.Cell>michael@acme.com</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  );
}
