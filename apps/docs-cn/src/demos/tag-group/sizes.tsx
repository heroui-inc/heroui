"use client";

import {Label, Tag, TagGroup} from "@heroui/react";

export function TagGroupSizes() {
  return (
    <div className="flex flex-col gap-6">
      <TagGroup selectionMode="single" size="sm">
        <Label>小</Label>
        <TagGroup.List>
          <Tag>资讯</Tag>
          <Tag>旅行</Tag>
          <Tag>游戏</Tag>
        </TagGroup.List>
      </TagGroup>
      <TagGroup selectionMode="single" size="md">
        <Label>中</Label>
        <TagGroup.List>
          <Tag>资讯</Tag>
          <Tag>旅行</Tag>
          <Tag>游戏</Tag>
        </TagGroup.List>
      </TagGroup>
      <TagGroup selectionMode="single" size="lg">
        <Label>大</Label>
        <TagGroup.List>
          <Tag>资讯</Tag>
          <Tag>旅行</Tag>
          <Tag>游戏</Tag>
        </TagGroup.List>
      </TagGroup>
    </div>
  );
}
