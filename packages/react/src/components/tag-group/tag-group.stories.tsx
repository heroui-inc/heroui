import type {Key} from "../";
import type {Meta, StoryObj} from "@storybook/react";

import {Icon} from "@iconify/react";
import React, {useState} from "react";

import {EmptyState, Surface} from "../";
import {Description} from "../description";
import {ErrorMessage} from "../error-message";
import {Label} from "../label";
import {Tag} from "../tag";

import {TagGroup} from "./index";

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

export const WithSelection: Story = {
  render: () => {
    const [selected, setSelected] = useState<Iterable<Key>>(new Set(["news"]));

    return (
      <TagGroup
        selectedKeys={selected}
        selectionMode="multiple"
        onSelectionChange={(keys) => setSelected(keys)}
      >
        <Label>Select Categories</Label>
        <TagGroup.List>
          <Tag id="news">News</Tag>
          <Tag id="travel">Travel</Tag>
          <Tag id="gaming">Gaming</Tag>
          <Tag id="shopping">Shopping</Tag>
        </TagGroup.List>
      </TagGroup>
    );
  },
};

export const RemovableTags: Story = {
  render: () => {
    const [tags, setTags] = useState(["News", "Travel", "Gaming", "Shopping"]);

    const onRemove = (keys: Set<Key>) => {
      setTags(tags.filter((tag) => !keys.has(tag)));
    };

    return (
      <div className="w-sm">
        <TagGroup onRemove={(keys) => onRemove(keys)}>
          <Label>Categories</Label>
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
        </TagGroup>
      </div>
    );
  },
};

export const WithIcons: Story = {
  render: () => (
    <TagGroup>
      <Label>Categories</Label>
      <TagGroup.List>
        <Tag>
          <Icon icon="gravity-ui:circle-dashed" />
          News
        </Tag>
        <Tag>
          Travel
          <Icon icon="gravity-ui:circle-dashed" />
        </Tag>
        <Tag>
          <Icon icon="gravity-ui:circle-dashed" />
          Gaming
          <Icon icon="gravity-ui:circle-dashed" />
        </Tag>
      </TagGroup.List>
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

export const DisabledState: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <TagGroup>
        <Label>Disabled</Label>
        <TagGroup.List>
          <Tag isDisabled>News</Tag>
          <Tag>Travel</Tag>
          <Tag isDisabled>Gaming</Tag>
        </TagGroup.List>
      </TagGroup>

      <TagGroup disabledKeys={["travel"]}>
        <Label>Disabled Keys</Label>
        <TagGroup.List>
          <Tag id="news">News</Tag>
          <Tag id="travel">Travel</Tag>
          <Tag id="gaming">Gaming</Tag>
        </TagGroup.List>
      </TagGroup>
    </div>
  ),
};

export const WithValidation: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>(["news"]);
    const hasError = selected.length === 0;

    return (
      <TagGroup
        selectedKeys={selected}
        selectionMode="multiple"
        onSelectionChange={(keys) => setSelected(Array.from(keys) as string[])}
      >
        <Label>Required Categories</Label>
        <TagGroup.List>
          <Tag id="news">News</Tag>
          <Tag id="travel">Travel</Tag>
          <Tag id="gaming">Gaming</Tag>
        </TagGroup.List>
        <Description>Select at least one category</Description>
        {hasError ? <ErrorMessage>Please select at least one category</ErrorMessage> : null}
      </TagGroup>
    );
  },
};

export const CustomRemoveButton: Story = {
  render: () => {
    const [tags, setTags] = useState(["React", "Vue", "Angular", "Svelte"]);

    const onRemove = (keys: Set<Key>) => {
      setTags(tags.filter((tag) => !keys.has(tag)));
    };

    return (
      <div className="w-md">
        <TagGroup onRemove={onRemove}>
          <Label>Frameworks</Label>
          <TagGroup.List
            renderEmptyState={() => <EmptyState className="p-1">No frameworks found</EmptyState>}
          >
            {tags.map((tag) => (
              <Tag key={tag} id={tag}>
                {tag}
                <Tag.RemoveButton>
                  <Icon icon="gravity-ui:circle-xmark-fill" />
                </Tag.RemoveButton>
              </Tag>
            ))}
          </TagGroup.List>
        </TagGroup>
      </div>
    );
  },
};

export const OnSurface: Story = {
  render: () => (
    <div className="bg-surface flex h-[180px] w-[280px] items-center justify-center rounded-3xl p-4">
      <Surface className="w-full">
        <TagGroup>
          <Label>On Surface</Label>
          <TagGroup.List>
            <Tag isOnSurface>News</Tag>
            <Tag isOnSurface>Travel</Tag>
            <Tag isOnSurface>Gaming</Tag>
          </TagGroup.List>
        </TagGroup>
      </Surface>
    </div>
  ),
};
