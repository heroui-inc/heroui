"use client";

import type {Key} from "@heroui/react";

import {CircleXmarkFill} from "@gravity-ui/icons";
import {Description, EmptyState, Label, Tag, TagGroup} from "@heroui/react";
import {useState} from "react";

export function TagGroupWithRemoveButton() {
  type TagItem = {id: string; name: string};

  const [tags, setTags] = useState<TagItem[]>([
    {id: "news", name: "资讯"},
    {id: "travel", name: "旅行"},
    {id: "gaming", name: "游戏"},
    {id: "shopping", name: "购物"},
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
          <Label>默认移除按钮</Label>
          <TagGroup.List
            items={tags}
            renderEmptyState={() => <EmptyState className="p-1">未找到分类</EmptyState>}
          >
            {(tag) => (
              <Tag key={tag.name} id={tag.id} textValue={tag.name}>
                {tag.name}
              </Tag>
            )}
          </TagGroup.List>
          <Description>点击 × 移除标签</Description>
        </TagGroup>
      </div>

      <div className="w-md">
        <TagGroup selectionMode="single" onRemove={onRemoveFrameworks}>
          <Label>自定义移除按钮</Label>
          <TagGroup.List
            items={frameworks}
            renderEmptyState={() => <EmptyState className="p-1">未找到框架</EmptyState>}
          >
            {(tag) => (
              <Tag key={tag.id} id={tag.id} textValue={tag.name}>
                {(renderProps) => (
                  <>
                    {tag.name}
                    {!!renderProps.allowsRemoving && (
                      <Tag.RemoveButton>
                        <CircleXmarkFill />
                      </Tag.RemoveButton>
                    )}
                  </>
                )}
              </Tag>
            )}
          </TagGroup.List>
          <Description>带图标的自定义移除按钮</Description>
        </TagGroup>
      </div>
    </div>
  );
}
