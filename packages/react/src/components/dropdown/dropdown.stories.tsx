import type {Selection} from "@react-types/shared";
import type {Meta, StoryObj} from "@storybook/react";

import {Icon} from "@iconify/react";
import * as React from "react";

import {Button} from "../button";
import {Description} from "../description";
import {Header} from "../header";
import {Kbd} from "../kbd";
import {Label} from "../label";
import {Separator} from "../separator";

import {Dropdown} from "./index";

const meta: Meta<typeof Dropdown> = {
  component: Dropdown,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  title: "Components/Collections/Dropdown",
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

export const Default: Story = {
  render: () => (
    <Dropdown>
      <Button aria-label="Menu" variant="secondary">
        Actions
      </Button>
      <Dropdown.Content>
        <Dropdown.Menu onAction={(key) => alert(`Selected: ${key}`)}>
          <Dropdown.Section>
            <Header>Actions</Header>
            <Dropdown.Item id="new-file" textValue="New file">
              <div className="flex h-8 items-start justify-center pt-px">
                <Icon className="text-muted size-4 flex-shrink-0" icon="gravity-ui:square-plus" />
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
            <Dropdown.Item id="copy-link" textValue="Copy link">
              <div className="flex h-8 items-start justify-center pt-px">
                <Icon className="text-muted size-4 flex-shrink-0" icon="gravity-ui:square-plus" />
              </div>
              <div className="flex flex-col">
                <Label>Copy link</Label>
                <Description>Copy the file link</Description>
              </div>
              <Kbd className="ms-auto" slot="keyboard" variant="light">
                <Kbd.Abbr keyValue="command" />
                <Kbd.Content>C</Kbd.Content>
              </Kbd>
            </Dropdown.Item>
            <Dropdown.Item id="edit-file" textValue="Edit file">
              <div className="flex h-8 items-start justify-center pt-px">
                <Icon className="text-muted size-4 flex-shrink-0" icon="gravity-ui:pencil" />
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
                <Icon className="text-danger size-4 flex-shrink-0" icon="gravity-ui:trash-bin" />
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
      </Dropdown.Content>
    </Dropdown>
  ),
};

export const WithSections: Story = {
  render: () => (
    <Dropdown>
      <Dropdown.Trigger
        aria-label="Menu"
        className="button button-md button--secondary button--icon-only data-[focus-visible=true]:status-focused"
      >
        <Icon className="outline-none" icon="gravity-ui:ellipsis-vertical" />
      </Dropdown.Trigger>
      <Dropdown.Content className="min-w-[220px]">
        <Dropdown.Menu onAction={(key) => alert(`Selected: ${key}`)}>
          <Dropdown.Section>
            <Header>Actions</Header>
            <Dropdown.Item id="new-file" textValue="New file">
              <div className="flex h-8 items-start justify-center pt-px">
                <Icon className="text-muted size-4 flex-shrink-0" icon="gravity-ui:square-plus" />
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
                <Icon className="text-muted size-4 flex-shrink-0" icon="gravity-ui:pencil" />
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
                <Icon className="text-danger size-4 flex-shrink-0" icon="gravity-ui:trash-bin" />
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
      </Dropdown.Content>
    </Dropdown>
  ),
};

export const WithDisabledItems: Story = {
  render: () => (
    <Dropdown>
      <Button isIconOnly aria-label="Menu" variant="secondary">
        <Icon className="outline-none" icon="gravity-ui:bars" />
      </Button>
      <Dropdown.Content className="min-w-[220px]">
        <Dropdown.Menu disabledKeys={["delete-file"]} onAction={(key) => alert(`Selected: ${key}`)}>
          <Dropdown.Section>
            <Header>Actions</Header>
            <Dropdown.Item id="new-file" textValue="New file">
              <div className="flex h-8 items-start justify-center pt-px">
                <Icon className="text-muted size-4 flex-shrink-0" icon="gravity-ui:square-plus" />
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
                <Icon className="text-muted size-4 flex-shrink-0" icon="gravity-ui:pencil" />
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
                <Icon className="text-danger size-4 flex-shrink-0" icon="gravity-ui:trash-bin" />
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
      </Dropdown.Content>
    </Dropdown>
  ),
};

export const WithSingleSelection: Story = {
  render: () => (
    <Dropdown>
      <Button aria-label="Menu" variant="secondary">
        Styles
      </Button>
      <Dropdown.Content className="min-w-[256px]">
        <Dropdown.Menu
          selectionMode="single"
          // eslint-disable-next-line no-console
          onAction={(key) => console.log(`Selected: ${key}`)}
        >
          <Dropdown.Section>
            <Header>Text Style</Header>
            <Dropdown.Item id="bold" textValue="Bold">
              <Dropdown.ItemIndicator />
              <Label>Bold</Label>
              <Kbd className="ms-auto" slot="keyboard" variant="light">
                <Kbd.Abbr keyValue="command" />
                <Kbd.Content>B</Kbd.Content>
              </Kbd>
            </Dropdown.Item>
            <Dropdown.Item id="italic" textValue="Italic">
              <Dropdown.ItemIndicator />
              <Label>Italic</Label>
              <Kbd className="ms-auto" slot="keyboard" variant="light">
                <Kbd.Abbr keyValue="command" />
                <Kbd.Content>I</Kbd.Content>
              </Kbd>
            </Dropdown.Item>
            <Dropdown.Item id="underline" textValue="Underline">
              <Dropdown.ItemIndicator />
              <Label>Underline</Label>
              <Kbd className="ms-auto" slot="keyboard" variant="light">
                <Kbd.Abbr keyValue="command" />
                <Kbd.Content>U</Kbd.Content>
              </Kbd>
            </Dropdown.Item>
          </Dropdown.Section>
          <Separator />
          <Dropdown.Section>
            <Header>Text Alignment</Header>
            <Dropdown.Item id="left" textValue="Left">
              <Dropdown.ItemIndicator type="dot" />
              <Label>Left</Label>
              <Kbd className="ms-auto" slot="keyboard" variant="light">
                <Kbd.Abbr keyValue="alt" />
                <Kbd.Content>A</Kbd.Content>
              </Kbd>
            </Dropdown.Item>
            <Dropdown.Item id="center" textValue="Center">
              <Dropdown.ItemIndicator type="dot" />
              <Label>Center</Label>
              <Kbd className="ms-auto" slot="keyboard" variant="light">
                <Kbd.Abbr keyValue="alt" />
                <Kbd.Content>H</Kbd.Content>
              </Kbd>
            </Dropdown.Item>
            <Dropdown.Item id="right" textValue="Right">
              <Dropdown.ItemIndicator type="dot" />
              <Label>Right</Label>
              <Kbd className="ms-auto" slot="keyboard" variant="light">
                <Kbd.Abbr keyValue="alt" />
                <Kbd.Content>D</Kbd.Content>
              </Kbd>
            </Dropdown.Item>
          </Dropdown.Section>
        </Dropdown.Menu>
      </Dropdown.Content>
    </Dropdown>
  ),
};

export const WithMultipleSelection: Story = {
  render: () => (
    <Dropdown>
      <Button aria-label="Menu" variant="secondary">
        Styles
      </Button>
      <Dropdown.Content className="min-w-[256px]">
        <Dropdown.Menu
          defaultSelectedKeys={["bold", "italic", "left"]}
          selectionMode="multiple"
          // eslint-disable-next-line no-console
          onAction={(key) => console.log(`Selected: ${key}`)}
        >
          <Dropdown.Section>
            <Header>Text Style</Header>
            <Dropdown.Item id="bold" textValue="Bold">
              <Dropdown.ItemIndicator />
              <Label>Bold</Label>
              <Kbd className="ms-auto" slot="keyboard" variant="light">
                <Kbd.Abbr keyValue="command" />
                <Kbd.Content>B</Kbd.Content>
              </Kbd>
            </Dropdown.Item>
            <Dropdown.Item id="italic" textValue="Italic">
              <Dropdown.ItemIndicator />
              <Label>Italic</Label>
              <Kbd className="ms-auto" slot="keyboard" variant="light">
                <Kbd.Abbr keyValue="command" />
                <Kbd.Content>I</Kbd.Content>
              </Kbd>
            </Dropdown.Item>
            <Dropdown.Item id="underline" textValue="Underline">
              <Dropdown.ItemIndicator />
              <Label>Underline</Label>
              <Kbd className="ms-auto" slot="keyboard" variant="light">
                <Kbd.Abbr keyValue="command" />
                <Kbd.Content>U</Kbd.Content>
              </Kbd>
            </Dropdown.Item>
          </Dropdown.Section>
          <Separator />
          <Dropdown.Section>
            <Header>Text Alignment</Header>
            <Dropdown.Item id="left" textValue="Left">
              <Dropdown.ItemIndicator type="dot" />
              <Label>Left</Label>
              <Kbd className="ms-auto" slot="keyboard" variant="light">
                <Kbd.Abbr keyValue="alt" />
                <Kbd.Content>A</Kbd.Content>
              </Kbd>
            </Dropdown.Item>
            <Dropdown.Item id="center" textValue="Center">
              <Dropdown.ItemIndicator type="dot" />
              <Label>Center</Label>
              <Kbd className="ms-auto" slot="keyboard" variant="light">
                <Kbd.Abbr keyValue="alt" />
                <Kbd.Content>H</Kbd.Content>
              </Kbd>
            </Dropdown.Item>
            <Dropdown.Item id="right" textValue="Right">
              <Dropdown.ItemIndicator type="dot" />
              <Label>Right</Label>
              <Kbd className="ms-auto" slot="keyboard" variant="light">
                <Kbd.Abbr keyValue="alt" />
                <Kbd.Content>D</Kbd.Content>
              </Kbd>
            </Dropdown.Item>
          </Dropdown.Section>
        </Dropdown.Menu>
      </Dropdown.Content>
    </Dropdown>
  ),
};

// ------
// TODO:
// ------

export const WithKeyboardShortcuts: Story = {
  render: () => (
    <Dropdown>
      <Button aria-label="Menu" variant="secondary">
        Actions
      </Button>
      <Dropdown.Content>
        <Dropdown.Menu onAction={(key) => alert(`Selected: ${key}`)}>
          <Dropdown.Item id="new" textValue="New">
            <Label>New</Label>
            <Kbd className="ms-auto" slot="keyboard" variant="light">
              <Kbd.Abbr keyValue="command" />
              <Kbd.Content>N</Kbd.Content>
            </Kbd>
          </Dropdown.Item>
          <Dropdown.Item id="open" textValue="Open">
            <Label>Open</Label>
            <Kbd className="ms-auto" slot="keyboard" variant="light">
              <Kbd.Abbr keyValue="command" />
              <Kbd.Content>O</Kbd.Content>
            </Kbd>
          </Dropdown.Item>
          <Dropdown.Item id="save" textValue="Save">
            <Label>Save</Label>
            <Kbd className="ms-auto" slot="keyboard" variant="light">
              <Kbd.Abbr keyValue="command" />
              <Kbd.Content>S</Kbd.Content>
            </Kbd>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Content>
    </Dropdown>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <Dropdown>
      <Button aria-label="Menu" variant="secondary">
        Actions
      </Button>
      <Dropdown.Content>
        <Dropdown.Menu onAction={(key) => alert(`Selected: ${key}`)}>
          <Dropdown.Item id="new" textValue="New">
            <div className="flex h-8 items-start justify-center pt-px">
              <Icon className="text-muted size-4 flex-shrink-0" icon="gravity-ui:square-plus" />
            </div>
            <Label>New file</Label>
          </Dropdown.Item>
          <Dropdown.Item id="open" textValue="Open">
            <div className="flex h-8 items-start justify-center pt-px">
              <Icon className="text-muted size-4 flex-shrink-0" icon="gravity-ui:folder-open" />
            </div>
            <Label>Open file</Label>
          </Dropdown.Item>
          <Dropdown.Item id="save" textValue="Save">
            <div className="flex h-8 items-start justify-center pt-px">
              <Icon className="text-muted size-4 flex-shrink-0" icon="gravity-ui:floppy-disk" />
            </div>
            <Label>Save file</Label>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Content>
    </Dropdown>
  ),
};

export const WithDescriptions: Story = {
  render: () => (
    <Dropdown>
      <Button aria-label="Menu" variant="secondary">
        Actions
      </Button>
      <Dropdown.Content>
        <Dropdown.Menu onAction={(key) => alert(`Selected: ${key}`)}>
          <Dropdown.Item id="new" textValue="New file">
            <Label>New file</Label>
            <Description>Create a new file</Description>
          </Dropdown.Item>
          <Dropdown.Item id="open" textValue="Open file">
            <Label>Open file</Label>
            <Description>Open an existing file</Description>
          </Dropdown.Item>
          <Dropdown.Item id="save" textValue="Save file">
            <Label>Save file</Label>
            <Description>Save the current file</Description>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Content>
    </Dropdown>
  ),
};

export const WithLinks: Story = {
  render: () => (
    <Dropdown>
      <Button aria-label="Menu" variant="secondary">
        Actions
      </Button>
      <Dropdown.Content>
        <Dropdown.Menu onAction={(key) => alert(`Selected: ${key}`)}>
          <Dropdown.Item href="/" id="home" textValue="Home">
            <Label>Home</Label>
          </Dropdown.Item>
          <Dropdown.Item href="/about" id="about" textValue="About">
            <Label>About</Label>
          </Dropdown.Item>
          <Dropdown.Item href="/contact" id="contact" textValue="Contact">
            <Label>Contact</Label>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Content>
    </Dropdown>
  ),
};

export const WithSubmenus: Story = {
  render: () => (
    <Dropdown>
      <Button aria-label="Menu" variant="secondary">
        Actions
      </Button>
      <Dropdown.Content>
        <Dropdown.Menu onAction={(key) => alert(`Selected: ${key}`)}>
          <Dropdown.Item id="new" textValue="New">
            <Label>New</Label>
          </Dropdown.Item>
          <Dropdown.Item id="open" textValue="Open">
            <Label>Open</Label>
          </Dropdown.Item>
          <Dropdown.SubmenuTrigger>
            <Dropdown.Item id="share" textValue="Share">
              <Label>Share</Label>
            </Dropdown.Item>
            <Dropdown.Content>
              <Dropdown.Menu>
                <Dropdown.Item id="email" textValue="Email">
                  <Label>Email</Label>
                </Dropdown.Item>
                <Dropdown.Item id="twitter" textValue="Twitter">
                  <Label>Twitter</Label>
                </Dropdown.Item>
                <Dropdown.Item id="facebook" textValue="Facebook">
                  <Label>Facebook</Label>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Content>
          </Dropdown.SubmenuTrigger>
          <Dropdown.Item id="delete" textValue="Delete">
            <Label>Delete</Label>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Content>
    </Dropdown>
  ),
};

export const DangerItems: Story = {
  render: () => (
    <Dropdown>
      <Button aria-label="Menu" variant="secondary">
        Actions
      </Button>
      <Dropdown.Content>
        <Dropdown.Menu onAction={(key) => alert(`Selected: ${key}`)}>
          <Dropdown.Item id="edit" textValue="Edit">
            <Label>Edit</Label>
          </Dropdown.Item>
          <Dropdown.Item id="duplicate" textValue="Duplicate">
            <Label>Duplicate</Label>
          </Dropdown.Item>
          <Dropdown.Item id="delete" textValue="Delete" variant="danger">
            <div className="flex h-8 items-start justify-center pt-px">
              <Icon className="text-danger size-4 flex-shrink-0" icon="gravity-ui:trash-bin" />
            </div>
            <Label>Delete</Label>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Content>
    </Dropdown>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<Selection>(new Set(["bold"]));

    const selectedItems = Array.from(selected);

    return (
      <div className="space-y-4">
        <Dropdown>
          <Button aria-label="Menu" variant="secondary">
            Actions
          </Button>
          <Dropdown.Content>
            <Dropdown.Menu
              selectedKeys={selected}
              selectionMode="multiple"
              onAction={(key) => alert(`Selected: ${key}`)}
              onSelectionChange={setSelected}
            >
              <Dropdown.Item id="bold" textValue="Bold">
                <Label>Bold</Label>
                <Dropdown.ItemIndicator />
              </Dropdown.Item>
              <Dropdown.Item id="italic" textValue="Italic">
                <Label>Italic</Label>
                <Dropdown.ItemIndicator />
              </Dropdown.Item>
              <Dropdown.Item id="underline" textValue="Underline">
                <Label>Underline</Label>
                <Dropdown.ItemIndicator />
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown.Content>
        </Dropdown>
        <p className="text-sm text-neutral-500">
          Selected: {selectedItems.length > 0 ? selectedItems.join(", ") : "None"}
        </p>
      </div>
    );
  },
};
