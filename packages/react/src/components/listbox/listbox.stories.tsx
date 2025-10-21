import type {Meta, StoryObj} from "@storybook/react";

import {Icon} from "@iconify/react";
import * as React from "react";

import {Avatar, AvatarFallback, AvatarImage} from "../avatar";

import {ListBox, ListBoxItem, ListBoxItemIndicator} from "./index";

const meta: Meta<typeof ListBox> = {
  component: ListBox,
  parameters: {
    layout: "centered",
  },
  title: "📝 ToDo/ListBox",
};

export default meta;
type Story = StoryObj<typeof ListBox>;

export const Default: Story = {
  render: () => (
    <ListBox aria-label="Users" selectionMode="single">
      <ListBoxItem id="1" textValue="Bob">
        <Avatar size="sm">
          <AvatarImage src="https://i.pravatar.cc/150?u=bob" />
          <AvatarFallback>B</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-sm font-medium">Bob</span>
          <span className="text-xs text-neutral-500">bob@email.com</span>
        </div>
        <Icon className="ms-auto size-4 text-neutral-500" icon="gravity-ui:comment" />
      </ListBoxItem>
      <ListBoxItem id="2" textValue="Fred">
        <Avatar size="sm">
          <AvatarImage src="https://i.pravatar.cc/150?u=fred" />
          <AvatarFallback>F</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-sm font-medium">Fred</span>
          <span className="text-xs text-neutral-500">fred@email.com</span>
        </div>
        <Icon className="ms-auto size-4 text-neutral-500" icon="gravity-ui:comment" />
      </ListBoxItem>
      <ListBoxItem id="3" textValue="Martha">
        <Avatar size="sm">
          <AvatarImage src="https://i.pravatar.cc/150?u=martha" />
          <AvatarFallback>M</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-sm font-medium">Martha</span>
          <span className="text-xs text-neutral-500">martha@email.com</span>
        </div>
        <Icon className="ms-auto size-4 text-neutral-500" icon="gravity-ui:comment" />
      </ListBoxItem>
    </ListBox>
  ),
};

export const DangerVariant: Story = {
  render: () => (
    <ListBox aria-label="Delete users" selectionMode="single" variant="danger">
      <ListBoxItem id="1" textValue="Bob">
        <Avatar size="sm">
          <AvatarImage src="https://i.pravatar.cc/150?u=bob" />
          <AvatarFallback>B</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-sm font-medium">Bob</span>
          <span className="text-xs text-neutral-500">bob@email.com</span>
        </div>
        <Icon className="ms-auto size-4 text-neutral-500" icon="gravity-ui:trash-bin" />
      </ListBoxItem>
      <ListBoxItem id="2" textValue="Fred">
        <Avatar size="sm">
          <AvatarImage src="https://i.pravatar.cc/150?u=fred" />
          <AvatarFallback>F</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-sm font-medium">Fred</span>
          <span className="text-xs text-neutral-500">fred@email.com</span>
        </div>
        <Icon className="ms-auto size-4 text-neutral-500" icon="gravity-ui:trash-bin" />
      </ListBoxItem>
      <ListBoxItem id="3" textValue="Martha">
        <Avatar size="sm">
          <AvatarImage src="https://i.pravatar.cc/150?u=martha" />
          <AvatarFallback>M</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-sm font-medium">Martha</span>
          <span className="text-xs text-neutral-500">martha@email.com</span>
        </div>
        <Icon className="ms-auto size-4 text-neutral-500" icon="gravity-ui:trash-bin" />
      </ListBoxItem>
    </ListBox>
  ),
};

export const WithDisabledItems: Story = {
  render: () => (
    <ListBox aria-label="Users" selectionMode="single">
      <ListBoxItem id="1" textValue="Bob">
        <Avatar size="sm">
          <AvatarImage src="https://i.pravatar.cc/150?u=bob" />
          <AvatarFallback>B</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-sm font-medium">Bob</span>
          <span className="text-xs text-neutral-500">bob@email.com</span>
        </div>
        <Icon className="ms-auto size-4 text-neutral-500" icon="gravity-ui:comment" />
      </ListBoxItem>
      <ListBoxItem isDisabled id="2" textValue="Fred">
        <Avatar size="sm">
          <AvatarImage src="https://i.pravatar.cc/150?u=fred" />
          <AvatarFallback>F</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-sm font-medium">Fred</span>
          <span className="text-xs text-neutral-500">fred@email.com</span>
        </div>
        <Icon className="ms-auto size-4 text-neutral-500" icon="gravity-ui:comment" />
      </ListBoxItem>
      <ListBoxItem id="3" textValue="Martha">
        <Avatar size="sm">
          <AvatarImage src="https://i.pravatar.cc/150?u=martha" />
          <AvatarFallback>M</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-sm font-medium">Martha</span>
          <span className="text-xs text-neutral-500">martha@email.com</span>
        </div>
        <Icon className="ms-auto size-4 text-neutral-500" icon="gravity-ui:comment" />
      </ListBoxItem>
    </ListBox>
  ),
};

