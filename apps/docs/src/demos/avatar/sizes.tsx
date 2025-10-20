"use client";

import {Avatar, AvatarFallback, AvatarImage} from "@heroui/react";

export function Sizes() {
  return (
    <div className="flex items-center gap-4">
      <Avatar size="sm">
        <AvatarImage
          alt="Small Avatar"
          src="https://img.heroui.chat/image/avatar?w=400&h=400&u=3"
        />
        <AvatarFallback>SM</AvatarFallback>
      </Avatar>
      <Avatar size="md">
        <AvatarImage
          alt="Medium Avatar"
          src="https://img.heroui.chat/image/avatar?w=400&h=400&u=4"
        />
        <AvatarFallback>MD</AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarImage
          alt="Large Avatar"
          src="https://img.heroui.chat/image/avatar?w=400&h=400&u=5"
        />
        <AvatarFallback>LG</AvatarFallback>
      </Avatar>
    </div>
  );
}
