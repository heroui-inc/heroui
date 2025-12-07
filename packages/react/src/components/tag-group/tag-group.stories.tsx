import type {Key} from "../";
import type {Meta, StoryObj} from "@storybook/react";

import {Icon} from "@iconify/react";
import React, {useState} from "react";

import {Avatar, Description, EmptyState, ErrorMessage, Label, Surface, Tag} from "../";
import {useListData} from "../../";

import {TagGroup} from "./";

const meta: Meta<typeof TagGroup> = {
  component: TagGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  title: "Components/Collections/TagGroup",
};

export default meta;

type Story = StoryObj<typeof TagGroup>;

export const Default: Story = {
  render: () => (
    <TagGroup>
      <Label>Categories</Label>
      <TagGroup.List>
        <Tag>News</Tag>
        <Tag>Travel</Tag>
        <Tag>Gaming</Tag>
        <Tag>Shopping</Tag>
      </TagGroup.List>
      <Description>Select categories that interest you</Description>
    </TagGroup>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <TagGroup size="sm">
        <Label>Small</Label>
        <TagGroup.List>
          <Tag>News</Tag>
          <Tag>Travel</Tag>
          <Tag>Gaming</Tag>
        </TagGroup.List>
      </TagGroup>
      <TagGroup size="md">
        <Label>Medium</Label>
        <TagGroup.List>
          <Tag>News</Tag>
          <Tag>Travel</Tag>
          <Tag>Gaming</Tag>
        </TagGroup.List>
      </TagGroup>
      <TagGroup size="lg">
        <Label>Large</Label>
        <TagGroup.List>
          <Tag>News</Tag>
          <Tag>Travel</Tag>
          <Tag>Gaming</Tag>
        </TagGroup.List>
      </TagGroup>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <TagGroup>
        <Label>Disabled Tags</Label>
        <TagGroup.List>
          <Tag isDisabled>News</Tag>
          <Tag>Travel</Tag>
          <Tag isDisabled>Gaming</Tag>
        </TagGroup.List>
        <Description>Some tags are disabled</Description>
      </TagGroup>

      <TagGroup disabledKeys={["travel"]}>
        <Label>Disabled Keys</Label>
        <TagGroup.List>
          <Tag id="news">News</Tag>
          <Tag id="travel">Travel</Tag>
          <Tag id="gaming">Gaming</Tag>
        </TagGroup.List>
        <Description>Tags disabled via disabledKeys prop</Description>
      </TagGroup>
    </div>
  ),
};

