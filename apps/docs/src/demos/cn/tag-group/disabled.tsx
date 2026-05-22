"use client";

import {Description, Label, Tag, TagGroup} from "@heroui/react";

export function TagGroupDisabled() {
  return (
    <div className="flex flex-col gap-4">
      <TagGroup selectionMode="single">
        <Label>已禁用的标签</Label>
        <TagGroup.List>
          <Tag isDisabled>资讯</Tag>
          <Tag>旅行</Tag>
          <Tag isDisabled>游戏</Tag>
        </TagGroup.List>
        <Description>部分标签已禁用</Description>
      </TagGroup>

      <TagGroup disabledKeys={["travel"]} selectionMode="single">
        <Label>禁用的键</Label>
        <TagGroup.List>
          <Tag id="news">资讯</Tag>
          <Tag id="travel">旅行</Tag>
          <Tag id="gaming">游戏</Tag>
        </TagGroup.List>
        <Description>通过 disabledKeys 属性禁用的标签</Description>
      </TagGroup>
    </div>
  );
}
