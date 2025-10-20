"use client";

import {AvatarFallback, AvatarImage, AvatarRoot} from "@heroui/react";

export function Sizes() {
  return (
    <div className="flex items-center gap-4">
      <AvatarRoot size="sm">
        <AvatarImage
          alt="Small Avatar"
          src="https://img.heroui.chat/image/avatar?w=400&h=400&u=3"
        />
        <AvatarFallback>SM</AvatarFallback>
      </AvatarRoot>
      <AvatarRoot size="md">
        <AvatarImage
          alt="Medium Avatar"
          src="https://img.heroui.chat/image/avatar?w=400&h=400&u=4"
        />
        <AvatarFallback>MD</AvatarFallback>
      </AvatarRoot>
      <AvatarRoot size="lg">
        <AvatarImage
          alt="Large Avatar"
          src="https://img.heroui.chat/image/avatar?w=400&h=400&u=5"
        />
        <AvatarFallback>LG</AvatarFallback>
      </AvatarRoot>
    </div>
  );
}
