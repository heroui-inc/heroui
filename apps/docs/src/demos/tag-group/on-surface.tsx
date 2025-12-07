import {Description, Label, Surface, Tag, TagGroup} from "@heroui/react";

export function TagGroupOnSurface() {
  return (
    <div className="bg-surface w-sm flex items-center justify-center rounded-3xl p-4">
      <Surface className="w-full">
        <TagGroup>
          <Label>On Surface</Label>
          <TagGroup.List>
            <Tag isOnSurface>News</Tag>
            <Tag isOnSurface>Travel</Tag>
            <Tag isOnSurface>Gaming</Tag>
          </TagGroup.List>
          <Description>Tags on surface component</Description>
        </TagGroup>
      </Surface>
    </div>
  );
}
