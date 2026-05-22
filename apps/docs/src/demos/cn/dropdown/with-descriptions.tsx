"use client";

import {FloppyDisk, FolderOpen, SquarePlus, TrashBin} from "@gravity-ui/icons";
import {Button, Description, Dropdown, Kbd, Label} from "@heroui/react";

export function WithDescriptions() {
  return (
    <Dropdown>
      <Button aria-label="菜单" variant="secondary">
        操作
      </Button>
      <Dropdown.Popover>
        <Dropdown.Menu onAction={(key) => console.log(`Selected: ${key}`)}>
          <Dropdown.Item id="new-file" textValue="新建文件">
            <div className="flex h-8 items-start justify-center pt-px">
              <SquarePlus className="size-4 shrink-0 text-muted" />
            </div>
            <div className="flex flex-col">
              <Label>新建文件</Label>
              <Description>创建新文件</Description>
            </div>
            <Kbd className="ms-auto" slot="keyboard" variant="light">
              <Kbd.Abbr keyValue="command" />
              <Kbd.Content>N</Kbd.Content>
            </Kbd>
          </Dropdown.Item>
          <Dropdown.Item id="open-file" textValue="打开文件">
            <div className="flex h-8 items-start justify-center pt-px">
              <FolderOpen className="size-4 shrink-0 text-muted" />
            </div>
            <div className="flex flex-col">
              <Label>打开文件</Label>
              <Description>打开已有文件</Description>
            </div>
            <Kbd className="ms-auto" slot="keyboard" variant="light">
              <Kbd.Abbr keyValue="command" />
              <Kbd.Content>O</Kbd.Content>
            </Kbd>
          </Dropdown.Item>
          <Dropdown.Item id="save-file" textValue="保存文件">
            <div className="flex h-8 items-start justify-center pt-px">
              <FloppyDisk className="size-4 shrink-0 text-muted" />
            </div>
            <div className="flex flex-col">
              <Label>保存文件</Label>
              <Description>保存当前文件</Description>
            </div>
            <Kbd className="ms-auto" slot="keyboard" variant="light">
              <Kbd.Abbr keyValue="command" />
              <Kbd.Content>S</Kbd.Content>
            </Kbd>
          </Dropdown.Item>
          <Dropdown.Item id="delete-file" textValue="删除文件" variant="danger">
            <div className="flex h-8 items-start justify-center pt-px">
              <TrashBin className="size-4 shrink-0 text-danger" />
            </div>
            <div className="flex flex-col">
              <Label>删除文件</Label>
              <Description>移至废纸篓</Description>
            </div>
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
