"use client";

import type {Key} from "@heroui/react";

import {Description, EmptyState, Label, Tag, TagGroup} from "@heroui/react";
import {Icon} from "@iconify/react";
import {useState} from "react";

export function TagGroupWithRemoveButton() {
  type TagItem = {id: string; name: string};

  const [tags, setTags] = useState<TagItem[]>([
    {id: "news", name: "News"},
    {id: "travel", name: "Travel"},
    {id: "gaming", name: "Gaming"},
    {id: "shopping", name: "Shopping"},
  ]);

  const [frameworks, setFrameworks] = useState<TagItem[]>([
    {id: "react", name: "React"},
    {id: "vue", name: "Vue"},
    {id: "angular", name: "Angular"},
    {id: "svelte", name: "Svelte"},
  ]);

  const onRemoveTags = (keys: Set<Key>) => {
    setTags(tags.filter((tag) => !keys.has(tag.id)));
  };

  const onRemoveFrameworks = (keys: Set<Key>) => {
    setFrameworks(frameworks.filter((framework) => !keys.has(framework.id)));
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="w-sm">
        <TagGroup selectionMode="single" onRemove={onRemoveTags}>
          <Label>Default Remove Button</Label>
          <TagGroup.List
            items={tags}
            renderEmptyState={() => <EmptyState className="p-1">No categories found</EmptyState>}
          >
            {(tag) => (
              <Tag key={tag.name} id={tag.id} textValue={tag.name}>
                {tag.name}
              </Tag>
            )}
          </TagGroup.List>
          <Description>Click the X to remove tags</Description>
        </TagGroup>
      </div>

      <div className="w-md">
        <TagGroup selectionMode="single" onRemove={onRemoveFrameworks}>
          <Label>Custom Remove Button</Label>
          <TagGroup.List
            items={frameworks}
            renderEmptyState={() => <EmptyState className="p-1">No frameworks found</EmptyState>}
          >
            {(tag) => (
              <Tag key={tag.id} id={tag.id} textValue={tag.name}>
                {(renderProps) => (
                  <>
                    {tag.name}
                    {!!renderProps.allowsRemoving && (
                      <Tag.RemoveButton>
                        <Icon icon="gravity-ui:circle-xmark-fill" />
                      </Tag.RemoveButton>
                    )}
                  </>
                )}
              </Tag>
            )}
          </TagGroup.List>
          <Description>Custom remove button with icon</Description>
        </TagGroup>
      </div>
    </div>
  );
}
