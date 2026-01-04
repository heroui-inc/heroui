import React from "react";
import {Avatar} from "@heroui/react";

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
      <div className="flex -space-x-2">
        {avatars.slice(0, 5).map((item, index) => (
          <Avatar key={`${item.name}-${index}`} className="ring-2 ring-background">
            <Avatar.Image alt={item.name} src={item.image} />
            <Avatar.Fallback>
              {item.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </Avatar.Fallback>
          </Avatar>
        ))}
        <Avatar className="ring-2 ring-background">
          <Avatar.Fallback className="bg-surface text-xs font-medium text-muted">
            +{avatars.length - 2}
          </Avatar.Fallback>
        </Avatar>
      </div>
    </div>
  );
}

