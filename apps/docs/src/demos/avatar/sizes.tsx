"use client";

import {Avatar} from "@heroui/react";

export function Sizes() {
  return (
    <div className="flex items-center gap-4">
      <Avatar size="sm">
        <Avatar.Image
          alt="Small Avatar"
          src="https://img.heroui.chat/image/avatar?w=400&h=400&u=3"
        />
        <Avatar.Fallback>SM</Avatar.Fallback>
      </Avatar>
      <Avatar size="md">
        <Avatar.Image
          alt="Medium Avatar"
          src="https://img.heroui.chat/image/avatar?w=400&h=400&u=4"
        />
        <Avatar.Fallback>MD</Avatar.Fallback>
      </Avatar>
      <Avatar size="lg">
        <Avatar.Image
          alt="Large Avatar"
          src="https://img.heroui.chat/image/avatar?w=400&h=400&u=5"
        />
        <Avatar.Fallback>LG</Avatar.Fallback>
      </Avatar>
    </div>
  );
}
