"use client";

import {Description, Label, Surface, Tag, TagGroup} from "@heroui/react";

export function TagGroupOnSurface() {
  return (
    <div className="flex w-sm items-center justify-center rounded-3xl bg-surface p-4">
      <Surface className="w-full">
        <TagGroup isOnSurface selectionMode="single">
          <Label>On Surface</Label>
          <TagGroup.List>
            <Tag>News</Tag>
            <Tag>Travel</Tag>
            <Tag>Gaming</Tag>
          </TagGroup.List>
          <Description>Tags on surface component</Description>
        </TagGroup>
      </Surface>
    </div>
  );
}
