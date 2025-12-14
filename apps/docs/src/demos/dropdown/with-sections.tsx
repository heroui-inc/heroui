"use client";

import {EllipsisVertical, Pencil, SquarePlus, TrashBin} from "@gravity-ui/icons";
import {Description, Dropdown, Header, Kbd, Label, Separator} from "@heroui/react";

export function WithSections() {
  return (
    <Dropdown>
      <Dropdown.Trigger
        aria-label="Menu"
        className="button button-md button--secondary button--icon-only data-[focus-visible=true]:status-focused"
      >
        <EllipsisVertical className="outline-none" />
      </Dropdown.Trigger>
      <Dropdown.Popover>
        <Dropdown.Menu onAction={(key) => console.log(`Selected: ${key}`)}>
          <Dropdown.Section>
            <Header>Actions</Header>
            <Dropdown.Item id="new-file" textValue="New file">
              <div className="flex h-8 items-start justify-center pt-px">
                <SquarePlus className="size-4 flex-shrink-0 text-muted" />
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
            <Dropdown.Item id="edit-file" textValue="Edit file">
              <div className="flex h-8 items-start justify-center pt-px">
                <Pencil className="size-4 flex-shrink-0 text-muted" />
              </div>
              <div className="flex flex-col">
                <Label>Edit file</Label>
                <Description>Make changes</Description>
              </div>
              <Kbd className="ms-auto" slot="keyboard" variant="light">
                <Kbd.Abbr keyValue="command" />
                <Kbd.Content>E</Kbd.Content>
              </Kbd>
            </Dropdown.Item>
          </Dropdown.Section>
          <Separator />
          <Dropdown.Section>
            <Header>Danger zone</Header>
            <Dropdown.Item id="delete-file" textValue="Delete file" variant="danger">
              <div className="flex h-8 items-start justify-center pt-px">
                <TrashBin className="size-4 flex-shrink-0 text-danger" />
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
          </Dropdown.Section>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
}
