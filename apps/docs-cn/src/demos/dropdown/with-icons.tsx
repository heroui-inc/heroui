"use client";

import {FloppyDisk, FolderOpen, SquarePlus, TrashBin} from "@gravity-ui/icons";
import {Button, Dropdown, Kbd, Label} from "@heroui/react";

export function WithIcons() {
  return (
    <Dropdown>
      <Button aria-label="菜单" variant="secondary">
        操作
      </Button>
      <Dropdown.Popover>
        <Dropdown.Menu onAction={(key) => console.log(`Selected: ${key}`)}>
          <Dropdown.Item id="new-file" textValue="新建文件">
            <SquarePlus className="size-4 shrink-0 text-muted" />
            <Label>新建文件</Label>
            <Kbd className="ms-auto" slot="keyboard" variant="light">
              <Kbd.Abbr keyValue="command" />
              <Kbd.Content>N</Kbd.Content>
            </Kbd>
          </Dropdown.Item>
          <Dropdown.Item id="open-file" textValue="打开文件">
            <FolderOpen className="size-4 shrink-0 text-muted" />
            <Label>打开文件</Label>
            <Kbd className="ms-auto" slot="keyboard" variant="light">
              <Kbd.Abbr keyValue="command" />
              <Kbd.Content>O</Kbd.Content>
            </Kbd>
          </Dropdown.Item>
          <Dropdown.Item id="save-file" textValue="保存文件">
            <FloppyDisk className="size-4 shrink-0 text-muted" />
            <Label>保存文件</Label>
            <Kbd className="ms-auto" slot="keyboard" variant="light">
              <Kbd.Abbr keyValue="command" />
              <Kbd.Content>S</Kbd.Content>
            </Kbd>
          </Dropdown.Item>
          <Dropdown.Item id="delete-file" textValue="删除文件" variant="danger">
            <TrashBin className="size-4 shrink-0 text-danger" />
            <Label>删除文件</Label>
            <Kbd className="ms-auto" slot="keyboard" variant="light">
              <Kbd.Abbr keyValue="command" />
              <Kbd.Abbr keyValue="shift" />
              <Kbd.Content>D</Kbd.Content>
            </Kbd>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
}
