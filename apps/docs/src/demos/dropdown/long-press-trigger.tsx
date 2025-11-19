import {Button, Dropdown, Label} from "@heroui/react";

export function LongPressTrigger() {
  return (
    <Dropdown trigger="longPress">
      <Button aria-label="Menu" variant="secondary">
        Long Press
      </Button>
      <Dropdown.Popover>
        <Dropdown.Menu>
          <Dropdown.Item id="new-file" textValue="New file">
            <Label>New file</Label>
          </Dropdown.Item>
          <Dropdown.Item id="open-file" textValue="Open file">
            <Label>Open file</Label>
          </Dropdown.Item>
          <Dropdown.Item id="save-file" textValue="Save file">
            <Label>Save file</Label>
          </Dropdown.Item>
          <Dropdown.Item id="delete-file" textValue="Delete file" variant="danger">
            <Label>Delete file</Label>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
}
