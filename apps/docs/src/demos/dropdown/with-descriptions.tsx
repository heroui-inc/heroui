"use client";

import {Button, Description, Dropdown, Kbd, Label} from "@heroui/react";
import {Icon} from "@iconify/react";

export function WithDescriptions() {
  return (
    <Dropdown>
      <Button aria-label="Menu" variant="secondary">
        Actions
      </Button>
      <Dropdown.Popover>
        <Dropdown.Menu onAction={(key) => console.log(`Selected: ${key}`)}>
          <Dropdown.Item id="new-file" textValue="New file">
            <div className="flex h-8 items-start justify-center pt-px">
              <Icon className="size-4 flex-shrink-0 text-muted" icon="gravity-ui:square-plus" />
            </div>
            <div className="flex flex-col">
              <Label>New file</Label>
              <Description>Create a new file</Description>
            </div>
            <Kbd className="ms-auto" slot="keyboard" variant="light">
              <Kbd.Abbr keyValue="command" />
              <Kbd.Content>N</Kbd.Content>
            </Kbd>
          </Dropdown.Item>
          <Dropdown.Item id="open-file" textValue="Open file">
            <div className="flex h-8 items-start justify-center pt-px">
              <Icon className="size-4 flex-shrink-0 text-muted" icon="gravity-ui:folder-open" />
            </div>
            <div className="flex flex-col">
              <Label>Open file</Label>
              <Description>Open an existing file</Description>
            </div>
            <Kbd className="ms-auto" slot="keyboard" variant="light">
              <Kbd.Abbr keyValue="command" />
              <Kbd.Content>O</Kbd.Content>
            </Kbd>
          </Dropdown.Item>
          <Dropdown.Item id="save-file" textValue="Save file">
            <div className="flex h-8 items-start justify-center pt-px">
              <Icon className="size-4 flex-shrink-0 text-muted" icon="gravity-ui:floppy-disk" />
            </div>
            <div className="flex flex-col">
              <Label>Save file</Label>
              <Description>Save the current file</Description>
            </div>
            <Kbd className="ms-auto" slot="keyboard" variant="light">
              <Kbd.Abbr keyValue="command" />
              <Kbd.Content>S</Kbd.Content>
            </Kbd>
          </Dropdown.Item>
          <Dropdown.Item id="delete-file" textValue="Delete file" variant="danger">
            <div className="flex h-8 items-start justify-center pt-px">
              <Icon className="size-4 flex-shrink-0 text-danger" icon="gravity-ui:trash-bin" />
            </div>
            <div className="flex flex-col">
              <Label>Delete file</Label>
              <Description>Move to trash</Description>
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
