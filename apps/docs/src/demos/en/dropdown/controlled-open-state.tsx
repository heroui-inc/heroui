"use client";

import {Button, Dropdown, Label} from "@heroui/react";
import {useState} from "react";

export function ControlledOpenState() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-w-sm flex-col items-center justify-center gap-4">
      <p className="text-sm text-muted">
        Dropdown is: <strong>{open ? "open" : "closed"}</strong>
      </p>
      <Dropdown isOpen={open} onOpenChange={setOpen}>
        <Button aria-label="Menu" variant="secondary">
          Actions
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
    </div>
  );
}
