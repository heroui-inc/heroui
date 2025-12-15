"use client";

import {Description, Label, Tag, TagGroup} from "@heroui/react";

export function TagGroupDisabled() {
  return (
    <div className="flex flex-col gap-4">
      <TagGroup selectionMode="single">
        <Label>Disabled Tags</Label>
        <TagGroup.List>
          <Tag isDisabled>News</Tag>
          <Tag>Travel</Tag>
          <Tag isDisabled>Gaming</Tag>
        </TagGroup.List>
        <Description>Some tags are disabled</Description>
      </TagGroup>

      <TagGroup disabledKeys={["travel"]} selectionMode="single">
        <Label>Disabled Keys</Label>
        <TagGroup.List>
          <Tag>News</Tag>
          <Tag>Travel</Tag>
          <Tag>Gaming</Tag>
        </TagGroup.List>
        <Description>Tags disabled via disabledKeys prop</Description>
      </TagGroup>
    </div>
  );
}
