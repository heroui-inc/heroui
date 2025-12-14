"use client";

import {Avatar, Description, Label, Tag, TagGroup} from "@heroui/react";
import {Icon} from "@iconify/react";

export function TagGroupWithPrefix() {
  return (
    <div className="flex flex-col gap-8">
      <TagGroup selectionMode="single">
        <Label>With Icons</Label>
        <TagGroup.List>
          <Tag>
            <Icon icon="gravity-ui:square-article" />
            News
          </Tag>
          <Tag>
            <Icon icon="gravity-ui:planet-earth" />
            Travel
          </Tag>
          <Tag>
            <Icon icon="gravity-ui:rocket" />
            Gaming
          </Tag>
          <Tag>
            <Icon icon="gravity-ui:shopping-bag" />
            Shopping
          </Tag>
        </TagGroup.List>
        <Description>Tags with icons</Description>
      </TagGroup>

      <TagGroup selectionMode="single">
        <Label>With Avatars</Label>
        <TagGroup.List>
          <Tag>
            <Avatar className="size-4">
              <Avatar.Image src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg" />
              <Avatar.Fallback>F</Avatar.Fallback>
            </Avatar>
            Fred
          </Tag>
          <Tag>
            <Avatar className="size-4">
              <Avatar.Image src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/green.jpg" />
              <Avatar.Fallback>M</Avatar.Fallback>
            </Avatar>
            Michael
          </Tag>
          <Tag>
            <Avatar className="size-4">
              <Avatar.Image src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/purple.jpg" />
              <Avatar.Fallback>J</Avatar.Fallback>
            </Avatar>
            Jane
          </Tag>
        </TagGroup.List>
        <Description>Tags with avatars</Description>
      </TagGroup>
    </div>
  );
}
