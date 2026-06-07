"use client";

import {PlanetEarth, Rocket, ShoppingBag, SquareArticle} from "@gravity-ui/icons";
import {Avatar, Description, Label, Tag, TagGroup} from "@heroui/react";

export function TagGroupWithPrefix() {
  return (
    <div className="flex flex-col gap-8">
      <TagGroup selectionMode="single">
        <Label>带图标</Label>
        <TagGroup.List>
          <Tag>
            <SquareArticle />
            News
          </Tag>
          <Tag>
            <PlanetEarth />
            Travel
          </Tag>
          <Tag>
            <Rocket />
            Gaming
          </Tag>
          <Tag>
            <ShoppingBag />
            Shopping
          </Tag>
        </TagGroup.List>
        <Description>带图标的标签</Description>
      </TagGroup>

      <TagGroup selectionMode="single">
        <Label>带头像</Label>
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
        <Description>带头像的标签</Description>
      </TagGroup>
    </div>
  );
}
