"use client";

import type {Key} from "@heroui/react";

import {Description, EmptyState, Label, Tag, TagGroup} from "@heroui/react";
import {Icon} from "@iconify/react";
import {useState} from "react";

export function TagGroupWithRemoveButton() {
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
}
