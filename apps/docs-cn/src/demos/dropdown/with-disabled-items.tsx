"use client";

import {Bars, Pencil, SquarePlus, TrashBin} from "@gravity-ui/icons";
import {Button, Description, Dropdown, Header, Kbd, Label, Separator} from "@heroui/react";

export function WithDisabledItems() {
  return (
    <Dropdown>
      <Button isIconOnly aria-label="菜单" variant="secondary">
        <Bars className="outline-none" />
      </Button>
      <Dropdown.Popover className="min-w-[220px]">
        <Dropdown.Menu
          disabledKeys={["delete-file"]}
          onAction={(key) => console.log(`Selected: ${key}`)}
        >
          <Dropdown.Section>
            <Header>操作</Header>
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
            <Dropdown.Item id="edit-file" textValue="编辑文件">
              <div className="flex h-8 items-start justify-center pt-px">
                <Pencil className="size-4 shrink-0 text-muted" />
              </div>
              <div className="flex flex-col">
                <Label>编辑文件</Label>
                <Description>进行修改</Description>
              </div>
              <Kbd className="ms-auto" slot="keyboard" variant="light">
                <Kbd.Abbr keyValue="command" />
                <Kbd.Content>E</Kbd.Content>
              </Kbd>
            </Dropdown.Item>
          </Dropdown.Section>
          <Separator />
          <Dropdown.Section>
            <Header>危险区域</Header>
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
          </Dropdown.Section>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
}
