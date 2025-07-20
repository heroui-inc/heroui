import type {Meta, StoryObj} from "@storybook/react";

import {Icon} from "@iconify/react";
import * as React from "react";

import {Avatar} from "../avatar";

import * as ListBox from "./listbox";

const meta: Meta<typeof ListBox> = {
  title: "Components/ListBox",
  component: ListBox,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof ListBox>;

export const Default: Story = {
  render: () => (
    <ListBox aria-label="Users" selectionMode="single">
      <ListBox.Item id="1" textValue="Bob">
        <Avatar.Root size="sm">
          <Avatar.Image src="https://i.pravatar.cc/150?u=bob" />
          <Avatar.Fallback>B</Avatar.Fallback>
        </Avatar.Root>
        <div className="flex flex-col">
          <span className="text-sm font-medium">Bob</span>
          <span className="text-xs text-neutral-500">bob@email.com</span>
        </div>
        <Icon className="ms-auto size-4 text-neutral-500" icon="gravity-ui:comment" />
      </ListBox.Item>
      <ListBox.Item id="2" textValue="Fred">
        <Avatar.Root size="sm">
          <Avatar.Image src="https://i.pravatar.cc/150?u=fred" />
          <Avatar.Fallback>F</Avatar.Fallback>
        </Avatar.Root>
        <div className="flex flex-col">
          <span className="text-sm font-medium">Fred</span>
          <span className="text-xs text-neutral-500">fred@email.com</span>
        </div>
        <Icon className="ms-auto size-4 text-neutral-500" icon="gravity-ui:comment" />
      </ListBox.Item>
      <ListBox.Item id="3" textValue="Martha">
        <Avatar.Root size="sm">
          <Avatar.Image src="https://i.pravatar.cc/150?u=martha" />
          <Avatar.Fallback>M</Avatar.Fallback>
        </Avatar.Root>
        <div className="flex flex-col">
          <span className="text-sm font-medium">Martha</span>
          <span className="text-xs text-neutral-500">martha@email.com</span>
        </div>
        <Icon className="ms-auto size-4 text-neutral-500" icon="gravity-ui:comment" />
      </ListBox.Item>
    </ListBox>
  ),
};

export const DangerVariant: Story = {
  render: () => (
    <ListBox aria-label="Delete users" selectionMode="single" variant="danger">
      <ListBox.Item id="1" textValue="Bob">
        <Avatar.Root size="sm">
          <Avatar.Image src="https://i.pravatar.cc/150?u=bob" />
          <Avatar.Fallback>B</Avatar.Fallback>
        </Avatar.Root>
        <div className="flex flex-col">
          <span className="text-sm font-medium">Bob</span>
          <span className="text-xs text-neutral-500">bob@email.com</span>
        </div>
        <Icon className="ms-auto size-4 text-neutral-500" icon="gravity-ui:trash-bin" />
      </ListBox.Item>
      <ListBox.Item id="2" textValue="Fred">
        <Avatar.Root size="sm">
          <Avatar.Image src="https://i.pravatar.cc/150?u=fred" />
          <Avatar.Fallback>F</Avatar.Fallback>
        </Avatar.Root>
        <div className="flex flex-col">
          <span className="text-sm font-medium">Fred</span>
          <span className="text-xs text-neutral-500">fred@email.com</span>
        </div>
        <Icon className="ms-auto size-4 text-neutral-500" icon="gravity-ui:trash-bin" />
      </ListBox.Item>
      <ListBox.Item id="3" textValue="Martha">
        <Avatar.Root size="sm">
          <Avatar.Image src="https://i.pravatar.cc/150?u=martha" />
          <Avatar.Fallback>M</Avatar.Fallback>
        </Avatar.Root>
        <div className="flex flex-col">
          <span className="text-sm font-medium">Martha</span>
          <span className="text-xs text-neutral-500">martha@email.com</span>
        </div>
        <Icon className="ms-auto size-4 text-neutral-500" icon="gravity-ui:trash-bin" />
      </ListBox.Item>
    </ListBox>
  ),
};

export const WithDisabledItems: Story = {
  render: () => (
    <ListBox aria-label="Users" selectionMode="single">
      <ListBox.Item id="1" textValue="Bob">
        <Avatar.Root size="sm">
          <Avatar.Image src="https://i.pravatar.cc/150?u=bob" />
          <Avatar.Fallback>B</Avatar.Fallback>
        </Avatar.Root>
        <div className="flex flex-col">
          <span className="text-sm font-medium">Bob</span>
          <span className="text-xs text-neutral-500">bob@email.com</span>
        </div>
        <Icon className="ms-auto size-4 text-neutral-500" icon="gravity-ui:comment" />
      </ListBox.Item>
      <ListBox.Item isDisabled id="2" textValue="Fred">
        <Avatar.Root size="sm">
          <Avatar.Image src="https://i.pravatar.cc/150?u=fred" />
          <Avatar.Fallback>F</Avatar.Fallback>
        </Avatar.Root>
        <div className="flex flex-col">
          <span className="text-sm font-medium">Fred</span>
          <span className="text-xs text-neutral-500">fred@email.com</span>
        </div>
        <Icon className="ms-auto size-4 text-neutral-500" icon="gravity-ui:comment" />
      </ListBox.Item>
      <ListBox.Item id="3" textValue="Martha">
        <Avatar.Root size="sm">
          <Avatar.Image src="https://i.pravatar.cc/150?u=martha" />
          <Avatar.Fallback>M</Avatar.Fallback>
        </Avatar.Root>
        <div className="flex flex-col">
          <span className="text-sm font-medium">Martha</span>
          <span className="text-xs text-neutral-500">martha@email.com</span>
        </div>
        <Icon className="ms-auto size-4 text-neutral-500" icon="gravity-ui:comment" />
      </ListBox.Item>
    </ListBox>
  ),
};

export const MultiSelect: Story = {
  render: () => (
    <ListBox aria-label="Select team members" selectionMode="multiple">
      <ListBox.Item id="1" textValue="Bob">
        <Avatar.Root size="sm">
          <Avatar.Image src="https://i.pravatar.cc/150?u=bob" />
          <Avatar.Fallback>B</Avatar.Fallback>
        </Avatar.Root>
        <div className="flex flex-col">
          <span className="text-sm font-medium">Bob</span>
          <span className="text-xs text-neutral-500">bob@email.com</span>
        </div>
      </ListBox.Item>
      <ListBox.Item id="2" textValue="Fred">
        <Avatar.Root size="sm">
          <Avatar.Image src="https://i.pravatar.cc/150?u=fred" />
          <Avatar.Fallback>F</Avatar.Fallback>
        </Avatar.Root>
        <div className="flex flex-col">
          <span className="text-sm font-medium">Fred</span>
          <span className="text-xs text-neutral-500">fred@email.com</span>
        </div>
      </ListBox.Item>
      <ListBox.Item id="3" textValue="Martha">
        <Avatar.Root size="sm">
          <Avatar.Image src="https://i.pravatar.cc/150?u=martha" />
          <Avatar.Fallback>M</Avatar.Fallback>
        </Avatar.Root>
        <div className="flex flex-col">
          <span className="text-sm font-medium">Martha</span>
          <span className="text-xs text-neutral-500">martha@email.com</span>
        </div>
      </ListBox.Item>
      <ListBox.Item id="4" textValue="Sarah">
        <Avatar.Root size="sm">
          <Avatar.Image src="https://i.pravatar.cc/150?u=sarah" />
          <Avatar.Fallback>S</Avatar.Fallback>
        </Avatar.Root>
        <div className="flex flex-col">
          <span className="text-sm font-medium">Sarah</span>
          <span className="text-xs text-neutral-500">sarah@email.com</span>
        </div>
      </ListBox.Item>
    </ListBox>
  ),
};

export const SimpleList: Story = {
  render: () => (
    <ListBox aria-label="Options" selectionMode="single">
      <ListBox.Item id="new">New file</ListBox.Item>
      <ListBox.Item id="open">Open</ListBox.Item>
      <ListBox.Item id="save">Save</ListBox.Item>
      <ListBox.Item id="save-as">Save as...</ListBox.Item>
      <ListBox.Item isDisabled id="print">
        Print
      </ListBox.Item>
      <ListBox.Item id="exit">Exit</ListBox.Item>
    </ListBox>
  ),
};

export const CustomCheckIcon: Story = {
  render: () => (
    <ListBox aria-label="Options with custom check" selectionMode="single">
      <ListBox.Item id="new">
        {({isSelected}) => (
          <>
            New file
            <ListBox.ItemIndicator isSelected={isSelected}>
              <Icon className="size-4" icon="gravity-ui:check" />
            </ListBox.ItemIndicator>
          </>
        )}
      </ListBox.Item>
      <ListBox.Item id="open">
        {({isSelected}) => (
          <>
            Open
            <ListBox.ItemIndicator isSelected={isSelected}>
              <Icon className="size-4" icon="gravity-ui:check" />
            </ListBox.ItemIndicator>
          </>
        )}
      </ListBox.Item>
      <ListBox.Item id="save">
        {({isSelected}) => (
          <>
            Save
            <ListBox.ItemIndicator isSelected={isSelected}>
              <Icon className="size-4" icon="gravity-ui:check" />
            </ListBox.ItemIndicator>
          </>
        )}
      </ListBox.Item>
    </ListBox>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<Set<React.Key>>(new Set(["2"]));

    return (
      <div className="space-y-4">
        <ListBox
          aria-label="Users"
          selectedKeys={selected}
          selectionMode="single"
          onSelectionChange={setSelected}
        >
          <ListBox.Item id="1" textValue="Bob">
            <Avatar.Root size="sm">
              <Avatar.Image src="https://i.pravatar.cc/150?u=bob" />
              <Avatar.Fallback>B</Avatar.Fallback>
            </Avatar.Root>
            <div className="flex flex-col">
              <span className="text-sm font-medium">Bob</span>
              <span className="text-xs text-neutral-500">bob@email.com</span>
            </div>
          </ListBox.Item>
          <ListBox.Item id="2" textValue="Fred">
            <Avatar.Root size="sm">
              <Avatar.Image src="https://i.pravatar.cc/150?u=fred" />
              <Avatar.Fallback>F</Avatar.Fallback>
            </Avatar.Root>
            <div className="flex flex-col">
              <span className="text-sm font-medium">Fred</span>
              <span className="text-xs text-neutral-500">fred@email.com</span>
            </div>
          </ListBox.Item>
          <ListBox.Item id="3" textValue="Martha">
            <Avatar.Root size="sm">
              <Avatar.Image src="https://i.pravatar.cc/150?u=martha" />
              <Avatar.Fallback>M</Avatar.Fallback>
            </Avatar.Root>
            <div className="flex flex-col">
              <span className="text-sm font-medium">Martha</span>
              <span className="text-xs text-neutral-500">martha@email.com</span>
            </div>
          </ListBox.Item>
        </ListBox>
        <p className="text-sm text-neutral-500">
          Selected: {selected.size > 0 ? Array.from(selected).join(", ") : "None"}
        </p>
      </div>
    );
  },
};
