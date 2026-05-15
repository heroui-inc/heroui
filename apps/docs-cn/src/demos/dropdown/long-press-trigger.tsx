import {Button, Dropdown, Label} from "@heroui/react";

export function LongPressTrigger() {
  return (
    <Dropdown trigger="longPress">
      <Button aria-label="菜单" variant="secondary">
        长按
      </Button>
      <Dropdown.Popover>
        <Dropdown.Menu>
          <Dropdown.Item id="new-file" textValue="新建文件">
            <Label>新建文件</Label>
          </Dropdown.Item>
          <Dropdown.Item id="open-file" textValue="打开文件">
            <Label>打开文件</Label>
          </Dropdown.Item>
          <Dropdown.Item id="save-file" textValue="保存文件">
            <Label>保存文件</Label>
          </Dropdown.Item>
          <Dropdown.Item id="delete-file" textValue="删除文件" variant="danger">
            <Label>删除文件</Label>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
}
