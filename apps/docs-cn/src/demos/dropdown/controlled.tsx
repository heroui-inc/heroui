"use client";

import type {Selection} from "@heroui/react";

import {Button, Dropdown, Label} from "@heroui/react";
import {useState} from "react";

export function Controlled() {
  const [selected, setSelected] = useState<Selection>(new Set(["bold"]));

  const selectedItems = Array.from(selected);

  return (
    <div className="flex min-w-sm flex-col items-center justify-center gap-4">
      <p className="text-sm text-muted">
        已选：{selectedItems.length > 0 ? selectedItems.join("、") : "无"}
      </p>
      <Dropdown>
        <Button aria-label="菜单" variant="secondary">
          操作
        </Button>
        <Dropdown.Popover>
          <Dropdown.Menu
            selectedKeys={selected}
            selectionMode="multiple"
            onSelectionChange={setSelected}
          >
            <Dropdown.Item id="bold" textValue="粗体">
              <Label>粗体</Label>
              <Dropdown.ItemIndicator />
            </Dropdown.Item>
            <Dropdown.Item id="italic" textValue="斜体">
              <Label>斜体</Label>
              <Dropdown.ItemIndicator />
            </Dropdown.Item>
            <Dropdown.Item id="underline" textValue="下划线">
              <Label>下划线</Label>
              <Dropdown.ItemIndicator />
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown.Popover>
      </Dropdown>
    </div>
  );
}
