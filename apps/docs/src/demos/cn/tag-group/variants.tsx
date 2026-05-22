"use client";

import {Label, Tag, TagGroup} from "@heroui/react";

export function TagGroupVariants() {
  return (
    <div className="flex flex-col gap-8">
      <TagGroup selectionMode="single" variant="default">
        <Label>默认</Label>
        <TagGroup.List>
          <Tag>资讯</Tag>
          <Tag>旅行</Tag>
          <Tag>游戏</Tag>
        </TagGroup.List>
      </TagGroup>

      <TagGroup selectionMode="single" variant="surface">
        <Label>表面</Label>
        <TagGroup.List>
          <Tag>资讯</Tag>
          <Tag>旅行</Tag>
          <Tag>游戏</Tag>
        </TagGroup.List>
      </TagGroup>
    </div>
  );
}
