import {Chip, Table} from "@heroui/react";

export function ColumnResizing() {
  return (
    <Table>
      <Table.ResizableContainer>
        <Table.Content aria-label="可调整列宽的表格" className="min-w-[700px]">
          <Table.Header>
            <Table.Column isRowHeader defaultWidth="1fr" id="name" minWidth={160}>
              姓名
              <Table.ColumnResizer />
            </Table.Column>
            <Table.Column defaultWidth="1fr" id="role" minWidth={220}>
              角色
              <Table.ColumnResizer />
            </Table.Column>
            <Table.Column defaultWidth="1fr" id="status" minWidth={100}>
              状态
              <Table.ColumnResizer />
            </Table.Column>
            <Table.Column defaultWidth="1fr" id="email" minWidth={200}>
              邮箱
            </Table.Column>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>Kate Moore</Table.Cell>
              <Table.Cell>首席执行官</Table.Cell>
              <Table.Cell>
                <Chip color="success" size="sm" variant="soft">
                  Active
                </Chip>
              </Table.Cell>
              <Table.Cell>kate@acme.com</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>John Smith</Table.Cell>
              <Table.Cell>首席技术官</Table.Cell>
              <Table.Cell>
                <Chip color="success" size="sm" variant="soft">
                  Active
                </Chip>
              </Table.Cell>
              <Table.Cell>john@acme.com</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Sara Johnson</Table.Cell>
              <Table.Cell>首席营销官</Table.Cell>
              <Table.Cell>
                <Chip color="warning" size="sm" variant="soft">
                  On Leave
                </Chip>
              </Table.Cell>
              <Table.Cell>sara@acme.com</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Michael Brown</Table.Cell>
              <Table.Cell>首席财务官</Table.Cell>
              <Table.Cell>
                <Chip color="success" size="sm" variant="soft">
                  Active
                </Chip>
              </Table.Cell>
              <Table.Cell>michael@acme.com</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Emily Davis</Table.Cell>
              <Table.Cell>产品经理</Table.Cell>
              <Table.Cell>
                <Chip color="danger" size="sm" variant="soft">
                  Inactive
                </Chip>
              </Table.Cell>
              <Table.Cell>emily@acme.com</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Content>
      </Table.ResizableContainer>
    </Table>
  );
}