export const SelectionModes: Story = {
  render: () => {
    const [singleSelected, setSingleSelected] = useState<Iterable<Key>>(new Set(["news"]));
    const [multipleSelected, setMultipleSelected] = useState<Iterable<Key>>(
      new Set(["news", "travel"]),
    );

    return (
      <div className="flex flex-col gap-8">
        <TagGroup
          selectedKeys={singleSelected}
          selectionMode="single"
          onSelectionChange={(keys) => setSingleSelected(keys)}
        >
          <Label>Single Selection</Label>
          <TagGroup.List>
            <Tag id="news">News</Tag>
            <Tag id="travel">Travel</Tag>
            <Tag id="gaming">Gaming</Tag>
            <Tag id="shopping">Shopping</Tag>
          </TagGroup.List>
          <Description>Choose one category</Description>
        </TagGroup>

        <TagGroup
          selectedKeys={multipleSelected}
          selectionMode="multiple"
          onSelectionChange={(keys) => setMultipleSelected(keys)}
        >
          <Label>Multiple Selection</Label>
          <TagGroup.List>
            <Tag id="news">News</Tag>
            <Tag id="travel">Travel</Tag>
            <Tag id="gaming">Gaming</Tag>
            <Tag id="shopping">Shopping</Tag>
          </TagGroup.List>
          <Description>Choose multiple categories</Description>
        </TagGroup>
      </div>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const [selected, setSelected] = useState<Iterable<Key>>(new Set(["news", "travel"]));

    return (
      <div className="flex flex-col gap-3">
        <TagGroup
          selectedKeys={selected}
          selectionMode="multiple"
          onSelectionChange={(keys) => setSelected(keys)}
        >
          <Label>Categories (controlled)</Label>
          <TagGroup.List>
            <Tag id="news">News</Tag>
            <Tag id="travel">Travel</Tag>
            <Tag id="gaming">Gaming</Tag>
            <Tag id="shopping">Shopping</Tag>
          </TagGroup.List>
        </TagGroup>
        <p className="text-muted text-sm">
          Selected: {Array.from(selected).length > 0 ? Array.from(selected).join(", ") : "None"}
        </p>
      </div>
    );
  },
};

export const OnSurface: Story = {
  render: () => (
    <div className="bg-surface w-sm flex items-center justify-center rounded-3xl p-4">
      <Surface className="w-full">
        <TagGroup>
          <Label>On Surface</Label>
          <TagGroup.List>
            <Tag isOnSurface>News</Tag>
            <Tag isOnSurface>Travel</Tag>
            <Tag isOnSurface>Gaming</Tag>
          </TagGroup.List>
          <Description>Tags on surface component</Description>
        </TagGroup>
      </Surface>
    </div>
  ),
};

export const WithErrorMessage: Story = {
  render: () => {
    const [selected, setSelected] = useState<Iterable<Key>>(new Set());

    const isInvalid = Array.from(selected).length === 0;

    return (
      <TagGroup
        selectedKeys={selected}
        selectionMode="multiple"
        onSelectionChange={(keys) => setSelected(keys)}
      >
        <Label>Required Categories</Label>
        <TagGroup.List>
          <Tag id="news">News</Tag>
          <Tag id="travel">Travel</Tag>
          <Tag id="gaming">Gaming</Tag>
          <Tag id="shopping">Shopping</Tag>
        </TagGroup.List>
        <Description>Select at least one category</Description>
        {!!isInvalid && <ErrorMessage>Please select at least one category</ErrorMessage>}
      </TagGroup>
    );
  },
};

export const WithPrefix: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <TagGroup>
        <Label>With Icons</Label>
        <TagGroup.List>
          <Tag>
            <Icon icon="gravity-ui:newspaper" />
            News
          </Tag>
          <Tag>
            Travel
            <Icon icon="gravity-ui:plane" />
          </Tag>
          <Tag>
            <Icon icon="gravity-ui:gamepad" />
            Gaming
          </Tag>
          <Tag>
            <Icon icon="gravity-ui:cart" />
            Shopping
          </Tag>
        </TagGroup.List>
        <Description>Tags with icons</Description>
      </TagGroup>

      <TagGroup>
        <Label>With Avatars</Label>
        <TagGroup.List>
          <Tag>
            <Avatar className="size-4" size="sm">
              <Avatar.Image src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg" />
              <Avatar.Fallback>F</Avatar.Fallback>
            </Avatar>
            Fred
          </Tag>
          <Tag>
            <Avatar className="size-4" size="sm">
              <Avatar.Image src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/green.jpg" />
              <Avatar.Fallback>M</Avatar.Fallback>
            </Avatar>
            Michael
          </Tag>
          <Tag>
            <Avatar className="size-4" size="sm">
              <Avatar.Image src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/purple.jpg" />
              <Avatar.Fallback>J</Avatar.Fallback>
            </Avatar>
            Jane
          </Tag>
        </TagGroup.List>
        <Description>Tags with avatars</Description>
      </TagGroup>
    </div>
  ),
};

