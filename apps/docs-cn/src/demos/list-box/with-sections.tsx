"use client";

import {Pencil, SquarePlus, TrashBin} from "@gravity-ui/icons";
import {Description, Header, Kbd, Label, ListBox, Separator, Surface} from "@heroui/react";

export function WithSections() {
  return (
    <Surface className="w-[256px] rounded-3xl shadow-surface">
      <ListBox
        aria-label="文件操作"
        className="w-full p-2"
        selectionMode="none"
        onAction={(key) => alert(`已选项目：${key}`)}
      >
        <ListBox.Section>
          <Header>操作</Header>
          <ListBox.Item id="new-file" textValue="新建文件">
            <div className="flex h-8 items-start justify-center pt-px">
              <SquarePlus className="size-4 shrink-0 text-muted" />
            </div>
            <div className="flex flex-col">
              <Label>新建文件</Label>
              <Description>创建新文件</Description>
            </div>
            <Kbd className="ms-auto" variant="light">
              <Kbd.Abbr keyValue="command" />
              <Kbd.Content>N</Kbd.Content>
            </Kbd>
          </ListBox.Item>
          <ListBox.Item id="edit-file" textValue="编辑文件">
            <div className="flex h-8 items-start justify-center pt-px">
              <Pencil className="size-4 shrink-0 text-muted" />
            </div>
            <div className="flex flex-col">
              <Label>编辑文件</Label>
              <Description>进行修改</Description>
            </div>
            <Kbd className="ms-auto" variant="light">
              <Kbd.Abbr keyValue="command" />
              <Kbd.Content>E</Kbd.Content>
            </Kbd>
          </ListBox.Item>
        </ListBox.Section>
        <Separator />
        <ListBox.Section>
          <Header>危险区域</Header>
          <ListBox.Item id="delete-file" textValue="删除文件" variant="danger">
            <div className="flex h-8 items-start justify-center pt-px">
              <TrashBin className="size-4 shrink-0 text-danger" />
            </div>
            <div className="flex flex-col">
              <Label>删除文件</Label>
              <Description>移至废纸篓</Description>
            </div>
            <Kbd className="ms-auto" variant="light">
              <Kbd.Abbr keyValue="command" />
              <Kbd.Abbr keyValue="shift" />
              <Kbd.Content>D</Kbd.Content>
            </Kbd>
          </ListBox.Item>
        </ListBox.Section>
      </ListBox>
    </Surface>
  );
}
