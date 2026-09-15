import {Avatar, AvatarGroup} from "@heroui/react";
import React from "react";

const avatars = [
  {
    image: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg",
    name: "Blue",
  },
  {
    image: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/green.jpg",
    name: "Green",
  },
  {
    image: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/purple.jpg",
    name: "Purple",
  },
  {
    image: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/orange.jpg",
    name: "Orange",
  },
  {
    image: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/red.jpg",
    name: "red",
  },
  {
    image: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg",
    name: "Blue",
  },
  {
    image: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/black.jpg",
    name: "Black",
  },
];

export function AvatarGroupDemo() {
  return (
    <div className="flex w-full justify-center">
      <AvatarGroup max={5}>
        {avatars.map((item, index) => (
          <Avatar key={`${item.name}-${index}`}>
            <Avatar.Image alt={item.name} src={item.image} />
            <Avatar.Fallback>
              {item.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </Avatar.Fallback>
          </Avatar>
        ))}
      </AvatarGroup>
    </div>
  );
}
