"use client";

import {Button, Dropdown, Label} from "@heroui/react";

export function Default() {
  return (
    <Dropdown>
      <Button aria-label="菜单" variant="secondary">
        操作
      </Button>
      <Dropdown.Popover>
        <Dropdown.Menu onAction={(key) => console.log(`Selected: ${key}`)}>
          <Dropdown.Item id="new-file" textValue="新建文件">
            <Label>新建文件</Label>
          </Dropdown.Item>
          <Dropdown.Item id="copy-link" textValue="复制链接">
            <Label>复制链接</Label>
          </Dropdown.Item>
          <Dropdown.Item id="edit-file" textValue="编辑文件">
            <Label>编辑文件</Label>
          </Dropdown.Item>
          <Dropdown.Item id="delete-file" textValue="删除文件" variant="danger">
            <Label>删除文件</Label>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
}
