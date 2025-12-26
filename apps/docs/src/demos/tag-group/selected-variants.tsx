"use client";

import {Label, Tag, TagGroup} from "@heroui/react";

export function TagGroupSelectedVariants() {
  return (
    <div className="flex flex-col gap-8">
      <TagGroup defaultSelectedKeys={["travel"]} selectionMode="single">
        <Label>Default</Label>
        <TagGroup.List>
          <Tag id="news">News</Tag>
          <Tag id="travel">Travel</Tag>
          <Tag id="gaming">Gaming</Tag>
        </TagGroup.List>
      </TagGroup>

      <TagGroup defaultSelectedKeys={["travel-soft"]} selectedVariant="soft" selectionMode="single">
        <Label>Soft</Label>
        <TagGroup.List>
          <Tag id="news-soft">News</Tag>
          <Tag id="travel-soft">Travel</Tag>
          <Tag id="gaming-soft">Gaming</Tag>
        </TagGroup.List>
      </TagGroup>
    </div>
  );
}
