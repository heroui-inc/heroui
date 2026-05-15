"use client";

import {Button, Dropdown, Label} from "@heroui/react";
import {useState} from "react";

export function ControlledOpenState() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-w-sm flex-col items-center justify-center gap-4">
      <p className="text-sm text-muted">
        下拉菜单：<strong>{open ? "打开" : "关闭"}</strong>
      </p>
      <Dropdown isOpen={open} onOpenChange={setOpen}>
        <Button aria-label="菜单" variant="secondary">
          操作
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
    </div>
  );
}