export const MultiSelect: Story = {
  render: () => (
    <ListBox aria-label="Select team members" selectionMode="multiple">
      <ListBoxItem id="1" textValue="Bob">
        <Avatar size="sm">
          <AvatarImage src="https://i.pravatar.cc/150?u=bob" />
          <AvatarFallback>B</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-sm font-medium">Bob</span>
          <span className="text-xs text-neutral-500">bob@email.com</span>
        </div>
      </ListBoxItem>
      <ListBoxItem id="2" textValue="Fred">
        <Avatar size="sm">
          <AvatarImage src="https://i.pravatar.cc/150?u=fred" />
          <AvatarFallback>F</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-sm font-medium">Fred</span>
          <span className="text-xs text-neutral-500">fred@email.com</span>
        </div>
      </ListBoxItem>
      <ListBoxItem id="3" textValue="Martha">
        <Avatar size="sm">
          <AvatarImage src="https://i.pravatar.cc/150?u=martha" />
          <AvatarFallback>M</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-sm font-medium">Martha</span>
          <span className="text-xs text-neutral-500">martha@email.com</span>
        </div>
      </ListBoxItem>
      <ListBoxItem id="4" textValue="Sarah">
        <Avatar size="sm">
          <AvatarImage src="https://i.pravatar.cc/150?u=sarah" />
          <AvatarFallback>S</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-sm font-medium">Sarah</span>
          <span className="text-xs text-neutral-500">sarah@email.com</span>
        </div>
      </ListBoxItem>
    </ListBox>
  ),
};

export const SimpleList: Story = {
  render: () => (
    <ListBox aria-label="Options" selectionMode="single">
      <ListBoxItem id="new">New file</ListBoxItem>
      <ListBoxItem id="open">Open</ListBoxItem>
      <ListBoxItem id="save">Save</ListBoxItem>
      <ListBoxItem id="save-as">Save as...</ListBoxItem>
      <ListBoxItem isDisabled id="print">
        Print
      </ListBoxItem>
      <ListBoxItem id="exit">Exit</ListBoxItem>
    </ListBox>
  ),
};

export const CustomCheckIcon: Story = {
  render: () => (
    <ListBox aria-label="Options with custom check" selectionMode="single">
      <ListBoxItem id="new">
        {({isSelected}) => (
          <>
            New file
            <ListBoxItemIndicator isSelected={isSelected}>
              <Icon className="size-4" icon="gravity-ui:check" />
            </ListBoxItemIndicator>
          </>
        )}
      </ListBoxItem>
      <ListBoxItem id="open">
        {({isSelected}) => (
          <>
            Open
            <ListBoxItemIndicator isSelected={isSelected}>
              <Icon className="size-4" icon="gravity-ui:check" />
            </ListBoxItemIndicator>
          </>
        )}
      </ListBoxItem>
      <ListBoxItem id="save">
        {({isSelected}) => (
          <>
            Save
            <ListBoxItemIndicator isSelected={isSelected}>
              <Icon className="size-4" icon="gravity-ui:check" />
            </ListBoxItemIndicator>
          </>
        )}
      </ListBoxItem>
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
          selectedKeys={selected as unknown as Iterable<string>}
          selectionMode="single"
          onSelectionChange={(keys) => setSelected(new Set(keys))}
        >
          <ListBoxItem id="1" textValue="Bob">
            <Avatar size="sm">
              <AvatarImage src="https://i.pravatar.cc/150?u=bob" />
              <AvatarFallback>B</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">Bob</span>
              <span className="text-xs text-neutral-500">bob@email.com</span>
            </div>
          </ListBoxItem>
          <ListBoxItem id="2" textValue="Fred">
            <Avatar size="sm">
              <AvatarImage src="https://i.pravatar.cc/150?u=fred" />
              <AvatarFallback>F</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">Fred</span>
              <span className="text-xs text-neutral-500">fred@email.com</span>
            </div>
          </ListBoxItem>
          <ListBoxItem id="3" textValue="Martha">
            <Avatar size="sm">
              <AvatarImage src="https://i.pravatar.cc/150?u=martha" />
              <AvatarFallback>M</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">Martha</span>
              <span className="text-xs text-neutral-500">martha@email.com</span>
            </div>
          </ListBoxItem>
        </ListBox>
        <p className="text-sm text-neutral-500">
          Selected: {selected.size > 0 ? Array.from(selected).join(", ") : "None"}
        </p>
      </div>
    );
  },
};