export const WithRemoveButton: Story = {
  render: () => {
    const [tags, setTags] = useState(["News", "Travel", "Gaming", "Shopping"]);
    const [frameworks, setFrameworks] = useState(["React", "Vue", "Angular", "Svelte"]);

    const onRemoveTags = (keys: Set<Key>) => {
      setTags(tags.filter((tag) => !keys.has(tag)));
    };

    const onRemoveFrameworks = (keys: Set<Key>) => {
      setFrameworks(frameworks.filter((framework) => !keys.has(framework)));
    };

    return (
      <div className="flex flex-col gap-8">
        <div className="w-sm">
          <TagGroup onRemove={onRemoveTags}>
            <Label>Default Remove Button</Label>
            <TagGroup.List
              renderEmptyState={() => <EmptyState className="p-1">No categories found</EmptyState>}
            >
              {tags.map((tag) => (
                <Tag key={tag} id={tag}>
                  {tag}
                  <Tag.RemoveButton />
                </Tag>
              ))}
            </TagGroup.List>
            <Description>Click the X to remove tags</Description>
          </TagGroup>
        </div>

        <div className="w-md">
          <TagGroup onRemove={onRemoveFrameworks}>
            <Label>Custom Remove Button</Label>
            <TagGroup.List
              renderEmptyState={() => <EmptyState className="p-1">No frameworks found</EmptyState>}
            >
              {frameworks.map((framework) => (
                <Tag key={framework} id={framework}>
                  {framework}
                  <Tag.RemoveButton>
                    <Icon icon="gravity-ui:circle-xmark-fill" />
                  </Tag.RemoveButton>
                </Tag>
              ))}
            </TagGroup.List>
            <Description>Custom remove button with icon</Description>
          </TagGroup>
        </div>
      </div>
    );
  },
};

export const WithListData: Story = {
  render: () => {
    type User = {
      id: string;
      name: string;
      avatar: string;
      fallback: string;
    };

    const list = useListData<User>({
      initialItems: [
        {
          id: "fred",
          name: "Fred",
          avatar: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg",
          fallback: "F",
        },
        {
          id: "michael",
          name: "Michael",
          avatar: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/green.jpg",
          fallback: "M",
        },
        {
          id: "jane",
          name: "Jane",
          avatar: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/purple.jpg",
          fallback: "J",
        },
        {
          id: "alice",
          name: "Alice",
          avatar: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/red.jpg",
          fallback: "A",
        },
        {
          id: "bob",
          name: "Bob",
          avatar: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/orange.jpg",
          fallback: "B",
        },
        {
          id: "charlie",
          name: "Charlie",
          avatar: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/black.jpg",
          fallback: "C",
        },
      ],
      initialSelectedKeys: new Set(["fred", "michael"]),
      getKey: (item) => item.id,
    });

    const onRemove = (keys: Set<Key>) => {
      list.remove(...keys);
    };

    return (
      <div className="w-sm">
        <TagGroup
          selectedKeys={list.selectedKeys}
          selectionMode="multiple"
          onRemove={onRemove}
          onSelectionChange={(keys) => list.setSelectedKeys(keys)}
        >
          <Label>Team Members</Label>
          <TagGroup.List
            items={list.items}
            renderEmptyState={() => <EmptyState className="p-1">No team members</EmptyState>}
          >
            {(userData) => {
              const user = userData as User;

              return (
                <Tag id={user.id} textValue={user.name}>
                  <Avatar className="size-4" size="sm">
                    <Avatar.Image src={user.avatar} />
                    <Avatar.Fallback>{user.fallback}</Avatar.Fallback>
                  </Avatar>
                  {user.name}
                  <Tag.RemoveButton />
                </Tag>
              );
            }}
          </TagGroup.List>
          <Description>Select team members for your project</Description>
        </TagGroup>
        {list.selectedKeys !== "all" && Array.from(list.selectedKeys).length > 0 && (
          <div className="mt-4 flex flex-col gap-2">
            <p className="text-muted text-sm font-medium">Selected:</p>
            <div className="flex flex-wrap gap-2">
              {Array.from(list.selectedKeys).map((key) => {
                const user = list.getItem(key);

                if (!user) {
                  return null;
                }

                return (
                  <div
                    key={key}
                    className="bg-surface-tertiary flex items-center gap-2 rounded-lg px-2 py-1"
                  >
                    <Avatar className="size-4" size="sm">
                      <Avatar.Image src={user.avatar} />
                      <Avatar.Fallback>{user.fallback}</Avatar.Fallback>
                    </Avatar>
                    <span className="text-sm">{user.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  },
};
