import {Button, Dropdown, Label} from "@heroui/react";

export function CustomStyles() {
  return (
    <Dropdown>
      <Button variant="secondary">操作</Button>
      <Dropdown.Popover className="rounded-xl border border-border/80 bg-surface p-1 shadow-sm">
        <Dropdown.Menu>
          <Dropdown.Item
            className="rounded-lg data-[focused=true]:bg-default"
            id="rename"
            textValue="重命名"
          >
            <Label>重命名</Label>
          </Dropdown.Item>
          <Dropdown.Item
            className="rounded-lg data-[focused=true]:bg-default"
            id="duplicate"
            textValue="复制"
          >
            <Label>复制</Label>
          </Dropdown.Item>
          <Dropdown.Item
            className="rounded-lg data-[focused=true]:bg-danger-soft"
            id="delete"
            textValue="删除"
            variant="danger"
          >
            <Label>删除</Label>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
}
