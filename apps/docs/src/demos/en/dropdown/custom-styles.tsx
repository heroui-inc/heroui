import {Button, Dropdown, Label} from "@heroui/react";

export function CustomStyles() {
  return (
    <Dropdown>
      <Button variant="secondary">Actions</Button>
      <Dropdown.Popover className="rounded-xl border border-border/80 bg-surface p-1 shadow-sm">
        <Dropdown.Menu>
          <Dropdown.Item
            className="rounded-lg data-[focused=true]:bg-default"
            id="rename"
            textValue="Rename"
          >
            <Label>Rename</Label>
          </Dropdown.Item>
          <Dropdown.Item
            className="rounded-lg data-[focused=true]:bg-default"
            id="duplicate"
            textValue="Duplicate"
          >
            <Label>Duplicate</Label>
          </Dropdown.Item>
          <Dropdown.Item
            className="rounded-lg data-[focused=true]:bg-danger-soft"
            id="delete"
            textValue="Delete"
            variant="danger"
          >
            <Label>Delete</Label>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
}
